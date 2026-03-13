<?php

namespace App\Filament\Resources\TenantResource\Pages;

use App\Filament\Resources\TenantResource;
use App\Models\User;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Hash;

class CreateTenant extends CreateRecord
{
    protected static string $resource = TenantResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function afterCreate(): void
    {
        set_time_limit(120);

        $tenant = $this->record;
        $adminPassword = $this->data['admin_password'] ?? 'password';

        // Create subdomain for the tenant
        $tenant->domains()->create([
            'domain' => $tenant->slug,
        ]);

        // Create admin user inside the tenant's database
        $tenant->run(function () use ($tenant, $adminPassword) {
            User::create([
                'name' => $tenant->pastor_name ?? 'Administrador',
                'email' => $tenant->email ?? $tenant->slug . '@poimano.app',
                'password' => Hash::make($adminPassword),
                'role' => 'admin',
                'phone' => $tenant->phone,
                'is_active' => true,
            ]);
        });
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Iglesia creada exitosamente';
    }
}
