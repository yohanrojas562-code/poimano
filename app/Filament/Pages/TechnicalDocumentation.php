<?php

declare(strict_types=1);

namespace App\Filament\Pages;

use App\Core\Tenants\Domain\Models\Tenant;
use App\Core\Plans\Domain\Models\Plan;
use App\Models\Shared\Module;
use Filament\Pages\Page;

class TechnicalDocumentation extends Page
{
    protected static ?string $navigationIcon = 'heroicon-o-document-text';
    protected static ?string $navigationLabel = 'Documentación Técnica';
    protected static ?string $title = 'Documentación Técnica del Sistema';
    protected static ?string $navigationGroup = 'Sistema';
    protected static ?int $navigationSort = 20;
    protected static string $view = 'filament.pages.technical-documentation';

    protected function getViewData(): array
    {
        $modules = $this->getModules();
        $completed = collect($modules)->where('status', 'complete')->count();
        $basic = collect($modules)->where('status', 'basic')->count();
        $total = count($modules);
        $progress = round((($completed + ($basic * 0.5)) / $total) * 100);

        try {
            $tenantCount = Tenant::count();
            $activeTenants = Tenant::where('status', 'active')->count();
            $planCount = Plan::where('is_active', true)->count();
            $moduleCount = Module::where('is_active', true)->count();
        } catch (\Throwable) {
            $tenantCount = $activeTenants = $planCount = $moduleCount = 0;
        }

        return [
            'stats' => [
                'tenants' => $tenantCount,
                'active_tenants' => $activeTenants,
                'plans' => $planCount,
                'modules_db' => $moduleCount,
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
            ],
            'modules' => $modules,
            'progress' => $progress,
            'completed' => $completed + $basic,
            'total' => $total,
            'backendStack' => $this->getBackendStack(),
            'frontendStack' => $this->getFrontendStack(),
            'centralTables' => $this->getCentralTables(),
            'tenantTables' => $this->getTenantTables(),
            'iaOptions' => $this->getIaOptions(),
            'hoursBreakdown' => $this->getHoursBreakdown(),
        ];
    }

    private function getModules(): array
    {
        return [
            [
                'name' => 'Church',
                'slug' => 'church',
                'desc' => 'Configuración y datos de la iglesia',
                'status' => 'basic',
                'label' => 'Básico',
                'color' => 'amber',
                'features' => ['Modelo ChurchSetting', 'Seeder automático', 'UI de configuración', 'Logo y colores'],
            ],
            [
                'name' => 'Members',
                'slug' => 'members',
                'desc' => 'Gestión completa de miembros y familias',
                'status' => 'complete',
                'label' => 'Completo',
                'color' => 'emerald',
                'features' => ['CRUD completo (30+ campos)', 'Familias y roles familiares', 'Habilidades/dones', 'Historial de estados', 'Soft deletes + Auditoría', 'Búsqueda, filtros, paginación'],
            ],
            [
                'name' => 'Groups',
                'slug' => 'groups',
                'desc' => 'Grupos celulares con asistentes y anfitriones',
                'status' => 'complete',
                'label' => 'Completo',
                'color' => 'emerald',
                'features' => ['CRUD grupos celulares', 'Anfitrión (miembro/externo)', 'Asistentes dinámicos', 'URL Google Maps', 'Estadísticas en tiempo real', 'Auto-fill teléfono'],
            ],
            [
                'name' => 'Website',
                'slug' => 'website',
                'desc' => 'Sitio web público de cada iglesia',
                'status' => 'complete',
                'label' => 'Completo',
                'color' => 'emerald',
                'features' => ['Template Esperanza', 'Admin de secciones', 'Ministerios públicos', 'Galería de fotos', 'Redes sociales + WhatsApp', 'Editor HTML', 'Dominio propio'],
            ],
            [
                'name' => 'Ministry Areas',
                'slug' => 'ministry',
                'desc' => 'Áreas ministeriales y equipos de servicio',
                'status' => 'complete',
                'label' => 'Completo',
                'color' => 'emerald',
                'features' => ['CRUD áreas ministeriales', 'Asignación de miembros', 'Icon Picker (120+ iconos)', 'Sincronización con website'],
            ],
            [
                'name' => 'Attendance',
                'slug' => 'attendance',
                'desc' => 'Registro de asistencia a servicios y eventos',
                'status' => 'skeleton',
                'label' => 'Pendiente',
                'color' => 'gray',
                'features' => ['Estructura DDD creada'],
            ],
            [
                'name' => 'Activities',
                'slug' => 'activities',
                'desc' => 'Calendario de eventos y actividades',
                'status' => 'skeleton',
                'label' => 'Pendiente',
                'color' => 'gray',
                'features' => ['Estructura DDD creada'],
            ],
            [
                'name' => 'Finance',
                'slug' => 'finance',
                'desc' => 'Diezmos, ofrendas, gastos, presupuestos',
                'status' => 'skeleton',
                'label' => 'Pendiente',
                'color' => 'gray',
                'features' => ['Estructura DDD creada'],
            ],
            [
                'name' => 'Communication',
                'slug' => 'communication',
                'desc' => 'Envío de emails y notificaciones masivas',
                'status' => 'skeleton',
                'label' => 'Pendiente',
                'color' => 'gray',
                'features' => ['Estructura DDD creada'],
            ],
            [
                'name' => 'Projects',
                'slug' => 'projects',
                'desc' => 'Gestión de proyectos de la iglesia',
                'status' => 'skeleton',
                'label' => 'Pendiente',
                'color' => 'gray',
                'features' => ['Estructura DDD creada'],
            ],
            [
                'name' => 'Reports',
                'slug' => 'reports',
                'desc' => 'Reportes y estadísticas exportables',
                'status' => 'skeleton',
                'label' => 'Pendiente',
                'color' => 'gray',
                'features' => ['Estructura DDD creada'],
            ],
        ];
    }

