<x-filament-panels::page>
    {{-- Custom styles scoped to this page --}}
    <style>
        .td-page { max-width: 1200px; margin: 0 auto; }
        .td-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
        .td-card-header { padding: 16px 20px; border-bottom: 1px solid #e2e8f0; }
        .td-card-body { padding: 20px; }
        .td-section-title { font-size: 15px; font-weight: 700; color: #1e293b; margin: 0; display: flex; align-items: center; gap: 8px; }
        .td-section-desc { font-size: 12px; color: #94a3b8; margin-top: 2px; }
        .td-stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (min-width: 768px) { .td-stat-grid { grid-template-columns: repeat(6, 1fr); } }
        .td-stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; text-align: center; }
        .td-stat-value { font-size: 24px; font-weight: 800; color: #00105E; line-height: 1.2; }
        .td-stat-label { font-size: 11px; color: #94a3b8; font-weight: 500; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .td-progress-bar { height: 10px; background: #f1f5f9; border-radius: 999px; overflow: hidden; margin-top: 12px; }
        .td-progress-fill { height: 100%; background: linear-gradient(90deg, #00105E, #00E1FF); border-radius: 999px; transition: width 0.6s ease; }
        .td-module-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 640px) { .td-module-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .td-module-grid { grid-template-columns: repeat(3, 1fr); } }
        .td-module { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; background: #fff; }
        .td-module-complete { border-left: 4px solid #10b981; }
        .td-module-basic { border-left: 4px solid #f59e0b; }
        .td-module-skeleton { border-left: 4px solid #cbd5e1; }
        .td-module-name { font-size: 14px; font-weight: 700; color: #1e293b; }
        .td-module-desc { font-size: 12px; color: #64748b; margin-top: 4px; line-height: 1.4; }
        .td-badge { display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 999px; }
        .td-badge-complete { background: #d1fae5; color: #065f46; }
        .td-badge-basic { background: #fef3c7; color: #92400e; }
        .td-badge-skeleton { background: #f1f5f9; color: #64748b; }
        .td-feature-tag { display: inline-block; font-size: 11px; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 2px 8px; margin: 2px 2px 2px 0; line-height: 1.5; }
        .td-two-col { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 1024px) { .td-two-col { grid-template-columns: 1fr 1fr; } }
        .td-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .td-table th { text-align: left; padding: 10px 14px; background: #f8fafc; color: #64748b; font-weight: 600; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
        .td-table td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; color: #334155; }
        .td-table td:first-child { font-weight: 600; color: #1e293b; }
        .td-version-badge { display: inline-block; background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 6px; }
        .td-version-badge-cyan { background: #ecfeff; color: #0e7490; }
        .td-db-item { display: flex; align-items: flex-start; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .td-db-item:last-child { border-bottom: none; }
        .td-db-dot { width: 8px; height: 8px; border-radius: 999px; margin-top: 5px; flex-shrink: 0; }
        .td-db-name { font-size: 13px; font-weight: 600; color: #1e293b; }
        .td-db-desc { font-size: 12px; color: #64748b; margin-top: 2px; line-height: 1.4; }
        .td-db-cols { font-size: 11px; color: #94a3b8; margin-top: 2px; }
        .td-kv-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 6px; }
        .td-kv-key { font-size: 12px; color: #64748b; }
        .td-kv-val { font-size: 12px; font-weight: 600; color: #1e293b; }
        .td-step { display: flex; align-items: flex-start; gap: 12px; padding: 12px; border-radius: 8px; margin-bottom: 8px; }
        .td-step-num { width: 28px; height: 28px; border-radius: 999px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
        .td-step-title { font-size: 13px; font-weight: 600; }
        .td-step-desc { font-size: 11px; margin-top: 2px; }
        .td-code-block { background: #1e293b; border-radius: 8px; padding: 14px 16px; margin-top: 12px; overflow-x: auto; }
        .td-code-block code { font-size: 12px; color: #4ade80; font-family: 'Fira Code', 'Cascadia Code', monospace; line-height: 1.6; white-space: pre-wrap; word-break: break-all; }
        .td-flow-box { text-align: center; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; }
        .td-flow-arrow { text-align: center; color: #cbd5e1; font-size: 20px; line-height: 1; padding: 4px 0; }
        .td-flow-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .td-flow-app { background: #fff1f2; border: 1px solid #fecdd3; border-radius: 10px; padding: 14px; }
        .td-flow-app-title { font-size: 14px; font-weight: 700; color: #be123c; text-align: center; margin-bottom: 10px; }
        .td-flow-app-item { background: #fff; border: 1px solid #fecdd3; border-radius: 6px; padding: 8px; text-align: center; }
        .td-flow-app-name { font-size: 12px; font-weight: 600; color: #334155; }
        .td-flow-app-url { font-size: 11px; color: #94a3b8; }
        .td-lifecycle-step { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 8px; }
        .td-lifecycle-num { width: 26px; height: 26px; border-radius: 999px; background: #00105E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
        .td-lifecycle-num-accent { background: #00E1FF; color: #00105E; }
        .td-lifecycle-title { font-size: 13px; font-weight: 600; color: #1e293b; }
        .td-lifecycle-desc { font-size: 12px; color: #64748b; margin-top: 2px; }
        .td-rbac-table { width: 100%; border-collapse: collapse; }
        .td-rbac-table th { text-align: left; padding: 8px 12px; background: #f8fafc; font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #e2e8f0; }
        .td-rbac-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 12px; }
        .td-rbac-table td:first-child { font-weight: 600; color: #1e293b; }
        .td-rbac-table td:last-child { color: #64748b; }
        .td-plan-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .td-plan { border-radius: 8px; padding: 12px; text-align: center; }
        .td-plan-name { font-size: 12px; font-weight: 700; }
        .td-plan-price { font-size: 11px; margin-top: 2px; }
        .td-plan-mods { font-size: 11px; margin-top: 4px; opacity: 0.8; }
        .td-sub-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 12px; display: block; }
        .td-ia-option { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; background: #fff; border-left: 4px solid #8b5cf6; }
        .td-ia-option-title { font-size: 14px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px; }
        .td-ia-option-desc { font-size: 12px; color: #64748b; margin-top: 6px; line-height: 1.5; }
        .td-ia-option-cost { font-size: 11px; color: #8b5cf6; margin-top: 8px; padding: 6px 10px; background: #f5f3ff; border-radius: 6px; line-height: 1.4; }
        .td-val-card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; background: #fff; text-align: center; }
        .td-val-amount { font-size: 20px; font-weight: 800; color: #00105E; line-height: 1.2; }
        .td-val-label { font-size: 11px; color: #94a3b8; margin-top: 4px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; }
        .td-val-desc { font-size: 12px; color: #64748b; margin-top: 4px; }
        .td-val-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (min-width: 768px) { .td-val-grid { grid-template-columns: repeat(4, 1fr); } }
        .td-hours-bar { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 6px; }
        .td-hours-name { font-size: 12px; color: #1e293b; font-weight: 600; flex: 1; }
        .td-hours-val { font-size: 12px; color: #64748b; font-weight: 600; white-space: nowrap; }
        .td-hours-fill-bg { flex: 2; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden; }
        .td-hours-fill { height: 100%; background: linear-gradient(90deg, #00105E, #00E1FF); border-radius: 999px; }
        .td-proj-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1px solid #f1f5f9; }
        .td-proj-row:last-child { border-bottom: none; }
        .td-proj-label { font-size: 13px; color: #64748b; }
        .td-proj-val { font-size: 13px; font-weight: 700; color: #1e293b; }
        .td-proj-val-green { color: #10b981; }
        .td-proj-val-blue { color: #3b82f6; }
    </style>

    <div class="td-page" style="display: flex; flex-direction: column; gap: 20px;">

        {{-- ═══════════════════════════════════════ --}}
        {{-- HEADER BANNER --}}
        {{-- ═══════════════════════════════════════ --}}
        <div style="background: linear-gradient(135deg, #00105E 0%, #001a8a 100%); border-radius: 12px; padding: 28px 24px; color: #fff; position: relative; overflow: hidden;">
            <div style="position: absolute; right: -40px; top: -40px; width: 160px; height: 160px; border-radius: 999px; background: rgba(0,225,255,0.08);"></div>
            <div style="position: relative; z-index: 1;">
                <div style="font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">Poimano</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.7); margin-top: 4px;">Documentación Técnica del Sistema &mdash; SaaS Multi-Tenant para Gestión de Iglesias</div>
                <div style="margin-top: 14px; display: flex; flex-wrap: wrap; gap: 8px;">
                    <span style="background: rgba(0,225,255,0.2); color: #00E1FF; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px;">v1.0.0-alpha</span>
                    <span style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 11px; padding: 4px 12px; border-radius: 999px;">Actualizado: {{ now()->format('d/m/Y') }}</span>
                    <span style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 11px; padding: 4px 12px; border-radius: 999px;">DDD Lite + MVC + Modular Monolith</span>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- ESTADÍSTICAS --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-stat-grid">
            <div class="td-stat">
                <div class="td-stat-value">{{ $stats['tenants'] }}</div>
                <div class="td-stat-label">Iglesias</div>
            </div>
            <div class="td-stat">
                <div class="td-stat-value" style="color: #10b981;">{{ $stats['active_tenants'] }}</div>
                <div class="td-stat-label">Activas</div>
            </div>
            <div class="td-stat">
                <div class="td-stat-value" style="color: #7c3aed;">{{ $stats['plans'] }}</div>
                <div class="td-stat-label">Planes</div>
            </div>
            <div class="td-stat">
                <div class="td-stat-value" style="color: #f59e0b;">{{ $stats['modules_db'] }}</div>
                <div class="td-stat-label">Módulos</div>
            </div>
            <div class="td-stat">
                <div class="td-stat-value" style="color: #6366f1;">{{ $stats['php_version'] }}</div>
                <div class="td-stat-label">PHP</div>
            </div>
            <div class="td-stat">
                <div class="td-stat-value" style="color: #ef4444; font-size: 18px;">{{ $stats['laravel_version'] }}</div>
                <div class="td-stat-label">Laravel</div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- PROGRESO --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-card">
            <div style="padding: 16px 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 14px; font-weight: 700; color: #1e293b;">Progreso del Desarrollo</div>
                        <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">{{ $completed }} de {{ $total }} módulos implementados</div>
                    </div>
                    <div style="font-size: 28px; font-weight: 800; color: #00105E;">{{ $progress }}%</div>
                </div>
                <div class="td-progress-bar">
                    <div class="td-progress-fill" style="width: {{ $progress }}%;"></div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- ARQUITECTURA --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-card">
            <div class="td-card-header">
                <div class="td-section-title">
                    <svg style="width:18px;height:18px;color:#00E1FF;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"/></svg>
                    Arquitectura del Sistema
                </div>
                <div class="td-section-desc">DDD Lite + MVC + Modular Monolith &middot; Database-per-Tenant</div>
            </div>
            <div class="td-card-body">
                <div class="td-two-col">
                    {{-- Flujo de petición --}}
                    <div>
                        <span class="td-sub-label">Flujo de Petición</span>

                        <div class="td-flow-box" style="background: #f8fafc; border: 2px dashed #cbd5e1; color: #64748b;">
                            Cliente (Browser)
                        </div>
                        <div class="td-flow-arrow">&darr;</div>

                        <div class="td-flow-grid">
                            <div class="td-flow-box" style="background: #fff7ed; border: 1px solid #fed7aa; color: #c2410c;">Cloudflare DNS+SSL</div>
                            <div class="td-flow-box" style="background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d;">Nginx Reverse Proxy</div>
                        </div>
                        <div class="td-flow-arrow">&darr;</div>

                        <div class="td-flow-app">
                            <div class="td-flow-app-title">Laravel 11 Application</div>
                            <div class="td-flow-grid" style="margin-bottom: 8px;">
                                <div class="td-flow-app-item">
                                    <div class="td-flow-app-name">Filament 3.3</div>
                                    <div class="td-flow-app-url">poimano.com/admin</div>
                                </div>
                                <div class="td-flow-app-item">
                                    <div class="td-flow-app-name">React 19 + Inertia</div>
                                    <div class="td-flow-app-url">{slug}.poimano.com</div>
                                </div>
                            </div>
                            <div class="td-flow-grid">
                                <div class="td-flow-app-item">
                                    <div class="td-flow-app-name">stancl/tenancy 3.9</div>
                                    <div class="td-flow-app-url">DB-per-tenant</div>
                                </div>
                                <div class="td-flow-app-item">
                                    <div class="td-flow-app-name">Middleware Stack</div>
                                    <div class="td-flow-app-url">SubdomainID + ModuleAccess</div>
                                </div>
                            </div>
                        </div>
                        <div class="td-flow-arrow">&darr;</div>

                        <div class="td-flow-grid">
                            <div class="td-flow-box" style="background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8;">
                                PostgreSQL 16
                                <div style="font-size: 11px; color: #3b82f6; margin-top: 4px;">poimano_central<br>tenant_lasalle<br>tenant_envigado</div>
                            </div>
                            <div class="td-flow-box" style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626;">
                                Redis
                                <div style="font-size: 11px; color: #ef4444; margin-top: 4px;">Cache prefixed<br>Sessions<br>Queue jobs</div>
                            </div>
                        </div>
                    </div>

                    {{-- Multi-tenancy + RBAC --}}
                    <div>
                        <span class="td-sub-label">Multi-Tenancy &mdash; Ciclo de Vida</span>

                        <div class="td-lifecycle-step">
                            <div class="td-lifecycle-num">1</div>
                            <div>
                                <div class="td-lifecycle-title">Crear Iglesia (Filament)</div>
                                <div class="td-lifecycle-desc">Super admin llena formulario: nombre, plan, pastor, credenciales</div>
                            </div>
                        </div>
                        <div class="td-lifecycle-step">
                            <div class="td-lifecycle-num">2</div>
                            <div>
                                <div class="td-lifecycle-title">Evento TenancyCreated</div>
                                <div class="td-lifecycle-desc">CREATE DATABASE tenant_{slug} &rarr; auto-migrate &rarr; seed (roles, settings, admin)</div>
                            </div>
                        </div>
                        <div class="td-lifecycle-step">
                            <div class="td-lifecycle-num">3</div>
                            <div>
                                <div class="td-lifecycle-title">Dominio + Usuario Admin</div>
                                <div class="td-lifecycle-desc">Crea subdominio {slug}.poimano.com + usuario admin con password del formulario</div>
                            </div>
                        </div>
                        <div class="td-lifecycle-step">
                            <div class="td-lifecycle-num td-lifecycle-num-accent">4</div>
                            <div>
                                <div class="td-lifecycle-title">Acceso del Tenant</div>
                                <div class="td-lifecycle-desc">Request &rarr; SubdomainID &rarr; InitializeTenancy &rarr; Switch DB &rarr; Middleware Auth</div>
                            </div>
                        </div>

                        <div style="margin-top: 20px;">
                            <span class="td-sub-label">Autenticación &amp; RBAC</span>
                            <table class="td-rbac-table">
                                <thead>
                                    <tr><th>Rol</th><th>Alcance / Módulos</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Pastor</td><td>Acceso total a todos los módulos</td></tr>
                                    <tr><td>Administrador</td><td>Acceso total a todos los módulos</td></tr>
                                    <tr><td>Líder</td><td>Members, Groups, Attendance, Activities</td></tr>
                                    <tr><td>Tesorero</td><td>Finance, Reports</td></tr>
                                    <tr><td>Secretaria</td><td>Members, Groups, Reports</td></tr>
                                    <tr><td>Miembro</td><td>Solo lectura (perfil propio)</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <div style="margin-top: 20px;">
                            <span class="td-sub-label">Planes de Suscripción</span>
                            <div class="td-plan-grid">
                                <div class="td-plan" style="background: #f8fafc;">
                                    <div class="td-plan-name" style="color: #64748b;">Gratuito</div>
                                    <div class="td-plan-price" style="color: #94a3b8;">$0/mes &middot; 50 miembros</div>
                                    <div class="td-plan-mods" style="color: #94a3b8;">Church, Members, Groups, Attendance</div>
                                </div>
                                <div class="td-plan" style="background: #eff6ff;">
                                    <div class="td-plan-name" style="color: #1d4ed8;">Esencial</div>
                                    <div class="td-plan-price" style="color: #3b82f6;">$29.99/mes &middot; 200 miembros</div>
                                    <div class="td-plan-mods" style="color: #60a5fa;">+ Finance, Comms, Reports</div>
                                </div>
                                <div class="td-plan" style="background: #f5f3ff;">
                                    <div class="td-plan-name" style="color: #7c3aed;">Profesional</div>
                                    <div class="td-plan-price" style="color: #8b5cf6;">$59.99/mes &middot; 1,000 miembros</div>
                                    <div class="td-plan-mods" style="color: #a78bfa;">+ Activities, Projects</div>
                                </div>
                                <div class="td-plan" style="background: #fffbeb;">
                                    <div class="td-plan-name" style="color: #d97706;">Enterprise</div>
                                    <div class="td-plan-price" style="color: #f59e0b;">$149.99/mes &middot; 10,000 miembros</div>
                                    <div class="td-plan-mods" style="color: #fbbf24;">Todos los módulos</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- MÓDULOS --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-card">
            <div class="td-card-header">
                <div class="td-section-title">
                    <svg style="width:18px;height:18px;color:#00E1FF;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"/></svg>
                    Estado de los Módulos
                </div>
                <div class="td-section-desc">Cada módulo representa una funcionalidad del sistema. Los módulos completados están en producción.</div>
            </div>
            <div class="td-card-body">
                <div class="td-module-grid">
                    @foreach ($modules as $module)
                        <div class="td-module td-module-{{ $module['status'] === 'complete' ? 'complete' : ($module['status'] === 'basic' ? 'basic' : 'skeleton') }}">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                                <div class="td-module-name">{{ $module['name'] }}</div>
                                <span class="td-badge td-badge-{{ $module['status'] === 'complete' ? 'complete' : ($module['status'] === 'basic' ? 'basic' : 'skeleton') }}">
                                    {{ $module['label'] }}
                                </span>
                            </div>
                            <div class="td-module-desc">{{ $module['desc'] }}</div>
                            <div style="margin-top: 10px;">
                                @foreach ($module['features'] as $feature)
                                    <span class="td-feature-tag">{{ $feature }}</span>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- TECH STACK --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-two-col">
            <div class="td-card">
                <div class="td-card-header">
                    <div class="td-section-title">
                        <svg style="width:18px;height:18px;color:#00E1FF;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"/></svg>
                        Stack Backend
                    </div>
                </div>
                <table class="td-table">
                    <thead>
                        <tr><th>Tecnología</th><th>Versión</th><th>Función</th></tr>
                    </thead>
                    <tbody>
                        @foreach ($backendStack as $tech)
                            <tr>
                                <td>{{ $tech['name'] }}</td>
                                <td><span class="td-version-badge">{{ $tech['version'] }}</span></td>
                                <td>{{ $tech['role'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="td-card">
                <div class="td-card-header">
                    <div class="td-section-title">
                        <svg style="width:18px;height:18px;color:#00E1FF;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"/></svg>
                        Stack Frontend
                    </div>
                </div>
                <table class="td-table">
                    <thead>
                        <tr><th>Tecnología</th><th>Versión</th><th>Función</th></tr>
                    </thead>
                    <tbody>
                        @foreach ($frontendStack as $tech)
                            <tr>
                                <td>{{ $tech['name'] }}</td>
                                <td><span class="td-version-badge td-version-badge-cyan">{{ $tech['version'] }}</span></td>
                                <td>{{ $tech['role'] }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- BASE DE DATOS --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-two-col">
            <div class="td-card">
                <div class="td-card-header">
                    <div class="td-section-title">
                        <svg style="width:18px;height:18px;color:#3b82f6;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/></svg>
                        BD Central
                    </div>
                    <div class="td-section-desc">poimano_central &mdash; Datos compartidos de la plataforma</div>
                </div>
                <div class="td-card-body">
                    @foreach ($centralTables as $table)
                        <div class="td-db-item">
                            <div class="td-db-dot" style="background: #3b82f6;"></div>
                            <div>
                                <div class="td-db-name">{{ $table['name'] }}</div>
                                <div class="td-db-desc">{{ $table['desc'] }}</div>
                                <div class="td-db-cols">{{ $table['rows'] }}</div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            <div class="td-card">
                <div class="td-card-header">
                    <div class="td-section-title">
                        <svg style="width:18px;height:18px;color:#10b981;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/></svg>
                        BD Tenant
                    </div>
                    <div class="td-section-desc">tenant_{slug} &mdash; Datos aislados por iglesia ({{ $stats['tenants'] }} bases de datos)</div>
                </div>
                <div class="td-card-body">
                    @foreach ($tenantTables as $table)
                        <div class="td-db-item">
                            <div class="td-db-dot" style="background: #10b981;"></div>
                            <div>
                                <div class="td-db-name">{{ $table['name'] }}</div>
                                <div class="td-db-desc">{{ $table['desc'] }}</div>
                                <div class="td-db-cols">{{ $table['rows'] }}</div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- INFRAESTRUCTURA & DEPLOY --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-card">
            <div class="td-card-header">
                <div class="td-section-title">
                    <svg style="width:18px;height:18px;color:#00E1FF;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"/></svg>
                    Infraestructura &amp; Deploy
                </div>
                <div class="td-section-desc">Configuración del servidor de producción y proceso de despliegue</div>
            </div>
            <div class="td-card-body">
                <div class="td-two-col">
                    {{-- Server --}}
                    <div>
                        <span class="td-sub-label">Servidor de Producción</span>
                        <div class="td-kv-row"><span class="td-kv-key">Proveedor</span><span class="td-kv-val">Hostinger VPS</span></div>
                        <div class="td-kv-row"><span class="td-kv-key">Sistema Operativo</span><span class="td-kv-val">Ubuntu 24.04 LTS</span></div>
                        <div class="td-kv-row"><span class="td-kv-key">Web Server</span><span class="td-kv-val">Nginx + PHP-FPM 8.3</span></div>
                        <div class="td-kv-row"><span class="td-kv-key">Dominio</span><span class="td-kv-val">poimano.com (Cloudflare)</span></div>
                        <div class="td-kv-row"><span class="td-kv-key">SSL</span><span class="td-kv-val">Wildcard *.poimano.com</span></div>
                        <div class="td-kv-row"><span class="td-kv-key">Ruta del proyecto</span><span class="td-kv-val">/var/www/poimano</span></div>
                        <div class="td-kv-row"><span class="td-kv-key">Repositorio</span><span class="td-kv-val">GitHub (main branch)</span></div>
                    </div>

                    {{-- Deploy --}}
                    <div>
                        <span class="td-sub-label">Flujo de Deploy</span>

                        <div class="td-step" style="background: #eff6ff; border: 1px solid #bfdbfe;">
                            <div class="td-step-num" style="background: #2563eb;">1</div>
                            <div>
                                <div class="td-step-title" style="color: #1e40af;">git push origin main</div>
                                <div class="td-step-desc" style="color: #3b82f6;">Push del código local al repositorio en GitHub</div>
                            </div>
                        </div>
                        <div class="td-step" style="background: #fffbeb; border: 1px solid #fde68a;">
                            <div class="td-step-num" style="background: #d97706;">2</div>
                            <div>
                                <div class="td-step-title" style="color: #92400e;">SSH &rarr; git pull origin main</div>
                                <div class="td-step-desc" style="color: #d97706;">Conectar al VPS y descargar cambios</div>
                            </div>
                        </div>
                        <div class="td-step" style="background: #f0fdf4; border: 1px solid #bbf7d0;">
                            <div class="td-step-num" style="background: #16a34a;">3</div>
                            <div>
                                <div class="td-step-title" style="color: #166534;">npm run build</div>
                                <div class="td-step-desc" style="color: #16a34a;">Compilar assets de Vite + React + TypeScript</div>
                            </div>
                        </div>
                        <div class="td-step" style="background: #f5f3ff; border: 1px solid #ddd6fe;">
                            <div class="td-step-num" style="background: #7c3aed;">4</div>
                            <div>
                                <div class="td-step-title" style="color: #5b21b6;">php artisan optimize</div>
                                <div class="td-step-desc" style="color: #7c3aed;">Cache de config, rutas y vistas para producción</div>
                            </div>
                        </div>

                        <span class="td-sub-label" style="margin-top: 16px;">Comando Completo</span>
                        <div class="td-code-block">
                            <code>cd /var/www/poimano && git pull origin main && npm run build && php artisan optimize:clear && php artisan optimize</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- INTEGRACIÓN IA — OPCIONES PENDIENTES --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-card">
            <div class="td-card-header" style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%);">
                <div class="td-section-title">
                    <svg style="width:18px;height:18px;color:#8b5cf6;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/></svg>
                    Integración IA &mdash; Opciones de Implementación
                </div>
                <div class="td-section-desc">Funcionalidades de inteligencia artificial pendientes de desarrollo &middot; Diferenciador clave vs competencia</div>
            </div>
            <div class="td-card-body">
                <div class="td-module-grid">
                    @foreach ($iaOptions as $option)
                        <div class="td-ia-option">
                            <div class="td-ia-option-title">
                                <span style="font-size: 18px;">{{ $option['icon'] }}</span>
                                {{ $option['name'] }}
                            </div>
                            <div class="td-ia-option-desc">{{ $option['desc'] }}</div>
                            <div class="td-ia-option-cost">{{ $option['cost'] }}</div>
                            <div style="margin-top: 8px;">
                                <span class="td-badge td-badge-skeleton">{{ $option['hours'] }}h estimadas</span>
                                <span class="td-badge" style="background: #f5f3ff; color: #7c3aed;">Pendiente</span>
                            </div>
                        </div>
                    @endforeach
                </div>

                <div style="margin-top: 16px; padding: 14px 16px; background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px;">
                    <div style="font-size: 13px; font-weight: 700; color: #92400e;">Recomendación</div>
                    <div style="font-size: 12px; color: #a16207; margin-top: 4px; line-height: 1.5;">
                        Iniciar con <strong>Gemini 2.0 Flash</strong> (1,500 requests/d&iacute;a gratis). Usar <strong>pgvector</strong> en el PostgreSQL existente para RAG. Construir un <strong>AiService</strong> agn&oacute;stico en Laravel que permita cambiar de proveedor (Gemini &harr; GPT) sin modificar la l&oacute;gica de negocio.
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════ --}}
        {{-- VALORACIÓN DEL PROYECTO --}}
        {{-- ═══════════════════════════════════════ --}}
        <div class="td-card">
            <div class="td-card-header" style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);">
                <div class="td-section-title">
                    <svg style="width:18px;height:18px;color:#10b981;" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    Valoraci&oacute;n del Proyecto
                </div>
                <div class="td-section-desc">Estimaci&oacute;n financiera basada en horas invertidas, tarifas del mercado colombiano y proyecci&oacute;n SaaS</div>
            </div>
            <div class="td-card-body">
                {{-- Resumen de valoración --}}
                <div class="td-val-grid">
                    <div class="td-val-card">
                        <div class="td-val-amount">738h</div>
                        <div class="td-val-label">Horas Invertidas</div>
                    </div>
                    <div class="td-val-card">
                        <div class="td-val-amount">$52.3M</div>
                        <div class="td-val-label">Costo Desarrollo (COP)</div>
                        <div class="td-val-desc">Tarifa promedio $70,500/h</div>
                    </div>
                    <div class="td-val-card">
                        <div class="td-val-amount" style="color: #10b981;">$85M-100M</div>
                        <div class="td-val-label">Valoraci&oacute;n Activo (COP)</div>
                        <div class="td-val-desc">Pre-revenue, 45% completo</div>
                    </div>
                    <div class="td-val-card">
                        <div class="td-val-amount" style="color: #7c3aed;">99%+</div>
                        <div class="td-val-label">Margen Bruto SaaS</div>
                        <div class="td-val-desc">Costo marginal ~$0/tenant</div>
                    </div>
                </div>

                <div class="td-two-col" style="margin-top: 20px;">
                    {{-- Horas por área --}}
                    <div>
                        <span class="td-sub-label">Horas de Trabajo por &Aacute;rea</span>
                        @foreach ($hoursBreakdown as $area)
                            <div class="td-hours-bar">
                                <span class="td-hours-name">{{ $area['name'] }}</span>
                                <div class="td-hours-fill-bg">
                                    <div class="td-hours-fill" style="width: {{ round($area['hours'] / 90 * 100) }}%;"></div>
                                </div>
                                <span class="td-hours-val">{{ $area['hours'] }}h</span>
                            </div>
                        @endforeach
                        <div style="margin-top: 8px; padding: 10px 12px; background: #f0f9ff; border-radius: 8px; display: flex; justify-content: space-between;">
                            <span style="font-size: 12px; font-weight: 700; color: #1e293b;">Total</span>
                            <span style="font-size: 12px; font-weight: 800; color: #00105E;">738 horas</span>
                        </div>
                    </div>

                    {{-- Proyección financiera --}}
                    <div>
                        <span class="td-sub-label">Proyecci&oacute;n Primer A&ntilde;o</span>
                        <div style="border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
                            <div class="td-proj-row" style="background: #f8fafc;">
                                <span class="td-proj-label">Clientes pago (mes 12)</span>
                                <span class="td-proj-val">121</span>
                            </div>
                            <div class="td-proj-row">
                                <span class="td-proj-label">Precio promedio/mes</span>
                                <span class="td-proj-val">$49.49 USD</span>
                            </div>
                            <div class="td-proj-row" style="background: #f8fafc;">
                                <span class="td-proj-label">MRR mes 12</span>
                                <span class="td-proj-val td-proj-val-green">$5,989 USD</span>
                            </div>
                            <div class="td-proj-row">
                                <span class="td-proj-label">ARR proyectado</span>
                                <span class="td-proj-val td-proj-val-green">$71,868 USD</span>
                            </div>
                            <div class="td-proj-row" style="background: #f8fafc;">
                                <span class="td-proj-label">Ingresos A&ntilde;o 1</span>
                                <span class="td-proj-val td-proj-val-blue">$27,320 USD</span>
                            </div>
                            <div class="td-proj-row">
                                <span class="td-proj-label">ROI de inversi&oacute;n</span>
                                <span class="td-proj-val" style="color: #7c3aed;">Mes 9-12</span>
                            </div>
                            <div class="td-proj-row" style="background: #f8fafc;">
                                <span class="td-proj-label">Costos infra/mes</span>
                                <span class="td-proj-val">~$11 USD</span>
                            </div>
                            <div class="td-proj-row">
                                <span class="td-proj-label">Break-even operativo</span>
                                <span class="td-proj-val td-proj-val-green">1 cliente pago</span>
                            </div>
                        </div>

                        <span class="td-sub-label" style="margin-top: 16px;">Valoraci&oacute;n al Final A&ntilde;o 1 (3x-5x ARR)</span>
                        <div class="td-val-grid" style="grid-template-columns: 1fr 1fr;">
                            <div class="td-val-card" style="border-color: #bbf7d0;">
                                <div class="td-val-amount" style="font-size: 16px; color: #059669;">$215K USD</div>
                                <div class="td-val-label">Conservador (3x)</div>
                            </div>
                            <div class="td-val-card" style="border-color: #c4b5fd;">
                                <div class="td-val-amount" style="font-size: 16px; color: #7c3aed;">$359K USD</div>
                                <div class="td-val-label">Promedio SaaS (5x)</div>
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Mercado desatendido --}}
                <div style="margin-top: 16px; padding: 14px 16px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px;">
                    <div style="font-size: 13px; font-weight: 700; color: #065f46;">Mercado Desatendido</div>
                    <div style="font-size: 12px; color: #047857; margin-top: 4px; line-height: 1.5;">
                        ~15,000 iglesias evang&eacute;licas solo en Colombia. El 90%+ gestiona con Excel y WhatsApp. No hay l&iacute;der en espa&ntilde;ol. Poimano es 40-60% m&aacute;s barato que competidores en ingl&eacute;s y ofrece sitio web incluido + futuro asistente IA pastoral &mdash; ning&uacute;n competidor lo tiene.
                    </div>
                </div>
            </div>
        </div>

        {{-- FOOTER --}}
        <div style="text-align: center; font-size: 12px; color: #94a3b8; padding: 8px 0;">
            <p>Poimano SaaS &mdash; Documentación generada dinámicamente &middot; {{ now()->format('d/m/Y H:i') }}</p>
            <p style="margin-top: 4px;">Repositorio: github.com/yohanrojas562-code/poimano</p>
        </div>

    </div>
</x-filament-panels::page>
