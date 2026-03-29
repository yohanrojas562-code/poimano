<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Church\Domain\Models\ChurchSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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
            'text_color'      => ['required', 'string', 'regex:/^#[0-9A-Fa-f]{6}$/'],
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
            'favicon'         => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp,ico', 'max:512'],
            'remove_favicon'  => ['nullable', 'boolean'],
        ]);

        $tenantId = tenant()->id;
        $basePublic = base_path('storage/app/public');
        $logoDir = $basePublic . '/church-logos/' . $tenantId;

        // Handle logo removal
        if ($request->boolean('remove_logo') && $settings->logo) {
            $oldPath = public_path('storage/' . ltrim($settings->logo, '/'));
            if (File::exists($oldPath)) {
                File::delete($oldPath);
            }
            $validated['logo'] = null;
        } elseif ($request->hasFile('logo')) {
            // Delete old logo
            if ($settings->logo) {
                $oldPath = public_path('storage/' . ltrim($settings->logo, '/'));
                if (File::exists($oldPath)) {
                    File::delete($oldPath);
                }
            }

            // Save to central public storage (accessible via symlink)
            File::ensureDirectoryExists($logoDir);
            $file = $request->file('logo');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($logoDir, $filename);

            $validated['logo'] = 'church-logos/' . $tenantId . '/' . $filename;
        } else {
            // No logo change — preserve existing logo
            unset($validated['logo']);
        }

        unset($validated['remove_logo']);

        // Handle favicon
        $faviconDir = $basePublic . '/church-favicons/' . $tenantId;

        if ($request->boolean('remove_favicon') && $settings->favicon) {
            $oldPath = public_path('storage/' . ltrim($settings->favicon, '/'));
            if (File::exists($oldPath)) {
                File::delete($oldPath);
            }
            $validated['favicon'] = null;
        } elseif ($request->hasFile('favicon')) {
            if ($settings->favicon) {
                $oldPath = public_path('storage/' . ltrim($settings->favicon, '/'));
                if (File::exists($oldPath)) {
                    File::delete($oldPath);
                }
            }

            File::ensureDirectoryExists($faviconDir);
            $file = $request->file('favicon');
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move($faviconDir, $filename);

            $validated['favicon'] = 'church-favicons/' . $tenantId . '/' . $filename;
        } else {
            unset($validated['favicon']);
        }

        unset($validated['remove_favicon']);

        $settings->update($validated);

        return redirect()->back()->with('success', 'Configuración guardada correctamente.');
    }
}
