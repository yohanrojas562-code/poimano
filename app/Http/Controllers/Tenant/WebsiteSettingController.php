<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Website\Domain\Models\WebsiteSection;
use App\Modules\Website\Domain\Models\WebsiteSetting;
use App\Modules\Website\Domain\Services\TemplateSeeder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
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

    /**
     * Upload an image for a specific section field.
     */
    public function uploadSectionImage(Request $request, WebsiteSection $section)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp,gif,svg', 'max:5120'],
            'field' => ['required', 'string', 'max:80'],
        ]);

        $tenantId = tenant()->id;
        $baseDir = base_path('storage/app/public') . '/website-images/' . $tenantId;
        File::ensureDirectoryExists($baseDir);

        // Delete old image if it exists
        $content = $section->content;
        $field = $request->input('field');
        if (! empty($content[$field])) {
            $oldPath = base_path('storage/app/public') . '/' . ltrim($content[$field], '/');
            if (File::exists($oldPath)) {
                File::delete($oldPath);
            }
        }

        $file = $request->file('image');
        $filename = $section->section_key . '-' . $field . '-' . uniqid() . '.' . $file->getClientOriginalExtension();
        $file->move($baseDir, $filename);

        $content[$field] = 'website-images/' . $tenantId . '/' . $filename;
        $section->update(['content' => $content]);

        return redirect()->back()->with('success', 'Imagen actualizada correctamente.');
    }

    /**
     * Remove an image from a specific section field.
     */
    public function removeSectionImage(Request $request, WebsiteSection $section)
    {
        $request->validate([
            'field' => ['required', 'string', 'max:80'],
        ]);

        $field = $request->input('field');
        $content = $section->content;

        if (! empty($content[$field])) {
            $oldPath = base_path('storage/app/public') . '/' . ltrim($content[$field], '/');
            if (File::exists($oldPath)) {
                File::delete($oldPath);
            }
        }

        $content[$field] = null;
        $section->update(['content' => $content]);

        return redirect()->back()->with('success', 'Imagen eliminada correctamente.');
    }
}
