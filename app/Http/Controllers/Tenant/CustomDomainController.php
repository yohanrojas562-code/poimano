<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stancl\Tenancy\Database\Models\Domain;

class CustomDomainController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9][a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,}$/'],
        ]);

        $domain = strtolower(trim($validated['domain']));
        $tenant = tenant();

        // Prevent adding central domains
        $centralDomains = config('tenancy.central_domains', []);
        foreach ($centralDomains as $central) {
            if ($domain === $central || str_ends_with($domain, '.' . $central)) {
                return redirect()->back()->withErrors(['domain' => 'No puedes usar un dominio central de Poimano.']);
            }
        }

        // Check if domain is already taken
        $existing = Domain::where('domain', $domain)->first();
        if ($existing) {
            if ($existing->tenant_id === $tenant->id) {
                return redirect()->back()->withErrors(['domain' => 'Este dominio ya está conectado a tu iglesia.']);
            }
            return redirect()->back()->withErrors(['domain' => 'Este dominio ya está en uso por otra iglesia.']);
        }

        $tenant->domains()->create(['domain' => $domain]);

        return redirect()->back()->with('success', 'Dominio conectado correctamente. Configura tu DNS para que apunte a nuestro servidor.');
    }

    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'domain' => ['required', 'string'],
        ]);

        $tenant = tenant();
        $domain = $tenant->domains()
            ->where('domain', $validated['domain'])
            ->first();

        if (! $domain) {
            return redirect()->back()->withErrors(['domain' => 'Dominio no encontrado.']);
        }

        // Don't allow removing the primary subdomain
        $subdomain = $tenant->id;
        if ($domain->domain === $subdomain) {
            return redirect()->back()->withErrors(['domain' => 'No puedes eliminar el subdominio principal.']);
        }

        $domain->delete();

        return redirect()->back()->with('success', 'Dominio desconectado correctamente.');
    }
}
