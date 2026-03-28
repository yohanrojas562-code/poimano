<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Church\Domain\Models\ChurchSetting;
use App\Modules\Website\Domain\Models\WebsiteSection;
use App\Modules\Website\Domain\Models\WebsiteSetting;
use App\Modules\Website\Domain\Services\TemplateSeeder;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class PublicWebsiteController extends Controller
{
    public function __invoke(): Response
    {
        // Check if website tables exist (new tenant might not have them yet)
        if (! Schema::hasTable('website_settings')) {
            return Inertia::render('Website/ComingSoon', [
                'church' => $this->getChurchData(),
            ]);
        }

        $settings = WebsiteSetting::first();

        if (! $settings || ! $settings->is_published) {
            return Inertia::render('Website/ComingSoon', [
                'church' => $this->getChurchData(),
            ]);
        }

        // Ensure default sections exist
        TemplateSeeder::seed($settings->template);

        $sections = WebsiteSection::where('template', $settings->template)
            ->where('is_visible', true)
            ->orderBy('sort_order')
            ->get()
            ->keyBy('section_key')
            ->map(function ($s) {
                $content = $s->content;
                // Resolve image paths to public URLs
                foreach (['bg_image', 'image'] as $field) {
                    if (! empty($content[$field]) && ! str_starts_with($content[$field], 'http')) {
                        $content[$field] = '/storage/' . $content[$field];
                    }
                }
                return $content;
            });

        return Inertia::render('Website/Templates/' . ucfirst($settings->template), [
            'church'   => $this->getChurchData(),
            'sections' => $sections,
            'template' => $settings->template,
        ]);
    }

    private function getChurchData(): array
    {
        $church = null;

        if (Schema::hasTable('church_settings')) {
            $church = ChurchSetting::first();
        }

        $tenant = tenant();

        return [
            'name'            => $church?->church_name ?? $tenant?->church_name ?? 'Mi Iglesia',
            'logo'            => $church?->logo ? '/storage/' . $church->logo : null,
            'slogan'          => $church?->slogan,
            'primary_color'   => $church?->primary_color ?? '#00105E',
            'secondary_color' => $church?->secondary_color ?? '#00E1FF',
            'text_color'      => $church?->text_color ?? '#FFFFFF',
            'phone'           => $church?->phone,
            'email'           => $church?->email,
            'address'         => $church?->address,
            'city'            => $church?->city,
            'website'         => $church?->website,
        ];
    }
}
