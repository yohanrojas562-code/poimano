import { Head, Link } from '@inertiajs/react'
import {
    Church, Phone, Mail, MapPin, Clock, ChevronRight,
    Facebook, Instagram, Youtube, Music, Baby, Users, Globe,
    Heart, ArrowUp, Menu, X,
} from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

/**
 * Converts any Google Maps URL to its embeddable version.
 * Supports: regular URLs, embed URLs (passthrough), and raw iframe HTML (extracts src).
 */
function toGoogleMapsEmbedUrl(raw: string | null): string | null {
    if (!raw) return null
    const input = raw.trim()

    // If user pasted a full <iframe ...> tag, extract the src
    const iframeMatch = input.match(/src=["']([^"']+)["']/i)
    if (iframeMatch) return iframeMatch[1]

    // Already an embed URL → pass through
    if (input.includes('/maps/embed') || input.includes('output=embed')) return input

    // Any Google Maps URL → convert via output=embed trick
    if (input.match(/google\.\w+\/maps/i) || input.match(/maps\.google\./i) || input.match(/goo\.gl\/maps/i)) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(input)}&output=embed`
    }

    // Not recognized — use as-is
    return input
}

/* ── Types ── */
interface ChurchData {
    name: string
    logo: string | null
    favicon: string | null
    slogan: string | null
    primary_color: string
    secondary_color: string
    text_color: string
    phone: string | null
    email: string | null
    address: string | null
    city: string | null
    website: string | null
}

interface Sections {
    hero?: {
        headline: string
        subheadline: string
        cta_text: string
        cta_link: string
        bg_image: string | null
        overlay_opacity: number
        logo_height: number
    }
    about?: {
        title: string
        subtitle: string
        description: string
        image: string | null
        stats: Array<{ label: string; value: string }>
    }
    services?: {
        title: string
        subtitle: string
        image: string | null
        items: Array<{ day: string; time: string; name: string; description: string }>
    }
    ministries?: {
        title: string
        subtitle: string
        items: Array<{ name: string; icon: string; description: string }>
    }
    contact?: {
        title: string
        subtitle: string
        show_map: boolean
        map_embed_url: string | null
    }
    footer?: {
        description: string
        social_links: { facebook: string; instagram: string; youtube: string }
        copyright: string
    }
}

interface Props {
    church: ChurchData
    sections: Sections
    template: string
}

/* ── Icon Map ── */
const iconMap: Record<string, React.ElementType> = {
    music: Music,
    baby: Baby,
    users: Users,
    globe: Globe,
    heart: Heart,
    church: Church,
}

/* ── Component ── */
export default function Esperanza({ church, sections }: Props) {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const primary = church.primary_color
    const secondary = church.secondary_color
    const logoH = sections.hero?.logo_height ?? 40

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    const navLinks = [
        { label: 'Inicio', href: '#hero' },
        { label: 'Nosotros', href: '#about' },
        { label: 'Horarios', href: '#services' },
        { label: 'Ministerios', href: '#ministries' },
        { label: 'Contacto', href: '#contact' },
    ]

    return (
        <>
            <Head title={church.name}>
                {church.favicon && <link rel="icon" href={church.favicon} />}
            </Head>

            {/* ═══════ NAVBAR ═══════ */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                    scrolled ? 'shadow-2xl backdrop-blur-lg' : ''
                }`}
                style={{
                    backgroundColor: scrolled ? `${primary}e6` : 'transparent',
                }}
            >
                <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6">
                    <a href="#hero" className="group flex items-center gap-3">
                        {church.logo ? (
                            <img src={church.logo} alt="" className="rounded-lg object-contain transition-transform duration-300 group-hover:scale-105" style={{ height: `${logoH}px` }} />
                        ) : (
                            <Church className="h-7 w-7" style={{ color: secondary }} />
                        )}
                        <span className="text-lg font-bold tracking-tight text-white">{church.name}</span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-1 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-sm md:hidden"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        {mobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenu && (
                    <div className="border-t border-white/10 px-6 pb-5 pt-2 backdrop-blur-xl md:hidden" style={{ backgroundColor: `${primary}f0` }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block rounded-lg px-3 py-3 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                onClick={() => setMobileMenu(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* ═══════ HERO ═══════ */}
            {sections.hero && (
                <section
                    id="hero"
                    className="relative flex min-h-screen items-center justify-center overflow-hidden"
                    style={{ backgroundColor: primary }}
                >
                    {sections.hero.bg_image && (
                        <>
                            <img
                                src={sections.hero.bg_image}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundColor: primary,
                                    opacity: (sections.hero.overlay_opacity ?? 60) / 100,
                                }}
                            />
                        </>
                    )}

                    {/* Decorative blurred orbs */}
                    <div
                        className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl"
                        style={{ backgroundColor: secondary }}
                    />
                    <div
                        className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full opacity-15 blur-3xl"
                        style={{ backgroundColor: secondary }}
                    />
                    <div
                        className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full opacity-10 blur-2xl"
                        style={{ backgroundColor: secondary }}
                    />
                    {/* Dot pattern */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
                        {church.logo && (
                            <div className="mb-10 inline-block">
                                <div className="relative">
                                    <img
                                        src={church.logo}
                                        alt=""
                                        className="mx-auto rounded-2xl object-contain"
                                        style={{ height: `${Math.round(logoH * 2.2)}px` }}
                                    />
                                    <div className="absolute -inset-4 -z-10 rounded-3xl opacity-25 blur-2xl" style={{ backgroundColor: secondary }} />
                                </div>
                            </div>
                        )}
                        <h1 className="text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            {sections.hero.headline}
                        </h1>
                        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl">
                            {sections.hero.subheadline}
                        </p>
                        {sections.hero.cta_text && (
                            <div className="mt-12">
                                <a
                                    href={sections.hero.cta_link || '#about'}
                                    className="group inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    style={{ backgroundColor: secondary }}
                                >
                                    {sections.hero.cta_text}
                                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/25">Descubre más</span>
                            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
                                <div className="h-2.5 w-1 animate-bounce rounded-full bg-white/50" />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ ABOUT ═══════ */}
            {sections.about && (
                <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
                    {/* Decorative background shapes */}
                    <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full opacity-[0.03]" style={{ backgroundColor: primary }} />
                    <div className="absolute bottom-0 left-0 h-72 w-72 -translate-x-1/3 translate-y-1/3 rounded-full opacity-[0.04]" style={{ backgroundColor: secondary }} />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="grid items-center gap-16 lg:grid-cols-2">
                            {/* Image or placeholder */}
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                                    {sections.about.image ? (
                                        <img
                                            src={sections.about.image}
                                            alt=""
                                            className="aspect-[4/3] w-full object-cover"
                                        />
                                    ) : (
                                        <div
                                            className="flex aspect-[4/3] items-center justify-center"
                                            style={{ backgroundColor: primary + '08' }}
                                        >
                                            <Church className="h-28 w-28 opacity-10" style={{ color: primary }} />
                                        </div>
                                    )}
                                </div>
                                {/* Decorative accent frame */}
                                <div
                                    className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-3xl"
                                    style={{ backgroundColor: secondary + '18' }}
                                />
                                <div
                                    className="absolute -left-3 -top-3 h-20 w-20 rounded-2xl opacity-60"
                                    style={{ backgroundColor: secondary }}
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: secondary + '12' }}>
                                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: secondary }} />
                                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                                        {sections.about.subtitle}
                                    </span>
                                </div>
                                <h2
                                    className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                                    style={{ color: primary }}
                                >
                                    {sections.about.title}
                                </h2>
                                <div
                                    className="mt-6 text-base leading-relaxed text-gray-500 prose prose-lg max-w-none [&>p]:leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: sections.about.description }}
                                />

                                {/* Stats */}
                                {sections.about.stats && sections.about.stats.length > 0 && (
                                    <div className="mt-10 flex flex-wrap gap-3">
                                        {sections.about.stats.map((stat, i) => (
                                            <div
                                                key={i}
                                                className="flex-1 min-w-[100px] rounded-2xl border border-gray-100 bg-gray-50/50 p-5 text-center"
                                            >
                                                <p
                                                    className="text-2xl font-extrabold sm:text-3xl"
                                                    style={{ color: primary }}
                                                >
                                                    {stat.value}
                                                </p>
                                                <p className="mt-1 text-xs font-medium text-gray-400">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ SERVICES / HORARIOS ═══════ */}
            {sections.services && (
                <section id="services" className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: '#F8FAFC' }}>
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(${secondary} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left — Schedule cards */}
                            <div className="flex flex-col justify-center lg:pr-4">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: secondary + '12' }}>
                                    <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: secondary }} />
                                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                                        {sections.services.subtitle}
                                    </span>
                                </div>
                                <h2
                                    className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                                    style={{ color: primary }}
                                >
                                    {sections.services.title}
                                </h2>

                                <div className="mt-10 space-y-4">
                                    {sections.services.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="group relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-transparent"
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* Icon badge */}
                                                <div
                                                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                                                    style={{ backgroundColor: secondary }}
                                                >
                                                    <Clock className="h-5 w-5" />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <h3
                                                        className="text-base font-bold truncate"
                                                        style={{ color: primary }}
                                                    >
                                                        {item.name}
                                                    </h3>
                                                    <p className="mt-0.5 text-sm font-semibold" style={{ color: secondary }}>
                                                        {item.day} · {item.time}
                                                    </p>
                                                </div>
                                            </div>
                                            {item.description && (
                                                <p className="mt-3 text-sm leading-relaxed text-gray-500 pl-16">
                                                    {item.description}
                                                </p>
                                            )}
                                            {/* Hover accent */}
                                            <div
                                                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-300 group-hover:w-full"
                                                style={{ backgroundColor: secondary }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right — Image */}
                            <div className="relative order-first lg:order-last">
                                <div className="overflow-hidden rounded-3xl shadow-2xl">
                                    {sections.services.image ? (
                                        <img
                                            src={`/storage/${sections.services.image}`}
                                            alt={sections.services.title}
                                            className="aspect-[3/4] w-full object-cover lg:aspect-auto lg:h-[560px]"
                                        />
                                    ) : (
                                        <div
                                            className="flex aspect-[3/4] items-center justify-center lg:aspect-auto lg:h-[560px]"
                                            style={{ backgroundColor: primary }}
                                        >
                                            <Clock className="h-28 w-28 text-white/10" />
                                        </div>
                                    )}
                                </div>
                                {/* Decorative frame */}
                                <div
                                    className="absolute -bottom-5 -left-5 -z-10 h-full w-full rounded-3xl"
                                    style={{ backgroundColor: secondary + '15' }}
                                />
                                <div
                                    className="absolute -right-3 -top-3 h-16 w-16 rounded-2xl opacity-50"
                                    style={{ backgroundColor: secondary }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ MINISTRIES ═══════ */}
            {sections.ministries && (
                <section id="ministries" className="relative overflow-hidden bg-white py-24 sm:py-32">
                    {/* Decorative */}
                    <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]" style={{ backgroundColor: secondary }} />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: secondary + '12' }}>
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: secondary }} />
                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                                    {sections.ministries.subtitle}
                                </span>
                            </div>
                            <h2
                                className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                                style={{ color: primary }}
                            >
                                {sections.ministries.title}
                            </h2>
                        </div>

                        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {sections.ministries.items.map((item, i) => {
                                const Icon = iconMap[item.icon] || Heart
                                return (
                                    <div
                                        key={i}
                                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-white p-7 text-center ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-transparent"
                                    >
                                        {/* Hover background glow */}
                                        <div
                                            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                            style={{ background: `linear-gradient(135deg, ${secondary}08, ${primary}05)` }}
                                        />
                                        <div className="relative">
                                            <div
                                                className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md"
                                                style={{ backgroundColor: secondary + '12' }}
                                            >
                                                <Icon className="h-7 w-7" style={{ color: secondary }} />
                                            </div>
                                            <h3
                                                className="mt-6 text-lg font-bold"
                                                style={{ color: primary }}
                                            >
                                                {item.name}
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
                                        </div>
                                        {/* Bottom accent line */}
                                        <div
                                            className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-300 group-hover:w-1/2"
                                            style={{ backgroundColor: secondary }}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ CONTACT ═══════ */}
            {sections.contact && (
                <section id="contact" className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: '#F8FAFC' }}>
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(${primary} 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                    <div className="relative mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: secondary + '12' }}>
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: secondary }} />
                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>
                                    {sections.contact.subtitle}
                                </span>
                            </div>
                            <h2
                                className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
                                style={{ color: primary }}
                            >
                                {sections.contact.title}
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Info cards */}
                            {church.address && (
                                <div className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-transparent">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: secondary + '12' }}
                                    >
                                        <MapPin className="h-5 w-5" style={{ color: secondary }} />
                                    </div>
                                    <p className="mt-5 text-sm font-bold" style={{ color: primary }}>Dirección</p>
                                    <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                                        {church.address}
                                        {church.city && `, ${church.city}`}
                                    </p>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: secondary }} />
                                </div>
                            )}
                            {church.phone && (
                                <div className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-transparent">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: secondary + '12' }}
                                    >
                                        <Phone className="h-5 w-5" style={{ color: secondary }} />
                                    </div>
                                    <p className="mt-5 text-sm font-bold" style={{ color: primary }}>Teléfono</p>
                                    <p className="mt-1.5 text-sm text-gray-500">{church.phone}</p>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: secondary }} />
                                </div>
                            )}
                            {church.email && (
                                <div className="group relative overflow-hidden rounded-2xl bg-white p-7 shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:ring-transparent">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110"
                                        style={{ backgroundColor: secondary + '12' }}
                                    >
                                        <Mail className="h-5 w-5" style={{ color: secondary }} />
                                    </div>
                                    <p className="mt-5 text-sm font-bold" style={{ color: primary }}>Correo</p>
                                    <p className="mt-1.5 text-sm text-gray-500">{church.email}</p>
                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" style={{ backgroundColor: secondary }} />
                                </div>
                            )}
                        </div>

                        {/* Map embed (if configured) */}
                        {sections.contact.show_map && sections.contact.map_embed_url && (() => {
                            const embedUrl = toGoogleMapsEmbedUrl(sections.contact.map_embed_url)
                            if (!embedUrl) return null
                            return (
                                <div className="mt-12 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-gray-200">
                                    <iframe
                                        src={embedUrl}
                                        className="h-96 w-full border-0"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Ubicación"
                                    />
                                </div>
                            )
                        })()}
                    </div>
                </section>
            )}

            {/* ═══════ FOOTER ═══════ */}
            {sections.footer && (
                <footer className="relative overflow-hidden" style={{ backgroundColor: primary }}>
                    {/* Top gradient accent */}
                    <div className="h-1" style={{ background: `linear-gradient(90deg, ${secondary}, ${primary}, ${secondary})` }} />

                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="grid gap-12 md:grid-cols-3">
                            {/* Brand */}
                            <div>
                                <div className="flex items-center gap-3">
                                    {church.logo ? (
                                        <img src={church.logo} alt="" className="rounded-lg object-contain" style={{ height: `${Math.round(logoH * 0.8)}px` }} />
                                    ) : (
                                        <Church className="h-7 w-7" style={{ color: secondary }} />
                                    )}
                                    <span className="text-lg font-bold tracking-tight text-white">{church.name}</span>
                                </div>
                                <p className="mt-5 text-sm leading-relaxed text-white/40">
                                    {sections.footer.description}
                                </p>
                            </div>

                            {/* Quick links */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                                    Navegación
                                </h4>
                                <ul className="mt-5 space-y-3">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className="group flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
                                            >
                                                <ChevronRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" style={{ color: secondary }} />
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Social & Contact */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                                    Síguenos
                                </h4>
                                <div className="mt-5 flex gap-3">
                                    {sections.footer.social_links?.facebook && (
                                        <a
                                            href={sections.footer.social_links.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20"
                                        >
                                            <Facebook className="h-4 w-4" />
                                        </a>
                                    )}
                                    {sections.footer.social_links?.instagram && (
                                        <a
                                            href={sections.footer.social_links.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20"
                                        >
                                            <Instagram className="h-4 w-4" />
                                        </a>
                                    )}
                                    {sections.footer.social_links?.youtube && (
                                        <a
                                            href={sections.footer.social_links.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20"
                                        >
                                            <Youtube className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>

                                {/* Contact info in footer */}
                                <div className="mt-8 space-y-3">
                                    {church.phone && (
                                        <p className="flex items-center gap-2.5 text-sm text-white/35">
                                            <Phone className="h-3.5 w-3.5" style={{ color: secondary + '80' }} /> {church.phone}
                                        </p>
                                    )}
                                    {church.email && (
                                        <p className="flex items-center gap-2.5 text-sm text-white/35">
                                            <Mail className="h-3.5 w-3.5" style={{ color: secondary + '80' }} /> {church.email}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-14 border-t border-white/[0.06] pt-7 text-center text-xs text-white/25">
                            {(sections.footer.copyright ?? '© {year} {church_name}')
                                .replace('{year}', new Date().getFullYear().toString())
                                .replace('{church_name}', church.name)}
                        </div>
                    </div>
                </footer>
            )}

            {/* ═══════ SCROLL TO TOP ═══════ */}
            {scrolled && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition hover:opacity-90"
                    style={{ backgroundColor: secondary, color: primary }}
                >
                    <ArrowUp className="h-4 w-4" />
                </button>
            )}

            {/* Hidden admin link */}
            <a
                href="/login"
                className="fixed bottom-3 left-3 z-40 text-[10px] text-gray-300 hover:text-gray-500 transition-colors"
            >
                Admin
            </a>
        </>
    )
}
