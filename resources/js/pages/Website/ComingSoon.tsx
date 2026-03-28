import { Head } from '@inertiajs/react'
import { Church, Heart } from 'lucide-react'

interface Props {
    church: {
        name: string
        logo: string | null
        slogan: string | null
        primary_color: string
        secondary_color: string
    }
}

export default function ComingSoon({ church }: Props) {
    return (
        <>
            <Head title={`${church.name} — Próximamente`} />
            <div
                className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
                style={{ backgroundColor: church.primary_color }}
            >
                {church.logo ? (
                    <img src={church.logo} alt={church.name} className="mb-6 h-24 w-24 rounded-2xl object-contain" />
                ) : (
                    <div
                        className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10"
                    >
                        <Church className="h-10 w-10" style={{ color: church.secondary_color }} />
                    </div>
                )}
                <h1 className="text-4xl font-bold text-white sm:text-5xl">
                    {church.name}
                </h1>
                {church.slogan && (
                    <p className="mt-3 text-lg text-white/60">{church.slogan}</p>
                )}
                <div className="mt-10 rounded-xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-sm">
                    <p className="text-white/80">Nuestro sitio web estará disponible pronto</p>
                    <div className="mt-3 flex items-center justify-center gap-1 text-sm text-white/40">
                        <Heart className="h-3.5 w-3.5" />
                        <span>Te esperamos</span>
                    </div>
                </div>
                <a
                    href="/login"
                    className="mt-8 text-xs text-white/20 hover:text-white/40 transition-colors"
                >
                    Acceso administrador
                </a>
            </div>
        </>
    )
}
