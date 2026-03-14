@php
    $logo = null;
    try {
        $logoPath = \App\Core\Settings\Domain\Models\Setting::get('platform_logo');
        if ($logoPath) {
            $logo = asset('storage/' . $logoPath);
        }
    } catch (\Throwable) {}
@endphp

<div class="fi-simple-page poimano-login">
    <style>
        /* ====== Login Two-Column Layout — Full Viewport ====== */
        .poimano-login {
            display: flex;
            height: 100vh;
            width: 100vw;
            margin: 0;
            padding: 0;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 50;
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
            padding: 2rem 2.5rem;
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
            max-width: 22rem;
        }
        .poimano-login__brand-logo {
            height: 5rem; width: auto;
            margin-bottom: 1.25rem;
            filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
        }
        .poimano-login__brand-title {
            font-size: 2.5rem;
            font-weight: 900;
            letter-spacing: -0.03em;
            color: #00105E;
            margin-bottom: 1.25rem;
            line-height: 1;
        }
        .poimano-login__brand-line {
            width: 3.5rem; height: 3px;
            background: linear-gradient(90deg, #00105E, #00E1FF);
            border-radius: 9999px;
            margin-bottom: 1.25rem;
        }
        .poimano-login__brand-subtitle {
            font-size: 1rem;
            font-weight: 600;
            color: #00105E;
            margin-bottom: 0.5rem;
        }
        .poimano-login__brand-desc {
            font-size: 0.8rem;
            color: #6b7280;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        /* Feature cards */
        .poimano-login__features {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0.625rem;
        }
        .poimano-login__feature {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            text-align: left;
        }
        .poimano-login__feature-icon {
            flex-shrink: 0;
            width: 2.25rem; height: 2.25rem;
            background: rgba(0,16,94,0.05);
            border-radius: 0.625rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .poimano-login__feature-icon svg {
            width: 1.125rem; height: 1.125rem;
            color: #00105E;
        }
        .poimano-login__feature-title {
            font-size: 0.8rem;
            font-weight: 600;
            color: #00105E;
            margin: 0;
        }
        .poimano-login__feature-text {
            font-size: 0.7rem;
            color: #9ca3af;
            margin: 0;
        }

        /* Bible verse */
        .poimano-login__verse {
            margin-top: 1.5rem;
            padding: 1rem;
            border-left: 3px solid #00E1FF;
            background: rgba(0,16,94,0.03);
            border-radius: 0 0.5rem 0.5rem 0;
        }
        .poimano-login__verse p {
            font-size: 0.75rem;
            font-style: italic;
            color: #4b5563;
            line-height: 1.5;
            margin: 0;
        }
        .poimano-login__verse cite {
            display: block;
            font-size: 0.7rem;
            color: #9ca3af;
            font-style: normal;
            font-weight: 600;
            margin-top: 0.375rem;
        }

        .poimano-login__brand-footer {
            margin-top: 1.5rem;
            font-size: 0.7rem;
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
            padding: 2rem 1.5rem;
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
            max-width: 26rem;
        }

        /* Mobile logo */
        .poimano-login__mobile-logo {
            display: block;
            text-align: center;
            margin-bottom: 1.5rem;
        }
        @media (min-width: 1024px) {
            .poimano-login__mobile-logo { display: none; }
        }
        .poimano-login__mobile-logo img {
            height: 3.5rem; width: auto;
            margin: 0 auto 0.75rem;
            filter: brightness(0) invert(1);
        }
        .poimano-login__mobile-logo h1 {
            font-size: 1.75rem;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.03em;
        }

        /* Header */
        .poimano-login__header {
            text-align: center;
            margin-bottom: 1.5rem;
        }
        .poimano-login__header h2 {
            font-size: 1.375rem;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 0.375rem;
        }
        .poimano-login__header p {
            font-size: 0.8rem;
            color: rgba(255,255,255,0.5);
        }

        /* Form card */
        .poimano-login__card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border-radius: 1rem;
            padding: 1.5rem;
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }

        /* Mobile footer */
        .poimano-login__mobile-footer {
            display: block;
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.7rem;
            color: rgba(255,255,255,0.3);
        }
        @media (min-width: 1024px) {
            .poimano-login__mobile-footer { display: none; }
        }
    </style>

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

            <p class="poimano-login__brand-subtitle">Panel de Administración</p>
            <p class="poimano-login__brand-desc">
                Gestión centralizada de la plataforma.
            </p>

            <div class="poimano-login__features">
                <div class="poimano-login__feature">
                    <div class="poimano-login__feature-icon">
                        <x-heroicon-o-building-office-2 />
                    </div>
                    <div>
                        <p class="poimano-login__feature-title">Multi-Tenant</p>
                        <p class="poimano-login__feature-text">Gestión centralizada de todas las iglesias</p>
                    </div>
                </div>
                <div class="poimano-login__feature">
                    <div class="poimano-login__feature-icon">
                        <x-heroicon-o-shield-check />
                    </div>
                    <div>
                        <p class="poimano-login__feature-title">Seguro y Confiable</p>
                        <p class="poimano-login__feature-text">Datos aislados y respaldados por tenant</p>
                    </div>
                </div>
                <div class="poimano-login__feature">
                    <div class="poimano-login__feature-icon">
                        <x-heroicon-o-chart-bar />
                    </div>
                    <div>
                        <p class="poimano-login__feature-title">Reportes y Métricas</p>
                        <p class="poimano-login__feature-text">Monitoreo en tiempo real de la plataforma</p>
                    </div>
                </div>
            </div>

            {{-- Versículo --}}
            <div class="poimano-login__verse">
                <p>"Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo; tu vara y tu cayado me infundirán aliento."</p>
                <cite>— Salmos 23:4</cite>
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
                <h2>Panel de Administración</h2>
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
