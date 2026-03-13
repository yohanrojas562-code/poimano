<style>
    /* ====== Login Two-Column Layout ====== */
    .poimano-login {
        display: flex;
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    /* Left branding column */
    .poimano-login__brand {
        display: none;
        width: 40%;
        background: #ffffff;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
        padding: 3rem;
    }
    @media (min-width: 1024px) {
        .poimano-login__brand { display: flex; }
    }
    .poimano-login__brand-deco1 {
        position: absolute; top: 0; right: 0;
        width: 16rem; height: 16rem;
        background: radial-gradient(circle, rgba(0,225,255,0.06) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(50%, -50%);
    }
    .poimano-login__brand-deco2 {
        position: absolute; bottom: 0; left: 0;
        width: 12rem; height: 12rem;
        background: radial-gradient(circle, rgba(0,16,94,0.06) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, 50%);
    }
    .poimano-login__brand-inner {
        position: relative;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        max-width: 24rem;
    }
    .poimano-login__brand-logo {
        height: 6rem; width: auto;
        margin-bottom: 2rem;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
    }
    .poimano-login__brand-title {
        font-size: 3rem;
        font-weight: 900;
        letter-spacing: -0.03em;
        color: #00105E;
        margin-bottom: 2rem;
        line-height: 1;
    }
    .poimano-login__brand-line {
        width: 4rem; height: 4px;
        background: linear-gradient(90deg, #00105E, #00E1FF);
        border-radius: 9999px;
        margin-bottom: 2rem;
    }
    .poimano-login__brand-subtitle {
        font-size: 1.125rem;
        font-weight: 600;
        color: #00105E;
        margin-bottom: 0.75rem;
    }
    .poimano-login__brand-desc {
        font-size: 0.875rem;
        color: #6b7280;
        line-height: 1.6;
        margin-bottom: 2.5rem;
    }

    /* Feature cards */
    .poimano-login__features {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .poimano-login__feature {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-align: left;
    }
    .poimano-login__feature-icon {
        flex-shrink: 0;
        width: 2.5rem; height: 2.5rem;
        background: rgba(0,16,94,0.05);
        border-radius: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .poimano-login__feature-icon svg {
        width: 1.25rem; height: 1.25rem;
        color: #00105E;
    }
    .poimano-login__feature-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: #00105E;
        margin: 0;
    }
    .poimano-login__feature-text {
        font-size: 0.75rem;
        color: #9ca3af;
        margin: 0;
    }
    .poimano-login__brand-footer {
        margin-top: 3rem;
        font-size: 0.75rem;
        color: #d1d5db;
    }

    /* Right form column */
    .poimano-login__form-col {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #00105E 0%, #001570 50%, #002080 100%);
        position: relative;
        overflow: hidden;
        padding: 3rem 1.5rem;
    }
    .poimano-login__form-deco {
        position: absolute; inset: 0; pointer-events: none;
    }
    .poimano-login__form-deco > div:nth-child(1) {
        position: absolute; top: 5rem; left: 2.5rem;
        width: 18rem; height: 18rem;
        background: rgba(0,225,255,0.05);
        border-radius: 50%;
        filter: blur(48px);
    }
    .poimano-login__form-deco > div:nth-child(2) {
        position: absolute; bottom: 5rem; right: 2.5rem;
        width: 24rem; height: 24rem;
        background: rgba(0,225,255,0.03);
        border-radius: 50%;
        filter: blur(48px);
    }
    .poimano-login__form-deco > div:nth-child(3) {
        position: absolute; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        width: 37rem; height: 37rem;
        background: radial-gradient(circle, rgba(0,225,255,0.05) 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(48px);
    }
    .poimano-login__form-wrap {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 28rem;
    }

    /* Mobile logo */
    .poimano-login__mobile-logo {
        display: block;
        text-align: center;
        margin-bottom: 2rem;
    }
    @media (min-width: 1024px) {
        .poimano-login__mobile-logo { display: none; }
    }
    .poimano-login__mobile-logo img {
        height: 4rem; width: auto;
        margin: 0 auto 1rem;
        filter: brightness(0) invert(1);
    }
    .poimano-login__mobile-logo h1 {
        font-size: 1.875rem;
        font-weight: 900;
        color: #ffffff;
        letter-spacing: -0.03em;
    }

    /* Header */
    .poimano-login__header {
        text-align: center;
        margin-bottom: 2rem;
    }
    .poimano-login__header h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 0.5rem;
    }
    .poimano-login__header p {
        font-size: 0.875rem;
        color: rgba(255,255,255,0.5);
    }

    /* Form card */
    .poimano-login__card {
        background: rgba(255,255,255,0.1);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        border-radius: 1rem;
        padding: 2rem;
        border: 1px solid rgba(255,255,255,0.1);
        box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }

    /* Mobile footer */
    .poimano-login__mobile-footer {
        display: block;
        text-align: center;
        margin-top: 2rem;
        font-size: 0.75rem;
        color: rgba(255,255,255,0.3);
    }
    @media (min-width: 1024px) {
        .poimano-login__mobile-footer { display: none; }
    }
</style>

@php
    $logo = null;
    try {
        $logoPath = \App\Models\Setting::get('platform_logo');
        if ($logoPath) {
            $logo = asset('storage/' . $logoPath);
        }
    } catch (\Throwable) {}
@endphp

<div class="fi-simple-page poimano-login">
    {{-- Columna izquierda — Branding --}}
    <div class="poimano-login__brand">
        <div class="poimano-login__brand-deco1"></div>
        <div class="poimano-login__brand-deco2"></div>

        <div class="poimano-login__brand-inner">
            @if($logo)
                <img src="{{ $logo }}" alt="Poimano" class="poimano-login__brand-logo" />
            @else
                <div class="poimano-login__brand-title">Poimano</div>
            @endif

            <div class="poimano-login__brand-line"></div>

            <p class="poimano-login__brand-subtitle">Plataforma SaaS para Iglesias</p>
            <p class="poimano-login__brand-desc">
                Administra tu iglesia de forma moderna y eficiente. Gestiona miembros, grupos, eventos, finanzas y mucho más desde un solo lugar.
            </p>

            <div class="poimano-login__features">
                <div class="poimano-login__feature">
                    <div class="poimano-login__feature-icon">
                        <x-heroicon-o-building-office-2 />
                    </div>
                    <div>
                        <p class="poimano-login__feature-title">Multi-Iglesia</p>
                        <p class="poimano-login__feature-text">Cada iglesia con su propio espacio</p>
                    </div>
                </div>
                <div class="poimano-login__feature">
                    <div class="poimano-login__feature-icon">
                        <x-heroicon-o-shield-check />
                    </div>
                    <div>
                        <p class="poimano-login__feature-title">Seguro y Confiable</p>
                        <p class="poimano-login__feature-text">Datos protegidos y respaldados</p>
                    </div>
                </div>
                <div class="poimano-login__feature">
                    <div class="poimano-login__feature-icon">
                        <x-heroicon-o-chart-bar />
                    </div>
                    <div>
                        <p class="poimano-login__feature-title">Reportes y Métricas</p>
                        <p class="poimano-login__feature-text">Información en tiempo real</p>
                    </div>
                </div>
            </div>

            <p class="poimano-login__brand-footer">&copy; {{ date('Y') }} Poimano. Todos los derechos reservados.</p>
        </div>
    </div>

    {{-- Columna derecha — Formulario --}}
    <div class="poimano-login__form-col">
        <div class="poimano-login__form-deco">
            <div></div>
            <div></div>
            <div></div>
        </div>

        <div class="poimano-login__form-wrap">
            {{-- Logo móvil --}}
            <div class="poimano-login__mobile-logo">
                @if($logo)
                    <img src="{{ $logo }}" alt="Poimano" />
                @else
                    <h1>Poimano</h1>
                @endif
            </div>

            {{-- Header --}}
            <div class="poimano-login__header">
                <h2>Bienvenido de vuelta</h2>
                <p>Ingresa tus credenciales para continuar</p>
            </div>

            {{-- Card del formulario --}}
            <div class="poimano-login__card">
                <x-filament-panels::form wire:submit="authenticate">
                    {{ $this->form }}

                    <x-filament-panels::form.actions
                        :actions="$this->getCachedFormActions()"
                        :full-width="$this->hasFullWidthFormActions()"
                    />
                </x-filament-panels::form>
            </div>

            {{-- Footer móvil --}}
            <p class="poimano-login__mobile-footer">
                &copy; {{ date('Y') }} Poimano. Todos los derechos reservados.
            </p>
        </div>
    </div>
</div>
