<?php

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Website\Domain\Models\WebsiteSocialNetwork;
use App\Modules\Website\Domain\Models\WebsiteWhatsappConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class WebsiteSocialController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => ['required', 'string', 'max:100'],
            'icon'     => ['required', 'string', 'max:100'],
            'url'      => ['required', 'url', 'max:500'],
        ]);

        $maxOrder = WebsiteSocialNetwork::max('sort_order') ?? -1;
        $validated['sort_order'] = $maxOrder + 1;

        WebsiteSocialNetwork::create($validated);

        return redirect()->back()->with('success', 'Red social agregada.');
    }

    public function update(Request $request, WebsiteSocialNetwork $social): RedirectResponse
    {
        $validated = $request->validate([
            'platform'   => ['required', 'string', 'max:100'],
            'icon'       => ['required', 'string', 'max:100'],
            'url'        => ['required', 'url', 'max:500'],
            'is_visible' => ['boolean'],
        ]);

        $social->update($validated);

        return redirect()->back()->with('success', 'Red social actualizada.');
    }

    public function destroy(WebsiteSocialNetwork $social): RedirectResponse
    {
        $social->delete();

        return redirect()->back()->with('success', 'Red social eliminada.');
    }

    public function updateWhatsapp(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'phone_number'    => ['required', 'string', 'max:20'],
            'default_message' => ['nullable', 'string', 'max:500'],
            'is_active'       => ['boolean'],
        ]);

        WebsiteWhatsappConfig::updateOrCreate(
            ['id' => 1],
            $validated,
        );

        return redirect()->back()->with('success', 'Configuración de WhatsApp actualizada.');
    }

    public function removeWhatsapp(): RedirectResponse
    {
        WebsiteWhatsappConfig::query()->delete();

        return redirect()->back()->with('success', 'WhatsApp desactivado.');
    }
}
