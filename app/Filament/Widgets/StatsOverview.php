<?php

namespace App\Filament\Widgets;

use App\Core\Plans\Domain\Models\Plan;
use App\Core\Tenants\Domain\Models\Tenant;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalTenants = Tenant::count();
        $activeTenants = Tenant::where('status', 'active')->count();
        $trialTenants = Tenant::where('status', 'trial')->count();
        $suspendedTenants = Tenant::where('status', 'suspended')->count();
        $totalPlans = Plan::where('is_active', true)->count();

        $activePercent = $totalTenants > 0
            ? round(($activeTenants / $totalTenants) * 100)
            : 0;

        return [
            Stat::make('Total Iglesias', $totalTenants)
                ->description("{$activePercent}% activas")
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary')
                ->chart($this->getMonthlyTenantChart())
                ->extraAttributes([
                    'class' => 'cursor-pointer',
                    'wire:click' => "\$dispatch('setStatusFilter', { filter: '' })",
                ]),

            Stat::make('Activas', $activeTenants)
                ->description('Iglesias operando')
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success')
                ->chart(array_fill(0, 6, $activeTenants)),

            Stat::make('En Prueba', $trialTenants)
                ->description('Periodo de evaluación')
                ->descriptionIcon('heroicon-m-clock')
                ->color('info'),

            Stat::make('Suspendidas', $suspendedTenants)
                ->description($suspendedTenants > 0 ? 'Requieren atención' : 'Todo en orden')
                ->descriptionIcon($suspendedTenants > 0 ? 'heroicon-m-exclamation-triangle' : 'heroicon-m-shield-check')
                ->color($suspendedTenants > 0 ? 'warning' : 'success'),

            Stat::make('Planes Activos', $totalPlans)
                ->description('Planes disponibles')
                ->descriptionIcon('heroicon-m-credit-card')
                ->color('info'),
        ];
    }

    private function getMonthlyTenantChart(): array
    {
        return collect(range(5, 0))->map(function ($monthsAgo) {
            return Tenant::where('created_at', '>=', now()->subMonths($monthsAgo)->startOfMonth())
                ->where('created_at', '<', now()->subMonths($monthsAgo)->endOfMonth())
                ->count();
        })->toArray();
    }
}
