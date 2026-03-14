<?php

namespace App\Filament\Resources;

use App\Core\Plans\Domain\Models\Plan;
use App\Core\Tenants\Domain\Models\Tenant;
use App\Filament\Resources\TenantResource\Pages;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class TenantResource extends Resource
{
    protected static ?string $model = Tenant::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office-2';

    protected static ?string $navigationLabel = 'Iglesias';

    protected static ?string $modelLabel = 'Iglesia';

    protected static ?string $pluralModelLabel = 'Iglesias';

    protected static ?string $navigationGroup = 'Gestión de Tenants';

    protected static ?int $navigationSort = 1;

    protected static ?string $recordTitleAttribute = 'church_name';

    public static function getGloballySearchableAttributes(): array
    {
        return ['church_name', 'pastor_name', 'email', 'slug'];
    }

    public static function getGlobalSearchResultDetails(\Illuminate\Database\Eloquent\Model $record): array
    {
        return [
            'Pastor' => $record->pastor_name ?? '—',
            'Estado' => match ($record->status) {
                'active' => 'Activo',
                'trial' => 'Prueba',
                'suspended' => 'Suspendido',
                default => $record->status,
            },
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return (string) static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::count() > 10 ? 'success' : 'info';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información de la Iglesia')
                    ->description('Datos principales de la iglesia')
                    ->icon('heroicon-o-building-office-2')
                    ->schema([
                        Forms\Components\TextInput::make('church_name')
                            ->label('Nombre de la Iglesia')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (Forms\Set $set, ?string $state) {
                                if ($state) {
                                    $slug = Str::slug($state);
                                    $set('slug', $slug);
                                    $set('id', $slug);
                                }
                            })
                            ->helperText('El nombre genera automáticamente el subdominio de la iglesia'),

                        Forms\Components\TextInput::make('slug')
                            ->label('Subdominio')
                            ->required()
                            ->maxLength(100)
                            ->unique(ignoreRecord: true)
                            ->alphaDash()
                            ->prefix(str_contains(config('app.url'), 'https') ? 'https://' : 'http://')
                            ->suffix('.' . parse_url(config('app.url'), PHP_URL_HOST))
                            ->helperText('Se genera del nombre. Puedes editarlo si lo necesitas.'),

                        Forms\Components\Hidden::make('id')
                            ->dehydrateStateUsing(fn ($state, Forms\Get $get) => $state ?: $get('slug')),

                        Forms\Components\Select::make('plan_id')
                            ->label('Plan')
                            ->relationship('plan', 'name')
                            ->preload()
                            ->searchable()
                            ->nullable(),

                        Forms\Components\Select::make('status')
                            ->label('Estado')
                            ->options([
                                'active' => 'Activo',
                                'trial' => 'Prueba',
                                'suspended' => 'Suspendido',
                                'cancelled' => 'Cancelado',
                            ])
                            ->default('trial')
                            ->required()
                            ->native(false),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Contacto del Pastor')
                    ->description('Información de contacto del pastor principal')
                    ->icon('heroicon-o-user')
                    ->schema([
                        Forms\Components\TextInput::make('pastor_name')
                            ->label('Nombre del Pastor')
                            ->maxLength(255),

                        Forms\Components\TextInput::make('email')
                            ->label('Correo Electrónico')
                            ->email()
                            ->maxLength(255),

                        Forms\Components\TextInput::make('phone')
                            ->label('Teléfono')
                            ->tel()
                            ->maxLength(20),

                        Forms\Components\Textarea::make('address')
                            ->label('Dirección')
                            ->rows(2)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Credenciales del Administrador')
                    ->description('Usuario que administrará esta iglesia')
                    ->icon('heroicon-o-key')
                    ->schema([
                        Forms\Components\TextInput::make('admin_password')
                            ->label('Contraseña del Admin')
                            ->password()
                            ->revealable()
                            ->required()
                            ->minLength(8)
                            ->default('password')
                            ->helperText('Se creará un usuario con el email del pastor. Mínimo 8 caracteres.')
                            ->dehydrated(false),
                    ])
                    ->columns(2)
                    ->visibleOn('create'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')
                    ->label('ID')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('church_name')
                    ->label('Iglesia')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('slug')
                    ->label('Subdominio')
                    ->searchable()
                    ->formatStateUsing(fn (string $state): string => "{$state}." . parse_url(config('app.url'), PHP_URL_HOST))
                    ->color('primary')
                    ->copyable(),

                Tables\Columns\TextColumn::make('pastor_name')
                    ->label('Pastor')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->toggleable(),

                Tables\Columns\TextColumn::make('plan.name')
                    ->label('Plan')
                    ->badge()
                    ->sortable(),

                Tables\Columns\TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'trial' => 'info',
                        'suspended' => 'warning',
                        'cancelled' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'active' => 'Activo',
                        'trial' => 'Prueba',
                        'suspended' => 'Suspendido',
                        'cancelled' => 'Cancelado',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Estado')
                    ->options([
                        'active' => 'Activo',
                        'trial' => 'Prueba',
                        'suspended' => 'Suspendido',
                        'cancelled' => 'Cancelado',
                    ]),
                Tables\Filters\SelectFilter::make('plan_id')
                    ->label('Plan')
                    ->relationship('plan', 'name'),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make(),
                    Tables\Actions\EditAction::make(),
                    Tables\Actions\Action::make('suspend')
                        ->label('Suspender')
                        ->icon('heroicon-o-pause-circle')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->modalHeading('Suspender Iglesia')
                        ->modalDescription('¿Estás seguro de que deseas suspender esta iglesia? Los usuarios no podrán acceder a su panel.')
                        ->visible(fn (Tenant $record): bool => $record->status === 'active')
                        ->action(fn (Tenant $record) => $record->update(['status' => 'suspended'])),
                    Tables\Actions\Action::make('activate')
                        ->label('Activar')
                        ->icon('heroicon-o-play-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->visible(fn (Tenant $record): bool => in_array($record->status, ['suspended', 'trial']))
                        ->action(fn (Tenant $record) => $record->update(['status' => 'active'])),
                    Tables\Actions\DeleteAction::make()
                        ->label('Eliminar'),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Información de la Iglesia')
                    ->icon('heroicon-o-building-office-2')
                    ->columns(3)
                    ->schema([
                        Infolists\Components\TextEntry::make('church_name')
                            ->label('Nombre de la Iglesia')
                            ->size(Infolists\Components\TextEntry\TextEntrySize::Large)
                            ->weight('bold')
                            ->columnSpan(2),
                        Infolists\Components\TextEntry::make('status')
                            ->label('Estado')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'active' => 'success',
                                'trial' => 'info',
                                'suspended' => 'warning',
                                'cancelled' => 'danger',
                                default => 'gray',
                            })
                            ->formatStateUsing(fn (string $state): string => match ($state) {
                                'active' => 'Activo',
                                'trial' => 'Prueba',
                                'suspended' => 'Suspendido',
                                'cancelled' => 'Cancelado',
                                default => $state,
                            }),
                        Infolists\Components\TextEntry::make('slug')
                            ->label('Subdominio')
                            ->formatStateUsing(fn (string $state): string => "{$state}." . parse_url(config('app.url'), PHP_URL_HOST))
                            ->icon('heroicon-o-globe-alt')
                            ->copyable()
                            ->color('primary'),
                        Infolists\Components\TextEntry::make('plan.name')
                            ->label('Plan')
                            ->badge()
                            ->placeholder('Sin plan'),
                        Infolists\Components\TextEntry::make('created_at')
                            ->label('Fecha de Registro')
                            ->dateTime('d/m/Y H:i')
                            ->icon('heroicon-o-calendar'),
                    ]),
                Infolists\Components\Section::make('Contacto del Pastor')
                    ->icon('heroicon-o-user')
                    ->columns(2)
                    ->schema([
                        Infolists\Components\TextEntry::make('pastor_name')
                            ->label('Nombre del Pastor')
                            ->placeholder('No registrado')
                            ->icon('heroicon-o-user'),
                        Infolists\Components\TextEntry::make('email')
                            ->label('Correo Electrónico')
                            ->placeholder('No registrado')
                            ->icon('heroicon-o-envelope')
                            ->copyable(),
                        Infolists\Components\TextEntry::make('phone')
                            ->label('Teléfono')
                            ->placeholder('No registrado')
                            ->icon('heroicon-o-phone'),
                        Infolists\Components\TextEntry::make('address')
                            ->label('Dirección')
                            ->placeholder('No registrada')
                            ->icon('heroicon-o-map-pin')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTenants::route('/'),
            'create' => Pages\CreateTenant::route('/create'),
            'view' => Pages\ViewTenant::route('/{record}'),
            'edit' => Pages\EditTenant::route('/{record}/edit'),
        ];
    }
}
