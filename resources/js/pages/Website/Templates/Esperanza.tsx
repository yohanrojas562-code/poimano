import { Head, Link, router } from '@inertiajs/react'
import {
    Church, Phone, Mail, MapPin, Clock, ChevronRight,
    Facebook, Instagram, Youtube, Music, Baby, Users, Globe,
    Heart, ArrowUp, Menu, X,
} from 'lucide-react'
import { useState, useEffect, useMemo, useRef } from 'react'

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

interface MinistryItem {
    id: number
    name: string
    slug: string
    icon: string
    image: string | null
    description: string | null
}

interface SocialLink {
    platform: string
    icon: string
    url: string
}

interface WhatsappData {
    phone: string
    message: string | null
}

interface Props {
    church: ChurchData
    sections: Sections
    template: string
    ministries: MinistryItem[]
    socials?: SocialLink[]
    whatsapp?: WhatsappData | null
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
/* ── Social Icon SVGs (footer) ── */
function FooterSocialIcon({ icon }: { icon: string }) {
    const svgs: Record<string, React.ReactNode> = {
        facebook: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
        instagram: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>,
        youtube: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
        tiktok: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
        twitter: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
        threads: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.186.408-2.26 1.33-3.023.812-.672 1.927-1.073 3.222-1.161 1.06-.072 2.056.04 2.986.335l.027.01c-.006-.636-.06-1.218-.168-1.74-.26-1.26-.784-2.136-1.56-2.602-1.073-.645-2.384-.601-3.27-.378l-.544-1.924c1.2-.339 2.857-.424 4.357.476 1.12.673 1.887 1.847 2.221 3.39.17.782.235 1.657.197 2.612.497.234.963.522 1.393.871 1.018.826 1.742 1.943 2.093 3.228.486 1.778.284 4.278-1.774 6.294-1.818 1.782-4.063 2.544-7.18 2.568zm-1.17-7.025c-.81.055-1.448.272-1.896.645-.45.373-.648.853-.612 1.468.028.506.26.95.692 1.229.539.35 1.285.52 2.097.476 1.074-.058 1.89-.446 2.425-1.152.432-.57.718-1.32.85-2.23-.695-.232-1.471-.354-2.317-.354-.4 0-.82.027-1.239.082v-.164z"/></svg>,
        linkedin: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
        spotify: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
        telegram: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0 12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
        pinterest: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>,
        snapchat: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.87-.21.24-.12.36-.15.51-.15.18 0 .33.06.45.18.15.135.21.3.21.48-.015.36-.36.63-.795.93-.36.24-.765.465-1.17.585-.045.015-.105.03-.15.045-.088.022-.165.045-.225.07-.18.074-.189.135-.21.315v.015c.06.45.135.885.33 1.29.36.72 1.08 1.305 1.86 1.545.15.045.285.075.405.09a.696.696 0 01.59.525c.015.06.015.135 0 .21-.105.45-.75.75-1.86.87l-.06.01c-.12.015-.24.03-.33.045-.51.06-1.11.15-1.44.435-.375.33-.51.39-.66.585-.21.3-1.245 1.89-3.87 1.89-2.625 0-3.66-1.59-3.87-1.89-.15-.195-.285-.255-.66-.585-.33-.285-.93-.375-1.44-.435a8.632 8.632 0 00-.33-.045l-.06-.01c-1.11-.12-1.755-.42-1.86-.87a.578.578 0 010-.21.696.696 0 01.59-.525c.12-.015.255-.045.405-.09.78-.24 1.5-.825 1.86-1.545.195-.405.27-.84.33-1.29v-.015c-.021-.18-.03-.241-.21-.315a1.567 1.567 0 00-.225-.07c-.045-.015-.105-.03-.15-.045-.42-.12-.81-.345-1.17-.585-.435-.3-.78-.57-.795-.93a.524.524 0 01.21-.48.5.5 0 01.45-.18c.15 0 .27.03.51.15.21.09.57.194.87.21.198 0 .326-.045.401-.09a8.087 8.087 0 01-.033-.57c-.096-1.629-.222-3.654.297-4.847C7.86 1.069 11.216.793 12.206.793z"/></svg>,
        twitch: <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>,
        website: <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    }
    return <>{svgs[icon] || svgs.website}</>
}

export default function Esperanza({ church, sections, ministries, socials, whatsapp }: Props) {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    const primary = church.primary_color
    const secondary = church.secondary_color
    const logoH = sections.hero?.logo_height ?? 40

    /* ── Real-time polling: refresh props every 5s ── */
    const pollRef = useRef<ReturnType<typeof setInterval>>()
    useEffect(() => {
        pollRef.current = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true })
        }, 5000)
        return () => clearInterval(pollRef.current)
    }, [])

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
                                            src={sections.services.image.startsWith('/') ? sections.services.image : `/storage/${sections.services.image}`}
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

                        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {(ministries.length > 0 ? ministries : sections.ministries.items).map((item, i) => {
                                const isNew = 'slug' in item
                                const slug = isNew ? (item as MinistryItem).slug : ''
                                const image = isNew ? (item as MinistryItem).image : null
                                const iconKey = isNew ? (item as MinistryItem).icon : (item as { icon: string }).icon
                                const Icon = iconMap[iconKey] || Heart

                                const card = (
                                    <div
                                        key={i}
                                        className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-transparent"
                                    >
                                        {/* Image or icon placeholder */}
                                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                                            {image ? (
                                                <img src={image} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                            ) : (
                                                <div className="flex h-full items-center justify-center" style={{ background: `linear-gradient(135deg, ${primary}10, ${secondary}10)` }}>
                                                    <Icon className="h-14 w-14 opacity-30" style={{ color: secondary }} />
                                                </div>
                                            )}
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                                            {/* Name on image */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5">
                                                <h3 className="text-lg font-bold text-white drop-shadow-lg">
                                                    {item.name}
                                                </h3>
                                            </div>
                                        </div>
                                        {/* Description */}
                                        <div className="p-5">
                                            <p className="text-sm leading-relaxed text-gray-500">
                                                {item.description || ''}
                                            </p>
                                            {isNew && (
                                                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold" style={{ color: secondary }}>
                                                    Ver más <ChevronRight className="h-3 w-3" />
                                                </span>
                                            )}
                                        </div>
                                        {/* Bottom accent */}
                                        <div
                                            className="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"
                                            style={{ backgroundColor: secondary }}
                                        />
                                    </div>
                                )

                                return isNew ? (
                                    <a key={i} href={`/ministerios/${slug}`} className="block">{card}</a>
                                ) : card
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
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {socials && socials.length > 0 ? (
                                        socials.map((s, i) => (
                                            <a
                                                key={i}
                                                href={s.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20"
                                                title={s.platform}
                                            >
                                                <FooterSocialIcon icon={s.icon} />
                                            </a>
                                        ))
                                    ) : (
                                        <>
                                            {sections.footer.social_links?.facebook && (
                                                <a href={sections.footer.social_links.facebook} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20">
                                                    <Facebook className="h-4 w-4" />
                                                </a>
                                            )}
                                            {sections.footer.social_links?.instagram && (
                                                <a href={sections.footer.social_links.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20">
                                                    <Instagram className="h-4 w-4" />
                                                </a>
                                            )}
                                            {sections.footer.social_links?.youtube && (
                                                <a href={sections.footer.social_links.youtube} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:text-white hover:ring-white/20">
                                                    <Youtube className="h-4 w-4" />
                                                </a>
                                            )}
                                        </>
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
                            <p>
                                {(sections.footer.copyright ?? '© {year} {church_name}')
                                    .replace('{year}', new Date().getFullYear().toString())
                                    .replace('{church_name}', church.name)}
                            </p>
                            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-white/15">
                                Creado con tecnología
                                <a
                                    href="https://poimano.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold tracking-wide text-white/25 transition-colors hover:text-white/40"
                                >
                                    Poimano
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            )}

            {/* ═══════ WHATSAPP FLOATING BUTTON ═══════ */}
            {whatsapp && whatsapp.phone && (
                <a
                    href={`https://wa.me/${whatsapp.phone}${whatsapp.message ? `?text=${encodeURIComponent(whatsapp.message)}` : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-2xl"
                    title="Chatea con nosotros por WhatsApp"
                >
                    <svg viewBox="0 0 24 24" width={28} height={28} fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
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
