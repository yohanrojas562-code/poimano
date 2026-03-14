<?php

namespace App\Console\Commands;

use App\Core\Tenants\Domain\Models\Tenant;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class CreateTenantCommand extends Command
{
    protected $signature = 'tenant:create
        {name : Nombre de la iglesia}
        {--slug= : Slug para el subdominio (auto-generado si no se provee)}
        {--email= : Email de contacto}
        {--pastor= : Nombre del pastor}';

    protected $description = 'Crea un nuevo tenant (iglesia) con su base de datos y subdominio';

    public function handle()
    {
        $name = $this->argument('name');
        $slug = $this->option('slug') ?: Str::slug($name);
        $email = $this->option('email');
        $pastor = $this->option('pastor');

        $this->info("Creando iglesia: {$name}");
        $domain = parse_url(config('app.url'), PHP_URL_HOST);
        $this->info("Subdominio: {$slug}.{$domain}");

        if (Tenant::find($slug)) {
            $this->error("Ya existe un tenant con el ID '{$slug}'");
            return 1;
        }

        $tenant = Tenant::create([
            'id' => $slug,
            'church_name' => $name,
            'slug' => $slug,
            'status' => 'active',
            'pastor_name' => $pastor,
            'email' => $email,
        ]);

        $tenant->domains()->create([
            'domain' => $slug,
        ]);

        $this->info('');
        $this->info('✅ Tenant creado exitosamente:');
        $this->table(
            ['Campo', 'Valor'],
            [
                ['ID', $tenant->id],
                ['Iglesia', $tenant->church_name],
                ['Subdominio', $slug . '.' . $domain],
                ['BD', 'tenant_' . $slug],
                ['Estado', $tenant->status],
            ]
        );

        $scheme = parse_url(config('app.url'), PHP_URL_SCHEME);
        $this->info("Accede en: {$scheme}://{$slug}.{$domain}");

        return 0;
    }
}
