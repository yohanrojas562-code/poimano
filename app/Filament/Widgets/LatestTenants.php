<?php

namespace App\Filament\Widgets;

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
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('pastor_name')
                    ->label('Pastor'),
                Tables\Columns\TextColumn::make('slug')
                    ->label('Subdominio')
                    ->formatStateUsing(fn (string $state): string => "{$state}.poimano.localhost")
                    ->color('primary'),
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
                    ->since(),
            ])
            ->paginated(false);
    }
}
