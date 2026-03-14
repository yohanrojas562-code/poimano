<?php

declare(strict_types=1);

namespace Database\Seeders\Tenant;

use App\Modules\Church\Domain\Models\ChurchSetting;
use Illuminate\Database\Seeder;

class ChurchSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $tenant = tenant();

        ChurchSetting::updateOrCreate(
            ['id' => 1],
            [
                'church_name'     => $tenant->church_name ?? 'Mi Iglesia',
                'email'           => $tenant->email ?? null,
                'phone'           => $tenant->phone ?? null,
                'address'         => $tenant->address ?? null,
                'primary_color'   => '#00105E',
                'secondary_color' => '#00E1FF',
                'language'        => 'es',
                'currency'        => 'USD',
                'timezone'        => 'America/Bogota',
            ],
        );
    }
}
