import { useForm, Head } from '@inertiajs/react'
import { Church, Loader2 } from 'lucide-react'
import { type FormEvent } from 'react'

interface LoginForm {
    email: string
    password: string
    remember: boolean
}

export default function Login() {
    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    })

    const submit = (e: FormEvent) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <>
            <Head title="Iniciar Sesión" />
            <div className="flex min-h-screen items-center justify-center bg-navy px-4">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="mb-8 flex flex-col items-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                            <Church className="h-9 w-9 text-cyan" />
                        </div>
                        <h1 className="mt-4 text-2xl font-bold text-white">Poimano</h1>
                        <p className="mt-1 text-sm text-white/60">Ingresa a tu panel de administración</p>
                    </div>

                    {/* Form Card */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <form onSubmit={submit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/80">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-cyan focus:ring-1 focus:ring-cyan"
                                    placeholder="admin@iglesia.com"
                                    autoComplete="email"
                                    autoFocus
                                />
                                {errors.email && (
                                    <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/80">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition focus:border-cyan focus:ring-1 focus:ring-cyan"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-sm text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-cyan focus:ring-cyan"
                                />
                                <label htmlFor="remember" className="text-sm text-white/60">
                                    Recordar sesión
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-cyan/90 disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Ingresando...
                                    </>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-white/30">
                        © {new Date().getFullYear()} Poimano. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </>
    )
}
