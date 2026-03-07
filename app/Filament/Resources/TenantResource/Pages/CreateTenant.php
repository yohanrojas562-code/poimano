<?php

namespace App\Filament\Resources\TenantResource\Pages;

use App\Filament\Resources\TenantResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Str;

class CreateTenant extends CreateRecord
{
    protected static string $resource = TenantResource::class;

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }

    protected function afterCreate(): void
    {
        $tenant = $this->record;

        // Create subdomain for the tenant
        $tenant->domains()->create([
            'domain' => $tenant->slug,
        ]);
    }

    protected function getCreatedNotificationTitle(): ?string
    {
        return 'Iglesia creada exitosamente';
    }
}
