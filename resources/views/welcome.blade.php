<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Poimano — Plataforma SaaS para Iglesias</title>
    <meta name="description" content="Poimano es la plataforma SaaS moderna para la gestión integral de iglesias. Miembros, grupos, eventos, finanzas y más.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    @php
        $favicon = null;
        try {
            $fav = \App\Models\Setting::get('platform_favicon');
            $favicon = $fav ? asset('storage/' . $fav) : asset('favicon.ico');
        } catch (\Throwable) {
            $favicon = asset('favicon.ico');
        }
    @endphp
    <link rel="icon" href="{{ $favicon }}">
    <style>
        /* ====== RESET & BASE ====== */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: #1f2937;
            background: #ffffff;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }
        img { max-width: 100%; height: auto; }

        /* ====== UTILITIES ====== */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
        .section { padding: 5rem 0; }
        .section-gray { background: #f8fafc; }
        .section-navy {
            background: linear-gradient(135deg, #00105E 0%, #001a7a 100%);
            color: #ffffff;
        }
        .text-center { text-align: center; }
        .section-badge {
            display: inline-block;
            padding: 0.375rem 1rem;
            background: rgba(0, 225, 255, 0.1);
            color: #00105E;
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 9999px;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .section-navy .section-badge {
            background: rgba(0, 225, 255, 0.15);
            color: #00E1FF;
        }
        .section-title {
            font-size: 2.25rem;
            font-weight: 800;
            color: #00105E;
            line-height: 1.2;
            margin-bottom: 1rem;
        }
        .section-navy .section-title { color: #ffffff; }
        .section-desc {
            font-size: 1.05rem;
            color: #6b7280;
            max-width: 640px;
            margin: 0 auto 3rem;
            line-height: 1.7;
        }
        .section-navy .section-desc { color: rgba(255,255,255,0.7); }

        /* ====== BUTTONS ====== */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.875rem 2rem;
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 0.75rem;
            border: none;
            cursor: pointer;
            transition: all 0.25s ease;
            text-decoration: none;
        }
        .btn-primary {
            background: linear-gradient(135deg, #00E1FF 0%, #00b8d4 100%);
            color: #00105E;
            box-shadow: 0 4px 20px rgba(0, 225, 255, 0.3);
        }
        .btn-primary:hover {
            box-shadow: 0 8px 30px rgba(0, 225, 255, 0.45);
            transform: translateY(-2px);
        }
        .btn-outline {
            background: transparent;
            color: #00105E;
            border: 2px solid #00105E;
        }
        .btn-outline:hover {
            background: #00105E;
            color: #ffffff;
        }
        .btn-white {
            background: #ffffff;
            color: #00105E;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .btn-white:hover {
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }
        .btn-sm { padding: 0.625rem 1.5rem; font-size: 0.875rem; }
        .btn-lg { padding: 1rem 2.5rem; font-size: 1.05rem; }

        /* ====== NAVBAR ====== */
        .navbar {
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 100;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        .navbar-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 4.5rem;
        }
        .navbar-logo {
            display: flex;
            align-items: center;
            gap: 0.625rem;
        }
        .navbar-logo img { height: 2.5rem; width: auto; }
        .navbar-logo-text {
            font-size: 1.5rem;
            font-weight: 900;
            color: #00105E;
            letter-spacing: -0.03em;
        }
        .navbar-links {
            display: none;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }
        .navbar-links a {
            font-size: 0.9rem;
            font-weight: 500;
            color: #4b5563;
            transition: color 0.2s;
        }
        .navbar-links a:hover { color: #00105E; }
        .navbar-cta { display: none; align-items: center; gap: 1rem; }
        .navbar-cta .btn-sm { border-radius: 0.5rem; }
        .navbar-mobile-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2.5rem;
            height: 2.5rem;
            background: none;
            border: none;
            cursor: pointer;
        }
        .navbar-mobile-btn svg { width: 1.5rem; height: 1.5rem; color: #00105E; }

        /* Mobile menu */
        .mobile-menu {
            display: none;
            position: fixed;
            top: 4.5rem; left: 0; right: 0;
            background: #ffffff;
            border-bottom: 1px solid #e5e7eb;
            padding: 1.5rem;
            z-index: 99;
            flex-direction: column;
            gap: 1rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
            padding: 0.75rem 0;
            font-size: 1rem;
            font-weight: 500;
            color: #374151;
            border-bottom: 1px solid #f3f4f6;
        }
        .mobile-menu .btn { margin-top: 0.5rem; }

        @media (min-width: 768px) {
            .navbar-links { display: flex; }
            .navbar-cta { display: flex; }
            .navbar-mobile-btn { display: none; }
        }

        /* ====== HERO ====== */
        .hero {
            padding: 8rem 0 5rem;
            background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
            position: relative;
            overflow: hidden;
        }
        .hero::before {
            content: '';
            position: absolute;
            top: -10rem; right: -10rem;
            width: 40rem; height: 40rem;
            background: radial-gradient(circle, rgba(0,225,255,0.08) 0%, transparent 70%);
            border-radius: 50%;
        }
        .hero::after {
            content: '';
            position: absolute;
            bottom: -5rem; left: -5rem;
            width: 25rem; height: 25rem;
            background: radial-gradient(circle, rgba(0,16,94,0.04) 0%, transparent 70%);
            border-radius: 50%;
        }
        .hero-inner {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
        }
        .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.25rem;
            background: rgba(0, 225, 255, 0.1);
            border: 1px solid rgba(0, 225, 255, 0.2);
            border-radius: 9999px;
            font-size: 0.8rem;
            font-weight: 600;
            color: #00105E;
            margin-bottom: 2rem;
        }
        .hero-badge-dot {
            width: 0.5rem; height: 0.5rem;
            background: #00E1FF;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }
        .hero-title {
            font-size: 3rem;
            font-weight: 900;
            color: #00105E;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            letter-spacing: -0.03em;
            max-width: 800px;
        }
        .hero-title span { color: #00E1FF; }
        .hero-subtitle {
            font-size: 1.15rem;
            color: #6b7280;
            max-width: 580px;
            margin-bottom: 2.5rem;
            line-height: 1.7;
        }
        .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .hero-stats {
            display: flex;
            gap: 3rem;
            margin-top: 4rem;
            padding-top: 3rem;
            border-top: 1px solid #e5e7eb;
        }
        .hero-stat { text-align: center; }
        .hero-stat-num {
            font-size: 2rem;
            font-weight: 800;
            color: #00105E;
        }
        .hero-stat-label {
            font-size: 0.8rem;
            color: #9ca3af;
            font-weight: 500;
            margin-top: 0.25rem;
        }
        @media (min-width: 768px) {
            .hero-title { font-size: 3.75rem; }
        }

        /* ====== FEATURES ====== */
        .features-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 768px) {
            .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 1024px) {
            .features-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .feature-card {
            background: #ffffff;
            border: 1px solid #f1f5f9;
            border-radius: 1rem;
            padding: 2rem;
            transition: all 0.3s ease;
        }
        .feature-card:hover {
            border-color: rgba(0, 225, 255, 0.3);
            box-shadow: 0 12px 40px rgba(0, 16, 94, 0.08);
            transform: translateY(-4px);
        }
        .feature-icon {
            width: 3rem; height: 3rem;
            background: linear-gradient(135deg, rgba(0,225,255,0.1), rgba(0,16,94,0.05));
            border-radius: 0.75rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.25rem;
        }
        .feature-icon svg { width: 1.5rem; height: 1.5rem; color: #00105E; }
        .feature-card h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #00105E;
            margin-bottom: 0.5rem;
        }
        .feature-card p {
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.6;
        }

        /* ====== HOW IT WORKS ====== */
        .steps-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 768px) {
            .steps-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .step-card { text-align: center; padding: 2rem 1.5rem; }
        .step-num {
            width: 3.5rem; height: 3.5rem;
            background: linear-gradient(135deg, #00105E, #001a7a);
            color: #00E1FF;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            font-weight: 800;
            margin: 0 auto 1.5rem;
        }
        .step-card h3 {
            font-size: 1.1rem;
            font-weight: 700;
            color: #00105E;
            margin-bottom: 0.5rem;
        }
        .step-card p {
            font-size: 0.875rem;
            color: #6b7280;
            line-height: 1.6;
        }

        /* ====== PRICING ====== */
        .pricing-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            align-items: stretch;
        }
        @media (min-width: 768px) {
            .pricing-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .pricing-card {
            background: #ffffff;
            border: 2px solid #f1f5f9;
            border-radius: 1.25rem;
            padding: 2.5rem 2rem;
            position: relative;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .pricing-card:hover {
            border-color: rgba(0, 225, 255, 0.3);
            box-shadow: 0 12px 40px rgba(0, 16, 94, 0.08);
        }
        .pricing-card.popular {
            border-color: #00E1FF;
            box-shadow: 0 12px 40px rgba(0, 225, 255, 0.15);
            transform: scale(1.03);
        }
        .pricing-popular-badge {
            position: absolute;
            top: -0.875rem;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #00E1FF, #00b8d4);
            color: #00105E;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 0.375rem 1.25rem;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .pricing-name {
            font-size: 1.1rem;
            font-weight: 700;
            color: #00105E;
            margin-bottom: 0.5rem;
        }
        .pricing-desc {
            font-size: 0.8rem;
            color: #9ca3af;
            margin-bottom: 1.5rem;
        }
        .pricing-price {
            display: flex;
            align-items: baseline;
            gap: 0.25rem;
            margin-bottom: 0.25rem;
        }
        .pricing-currency { font-size: 1.25rem; font-weight: 700; color: #00105E; }
        .pricing-amount { font-size: 3rem; font-weight: 900; color: #00105E; line-height: 1; }
        .pricing-period { font-size: 0.875rem; color: #9ca3af; margin-bottom: 2rem; }
        .pricing-features {
            list-style: none;
            margin-bottom: 2rem;
            flex: 1;
        }
        .pricing-features li {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.5rem 0;
            font-size: 0.875rem;
            color: #4b5563;
        }
        .pricing-features li svg { width: 1.125rem; height: 1.125rem; color: #00E1FF; flex-shrink: 0; }
        .pricing-card .btn { width: 100%; }

        /* ====== TESTIMONIALS ====== */
        .testimonials-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        @media (min-width: 768px) {
            .testimonials-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .testimonial-card {
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 1rem;
            padding: 2rem;
        }
        .testimonial-stars { display: flex; gap: 0.25rem; margin-bottom: 1rem; }
        .testimonial-stars svg { width: 1rem; height: 1rem; color: #fbbf24; fill: #fbbf24; }
        .testimonial-text {
            font-size: 0.9rem;
            color: rgba(255,255,255,0.8);
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        .testimonial-author { display: flex; align-items: center; gap: 0.75rem; }
        .testimonial-avatar {
            width: 2.5rem; height: 2.5rem;
            background: linear-gradient(135deg, #00E1FF, #00b8d4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.875rem;
            font-weight: 700;
            color: #00105E;
        }
        .testimonial-name { font-size: 0.875rem; font-weight: 600; color: #ffffff; }
        .testimonial-role { font-size: 0.75rem; color: rgba(255,255,255,0.5); }

        /* ====== CTA ====== */
        .cta-section {
            padding: 5rem 0;
            background: #ffffff;
        }
        .cta-box {
            background: linear-gradient(135deg, #00105E 0%, #001a7a 100%);
            border-radius: 1.5rem;
            padding: 4rem 2rem;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .cta-box::before {
            content: '';
            position: absolute;
            top: -5rem; right: -5rem;
            width: 20rem; height: 20rem;
            background: rgba(0,225,255,0.08);
            border-radius: 50%;
            filter: blur(48px);
        }
        .cta-box h2 {
            font-size: 2.25rem;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 1rem;
            position: relative;
        }
        .cta-box p {
            font-size: 1.05rem;
            color: rgba(255,255,255,0.7);
            max-width: 480px;
            margin: 0 auto 2rem;
            position: relative;
        }
        .cta-box .btn { position: relative; }

        /* ====== FOOTER ====== */
        .footer {
            background: #00105E;
            color: rgba(255,255,255,0.6);
            padding: 4rem 0 2rem;
        }
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2.5rem;
            margin-bottom: 3rem;
        }
        @media (min-width: 768px) {
            .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        }
        .footer-brand-name {
            font-size: 1.5rem;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 0.75rem;
            letter-spacing: -0.03em;
        }
        .footer-brand-desc {
            font-size: 0.85rem;
            line-height: 1.6;
            max-width: 280px;
        }
        .footer-col h4 {
            font-size: 0.8rem;
            font-weight: 700;
            color: #ffffff;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 1.25rem;
        }
        .footer-col ul { list-style: none; }
        .footer-col ul li { margin-bottom: 0.75rem; }
        .footer-col ul a {
            font-size: 0.85rem;
            transition: color 0.2s;
        }
        .footer-col ul a:hover { color: #00E1FF; }
        .footer-bottom {
            border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            text-align: center;
        }
        @media (min-width: 768px) {
            .footer-bottom { flex-direction: row; justify-content: space-between; }
        }
        .footer-bottom p { font-size: 0.8rem; }
        .footer-verse {
            font-size: 0.75rem;
            font-style: italic;
            color: rgba(255,255,255,0.35);
        }

        /* ====== SVG ICONS (inline) ====== */
        .icon-check { display: inline-block; }
    </style>
</head>
<body>
    @php
        $logo = null;
        $logoWhite = null;
        try {
            $l = \App\Models\Setting::get('platform_logo');
            if ($l) $logo = asset('storage/' . $l);
            $lw = \App\Models\Setting::get('platform_logo_white');
            if ($lw) $logoWhite = asset('storage/' . $lw);
        } catch (\Throwable) {}
    @endphp

    <!-- ====== NAVBAR ====== -->
    <nav class="navbar" id="navbar">
        <div class="container navbar-inner">
            <a href="/" class="navbar-logo">
                @if($logo)
                    <img src="{{ $logo }}" alt="Poimano">
                @else
                    <span class="navbar-logo-text">Poimano</span>
                @endif
            </a>
            <ul class="navbar-links">
                <li><a href="#features">Características</a></li>
                <li><a href="#how-it-works">Cómo Funciona</a></li>
                <li><a href="#pricing">Planes</a></li>
                <li><a href="#testimonials">Testimonios</a></li>
            </ul>
            <div class="navbar-cta">
                <a href="/admin/login" class="btn btn-primary btn-sm">Iniciar Sesión</a>
            </div>
            <button class="navbar-mobile-btn" onclick="document.getElementById('mobileMenu').classList.toggle('open')" aria-label="Abrir menú">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
        </div>
    </nav>
    <div class="mobile-menu" id="mobileMenu">
        <a href="#features" onclick="document.getElementById('mobileMenu').classList.remove('open')">Características</a>
        <a href="#how-it-works" onclick="document.getElementById('mobileMenu').classList.remove('open')">Cómo Funciona</a>
        <a href="#pricing" onclick="document.getElementById('mobileMenu').classList.remove('open')">Planes</a>
        <a href="#testimonials" onclick="document.getElementById('mobileMenu').classList.remove('open')">Testimonios</a>
        <a href="/admin/login" class="btn btn-primary">Iniciar Sesión</a>
    </div>

    <!-- ====== HERO ====== -->
    <section class="hero">
        <div class="container hero-inner">
            <div class="hero-badge">
                <span class="hero-badge-dot"></span>
                Plataforma para Iglesias
            </div>
            <h1 class="hero-title">
                Gestiona tu iglesia de forma <span>moderna y eficiente</span>
            </h1>
            <p class="hero-subtitle">
                Poimano es la plataforma todo-en-uno para administrar miembros, grupos, eventos, finanzas y mucho más. Tu iglesia merece herramientas del siglo XXI.
            </p>
            <div class="hero-buttons">
                <a href="#pricing" class="btn btn-primary btn-lg">Comenzar Ahora</a>
                <a href="#features" class="btn btn-outline btn-lg">Explorar Características</a>
            </div>
            <div class="hero-stats">
                <div class="hero-stat">
                    <div class="hero-stat-num">100%</div>
                    <div class="hero-stat-label">En la nube</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-num">24/7</div>
                    <div class="hero-stat-label">Disponibilidad</div>
                </div>
                <div class="hero-stat">
                    <div class="hero-stat-num">SSL</div>
                    <div class="hero-stat-label">Seguridad total</div>
                </div>
            </div>
        </div>
    </section>

    <!-- ====== FEATURES ====== -->
    <section class="section section-gray" id="features">
        <div class="container text-center">
            <span class="section-badge">Características</span>
            <h2 class="section-title">Todo lo que tu iglesia necesita</h2>
            <p class="section-desc">Herramientas diseñadas específicamente para la gestión integral de iglesias y ministerios.</p>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>
                    </div>
                    <h3>Gestión de Miembros</h3>
                    <p>Directorio completo con perfiles, fotos, datos de contacto, roles ministeriales y seguimiento pastoral.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/></svg>
                    </div>
                    <h3>Grupos y Células</h3>
                    <p>Organiza grupos pequeños, células de oración, ministerios y equipos de servicio con facilidad.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
                    </div>
                    <h3>Eventos y Calendario</h3>
                    <p>Programa cultos, retiros, reuniones y actividades especiales con notificaciones automáticas.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"/></svg>
                    </div>
                    <h3>Finanzas y Diezmos</h3>
                    <p>Control de ofrendas, diezmos, donaciones y gastos con reportes financieros detallados.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
                    </div>
                    <h3>Reportes y Analíticas</h3>
                    <p>Dashboards en tiempo real con métricas clave de asistencia, crecimiento y salud financiera.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>
                    </div>
                    <h3>Seguridad Total</h3>
                    <p>Datos encriptados, certificado SSL, backups automáticos y aislamiento completo entre iglesias.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ====== HOW IT WORKS ====== -->
    <section class="section" id="how-it-works">
        <div class="container text-center">
            <span class="section-badge">Cómo Funciona</span>
            <h2 class="section-title">En 3 simples pasos</h2>
            <p class="section-desc">Empieza a gestionar tu iglesia en minutos, sin configuraciones complicadas.</p>
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-num">1</div>
                    <h3>Elige tu Plan</h3>
                    <p>Selecciona el plan que mejor se adapte al tamaño y necesidades de tu iglesia.</p>
                </div>
                <div class="step-card">
                    <div class="step-num">2</div>
                    <h3>Configura tu Espacio</h3>
                    <p>Personaliza tu plataforma con el logo, colores e información de tu iglesia.</p>
                </div>
                <div class="step-card">
                    <div class="step-num">3</div>
                    <h3>¡Comienza a Gestionar!</h3>
                    <p>Invita a tu equipo y empieza a administrar miembros, eventos y finanzas de inmediato.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ====== PRICING ====== -->
    <section class="section section-gray" id="pricing">
        <div class="container text-center">
            <span class="section-badge">Planes</span>
            <h2 class="section-title">Precios simples y transparentes</h2>
            <p class="section-desc">Sin contratos a largo plazo. Cancela cuando quieras. Todos los planes incluyen soporte.</p>
            <div class="pricing-grid">
                <!-- Plan Iglesia Pequeña -->
                <div class="pricing-card">
                    <div class="pricing-name">Semilla</div>
                    <div class="pricing-desc">Ideal para iglesias pequeñas que están comenzando</div>
                    <div class="pricing-price">
                        <span class="pricing-currency">$</span>
                        <span class="pricing-amount">29</span>
                    </div>
                    <div class="pricing-period">USD / mes</div>
                    <ul class="pricing-features">
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Hasta 100 miembros
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            5 grupos / células
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Calendario de eventos
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Reportes básicos
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Soporte por correo
                        </li>
                    </ul>
                    <a href="#" class="btn btn-outline">Comenzar Gratis</a>
                </div>

                <!-- Plan Iglesia Mediana -->
                <div class="pricing-card popular">
                    <div class="pricing-popular-badge">Más Popular</div>
                    <div class="pricing-name">Crecimiento</div>
                    <div class="pricing-desc">Para iglesias en expansión que necesitan más</div>
                    <div class="pricing-price">
                        <span class="pricing-currency">$</span>
                        <span class="pricing-amount">59</span>
                    </div>
                    <div class="pricing-period">USD / mes</div>
                    <ul class="pricing-features">
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Hasta 500 miembros
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Grupos ilimitados
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Módulo financiero completo
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Reportes avanzados
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Soporte prioritario
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Dominio personalizado
                        </li>
                    </ul>
                    <a href="#" class="btn btn-primary">Comenzar Ahora</a>
                </div>

                <!-- Plan Iglesia Grande -->
                <div class="pricing-card">
                    <div class="pricing-name">Cosecha</div>
                    <div class="pricing-desc">Para iglesias grandes y multi-sede</div>
                    <div class="pricing-price">
                        <span class="pricing-currency">$</span>
                        <span class="pricing-amount">99</span>
                    </div>
                    <div class="pricing-period">USD / mes</div>
                    <ul class="pricing-features">
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Miembros ilimitados
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Todo en Crecimiento
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Multi-sede / campus
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            API y webhooks
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Soporte dedicado 24/7
                        </li>
                        <li>
                            <svg fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg>
                            Onboarding personalizado
                        </li>
                    </ul>
                    <a href="#" class="btn btn-outline">Contactar Ventas</a>
                </div>
            </div>
        </div>
    </section>

    <!-- ====== TESTIMONIALS ====== -->
    <section class="section section-navy" id="testimonials">
        <div class="container text-center">
            <span class="section-badge">Testimonios</span>
            <h2 class="section-title">Lo que dicen nuestras iglesias</h2>
            <p class="section-desc">Líderes y pastores que ya confían en Poimano para gestionar sus congregaciones.</p>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <p class="testimonial-text">"Poimano transformó la manera en que administramos nuestra iglesia. Ahora todo está organizado y accesible desde cualquier lugar."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">PR</div>
                        <div>
                            <div class="testimonial-name">Pastor Rodríguez</div>
                            <div class="testimonial-role">Iglesia Vida Nueva, Bogotá</div>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <p class="testimonial-text">"El módulo de finanzas nos ha dado una claridad increíble sobre nuestros diezmos y ofrendas. Los reportes son exactamente lo que necesitábamos."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">ML</div>
                        <div>
                            <div class="testimonial-name">Pastora López</div>
                            <div class="testimonial-role">Centro Cristiano Gracia, Medellín</div>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <div class="testimonial-stars">
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <p class="testimonial-text">"Gestionar 3 sedes desde una sola plataforma era un sueño. Poimano lo hizo realidad con una interfaz increíblemente fácil de usar."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">CT</div>
                        <div>
                            <div class="testimonial-name">Pastor Torres</div>
                            <div class="testimonial-role">Iglesia El Redentor, Cali</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ====== CTA ====== -->
    <section class="cta-section">
        <div class="container">
            <div class="cta-box">
                <h2>¿Listo para transformar tu iglesia?</h2>
                <p>Únete a las iglesias que ya gestionan su congregación de forma moderna, segura y eficiente.</p>
                <a href="#pricing" class="btn btn-primary btn-lg">Comenzar Ahora — Es Gratis</a>
            </div>
        </div>
    </section>

    <!-- ====== FOOTER ====== -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                    @if($logoWhite)
                        <img src="{{ $logoWhite }}" alt="Poimano" style="height: 2.5rem; margin-bottom: 1rem;">
                    @else
                        <div class="footer-brand-name">Poimano</div>
                    @endif
                    <p class="footer-brand-desc">Plataforma SaaS moderna para la gestión integral de iglesias y ministerios.</p>
                </div>
                <div class="footer-col">
                    <h4>Producto</h4>
                    <ul>
                        <li><a href="#features">Características</a></li>
                        <li><a href="#pricing">Planes</a></li>
                        <li><a href="#how-it-works">Cómo Funciona</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Soporte</h4>
                    <ul>
                        <li><a href="#">Centro de Ayuda</a></li>
                        <li><a href="#">Documentación</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Términos de Servicio</a></li>
                        <li><a href="#">Privacidad</a></li>
                        <li><a href="#">Cookies</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; {{ date('Y') }} Poimano. Todos los derechos reservados.</p>
                <p class="footer-verse">"Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo." — Salmos 23:4</p>
            </div>
        </div>
    </footer>

    <script>
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            var navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    </script>
</body>
</html>
