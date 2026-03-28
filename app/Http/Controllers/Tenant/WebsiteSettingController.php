<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Website\Domain\Models\WebsiteSection;
use App\Modules\Website\Domain\Models\WebsiteSetting;
use App\Modules\Website\Domain\Services\TemplateSeeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class WebsiteSettingController extends Controller
{
    private const AVAILABLE_TEMPLATES = [
        [
            'id'          => 'esperanza',
            'name'        => 'Esperanza',
            'description' => 'Diseño elegante y moderno con secciones amplias, ideal para iglesias que buscan un look profesional y acogedor.',
            'preview'     => '/images/templates/esperanza.jpg',
        ],
    ];

    public function index(): Response
    {
        // Ensure tables exist (new tenants might not have them yet)
        if (! Schema::hasTable('website_settings')) {
            return Inertia::render('Website/Admin/Index', [
                'settings'           => ['id' => 0, 'template' => 'esperanza', 'is_published' => false],
                'sections'           => [],
                'availableTemplates' => self::AVAILABLE_TEMPLATES,
            ]);
        }

        $settings = WebsiteSetting::first();

        if (! $settings) {
            $settings = WebsiteSetting::create([
                'template'     => 'esperanza',
                'is_published' => false,
            ]);
        }

        TemplateSeeder::seed($settings->template);

        $sections = WebsiteSection::where('template', $settings->template)
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Website/Admin/Index', [
            'settings'           => $settings,
            'sections'           => $sections,
            'availableTemplates' => self::AVAILABLE_TEMPLATES,
        ]);
    }

    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'template'     => ['required', 'string', 'in:esperanza'],
            'is_published' => ['required', 'boolean'],
        ]);

        $settings = WebsiteSetting::firstOrFail();
        $settings->update($validated);

        // Seed sections for the selected template
        TemplateSeeder::seed($validated['template']);

        return redirect()->back()->with('success', 'Configuración del sitio web actualizada.');
    }

    public function updateSection(Request $request, WebsiteSection $section)
    {
        $validated = $request->validate([
            'content'    => ['required', 'array'],
            'is_visible' => ['required', 'boolean'],
        ]);

        $section->update($validated);

        return redirect()->back()->with('success', 'Sección actualizada correctamente.');
    }
}
