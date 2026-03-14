<?php

namespace App\Filament\Resources\TenantResource\Pages;

use App\Filament\Resources\TenantResource;
use App\Models\User;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class CreateTenant extends CreateRecord
{
    protected static string $resource = TenantResource::class;

    protected string $adminPassword = 'password';

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $this->adminPassword = $data['admin_password'] ?? 'password';
        unset($data['admin_password']);

        return $data;
    }

    protected function afterCreate(): void
    {
        set_time_limit(120);

        $tenant = $this->record;
        $adminPassword = $this->adminPassword;

        try {
            // Create subdomain for the tenant
            $tenant->domains()->firstOrCreate([
                'domain' => $tenant->slug,
            ]);

            // Create/update admin user inside the tenant's database
            $tenant->run(function () use ($tenant, $adminPassword) {
                $email = $tenant->email ?? $tenant->slug . '@poimano.app';

                $user = User::where('email', $email)->first();
                if ($user) {
                    $user->update(['password' => Hash::make($adminPassword)]);
                } else {
                    User::create([
                        'name' => $tenant->pastor_name ?? 'Administrador',
                        'email' => $email,
                        'password' => Hash::make($adminPassword),
                        'role' => 'admin',
                        'phone' => $tenant->phone,
                        'is_active' => true,
                    ]);
                }
            });
        } catch (\Throwable $e) {
            Log::error('Error en afterCreate del tenant: ' . $e->getMessage(), [
                'tenant_id' => $tenant->id,
                'trace' => $e->getTraceAsString(),
            ]);

            Notification::make()
                ->title('Iglesia creada pero hubo un error configurando el usuario admin')
                ->body($e->getMessage())
                ->warning()
                ->send();
        }
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Iglesia creada exitosamente';
    }
}
