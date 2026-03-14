<?php

namespace Database\Seeders\Central;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@poimano.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('Admin2026'),
                'role' => 'admin',
                'is_active' => true,
                'email_verified_at' => now(),
            ],
        );
    }
}
