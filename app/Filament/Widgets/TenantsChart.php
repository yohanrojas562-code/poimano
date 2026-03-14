<?php

namespace App\Filament\Widgets;

use App\Core\Tenants\Domain\Models\Tenant;
use Filament\Widgets\ChartWidget;

class TenantsChart extends ChartWidget
{
    protected static ?string $heading = 'Crecimiento de Iglesias';

    protected static ?string $description = 'Nuevas iglesias registradas por mes';

    protected static ?int $sort = 2;

    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $months = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = now()->subMonths($monthsAgo);
            return [
                'month' => $date->translatedFormat('M Y'),
                'new' => Tenant::where('created_at', '>=', $date->startOfMonth())
                    ->where('created_at', '<', $date->copy()->endOfMonth())
                    ->count(),
                'total' => Tenant::where('created_at', '<', $date->copy()->endOfMonth())
                    ->count(),
            ];
        });

        return [
            'datasets' => [
                [
                    'label' => 'Acumulado',
                    'data' => $months->pluck('total')->toArray(),
                    'backgroundColor' => 'rgba(0, 16, 94, 0.08)',
                    'borderColor' => '#00105E',
                    'pointBackgroundColor' => '#00105E',
                    'pointRadius' => 3,
                    'fill' => true,
                    'tension' => 0.3,
                ],
                [
                    'label' => 'Nuevas',
                    'data' => $months->pluck('new')->toArray(),
                    'backgroundColor' => 'rgba(0, 225, 255, 0.15)',
                    'borderColor' => '#00E1FF',
                    'pointBackgroundColor' => '#00E1FF',
                    'pointRadius' => 4,
                    'fill' => true,
                    'tension' => 0.3,
                ],
            ],
            'labels' => $months->pluck('month')->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
