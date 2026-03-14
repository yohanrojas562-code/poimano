<?php

namespace Database\Seeders\Central;

use App\Core\Plans\Domain\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            [
                'name' => 'Gratuito',
                'slug' => 'gratuito',
                'description' => 'Plan básico para iglesias pequeñas que están comenzando.',
                'price' => 0.00,
                'billing_cycle' => 'monthly',
                'max_members' => 50,
                'features' => [
                    'miembros' => 'Hasta 50 miembros',
                    'grupos' => 'Hasta 3 grupos',
                    'asistencia' => 'Registro de asistencia básico',
                    'reportes' => 'Reportes básicos',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Esencial',
                'slug' => 'esencial',
                'description' => 'Para iglesias en crecimiento que necesitan más herramientas.',
                'price' => 29.99,
                'billing_cycle' => 'monthly',
                'max_members' => 200,
                'features' => [
                    'miembros' => 'Hasta 200 miembros',
                    'grupos' => 'Grupos ilimitados',
                    'asistencia' => 'Registro de asistencia completo',
                    'finanzas' => 'Gestión financiera básica',
                    'comunicaciones' => 'Comunicaciones por email',
                    'reportes' => 'Reportes avanzados',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Profesional',
                'slug' => 'profesional',
                'description' => 'Todas las funcionalidades para iglesias establecidas.',
                'price' => 59.99,
                'billing_cycle' => 'monthly',
                'max_members' => 1000,
                'features' => [
                    'miembros' => 'Hasta 1,000 miembros',
                    'grupos' => 'Grupos ilimitados',
                    'asistencia' => 'Registro de asistencia completo',
                    'finanzas' => 'Gestión financiera completa',
                    'proyectos' => 'Gestión de proyectos',
                    'comunicaciones' => 'Email + SMS',
                    'reportes' => 'Reportes completos + exportación',
                    'soporte' => 'Soporte prioritario',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'slug' => 'enterprise',
                'description' => 'Solución completa para mega-iglesias y organizaciones grandes.',
                'price' => 149.99,
                'billing_cycle' => 'monthly',
                'max_members' => 10000,
                'features' => [
                    'miembros' => 'Hasta 10,000 miembros',
                    'grupos' => 'Grupos ilimitados',
                    'asistencia' => 'Registro completo + QR',
                    'finanzas' => 'Gestión financiera completa + integraciones',
                    'proyectos' => 'Gestión de proyectos avanzada',
                    'comunicaciones' => 'Email + SMS + Push',
                    'reportes' => 'Reportes completos + BI',
                    'soporte' => 'Soporte dedicado 24/7',
                    'api' => 'Acceso a API',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($plans as $plan) {
            Plan::updateOrCreate(
                ['slug' => $plan['slug']],
                $plan,
            );
        }
    }
}
