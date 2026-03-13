<div class="fi-simple-page min-h-screen flex">
    {{-- Columna izquierda — Branding --}}
    <div class="hidden lg:flex w-[40%] bg-white flex-col items-center justify-center relative overflow-hidden px-12">
        {{-- Decoración sutil --}}
        <div class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00E1FF]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#00105E]/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div class="relative z-10 flex flex-col items-center text-center max-w-sm">
            {{-- Logo --}}
            @php
                $logo = null;
                try {
                    $logoPath = \App\Models\Setting::get('platform_logo');
                    if ($logoPath) {
                        $logo = asset('storage/' . $logoPath);
                    }
                } catch (\Throwable) {}
            @endphp

            @if($logo)
                <img src="{{ $logo }}" alt="Poimano" class="h-24 w-auto mb-8 drop-shadow-lg" />
            @else
                <div class="mb-8">
                    <h1 class="text-5xl font-black tracking-tight text-[#00105E]">Poimano</h1>
                </div>
            @endif

            {{-- Línea decorativa --}}
            <div class="w-16 h-1 bg-gradient-to-r from-[#00105E] to-[#00E1FF] rounded-full mb-8"></div>

            {{-- Descripción --}}
            <p class="text-lg font-semibold text-[#00105E] mb-3">
                Plataforma SaaS para Iglesias
            </p>
            <p class="text-sm text-gray-500 leading-relaxed mb-10">
                Administra tu iglesia de forma moderna y eficiente. Gestiona miembros, grupos, eventos, finanzas y mucho más desde un solo lugar.
            </p>

            {{-- Features --}}
            <div class="space-y-4 w-full">
                <div class="flex items-center gap-3 text-left">
                    <div class="flex-shrink-0 w-10 h-10 bg-[#00105E]/5 rounded-xl flex items-center justify-center">
                        <x-heroicon-o-building-office-2 class="w-5 h-5 text-[#00105E]" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#00105E]">Multi-Iglesia</p>
                        <p class="text-xs text-gray-400">Cada iglesia con su propio espacio</p>
                    </div>
                </div>
                <div class="flex items-center gap-3 text-left">
                    <div class="flex-shrink-0 w-10 h-10 bg-[#00105E]/5 rounded-xl flex items-center justify-center">
                        <x-heroicon-o-shield-check class="w-5 h-5 text-[#00105E]" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#00105E]">Seguro y Confiable</p>
                        <p class="text-xs text-gray-400">Datos protegidos y respaldados</p>
                    </div>
                </div>
                <div class="flex items-center gap-3 text-left">
                    <div class="flex-shrink-0 w-10 h-10 bg-[#00105E]/5 rounded-xl flex items-center justify-center">
                        <x-heroicon-o-chart-bar class="w-5 h-5 text-[#00105E]" />
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-[#00105E]">Reportes y Métricas</p>
                        <p class="text-xs text-gray-400">Información en tiempo real</p>
                    </div>
                </div>
            </div>

            {{-- Footer --}}
            <p class="mt-12 text-xs text-gray-300">
                &copy; {{ date('Y') }} Poimano. Todos los derechos reservados.
            </p>
        </div>
    </div>

    {{-- Columna derecha — Formulario --}}
    <div class="flex-1 flex items-center justify-center bg-gradient-to-br from-[#00105E] via-[#001570] to-[#002080] relative overflow-hidden px-6 py-12">
        {{-- Decoraciones --}}
        <div class="absolute inset-0">
            <div class="absolute top-20 left-10 w-72 h-72 bg-[#00E1FF]/5 rounded-full blur-3xl"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-[#00E1FF]/3 rounded-full blur-3xl"></div>
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#00E1FF]/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div class="relative z-10 w-full max-w-md">
            {{-- Logo móvil (solo en pantallas pequeñas) --}}
            <div class="lg:hidden text-center mb-8">
                @if($logo)
                    <img src="{{ $logo }}" alt="Poimano" class="h-16 w-auto mx-auto mb-4 brightness-0 invert" />
                @else
                    <h1 class="text-3xl font-black text-white tracking-tight">Poimano</h1>
                @endif
            </div>

            {{-- Header --}}
            <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-white mb-2">Bienvenido de vuelta</h2>
                <p class="text-sm text-white/50">Ingresa tus credenciales para continuar</p>
            </div>

            {{-- Card del formulario --}}
            <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl">
                <x-filament-panels::form wire:submit="authenticate">
                    {{ $this->form }}

                    <x-filament-panels::form.actions
                        :actions="$this->getCachedFormActions()"
                        :full-width="$this->hasFullWidthFormActions()"
                    />
                </x-filament-panels::form>
            </div>

            {{-- Footer móvil --}}
            <p class="lg:hidden text-center mt-8 text-xs text-white/30">
                &copy; {{ date('Y') }} Poimano. Todos los derechos reservados.
            </p>
        </div>
    </div>
</div>
