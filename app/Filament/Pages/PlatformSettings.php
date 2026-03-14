<?php

namespace App\Filament\Pages;

use App\Core\Settings\Domain\Models\Setting;
use Filament\Actions\Action;
use Filament\Forms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;

class PlatformSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';
    protected static ?string $navigationLabel = 'Configuración General';
    protected static ?string $title = 'Configuración de la Plataforma';
    protected static ?string $navigationGroup = 'Configuración';
    protected static ?int $navigationSort = 10;
    protected static string $view = 'filament.pages.platform-settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'platform_name' => Setting::get('platform_name', 'Poimano'),
            'platform_logo' => Setting::get('platform_logo'),
            'platform_logo_white' => Setting::get('platform_logo_white'),
            'platform_favicon' => Setting::get('platform_favicon'),
            'primary_color' => Setting::get('primary_color', '#00105E'),
            'accent_color' => Setting::get('accent_color', '#00E1FF'),
            'support_email' => Setting::get('support_email'),
            'support_phone' => Setting::get('support_phone'),
            'default_trial_days' => Setting::get('default_trial_days', '14'),
            'maintenance_mode' => Setting::get('maintenance_mode', '0'),
            'welcome_message' => Setting::get('welcome_message', 'Bienvenido al panel de administración'),
        ]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('settings')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Marca e Identidad')
                            ->icon('heroicon-o-paint-brush')
                            ->schema([
                                Forms\Components\Section::make('Logo y Nombre')
                                    ->description('Personaliza la identidad visual de la plataforma')
                                    ->icon('heroicon-o-photo')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\TextInput::make('platform_name')
                                            ->label('Nombre de la Plataforma')
                                            ->required()
                                            ->maxLength(100)
                                            ->placeholder('Poimano')
                                            ->helperText('Se muestra en el sidebar y la pestaña del navegador'),

                                        Forms\Components\TextInput::make('welcome_message')
                                            ->label('Mensaje de Bienvenida')
                                            ->maxLength(255)
                                            ->placeholder('Bienvenido al panel de administración')
                                            ->helperText('Se muestra en el dashboard'),

                                        Forms\Components\FileUpload::make('platform_logo')
                                            ->label('Logo Principal')
                                            ->image()
                                            ->directory('branding')
                                            ->maxSize(2048)
                                            ->imageResizeMode('contain')
                                            ->imageCropAspectRatio('3:1')
                                            ->imageResizeTargetWidth('600')
                                            ->imageResizeTargetHeight('200')
                                            ->helperText('Logo para fondo claro. Recomendado: 600x200px, PNG transparente')
                                            ->acceptedFileTypes(['image/png', 'image/svg+xml', 'image/webp']),

                                        Forms\Components\FileUpload::make('platform_logo_white')
                                            ->label('Logo para Fondo Oscuro')
                                            ->image()
                                            ->directory('branding')
                                            ->maxSize(2048)
                                            ->imageResizeMode('contain')
                                            ->imageCropAspectRatio('3:1')
                                            ->imageResizeTargetWidth('600')
                                            ->imageResizeTargetHeight('200')
                                            ->helperText('Logo blanco/claro para el sidebar navy. Recomendado: 600x200px, PNG transparente')
                                            ->acceptedFileTypes(['image/png', 'image/svg+xml', 'image/webp']),

                                        Forms\Components\FileUpload::make('platform_favicon')
                                            ->label('Favicon')
                                            ->image()
                                            ->directory('branding')
                                            ->maxSize(512)
                                            ->helperText('Ícono de la pestaña del navegador. 32x32 o 64x64px')
                                            ->acceptedFileTypes(['image/png', 'image/x-icon', 'image/svg+xml'])
                                            ->columnSpanFull(),
                                    ]),

                                Forms\Components\Section::make('Colores de la Marca')
                                    ->description('Los colores principales de la plataforma')
                                    ->icon('heroicon-o-swatch')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\ColorPicker::make('primary_color')
                                            ->label('Color Primario (Navy)')
                                            ->helperText('Color principal de la marca. Default: #00105E'),

                                        Forms\Components\ColorPicker::make('accent_color')
                                            ->label('Color Acento (Cyan)')
                                            ->helperText('Color de acentos y destacados. Default: #00E1FF'),
                                    ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Soporte y Contacto')
                            ->icon('heroicon-o-lifebuoy')
                            ->schema([
                                Forms\Components\Section::make('Información de Contacto')
                                    ->description('Datos de soporte visibles para los administradores de iglesias')
                                    ->icon('heroicon-o-phone')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\TextInput::make('support_email')
                                            ->label('Email de Soporte')
                                            ->email()
                                            ->maxLength(255)
                                            ->placeholder('soporte@poimano.com')
                                            ->prefixIcon('heroicon-o-envelope'),

                                        Forms\Components\TextInput::make('support_phone')
                                            ->label('Teléfono de Soporte')
                                            ->tel()
                                            ->maxLength(20)
                                            ->placeholder('+57 300 000 0000')
                                            ->prefixIcon('heroicon-o-phone'),
                                    ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Plataforma')
                            ->icon('heroicon-o-server-stack')
                            ->schema([
                                Forms\Components\Section::make('Configuración General')
                                    ->description('Parámetros operativos de la plataforma')
                                    ->icon('heroicon-o-adjustments-horizontal')
                                    ->columns(2)
                                    ->schema([
                                        Forms\Components\TextInput::make('default_trial_days')
                                            ->label('Días de Prueba')
                                            ->numeric()
                                            ->minValue(0)
                                            ->maxValue(365)
                                            ->suffix('días')
                                            ->helperText('Duración del período de prueba al crear una iglesia'),

                                        Forms\Components\Toggle::make('maintenance_mode')
                                            ->label('Modo Mantenimiento')
                                            ->helperText('Bloquea el acceso de los tenants temporalmente')
                                            ->onColor('danger')
                                            ->offColor('success')
                                            ->onIcon('heroicon-m-wrench')
                                            ->offIcon('heroicon-m-check'),
                                    ]),
                            ]),
                    ])
                    ->contained(false)
                    ->columnSpanFull(),
            ])
            ->statePath('data');
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('save')
                ->label('Guardar Configuración')
                ->icon('heroicon-o-check')
                ->action('save')
                ->color('primary')
                ->size('lg'),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            if ($value === true) $value = '1';
            if ($value === false) $value = '0';

            Setting::set($key, is_array($value) ? json_encode($value) : (string) ($value ?? ''));
        }

        Setting::clearCache();

        Notification::make()
            ->title('Configuración guardada')
            ->body('Los cambios se aplicarán inmediatamente.')
            ->success()
            ->send();
    }
}
