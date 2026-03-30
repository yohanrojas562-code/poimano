import { Head, Link, router } from '@inertiajs/react'
import {
    Church, ArrowLeft, ArrowUp, Menu, X, ChevronRight, Heart,
} from 'lucide-react'
import { ICON_MAP } from '@/lib/ministry-icons'
import { useState, useEffect, useRef } from 'react'

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

interface WhatsappData {
    phone: string
    message: string | null
}

interface Props {
    church: ChurchData
    ministry: MinistryData
    template: string
    whatsapp?: WhatsappData | null
}

const iconMap = ICON_MAP

export default function MinistryDetail({ church, ministry, whatsapp }: Props) {
    const [scrolled, setScrolled] = useState(false)
    const [lightboxImg, setLightboxImg] = useState<string | null>(null)

    const primary = church.primary_color
    const secondary = church.secondary_color

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
                        <div className="text-center sm:text-right">
                            <p className="text-xs text-white/25">
                                © {new Date().getFullYear()} {church.name}. Todos los derechos reservados.
                            </p>
                            <p className="mt-1.5 flex items-center justify-center gap-1.5 text-[10px] text-white/15 sm:justify-end">
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
            {/* WhatsApp floating button */}
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
