<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Church\Domain\Models\ChurchSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ChurchSettingController extends Controller
{
    public function edit(): Response
    {
        $settings = ChurchSetting::first();

        if (! $settings) {
            $tenant = tenant();
            $settings = ChurchSetting::create([
                'church_name'     => $tenant->church_name ?? 'Mi Iglesia',
                'email'           => $tenant->email ?? null,
                'phone'           => $tenant->phone ?? null,
                'address'         => $tenant->address ?? null,
                'primary_color'   => '#00105E',
                'secondary_color' => '#00E1FF',
            ]);
        }

        return Inertia::render('Settings/ChurchSettings', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $settings = ChurchSetting::firstOrFail();

        $validated = $request->validate([
            'church_name'     => ['required', 'string', 'max:255'],
            'slogan'          => ['nullable', 'string', 'max:255'],
            'primary_color'   => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'secondary_color' => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'language'        => ['required', 'string', 'in:es,en,pt'],
            'currency'        => ['required', 'string', 'in:USD,COP,MXN,EUR,BRL,PEN,ARS,CLP'],
            'timezone'        => ['required', 'string', 'max:50'],
            'phone'           => ['nullable', 'string', 'max:20'],
            'email'           => ['nullable', 'email', 'max:255'],
            'address'         => ['nullable', 'string', 'max:500'],
            'city'            => ['nullable', 'string', 'max:255'],
            'website'         => ['nullable', 'url', 'max:255'],
            'founded_at'      => ['nullable', 'date'],
            'denomination'    => ['nullable', 'string', 'max:255'],
            'logo'            => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,svg', 'max:2048'],
            'remove_logo'     => ['nullable', 'boolean'],
        ]);

        // Handle logo
        if ($request->boolean('remove_logo') && $settings->logo) {
            Storage::disk('public')->delete($settings->logo);
            $validated['logo'] = null;
        } elseif ($request->hasFile('logo')) {
            // Delete old logo
            if ($settings->logo) {
                Storage::disk('public')->delete($settings->logo);
            }
            $validated['logo'] = $request->file('logo')->store('church/logos', 'public');
        }

        unset($validated['remove_logo']);

        $settings->update($validated);

        return redirect()->back()->with('success', 'Configuración guardada correctamente.');
    }
}