    private function getBackendStack(): array
    {
        return [
            ['name' => 'PHP', 'version' => '8.3', 'role' => 'Lenguaje backend'],
            ['name' => 'Laravel', 'version' => '11.48', 'role' => 'Framework MVC principal'],
            ['name' => 'PostgreSQL', 'version' => '16', 'role' => 'Motor de base de datos'],
            ['name' => 'stancl/tenancy', 'version' => '3.9', 'role' => 'Multi-tenancy DB-per-tenant'],
            ['name' => 'Filament', 'version' => '3.3', 'role' => 'Panel super admin'],
            ['name' => 'Inertia.js', 'version' => '2.0', 'role' => 'Bridge backend↔frontend'],
            ['name' => 'Spatie Activity Log', 'version' => '4.12', 'role' => 'Auditoría automática'],
            ['name' => 'Redis (predis)', 'version' => '3.4', 'role' => 'Cache, sesiones, colas'],
        ];
    }

    private function getFrontendStack(): array
    {
        return [
            ['name' => 'React', 'version' => '19.2', 'role' => 'UI library (tenant)'],
            ['name' => 'TypeScript', 'version' => '5.9', 'role' => 'Tipado estático'],
            ['name' => 'shadcn/ui', 'version' => '—', 'role' => 'Componentes UI (Radix)'],
            ['name' => 'Tailwind CSS', 'version' => '3.4', 'role' => 'Framework CSS'],
            ['name' => 'Lucide React', 'version' => '0.577', 'role' => 'Sistema de iconos'],
            ['name' => 'Recharts', 'version' => '3.8', 'role' => 'Gráficos y charts'],
            ['name' => 'Vite', 'version' => '6.0', 'role' => 'Build tool + HMR'],
        ];
    }

    private function getCentralTables(): array
    {
        return [
            ['name' => 'tenants', 'desc' => 'Registro de iglesias', 'rows' => 'church_name, slug, plan_id, status, pastor_name, email'],
            ['name' => 'domains', 'desc' => 'Subdominios de tenants', 'rows' => 'domain, tenant_id'],
            ['name' => 'users', 'desc' => 'Super admins', 'rows' => 'name, email, password, is_admin, role'],
            ['name' => 'plans', 'desc' => 'Planes de suscripción', 'rows' => 'name, slug, price, billing_cycle, max_members'],
            ['name' => 'modules', 'desc' => 'Módulos del sistema', 'rows' => 'name, slug, is_active, sort_order'],
            ['name' => 'plan_modules', 'desc' => 'Relación plan↔módulo', 'rows' => 'plan_id, module_id'],
            ['name' => 'roles', 'desc' => 'Roles RBAC', 'rows' => 'name, slug, scope, description'],
            ['name' => 'permissions', 'desc' => 'Permisos granulares', 'rows' => 'name, slug, module'],
            ['name' => 'countries', 'desc' => 'Catálogo de países', 'rows' => 'name, code, phone_code, currency'],
            ['name' => 'settings', 'desc' => 'Config clave-valor', 'rows' => 'key, value (cached Redis 1h)'],
        ];
    }

