<?php

declare(strict_types=1);

namespace App\Modules\Website\Domain\Services;

use App\Modules\Website\Domain\Models\WebsiteSection;

class TemplateSeeder
{
    /**
     * Seed default sections for a template if they don't exist yet.
     */
    public static function seed(string $template): void
    {
        $defaults = self::getDefaults($template);

        foreach ($defaults as $i => $section) {
            WebsiteSection::firstOrCreate(
                ['template' => $template, 'section_key' => $section['section_key']],
                [
                    'sort_order' => $i,
                    'is_visible' => true,
                    'content'    => $section['content'],
                ]
            );
        }
    }

    /**
     * Default sections for the "esperanza" template.
     */
    private static function getDefaults(string $template): array
    {
        return match ($template) {
            'esperanza' => self::esperanzaDefaults(),
            default     => [],
        };
    }

    private static function esperanzaDefaults(): array
    {
        return [
            [
                'section_key' => 'hero',
                'content' => [
                    'headline'    => 'Bienvenido a nuestra iglesia',
                    'subheadline' => 'Un lugar donde encontrar fe, esperanza y comunidad',
                    'cta_text'    => 'Conócenos',
                    'cta_link'    => '#about',
                    'bg_image'    => null,
                    'overlay_opacity' => 60,
                    'logo_height' => 40,
                ],
            ],
            [
                'section_key' => 'about',
                'content' => [
                    'title'       => 'Nuestra Historia',
                    'subtitle'    => 'Conócenos',
                    'description' => 'Somos una comunidad de fe comprometida con el amor de Dios. Desde nuestros inicios, hemos trabajado para ser un lugar de acogida, formación y servicio para todas las familias.',
                    'image'       => null,
                    'stats' => [
                        ['label' => 'Años de servicio', 'value' => '10+'],
                        ['label' => 'Miembros activos', 'value' => '200+'],
                        ['label' => 'Ministerios', 'value' => '8'],
                    ],
                ],
            ],
            [
                'section_key' => 'services',
                'content' => [
                    'title'    => 'Horarios de Culto',
                    'subtitle' => 'Te esperamos',
                    'items' => [
                        ['day' => 'Domingo', 'time' => '9:00 AM', 'name' => 'Culto Principal', 'description' => 'Adoración, predicación y comunión'],
                        ['day' => 'Miércoles', 'time' => '7:00 PM', 'name' => 'Estudio Bíblico', 'description' => 'Profundizamos en la Palabra de Dios'],
                        ['day' => 'Viernes', 'time' => '7:00 PM', 'name' => 'Reunión de Jóvenes', 'description' => 'Espacio de crecimiento para jóvenes'],
                    ],
                ],
            ],
            [
                'section_key' => 'ministries',
                'content' => [
                    'title'    => 'Nuestros Ministerios',
                    'subtitle' => 'Áreas de servicio',
                    'items' => [
                        ['name' => 'Alabanza', 'icon' => 'music', 'description' => 'Adoración a través de la música y el arte'],
                        ['name' => 'Niños', 'icon' => 'baby', 'description' => 'Enseñanza bíblica para los más pequeños'],
                        ['name' => 'Jóvenes', 'icon' => 'users', 'description' => 'Discipulado y comunidad para jóvenes'],
                        ['name' => 'Misiones', 'icon' => 'globe', 'description' => 'Alcanzando comunidades con el evangelio'],
                    ],
                ],
            ],
            [
                'section_key' => 'contact',
                'content' => [
                    'title'    => 'Contáctanos',
                    'subtitle' => 'Estamos para servirte',
                    'show_map' => true,
                    'map_embed_url' => null,
                ],
            ],
            [
                'section_key' => 'footer',
                'content' => [
                    'description'  => 'Una iglesia comprometida con la comunidad.',
                    'social_links' => [
                        'facebook'  => '',
                        'instagram' => '',
                        'youtube'   => '',
                    ],
                    'copyright' => '© {year} {church_name}. Todos los derechos reservados.',
                ],
            ],
        ];
    }
}
