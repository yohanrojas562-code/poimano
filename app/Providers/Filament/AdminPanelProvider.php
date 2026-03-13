<?php

namespace App\Providers\Filament;

use App\Models\Setting;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Navigation\NavigationGroup;
use Filament\Pages;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->domains(config('tenancy.central_domains'))
            ->login(\App\Filament\Pages\Auth\Login::class)
            ->brandName('Poimano')
            ->brandLogo(function () {
                try {
                    $logoWhite = Setting::get('platform_logo_white');
                    return $logoWhite ? asset('storage/' . $logoWhite) : null;
                } catch (\Throwable) {
                    return null;
                }
            })
            ->darkModeBrandLogo(function () {
                try {
                    $logoWhite = Setting::get('platform_logo_white');
                    return $logoWhite ? asset('storage/' . $logoWhite) : null;
                } catch (\Throwable) {
                    return null;
                }
            })
            ->brandLogoHeight('3rem')
            ->favicon(function () {
                try {
                    $favicon = Setting::get('platform_favicon');
                    return $favicon ? asset('storage/' . $favicon) : asset('favicon.ico');
                } catch (\Throwable) {
                    return asset('favicon.ico');
                }
            })
            ->colors([
                'primary' => [
                    50 => '#E6E8F2',
                    100 => '#CCD1E5',
                    200 => '#99A3CB',
                    300 => '#6675B1',
                    400 => '#334797',
                    500 => '#00105E',
                    600 => '#000D4B',
                    700 => '#000A38',
                    800 => '#000725',
                    900 => '#000312',
                    950 => '#000209',
                ],
                'info' => [
                    50 => '#E6FCFF',
                    100 => '#CCF9FF',
                    200 => '#99F3FF',
                    300 => '#66EDFF',
                    400 => '#33E7FF',
                    500 => '#00E1FF',
                    600 => '#00B4CC',
                    700 => '#008799',
                    800 => '#005A66',
                    900 => '#002D33',
                    950 => '#001A1F',
                ],
                'danger' => Color::Rose,
                'success' => Color::Emerald,
                'warning' => Color::Amber,
                'gray' => Color::Slate,
            ])
            ->font('Inter')
            ->globalSearchKeyBindings(['command+k', 'ctrl+k'])
            ->navigationGroups([
                NavigationGroup::make('Gestión de Tenants')
                    ->icon('heroicon-o-building-office-2')
                    ->collapsed(false),
                NavigationGroup::make('Configuración')
                    ->icon('heroicon-o-cog-6-tooth')
                    ->collapsed(false),
            ])
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Pages\Dashboard::class,
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->widgets([])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ])
            ->sidebarCollapsibleOnDesktop()
            ->sidebarWidth('16rem')
            ->maxContentWidth('full')
            ->renderHook(
                'panels::head.end',
                fn () => '<style>' . file_get_contents(resource_path('css/filament/admin/theme.css')) . '</style>',
            );
    }
}