    private function getTenantTables(): array
    {
        return [
            ['name' => 'users', 'desc' => 'Usuarios locales', 'rows' => 'name, email, password, role, is_active, avatar'],
            ['name' => 'church_settings', 'desc' => 'Config de la iglesia', 'rows' => 'church_name, logo, colors, timezone, currency'],
            ['name' => 'members', 'desc' => 'Miembros (~30 cols)', 'rows' => 'personal, contacto, espiritual, familia, estado'],
            ['name' => 'families', 'desc' => 'Familias/hogares', 'rows' => 'name, address, phone, wedding_date'],
            ['name' => 'member_skills', 'desc' => 'Habilidades/dones', 'rows' => 'member_id, skill'],
            ['name' => 'member_history', 'desc' => 'Historial de estados', 'rows' => 'from_status, to_status, reason, changed_by'],
            ['name' => 'cell_groups', 'desc' => 'Grupos celulares', 'rows' => 'name, address, map_url, host_type, opening_date'],
            ['name' => 'cell_group_attendees', 'desc' => 'Asistentes de grupos', 'rows' => 'type, member_id, name, phone'],
            ['name' => 'ministry_areas', 'desc' => 'Áreas ministeriales', 'rows' => 'name, description, icon, is_active'],
            ['name' => 'website_settings', 'desc' => 'Config sitio web', 'rows' => 'template, sections, coming_soon'],
            ['name' => 'website_ministries', 'desc' => 'Ministerios públicos', 'rows' => 'name, description, image, gallery'],
            ['name' => 'website_social_networks', 'desc' => 'Redes sociales', 'rows' => 'platform, url, is_active'],
            ['name' => 'user_roles', 'desc' => 'Roles de usuarios', 'rows' => 'user_id, role_id'],
            ['name' => 'activity_log', 'desc' => 'Auditoría (Spatie)', 'rows' => 'subject, causer, properties, event'],
        ];
    }

    private function getIaOptions(): array
    {
        return [
            [
                'icon' => '💬',
                'name' => 'System Prompt Personalizado',
                'desc' => 'Cada iglesia configura el tono, doctrina y personalidad del asistente. Se inyecta como system prompt en cada llamada a la API.',
                'cost' => '$0 adicional',
                'hours' => '20',
            ],
            [
                'icon' => '🧠',
                'name' => 'RAG con pgvector',
                'desc' => 'Retrieval-Augmented Generation usando la extensión pgvector del PostgreSQL existente. Permite al asistente responder con base en documentos, sermones y estudios bíblicos de la iglesia.',
                'cost' => '$0 infra (pgvector incluido)',
                'hours' => '40',
            ],
            [
                'icon' => '⛪',
                'name' => 'Contexto de la Iglesia',
                'desc' => 'Inyectar datos estructurados del tenant (miembros, grupos, ministerios, actividades) como contexto en cada consulta. El asistente conoce la iglesia en tiempo real.',
                'cost' => '$0 (datos locales)',
                'hours' => '30',
            ],
            [
                'icon' => '📝',
                'name' => 'Historial de Conversación',
                'desc' => 'Almacenar mensajes anteriores por usuario para mantener continuidad en las conversaciones con el asistente pastoral IA.',
                'cost' => '~1 tabla por tenant',
                'hours' => '15',
            ],
        ];
    }

    private function getHoursBreakdown(): array
    {
        return [
            ['name' => 'Arquitectura Multi-tenant', 'hours' => 90],
            ['name' => 'Panel Super Admin (Filament)', 'hours' => 80],
            ['name' => 'Módulo Miembros', 'hours' => 85],
            ['name' => 'Módulo Website', 'hours' => 80],
            ['name' => 'Módulo Grupos Celulares', 'hours' => 55],
            ['name' => 'Módulo Ministerios', 'hours' => 40],
            ['name' => 'RBAC & Permisos', 'hours' => 45],
            ['name' => 'Frontend React/TS', 'hours' => 70],
            ['name' => 'Infraestructura & DevOps', 'hours' => 48],
            ['name' => 'DDD Módulos Skeleton', 'hours' => 35],
            ['name' => 'Testing & Debug', 'hours' => 55],
            ['name' => 'Documentación', 'hours' => 25],
            ['name' => 'UI/UX & Design System', 'hours' => 30],
        ];
    }
}
