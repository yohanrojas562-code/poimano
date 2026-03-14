<?php

declare(strict_types=1);

namespace Database\Seeders\Tenant;

use App\Models\Shared\Permission;
use App\Models\Shared\Role;
use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        // ── Roles maestros (tabla central compartida) ──
        $roles = [
            ['name' => 'Pastor',        'slug' => 'pastor',        'scope' => 'tenant', 'description' => 'Líder principal de la iglesia',        'is_default' => false],
            ['name' => 'Administrador', 'slug' => 'administrador', 'scope' => 'tenant', 'description' => 'Acceso completo al sistema',           'is_default' => false],
            ['name' => 'Líder',         'slug' => 'lider',         'scope' => 'tenant', 'description' => 'Líder de grupo o ministerio',          'is_default' => false],
            ['name' => 'Tesorero',      'slug' => 'tesorero',      'scope' => 'tenant', 'description' => 'Gestión financiera',                   'is_default' => false],
            ['name' => 'Secretaria',    'slug' => 'secretaria',    'scope' => 'tenant', 'description' => 'Gestión administrativa y registros',   'is_default' => false],
            ['name' => 'Miembro',       'slug' => 'miembro',       'scope' => 'tenant', 'description' => 'Miembro regular con acceso limitado',  'is_default' => true],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(['slug' => $role['slug']], $role);
        }

        // ── Permisos por módulo (tabla central compartida) ──
        $permissions = [
            // Members
            ['name' => 'Ver miembros',       'slug' => 'members.view',   'module' => 'members',  'description' => 'Ver listado y detalle de miembros'],
            ['name' => 'Crear miembros',     'slug' => 'members.create', 'module' => 'members',  'description' => 'Registrar nuevos miembros'],
            ['name' => 'Editar miembros',    'slug' => 'members.edit',   'module' => 'members',  'description' => 'Modificar datos de miembros'],
            ['name' => 'Eliminar miembros',  'slug' => 'members.delete', 'module' => 'members',  'description' => 'Eliminar miembros del sistema'],
            ['name' => 'Exportar miembros',  'slug' => 'members.export', 'module' => 'members',  'description' => 'Exportar listados de miembros'],
            // Groups
            ['name' => 'Ver grupos',         'slug' => 'groups.view',    'module' => 'groups',   'description' => 'Ver listado de grupos'],
            ['name' => 'Crear grupos',       'slug' => 'groups.create',  'module' => 'groups',   'description' => 'Crear nuevos grupos'],
            ['name' => 'Editar grupos',      'slug' => 'groups.edit',    'module' => 'groups',   'description' => 'Modificar grupos existentes'],
            ['name' => 'Eliminar grupos',    'slug' => 'groups.delete',  'module' => 'groups',   'description' => 'Eliminar grupos'],
            // Attendance
            ['name' => 'Ver asistencia',     'slug' => 'attendance.view',   'module' => 'attendance', 'description' => 'Ver registros de asistencia'],
            ['name' => 'Registrar asistencia','slug' => 'attendance.create','module' => 'attendance', 'description' => 'Registrar asistencia'],
            // Finance
            ['name' => 'Ver finanzas',       'slug' => 'finance.view',   'module' => 'finance',  'description' => 'Ver movimientos financieros'],
            ['name' => 'Crear movimiento',   'slug' => 'finance.create', 'module' => 'finance',  'description' => 'Registrar ingresos y egresos'],
            ['name' => 'Editar finanzas',    'slug' => 'finance.edit',   'module' => 'finance',  'description' => 'Modificar registros financieros'],
            ['name' => 'Eliminar finanzas',  'slug' => 'finance.delete', 'module' => 'finance',  'description' => 'Eliminar registros financieros'],
            // Communication
            ['name' => 'Ver comunicaciones', 'slug' => 'communication.view',   'module' => 'communication', 'description' => 'Ver mensajes enviados'],
            ['name' => 'Enviar mensajes',    'slug' => 'communication.create', 'module' => 'communication', 'description' => 'Enviar emails y notificaciones'],
            // Activities
            ['name' => 'Ver actividades',    'slug' => 'activities.view',   'module' => 'activities', 'description' => 'Ver calendario de actividades'],
            ['name' => 'Crear actividades',  'slug' => 'activities.create', 'module' => 'activities', 'description' => 'Crear eventos y actividades'],
            ['name' => 'Editar actividades', 'slug' => 'activities.edit',   'module' => 'activities', 'description' => 'Modificar actividades'],
            ['name' => 'Eliminar actividades','slug' => 'activities.delete','module' => 'activities', 'description' => 'Eliminar actividades'],
            // Projects
            ['name' => 'Ver proyectos',      'slug' => 'projects.view',   'module' => 'projects', 'description' => 'Ver proyectos'],
            ['name' => 'Crear proyectos',    'slug' => 'projects.create', 'module' => 'projects', 'description' => 'Crear nuevos proyectos'],
            ['name' => 'Editar proyectos',   'slug' => 'projects.edit',   'module' => 'projects', 'description' => 'Modificar proyectos'],
            ['name' => 'Eliminar proyectos', 'slug' => 'projects.delete', 'module' => 'projects', 'description' => 'Eliminar proyectos'],
            // Reports
            ['name' => 'Ver reportes',       'slug' => 'reports.view',   'module' => 'reports',  'description' => 'Ver reportes y estadísticas'],
            ['name' => 'Exportar reportes',  'slug' => 'reports.export', 'module' => 'reports',  'description' => 'Exportar reportes en PDF/Excel'],
            // Church settings
            ['name' => 'Ver configuración',  'slug' => 'church.view',   'module' => 'church', 'description' => 'Ver configuración de la iglesia'],
            ['name' => 'Editar configuración','slug' => 'church.edit',  'module' => 'church', 'description' => 'Modificar configuración de la iglesia'],
        ];

        foreach ($permissions as $perm) {
            Permission::updateOrCreate(['slug' => $perm['slug']], $perm);
        }

        // ── Asignar permisos a roles ──
        $allPermSlugs     = collect($permissions)->pluck('slug')->all();
        $memberViewSlugs  = ['members.view', 'groups.view', 'attendance.view', 'activities.view', 'church.view'];
        $leaderSlugs      = array_merge($memberViewSlugs, ['members.create', 'members.edit', 'groups.create', 'groups.edit', 'attendance.create', 'activities.create', 'activities.edit']);
        $treasurerSlugs   = ['finance.view', 'finance.create', 'finance.edit', 'reports.view', 'reports.export', 'church.view'];
        $secretarySlugs   = ['members.view', 'members.create', 'members.edit', 'members.export', 'groups.view', 'attendance.view', 'attendance.create', 'activities.view', 'reports.view', 'reports.export', 'church.view'];

        $permIds = Permission::pluck('id', 'slug');

        $assignments = [
            'pastor'        => $allPermSlugs,
            'administrador' => $allPermSlugs,
            'lider'         => $leaderSlugs,
            'tesorero'      => $treasurerSlugs,
            'secretaria'    => $secretarySlugs,
            'miembro'       => $memberViewSlugs,
        ];

        foreach ($assignments as $roleSlug => $permSlugs) {
            $role = Role::where('slug', $roleSlug)->first();
            if (! $role) {
                continue;
            }
            $ids = collect($permSlugs)->map(fn ($s) => $permIds[$s] ?? null)->filter()->all();
            $role->permissions()->syncWithoutDetaching($ids);
        }
    }
}
