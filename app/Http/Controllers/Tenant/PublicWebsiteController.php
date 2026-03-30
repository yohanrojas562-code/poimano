<?php

declare(strict_types=1);

namespace App\Http\Controllers\Tenant;

use App\Http\Controllers\Controller;
use App\Modules\Church\Domain\Models\ChurchSetting;
use App\Modules\Website\Domain\Models\WebsiteMinistry;
use App\Modules\Website\Domain\Models\WebsiteSection;
use App\Modules\Website\Domain\Models\WebsiteSetting;
use App\Modules\Website\Domain\Models\WebsiteSocialNetwork;
use App\Modules\Website\Domain\Models\WebsiteWhatsappConfig;
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

        // Load website ministries for the ministries section
        $ministries = [];
        if (Schema::hasTable('website_ministries')) {
            $ministries = WebsiteMinistry::visible()
                ->orderBy('sort_order')
                ->get()
                ->map(fn ($m) => [
                    'id'          => $m->id,
                    'name'        => $m->name,
                    'slug'        => $m->slug,
                    'icon'        => $m->icon,
                    'image'       => $m->image ? '/storage/' . $m->image : null,
                    'description' => $m->description,
                ])
                ->values();
        }

        $socials = Schema::hasTable('website_social_networks')
            ? WebsiteSocialNetwork::visible()->orderBy('sort_order')->get()->map(fn ($s) => [
                'platform' => $s->platform,
                'icon'     => $s->icon,
                'url'      => $s->url,
            ])->values()
            : [];

        $whatsapp = null;
        if (Schema::hasTable('website_whatsapp_config')) {
            $wc = WebsiteWhatsappConfig::where('is_active', true)->first();
            if ($wc) {
                $whatsapp = [
                    'phone'   => $wc->phone_number,
                    'message' => $wc->default_message,
                ];
            }
        }

        return Inertia::render('Website/Templates/' . ucfirst($settings->template), [
            'church'     => $this->getChurchData(),
            'sections'   => $sections,
            'template'   => $settings->template,
            'ministries' => $ministries,
            'socials'    => $socials,
            'whatsapp'   => $whatsapp,
        ]);
    }

    public function ministry(string $slug): Response
    {
        if (! Schema::hasTable('website_ministries')) {
            abort(404);
        }

        $ministry = WebsiteMinistry::where('slug', $slug)->where('is_visible', true)->firstOrFail();

        $settings = WebsiteSetting::first();

        $whatsapp = null;
        if (Schema::hasTable('website_whatsapp_config')) {
            $wc = WebsiteWhatsappConfig::where('is_active', true)->first();
            if ($wc) {
                $whatsapp = [
                    'phone'   => $wc->phone_number,
                    'message' => $wc->default_message,
                ];
            }
        }

        return Inertia::render('Website/Templates/MinistryDetail', [
            'church'   => $this->getChurchData(),
            'ministry' => [
                'id'          => $ministry->id,
                'name'        => $ministry->name,
                'slug'        => $ministry->slug,
                'icon'        => $ministry->icon,
                'image'       => $ministry->image ? '/storage/' . $ministry->image : null,
                'description' => $ministry->description,
                'content'     => $ministry->content,
                'gallery'     => collect($ministry->gallery ?? [])->map(fn ($g) => '/storage/' . $g)->values(),
            ],
            'template' => $settings?->template ?? 'esperanza',
            'whatsapp' => $whatsapp,
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
            'favicon'         => $church?->favicon ? '/storage/' . $church->favicon : null,
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
