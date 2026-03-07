<?php

namespace App\Filament\Widgets;

use App\Models\Tenant;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class TenantsChart extends ChartWidget
{
    protected static ?string $heading = 'Iglesias Registradas';

    protected static ?int $sort = 2;

    protected static ?string $maxHeight = '300px';

    protected function getData(): array
    {
        $months = collect(range(5, 0))->map(function ($monthsAgo) {
            $date = now()->subMonths($monthsAgo);
            return [
                'month' => $date->translatedFormat('M Y'),
                'count' => Tenant::where('created_at', '>=', $date->startOfMonth())
                    ->where('created_at', '<', $date->copy()->endOfMonth())
                    ->count(),
            ];
        });

        return [
            'datasets' => [
                [
                    'label' => 'Nuevas Iglesias',
                    'data' => $months->pluck('count')->toArray(),
                    'backgroundColor' => 'rgba(99, 102, 241, 0.2)',
                    'borderColor' => 'rgb(99, 102, 241)',
                    'fill' => true,
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
