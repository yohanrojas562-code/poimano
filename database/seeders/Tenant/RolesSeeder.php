<?php

declare(strict_types=1);

namespace Database\Seeders\Tenant;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $tenant = tenant();

        // Asignamos roles por defecto al tenant en su tabla local de user_roles
        // Los roles maestros viven en la BD central (shared).
        // Aquí creamos la tabla de mapeo local que indica qué roles aplican a este tenant.
        // Esto se implementará cuando se cree la migración de user_roles en el módulo members.

        // Por ahora, registramos los role IDs que aplican a este tenant.
        // Esto se activará cuando el módulo Members tenga su tabla user_roles.
    }
}
