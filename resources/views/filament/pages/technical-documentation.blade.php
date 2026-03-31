<x-filament-panels::page>
    <div class="space-y-6">

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- HEADER BANNER --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#00105E] to-[#001a8a] p-6 text-white shadow-xl">
            <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#00E1FF]/10"></div>
            <div class="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#00E1FF]/5"></div>
            <div class="relative">
                <div class="flex items-center gap-3">
                    <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                        <svg class="h-7 w-7 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                    </div>
                    <div>
                        <h2 class="text-2xl font-bold tracking-tight">Poimano — Documentación Técnica</h2>
                        <p class="mt-1 text-sm text-white/70">SaaS Multi-Tenant para Gestión de Iglesias</p>
                    </div>
                </div>
                <div class="mt-4 flex flex-wrap items-center gap-3">
                    <span class="inline-flex items-center rounded-full bg-[#00E1FF]/20 px-3 py-1 text-xs font-medium text-[#00E1FF]">
                        v1.0.0-alpha
                    </span>
                    <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                        Actualizado: {{ now()->format('d/m/Y') }}
                    </span>
                    <span class="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs text-white/60">
                        DDD Lite + MVC + Modular Monolith
                    </span>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- ESTADÍSTICAS GENERALES --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {{-- Iglesias --}}
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/30">
                        <svg class="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0-.008 9.75m-4.492-9.75h.008" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['tenants'] }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Iglesias</p>
                    </div>
                </div>
            </div>
            {{-- Activas --}}
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-900/30">
                        <svg class="h-5 w-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['active_tenants'] }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Activas</p>
                    </div>
                </div>
            </div>
            {{-- Planes --}}
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-900/30">
                        <svg class="h-5 w-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['plans'] }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Planes</p>
                    </div>
                </div>
            </div>
            {{-- Módulos --}}
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-900/30">
                        <svg class="h-5 w-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['modules_db'] }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Módulos</p>
                    </div>
                </div>
            </div>
            {{-- PHP --}}
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30">
                        <svg class="h-5 w-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['php_version'] }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">PHP</p>
                    </div>
                </div>
            </div>
            {{-- Laravel --}}
            <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
                        <svg class="h-5 w-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $stats['laravel_version'] }}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">Laravel</p>
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- PROGRESO GENERAL --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Progreso del Desarrollo</h3>
                    <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{{ $completed }} de {{ $total }} módulos implementados</p>
                </div>
                <span class="text-2xl font-bold text-[#00105E] dark:text-[#00E1FF]">{{ $progress }}%</span>
            </div>
            <div class="mt-3 h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                <div class="h-full rounded-full bg-gradient-to-r from-[#00105E] to-[#00E1FF] transition-all duration-500" style="width: {{ $progress }}%"></div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- ARQUITECTURA DEL SISTEMA --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                    <svg class="h-5 w-5 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>
                    Arquitectura del Sistema
                </h3>
                <p class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">DDD Lite + MVC + Modular Monolith · Database-per-Tenant</p>
            </div>
            <div class="p-5">
                <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {{-- Diagrama de flujo --}}
                    <div class="space-y-4">
                        <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Flujo de Petición</p>

                        {{-- Client --}}
                        <div class="flex items-center gap-3">
                            <div class="flex h-10 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                🌐 Cliente (Browser)
                            </div>
                        </div>
                        <div class="flex justify-center"><svg class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg></div>

                        {{-- Cloudflare + Nginx --}}
                        <div class="grid grid-cols-2 gap-3">
                            <div class="flex h-10 items-center justify-center rounded-lg bg-orange-50 text-sm font-medium text-orange-700 ring-1 ring-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:ring-orange-800">
                                ☁️ Cloudflare (DNS+SSL)
                            </div>
                            <div class="flex h-10 items-center justify-center rounded-lg bg-green-50 text-sm font-medium text-green-700 ring-1 ring-green-200 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-800">
                                ⚡ Nginx (Reverse Proxy)
                            </div>
                        </div>
                        <div class="flex justify-center"><svg class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg></div>

                        {{-- Laravel --}}
                        <div class="rounded-lg bg-red-50 p-4 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-800">
                            <p class="text-center text-sm font-bold text-red-700 dark:text-red-400">🔷 Laravel 11 Application</p>
                            <div class="mt-3 grid grid-cols-2 gap-2">
                                <div class="rounded-md bg-white p-2 text-center text-xs shadow-sm dark:bg-gray-800">
                                    <p class="font-semibold text-gray-700 dark:text-gray-300">Filament 3.3</p>
                                    <p class="text-gray-400">poimano.com/admin</p>
                                </div>
                                <div class="rounded-md bg-white p-2 text-center text-xs shadow-sm dark:bg-gray-800">
                                    <p class="font-semibold text-gray-700 dark:text-gray-300">React 19 + Inertia</p>
                                    <p class="text-gray-400">{slug}.poimano.com</p>
                                </div>
                            </div>
                            <div class="mt-2 grid grid-cols-2 gap-2">
                                <div class="rounded-md bg-white/80 p-2 text-center text-xs dark:bg-gray-700">
                                    <p class="font-medium text-gray-600 dark:text-gray-300">stancl/tenancy 3.9</p>
                                    <p class="text-[10px] text-gray-400">DB-per-tenant</p>
                                </div>
                                <div class="rounded-md bg-white/80 p-2 text-center text-xs dark:bg-gray-700">
                                    <p class="font-medium text-gray-600 dark:text-gray-300">Middleware Stack</p>
                                    <p class="text-[10px] text-gray-400">SubdomainID + ModuleAccess</p>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center"><svg class="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" /></svg></div>

                        {{-- Databases --}}
                        <div class="grid grid-cols-2 gap-3">
                            <div class="rounded-lg bg-blue-50 p-3 text-center ring-1 ring-blue-200 dark:bg-blue-900/20 dark:ring-blue-800">
                                <p class="text-sm font-bold text-blue-700 dark:text-blue-400">🐘 PostgreSQL 16</p>
                                <p class="mt-1 text-[10px] text-blue-500 dark:text-blue-300">poimano_central</p>
                                <p class="text-[10px] text-blue-500 dark:text-blue-300">tenant_lasalle</p>
                                <p class="text-[10px] text-blue-500 dark:text-blue-300">tenant_envigado</p>
                            </div>
                            <div class="rounded-lg bg-red-50 p-3 text-center ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-800">
                                <p class="text-sm font-bold text-red-600 dark:text-red-400">⚡ Redis</p>
                                <p class="mt-1 text-[10px] text-red-500 dark:text-red-300">Cache prefixed</p>
                                <p class="text-[10px] text-red-500 dark:text-red-300">Sessions</p>
                                <p class="text-[10px] text-red-500 dark:text-red-300">Queue jobs</p>
                            </div>
                        </div>
                    </div>

                    {{-- Multi-tenancy flow --}}
                    <div class="space-y-4">
                        <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Multi-Tenancy — Ciclo de Vida</p>

                        <div class="space-y-3">
                            <div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00105E] text-xs font-bold text-white">1</span>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">Crear Iglesia (Filament)</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Super admin llena formulario: nombre, plan, pastor, credenciales</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00105E] text-xs font-bold text-white">2</span>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">Evento TenancyCreated</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">CREATE DATABASE tenant_{slug} → auto-migrate → seed (roles, settings, admin)</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00105E] text-xs font-bold text-white">3</span>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">Dominio + Usuario Admin</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Crea subdominio {slug}.poimano.com + usuario admin con password del formulario</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                                <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00E1FF] text-xs font-bold text-[#00105E]">4</span>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">Acceso del Tenant</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Request → SubdomainID → InitializeTenancy → Switch DB → Middleware Auth</p>
                                </div>
                            </div>
                        </div>

                        <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Autenticación & RBAC</p>
                        <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                            <table class="w-full text-xs">
                                <thead class="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Rol</th>
                                        <th class="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-300">Alcance</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                                    <tr><td class="px-3 py-1.5 font-medium text-gray-900 dark:text-white">Pastor</td><td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Acceso total</td></tr>
                                    <tr><td class="px-3 py-1.5 font-medium text-gray-900 dark:text-white">Administrador</td><td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Acceso total</td></tr>
                                    <tr><td class="px-3 py-1.5 font-medium text-gray-900 dark:text-white">Líder</td><td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Members, Groups, Attendance, Activities</td></tr>
                                    <tr><td class="px-3 py-1.5 font-medium text-gray-900 dark:text-white">Tesorero</td><td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Finance, Reports</td></tr>
                                    <tr><td class="px-3 py-1.5 font-medium text-gray-900 dark:text-white">Secretaria</td><td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Members, Groups, Reports</td></tr>
                                    <tr><td class="px-3 py-1.5 font-medium text-gray-900 dark:text-white">Miembro</td><td class="px-3 py-1.5 text-gray-500 dark:text-gray-400">Solo lectura</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Planes de Suscripción</p>
                        <div class="grid grid-cols-2 gap-2">
                            <div class="rounded-lg bg-gray-50 p-2.5 text-center dark:bg-gray-700/50">
                                <p class="text-xs font-bold text-gray-900 dark:text-white">Gratuito</p>
                                <p class="text-[10px] text-gray-500">$0 · 50 miembros</p>
                                <p class="text-[10px] text-gray-400">Church, Members, Groups, Attendance</p>
                            </div>
                            <div class="rounded-lg bg-blue-50 p-2.5 text-center dark:bg-blue-900/20">
                                <p class="text-xs font-bold text-blue-700 dark:text-blue-400">Esencial</p>
                                <p class="text-[10px] text-blue-500">$29.99/mes · 200 miembros</p>
                                <p class="text-[10px] text-blue-400">+ Finance, Comms, Reports</p>
                            </div>
                            <div class="rounded-lg bg-violet-50 p-2.5 text-center dark:bg-violet-900/20">
                                <p class="text-xs font-bold text-violet-700 dark:text-violet-400">Profesional</p>
                                <p class="text-[10px] text-violet-500">$59.99/mes · 1,000 miembros</p>
                                <p class="text-[10px] text-violet-400">+ Activities, Projects</p>
                            </div>
                            <div class="rounded-lg bg-amber-50 p-2.5 text-center dark:bg-amber-900/20">
                                <p class="text-xs font-bold text-amber-700 dark:text-amber-400">Enterprise</p>
                                <p class="text-[10px] text-amber-500">$149.99/mes · 10,000 miembros</p>
                                <p class="text-[10px] text-amber-400">Todos los módulos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- ESTADO DE LOS MÓDULOS --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                    <svg class="h-5 w-5 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /></svg>
                    Estado de los Módulos
                </h3>
            </div>
            <div class="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                @foreach ($modules as $module)
                    <div class="relative overflow-hidden rounded-lg border
                        {{ $module['status'] === 'complete' ? 'border-emerald-200 dark:border-emerald-800' : ($module['status'] === 'basic' ? 'border-amber-200 dark:border-amber-800' : 'border-gray-200 dark:border-gray-700') }}
                        bg-white p-4 dark:bg-gray-800">
                        {{-- Status dot --}}
                        <div class="absolute right-3 top-3">
                            <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium
                                {{ $module['status'] === 'complete' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : ($module['status'] === 'basic' ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400') }}">
                                @if($module['status'] === 'complete') ✅ @elseif($module['status'] === 'basic') ⚠️ @else 📋 @endif
                                {{ $module['label'] }}
                            </span>
                        </div>

                        <h4 class="text-sm font-bold text-gray-900 dark:text-white">{{ $module['name'] }}</h4>
                        <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ $module['desc'] }}</p>

                        <div class="mt-3 flex flex-wrap gap-1">
                            @foreach ($module['features'] as $feature)
                                <span class="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600 dark:bg-gray-700 dark:text-gray-300">{{ $feature }}</span>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- TECH STACK --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {{-- Backend --}}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                        <svg class="h-5 w-5 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /></svg>
                        Stack Backend
                    </h3>
                </div>
                <div class="overflow-hidden">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300">Tecnología</th>
                                <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300">Versión</th>
                                <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300">Función</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                            @foreach ($backendStack as $tech)
                                <tr>
                                    <td class="px-4 py-2 text-xs font-semibold text-gray-900 dark:text-white">{{ $tech['name'] }}</td>
                                    <td class="px-4 py-2"><span class="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{{ $tech['version'] }}</span></td>
                                    <td class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">{{ $tech['role'] }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            {{-- Frontend --}}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                        <svg class="h-5 w-5 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
                        Stack Frontend
                    </h3>
                </div>
                <div class="overflow-hidden">
                    <table class="w-full text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300">Tecnología</th>
                                <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300">Versión</th>
                                <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 dark:text-gray-300">Función</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                            @foreach ($frontendStack as $tech)
                                <tr>
                                    <td class="px-4 py-2 text-xs font-semibold text-gray-900 dark:text-white">{{ $tech['name'] }}</td>
                                    <td class="px-4 py-2"><span class="rounded bg-cyan-50 px-1.5 py-0.5 text-xs font-medium text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">{{ $tech['version'] }}</span></td>
                                    <td class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">{{ $tech['role'] }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- BASE DE DATOS --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {{-- Central --}}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                        <svg class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                        BD Central <span class="text-xs font-normal text-gray-400">(poimano_central)</span>
                    </h3>
                    <p class="mt-0.5 text-xs text-gray-500">Datos compartidos de la plataforma</p>
                </div>
                <div class="divide-y divide-gray-100 px-5 py-2 dark:divide-gray-700">
                    @foreach ($centralTables as $table)
                        <div class="flex items-start gap-3 py-2.5">
                            <span class="mt-0.5 inline-block h-2 w-2 rounded-full bg-blue-400"></span>
                            <div class="min-w-0 flex-1">
                                <p class="text-xs font-semibold text-gray-900 dark:text-white">{{ $table['name'] }}</p>
                                <p class="text-[10px] text-gray-500 dark:text-gray-400">{{ $table['desc'] }} — <span class="text-gray-400">{{ $table['rows'] }}</span></p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>

            {{-- Tenant --}}
            <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                    <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                        <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg>
                        BD Tenant <span class="text-xs font-normal text-gray-400">(tenant_{slug})</span>
                    </h3>
                    <p class="mt-0.5 text-xs text-gray-500">Datos aislados por iglesia ({{ $stats['tenants'] }} bases de datos)</p>
                </div>
                <div class="divide-y divide-gray-100 px-5 py-2 dark:divide-gray-700">
                    @foreach ($tenantTables as $table)
                        <div class="flex items-start gap-3 py-2.5">
                            <span class="mt-0.5 inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
                            <div class="min-w-0 flex-1">
                                <p class="text-xs font-semibold text-gray-900 dark:text-white">{{ $table['name'] }}</p>
                                <p class="text-[10px] text-gray-500 dark:text-gray-400">{{ $table['desc'] }} — <span class="text-gray-400">{{ $table['rows'] }}</span></p>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- INFRAESTRUCTURA & DEPLOY --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div class="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
                <h3 class="flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                    <svg class="h-5 w-5 text-[#00E1FF]" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" /></svg>
                    Infraestructura & Deploy
                </h3>
            </div>
            <div class="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
                {{-- Server info --}}
                <div class="space-y-3">
                    <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Servidor de Producción</p>
                    <div class="space-y-2">
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">Proveedor</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">Hostinger VPS</span>
                        </div>
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">OS</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">Ubuntu 24.04 LTS</span>
                        </div>
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">Web Server</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">Nginx + PHP-FPM 8.3</span>
                        </div>
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">Dominio</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">poimano.com (Cloudflare)</span>
                        </div>
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">SSL</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">Wildcard *.poimano.com</span>
                        </div>
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">Ruta</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">/var/www/poimano</span>
                        </div>
                        <div class="flex justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                            <span class="text-xs text-gray-500 dark:text-gray-400">Repositorio</span>
                            <span class="text-xs font-medium text-gray-900 dark:text-white">GitHub (main branch)</span>
                        </div>
                    </div>
                </div>

                {{-- Deploy flow --}}
                <div class="space-y-3">
                    <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Flujo de Deploy</p>
                    <div class="space-y-2">
                        <div class="flex items-start gap-3 rounded-lg border border-blue-100 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">1</span>
                            <div>
                                <p class="text-xs font-medium text-blue-900 dark:text-blue-300">git push origin main</p>
                                <p class="text-[10px] text-blue-600 dark:text-blue-400">Desde máquina local al repositorio GitHub</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">2</span>
                            <div>
                                <p class="text-xs font-medium text-amber-900 dark:text-amber-300">SSH → git pull origin main</p>
                                <p class="text-[10px] text-amber-600 dark:text-amber-400">Conexión al VPS y pull del código</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">3</span>
                            <div>
                                <p class="text-xs font-medium text-green-900 dark:text-green-300">npm run build</p>
                                <p class="text-[10px] text-green-600 dark:text-green-400">Compilar assets frontend (Vite + React + TypeScript)</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3 rounded-lg border border-violet-100 bg-violet-50 p-3 dark:border-violet-800 dark:bg-violet-900/20">
                            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">4</span>
                            <div>
                                <p class="text-xs font-medium text-violet-900 dark:text-violet-300">php artisan optimize</p>
                                <p class="text-[10px] text-violet-600 dark:text-violet-400">Cache de config, routes, views para producción</p>
                            </div>
                        </div>
                    </div>

                    <p class="text-xs font-medium uppercase tracking-wider text-gray-400">Comando Completo</p>
                    <div class="rounded-lg bg-gray-900 p-3 dark:bg-gray-950">
                        <code class="text-[10px] leading-relaxed text-green-400">cd /var/www/poimano && git pull origin main && npm run build && php artisan optimize:clear && php artisan optimize</code>
                    </div>
                </div>
            </div>
        </div>

        {{-- ═══════════════════════════════════════════════════════════════ --}}
        {{-- FOOTER --}}
        {{-- ═══════════════════════════════════════════════════════════════ --}}
        <div class="text-center text-xs text-gray-400">
            <p>Poimano SaaS — Documentación generada dinámicamente · {{ now()->format('d/m/Y H:i') }}</p>
            <p class="mt-1">Repositorio: github.com/yohanrojas562-code/poimano</p>
        </div>

    </div>
</x-filament-panels::page>
