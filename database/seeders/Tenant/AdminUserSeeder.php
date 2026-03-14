<?php

declare(strict_types=1);

namespace Database\Seeders\Tenant;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $tenant = tenant();

        // Crear el usuario administrador de la iglesia
        // usando los datos del tenant (email y pastor_name).
        if ($tenant && $tenant->email) {
            User::firstOrCreate(
                ['email' => $tenant->email],
                [
                    'name' => $tenant->pastor_name ?? $tenant->church_name,
                    'password' => Hash::make('Poimano2026!'),
                    'role' => 'admin',
                    'is_active' => true,
                ]
            );
        }
    }
}
