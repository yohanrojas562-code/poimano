import { Head, Link } from '@inertiajs/react'
import {
    Church, ArrowLeft, ArrowUp, Menu, X, ChevronRight,
    Heart, Music, Baby, Users, Globe,
} from 'lucide-react'
import { useState, useEffect } from 'react'

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

interface MinistryData {
    id: number
    name: string
    slug: string
    icon: string
    image: string | null
    description: string | null
    content: string | null
    gallery: string[]
}

interface Props {
    church: ChurchData
    ministry: MinistryData
    template: string
}

const iconMap: Record<string, React.ElementType> = {
    music: Music, baby: Baby, users: Users, globe: Globe,
    heart: Heart, church: Church,
}

export default function MinistryDetail({ church, ministry }: Props) {
    const [scrolled, setScrolled] = useState(false)
    const [lightboxImg, setLightboxImg] = useState<string | null>(null)

    const primary = church.primary_color
    const secondary = church.secondary_color

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const Icon = iconMap[ministry.icon] || Heart

    return (
        <>
            <Head title={`${ministry.name} — ${church.name}`}>
                {church.favicon && <link rel="icon" href={church.favicon} />}
            </Head>

            {/* ═══════ NAVBAR ═══════ */}
            <nav
                className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'shadow-2xl backdrop-blur-lg' : ''}`}
                style={{ backgroundColor: scrolled ? `${primary}e6` : primary }}
            >
                <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6">
                    <a href="/" className="group flex items-center gap-3">
                        {church.logo ? (
                            <img src={church.logo} alt="" className="h-8 rounded-lg object-contain" />
                        ) : (
                            <Church className="h-7 w-7" style={{ color: secondary }} />
                        )}
                        <span className="text-lg font-bold tracking-tight text-white">{church.name}</span>
                    </a>
                    <a
                        href="/#ministries"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Volver
                    </a>
                </div>
            </nav>

            {/* ═══════ HERO BANNER ═══════ */}
            <section
                className="relative flex min-h-[50vh] items-end overflow-hidden pt-[4.5rem]"
                style={{ backgroundColor: primary }}
            >
                {ministry.image ? (
                    <>
                        <img
                            src={ministry.image}
                            alt={ministry.name}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${primary}ee 0%, ${primary}80 40%, transparent 100%)` }} />
                    </>
                ) : (
                    <>
                        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                            <Icon className="h-48 w-48 text-white" />
                        </div>
                    </>
                )}

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                        <Icon className="h-4 w-4" style={{ color: secondary }} />
                        <span className="text-xs font-semibold text-white/80">Ministerio</span>
                    </div>
                    <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
                        {ministry.name}
                    </h1>
                    {ministry.description && (
                        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/60">
                            {ministry.description}
                        </p>
                    )}
                </div>
            </section>

            {/* ═══════ CONTENT ═══════ */}
            {ministry.content && (
                <section className="bg-white py-16 sm:py-20">
                    <div className="mx-auto max-w-4xl px-6">
                        <div
                            className="prose prose-lg max-w-none text-gray-600 [&>h1]:text-navy [&>h2]:text-navy [&>h3]:text-navy [&>p]:leading-relaxed [&>img]:rounded-xl [&>img]:shadow-lg"
                            style={{ '--tw-prose-links': secondary } as React.CSSProperties}
                            dangerouslySetInnerHTML={{ __html: ministry.content }}
                        />
                    </div>
                </section>
            )}

            {/* ═══════ GALLERY ═══════ */}
            {ministry.gallery && ministry.gallery.length > 0 && (
                <section className="py-16 sm:py-20" style={{ backgroundColor: '#F8FAFC' }}>
                    <div className="mx-auto max-w-7xl px-6">
                        <div className="text-center">
                            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ backgroundColor: secondary + '12' }}>
                                <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: secondary }} />
                                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: secondary }}>Galería</span>
                            </div>
                            <h2 className="text-3xl font-extrabold" style={{ color: primary }}>
                                Momentos del ministerio
                            </h2>
                        </div>

                        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
                            {ministry.gallery.map((img, i) => (
                                <div
                                    key={i}
                                    className="mb-4 cursor-pointer overflow-hidden rounded-2xl shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl hover:ring-transparent break-inside-avoid"
                                    onClick={() => setLightboxImg(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`${ministry.name} - ${i + 1}`}
                                        className="w-full object-cover transition-transform duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══════ BACK CTA ═══════ */}
            <section className="bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 text-center">
                    <a
                        href="/#ministries"
                        className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{ backgroundColor: secondary }}
                    >
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Ver todos los ministerios
                    </a>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <footer className="relative overflow-hidden" style={{ backgroundColor: primary }}>
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${secondary}, ${primary}, ${secondary})` }} />
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-3">
                            {church.logo ? (
                                <img src={church.logo} alt="" className="h-8 rounded-lg object-contain" />
                            ) : (
                                <Church className="h-6 w-6" style={{ color: secondary }} />
                            )}
                            <span className="font-bold text-white">{church.name}</span>
                        </div>
                        <p className="text-xs text-white/25">
                            © {new Date().getFullYear()} {church.name}. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>

            {/* ═══════ LIGHTBOX ═══════ */}
            {lightboxImg && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    onClick={() => setLightboxImg(null)}
                >
                    <button
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                        onClick={() => setLightboxImg(null)}
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <img
                        src={lightboxImg}
                        alt=""
                        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}

            {/* ═══════ SCROLL TO TOP ═══════ */}
            {scrolled && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition hover:opacity-90"
                    style={{ backgroundColor: secondary, color: primary }}
                >
                    <ArrowUp className="h-4 w-4" />
                </button>
            )}

            {/* Hidden admin link */}
            <a href="/login" className="fixed bottom-3 left-3 z-40 text-[10px] text-gray-300 hover:text-gray-500 transition-colors">Admin</a>
        </>
    )
}
