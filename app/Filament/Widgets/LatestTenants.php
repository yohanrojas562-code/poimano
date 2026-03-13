<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\TenantResource;
use App\Models\Tenant;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestTenants extends BaseWidget
{
    protected static ?int $sort = 3;

    protected static ?string $heading = 'Últimas Iglesias Registradas';

    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(Tenant::query()->latest()->limit(5))
            ->columns([
                Tables\Columns\TextColumn::make('church_name')
                    ->label('Iglesia')
                    ->weight('bold')
                    ->icon('heroicon-o-building-office-2')
                    ->searchable(),
                Tables\Columns\TextColumn::make('pastor_name')
                    ->label('Pastor')
                    ->icon('heroicon-o-user')
                    ->placeholder('—'),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->icon('heroicon-o-envelope')
                    ->placeholder('—')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('slug')
                    ->label('Subdominio')
                    ->formatStateUsing(fn (string $state): string => "{$state}." . parse_url(config('app.url'), PHP_URL_HOST))
                    ->color('primary')
                    ->copyable()
                    ->copyMessage('Subdominio copiado'),
                Tables\Columns\TextColumn::make('plan.name')
                    ->label('Plan')
                    ->badge()
                    ->placeholder('Sin plan'),
                Tables\Columns\TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'active' => 'success',
                        'trial' => 'info',
                        'suspended' => 'warning',
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
                    ->label('Registrada')
                    ->since()
                    ->tooltip(fn (Tenant $record): string => $record->created_at->format('d/m/Y H:i')),
            ])
            ->actions([
                Tables\Actions\Action::make('ver')
                    ->icon('heroicon-o-eye')
                    ->url(fn (Tenant $record): string => TenantResource::getUrl('view', ['record' => $record])),
            ])
            ->paginated(false);
    }
}
