<?php

namespace App\Filament\Widgets;

use App\Models\Plan;
use App\Models\Tenant;
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

        return [
            Stat::make('Total Iglesias', $totalTenants)
                ->description('Iglesias registradas')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('primary')
                ->chart($this->getMonthlyTenantChart()),

            Stat::make('Iglesias Activas', $activeTenants)
                ->description("{$trialTenants} en prueba")
                ->descriptionIcon('heroicon-m-check-circle')
                ->color('success'),

            Stat::make('Suspendidas', $suspendedTenants)
                ->description('Iglesias suspendidas')
                ->descriptionIcon('heroicon-m-pause-circle')
                ->color($suspendedTenants > 0 ? 'warning' : 'success'),

            Stat::make('Planes Activos', $totalPlans)
                ->description('Planes disponibles')
                ->descriptionIcon('heroicon-m-credit-card')
                ->color('info'),
        ];
    }

    private function getMonthlyTenantChart(): array
    {
        // Simple growth chart based on monthly registrations
        $months = collect(range(5, 0))->map(function ($monthsAgo) {
            return Tenant::where('created_at', '>=', now()->subMonths($monthsAgo)->startOfMonth())
                ->where('created_at', '<', now()->subMonths($monthsAgo)->endOfMonth())
                ->count();
        });

        return $months->toArray();
    }
}
