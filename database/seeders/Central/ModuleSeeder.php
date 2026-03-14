<?php

namespace Database\Seeders\Central;

use App\Core\Plans\Domain\Models\Plan;
use App\Models\Shared\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    public function run(): void
    {
        // ── Registrar los 9 módulos del sistema ──
        $modules = [
            ['name' => 'Iglesia',        'slug' => 'church',        'description' => 'Configuración general de la iglesia',       'icon' => 'heroicon-o-building-library', 'sort_order' => 1],
            ['name' => 'Miembros',       'slug' => 'members',       'description' => 'Gestión de miembros y familias',            'icon' => 'heroicon-o-users',            'sort_order' => 2],
            ['name' => 'Grupos',         'slug' => 'groups',        'description' => 'Grupos celulares y ministerios',            'icon' => 'heroicon-o-user-group',       'sort_order' => 3],
            ['name' => 'Asistencia',     'slug' => 'attendance',    'description' => 'Registro y control de asistencia',          'icon' => 'heroicon-o-clipboard-document-check', 'sort_order' => 4],
            ['name' => 'Actividades',    'slug' => 'activities',    'description' => 'Eventos y calendario de actividades',       'icon' => 'heroicon-o-calendar-days',    'sort_order' => 5],
            ['name' => 'Finanzas',       'slug' => 'finance',       'description' => 'Diezmos, ofrendas y contabilidad',          'icon' => 'heroicon-o-banknotes',        'sort_order' => 6],
            ['name' => 'Comunicaciones', 'slug' => 'communication', 'description' => 'Email, SMS y notificaciones',               'icon' => 'heroicon-o-chat-bubble-left-right', 'sort_order' => 7],
            ['name' => 'Proyectos',      'slug' => 'projects',      'description' => 'Gestión de proyectos y tareas',             'icon' => 'heroicon-o-rectangle-stack',  'sort_order' => 8],
            ['name' => 'Reportes',       'slug' => 'reports',       'description' => 'Reportes, estadísticas y exportaciones',    'icon' => 'heroicon-o-chart-bar',        'sort_order' => 9],
        ];

        foreach ($modules as $data) {
            Module::updateOrCreate(['slug' => $data['slug']], $data);
        }

        // ── Asignar módulos a cada plan ──
        //
        //  Módulo          | Gratuito | Esencial | Profesional | Enterprise
        //  ─────────────────┼──────────┼──────────┼─────────────┼───────────
        //  church           |    ✔     |    ✔     |      ✔      |     ✔
        //  members          |    ✔     |    ✔     |      ✔      |     ✔
        //  groups           |    ✔     |    ✔     |      ✔      |     ✔
        //  attendance       |    ✔     |    ✔     |      ✔      |     ✔
        //  activities       |    ✖     |    ✖     |      ✔      |     ✔
        //  finance          |    ✖     |    ✔     |      ✔      |     ✔
        //  communication    |    ✖     |    ✔     |      ✔      |     ✔
        //  projects         |    ✖     |    ✖     |      ✔      |     ✔
        //  reports          |    ✖     |    ✔     |      ✔      |     ✔

        $matrix = [
            'gratuito'     => ['church', 'members', 'groups', 'attendance'],
            'esencial'     => ['church', 'members', 'groups', 'attendance', 'finance', 'communication', 'reports'],
            'profesional'  => ['church', 'members', 'groups', 'attendance', 'activities', 'finance', 'communication', 'projects', 'reports'],
            'enterprise'   => ['church', 'members', 'groups', 'attendance', 'activities', 'finance', 'communication', 'projects', 'reports'],
        ];

        $moduleIds = Module::pluck('id', 'slug');

        foreach ($matrix as $planSlug => $moduleSlugs) {
            $plan = Plan::where('slug', $planSlug)->first();
            if (! $plan) {
                continue;
            }

            $ids = collect($moduleSlugs)
                ->map(fn (string $slug) => $moduleIds[$slug] ?? null)
                ->filter()
                ->all();

            $plan->modules()->syncWithoutDetaching($ids);
        }
    }
}
