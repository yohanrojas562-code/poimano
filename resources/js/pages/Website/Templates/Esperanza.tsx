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
            <Head title={church.name} />

            {/* ═══════ NAVBAR ═══════ */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
                    scrolled ? 'shadow-lg' : ''
                }`}
                style={{
                    backgroundColor: scrolled ? primary : 'transparent',
                }}
            >
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <a href="#hero" className="flex items-center gap-3">
                        {church.logo ? (
                            <img src={church.logo} alt="" className="rounded-lg object-contain" style={{ height: `${logoH}px` }} />
                        ) : (
                            <Church className="h-7 w-7" style={{ color: secondary }} />
                        )}
                        <span className="text-lg font-bold text-white">{church.name}</span>
                    </a>

                    {/* Desktop links */}
                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Mobile toggle */}
                    <button
                        className="text-white md:hidden"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        {mobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenu && (
                    <div className="border-t border-white/10 px-6 pb-4 md:hidden" style={{ backgroundColor: primary }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="block py-3 text-sm text-white/80 hover:text-white"
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
                                className="absolute inset-0 h-full w-full object-cover"
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

                    {/* Decorative circles */}
                    <div
                        className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-10"
                        style={{ backgroundColor: secondary }}
                    />
                    <div
                        className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-10"
                        style={{ backgroundColor: secondary }}
                    />

                    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                        {church.logo && (
                            <img
                                src={church.logo}
                                alt=""
                                className="mx-auto mb-8 rounded-2xl object-contain ring-2 ring-white/20"
                                style={{ height: `${Math.round(logoH * 2)}px` }}
                            />
                        )}
                        <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                            {sections.hero.headline}
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 sm:text-xl">
                            {sections.hero.subheadline}
                        </p>
                        {sections.hero.cta_text && (
                            <a
                                href={sections.hero.cta_link || '#about'}
                                className="mt-10 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition hover:opacity-90"
                                style={{ backgroundColor: secondary, color: primary }}
                            >
                                {sections.hero.cta_text}
                                <ChevronRight className="h-4 w-4" />
                            </a>
                        )}
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                        <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/30 p-1">
                            <div className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ ABOUT ═══════ */}
            {sections.about && (
                <section id="about" className="bg-white py-20 sm:py-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Image or placeholder */}
                            <div className="relative">
                                {sections.about.image ? (
                                    <img
                                        src={sections.about.image}
                                        alt=""
                                        className="rounded-2xl object-cover shadow-xl"
                                    />
                                ) : (
                                    <div
                                        className="flex aspect-[4/3] items-center justify-center rounded-2xl"
                                        style={{ backgroundColor: primary + '0D' }}
                                    >
                                        <Church className="h-24 w-24 opacity-20" style={{ color: primary }} />
                                    </div>
                                )}
                                {/* Accent decoration */}
                                <div
                                    className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl"
                                    style={{ backgroundColor: secondary + '20' }}
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <p
                                    className="text-sm font-semibold uppercase tracking-widest"
                                    style={{ color: secondary }}
                                >
                                    {sections.about.subtitle}
                                </p>
                                <h2
                                    className="mt-2 text-3xl font-bold sm:text-4xl"
                                    style={{ color: primary }}
                                >
                                    {sections.about.title}
                                </h2>
                                <div
                                    className="mt-6 prose prose-lg max-w-none text-gray-600 [&>p]:leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: sections.about.description }}
                                />

                                {/* Stats */}
                                {sections.about.stats && sections.about.stats.length > 0 && (
                                    <div className="mt-10 grid grid-cols-3 gap-6">
                                        {sections.about.stats.map((stat, i) => (
                                            <div key={i} className="text-center">
                                                <p
                                                    className="text-2xl font-bold sm:text-3xl"
                                                    style={{ color: primary }}
                                                >
                                                    {stat.value}
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
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
                <section id="services" className="py-20 sm:py-28" style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <p
                                className="text-sm font-semibold uppercase tracking-widest"
                                style={{ color: secondary }}
                            >
                                {sections.services.subtitle}
                            </p>
                            <h2
                                className="mt-2 text-3xl font-bold sm:text-4xl"
                                style={{ color: primary }}
                            >
                                {sections.services.title}
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {sections.services.items.map((item, i) => (
                                <div
                                    key={i}
                                    className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
                                >
                                    {/* Accent top bar */}
                                    <div
                                        className="absolute inset-x-0 top-0 h-1 transition-all group-hover:h-1.5"
                                        style={{ backgroundColor: secondary }}
                                    />
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5" style={{ color: secondary }} />
                                        <span className="text-sm font-medium text-gray-500">
                                            {item.day} · {item.time}
                                        </span>
                                    </div>
                                    <h3
                                        className="mt-4 text-xl font-bold"
                                        style={{ color: primary }}
                                    >
                                        {item.name}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ MINISTRIES ═══════ */}
            {sections.ministries && (
                <section id="ministries" className="bg-white py-20 sm:py-28">
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <p
                                className="text-sm font-semibold uppercase tracking-widest"
                                style={{ color: secondary }}
                            >
                                {sections.ministries.subtitle}
                            </p>
                            <h2
                                className="mt-2 text-3xl font-bold sm:text-4xl"
                                style={{ color: primary }}
                            >
                                {sections.ministries.title}
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {sections.ministries.items.map((item, i) => {
                                const Icon = iconMap[item.icon] || Heart
                                return (
                                    <div
                                        key={i}
                                        className="group rounded-2xl border border-gray-100 p-6 text-center transition-all hover:border-transparent hover:shadow-lg"
                                    >
                                        <div
                                            className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: secondary + '15' }}
                                        >
                                            <Icon className="h-6 w-6" style={{ color: secondary }} />
                                        </div>
                                        <h3
                                            className="mt-5 text-lg font-bold"
                                            style={{ color: primary }}
                                        >
                                            {item.name}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ CONTACT ═══════ */}
            {sections.contact && (
                <section id="contact" className="py-20 sm:py-28" style={{ backgroundColor: '#F9FAFB' }}>
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <p
                                className="text-sm font-semibold uppercase tracking-widest"
                                style={{ color: secondary }}
                            >
                                {sections.contact.subtitle}
                            </p>
                            <h2
                                className="mt-2 text-3xl font-bold sm:text-4xl"
                                style={{ color: primary }}
                            >
                                {sections.contact.title}
                            </h2>
                        </div>

                        <div className="mt-14 grid gap-10 lg:grid-cols-3">
                            {/* Info cards */}
                            {church.address && (
                                <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm">
                                    <div
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                                        style={{ backgroundColor: secondary + '15' }}
                                    >
                                        <MapPin className="h-5 w-5" style={{ color: secondary }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{ color: primary }}>Dirección</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {church.address}
                                            {church.city && `, ${church.city}`}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {church.phone && (
                                <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm">
                                    <div
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                                        style={{ backgroundColor: secondary + '15' }}
                                    >
                                        <Phone className="h-5 w-5" style={{ color: secondary }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{ color: primary }}>Teléfono</p>
                                        <p className="mt-1 text-sm text-gray-500">{church.phone}</p>
                                    </div>
                                </div>
                            )}
                            {church.email && (
                                <div className="flex items-start gap-4 rounded-xl bg-white p-6 shadow-sm">
                                    <div
                                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                                        style={{ backgroundColor: secondary + '15' }}
                                    >
                                        <Mail className="h-5 w-5" style={{ color: secondary }} />
                                    </div>
                                    <div>
                                        <p className="font-semibold" style={{ color: primary }}>Correo</p>
                                        <p className="mt-1 text-sm text-gray-500">{church.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Map embed (if configured) */}
                        {sections.contact.show_map && sections.contact.map_embed_url && (() => {
                            const embedUrl = toGoogleMapsEmbedUrl(sections.contact.map_embed_url)
                            if (!embedUrl) return null
                            return (
                                <div className="mt-10 overflow-hidden rounded-2xl shadow-lg">
                                    <iframe
                                        src={embedUrl}
                                        className="h-80 w-full border-0"
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
                <footer style={{ backgroundColor: primary }}>
                    <div className="mx-auto max-w-7xl px-6 py-14">
                        <div className="grid gap-10 md:grid-cols-3">
                            {/* Brand */}
                            <div>
                                <div className="flex items-center gap-3">
                                    {church.logo ? (
                                        <img src={church.logo} alt="" className="rounded-lg object-contain" style={{ height: `${Math.round(logoH * 0.8)}px` }} />
                                    ) : (
                                        <Church className="h-7 w-7" style={{ color: secondary }} />
                                    )}
                                    <span className="text-lg font-bold text-white">{church.name}</span>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-white/50">
                                    {sections.footer.description}
                                </p>
                            </div>

                            {/* Quick links */}
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                                    Navegación
                                </h4>
                                <ul className="mt-4 space-y-2">
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-white/50 hover:text-white transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Social */}
                            <div>
                                <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                                    Síguenos
                                </h4>
                                <div className="mt-4 flex gap-3">
                                    {sections.footer.social_links?.facebook && (
                                        <a
                                            href={sections.footer.social_links.facebook}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                                        >
                                            <Facebook className="h-4 w-4" />
                                        </a>
                                    )}
                                    {sections.footer.social_links?.instagram && (
                                        <a
                                            href={sections.footer.social_links.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                                        >
                                            <Instagram className="h-4 w-4" />
                                        </a>
                                    )}
                                    {sections.footer.social_links?.youtube && (
                                        <a
                                            href={sections.footer.social_links.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white/60 transition hover:bg-white/20 hover:text-white"
                                        >
                                            <Youtube className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>

                                {/* Contact info in footer */}
                                {church.phone && (
                                    <p className="mt-6 flex items-center gap-2 text-sm text-white/40">
                                        <Phone className="h-3.5 w-3.5" /> {church.phone}
                                    </p>
                                )}
                                {church.email && (
                                    <p className="mt-2 flex items-center gap-2 text-sm text-white/40">
                                        <Mail className="h-3.5 w-3.5" /> {church.email}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
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
