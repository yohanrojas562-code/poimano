<?php

declare(strict_types=1);

namespace Database\Seeders\Tenant;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChurchSettingsSeeder extends Seeder
{
    public function run(): void
    {
        $tenant = tenant();

        // Configuraciones iniciales de la iglesia.
        // Se activará cuando el módulo Church tenga su tabla church_settings.
        // Ejemplo de datos que se seedearán:
        // - timezone: America/Bogota
        // - currency: USD
        // - language: es
        // - service_days: ['domingo']
    }
}
