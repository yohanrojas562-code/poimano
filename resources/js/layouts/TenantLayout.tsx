import { Link, usePage } from '@inertiajs/react'
import { type PageProps } from '@/types'
import {
    LayoutDashboard,
    Users,
    Calendar,
    FolderKanban,
    HandCoins,
    MessageSquare,
    BarChart3,
    UsersRound,
    Church,
    ChevronLeft,
    ChevronRight,
    LogOut,
    CheckCircle2,
    XCircle,
    Home,
    Layers,
    Settings,
    Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface NavItem {
    label: string
    href: string
    icon: React.ElementType
}

const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Miembros', href: '/members', icon: Users },
    { label: 'Familias', href: '/families', icon: Home },
    { label: 'Áreas Ministeriales', href: '/ministry-areas', icon: Layers },
    { label: 'Grupos', href: '/groups', icon: UsersRound },
    { label: 'Actividades', href: '/activities', icon: Calendar },
    { label: 'Proyectos', href: '/projects', icon: FolderKanban },
    { label: 'Finanzas', href: '/finance', icon: HandCoins },
    { label: 'Comunicación', href: '/communication', icon: MessageSquare },
    { label: 'Reportes', href: '/reports', icon: BarChart3 },
    { label: 'Sitio Web', href: '/settings/website', icon: Globe },
    { label: 'Configuración', href: '/settings/church', icon: Settings },
]

export default function TenantLayout({ children }: { children: React.ReactNode }) {
    const { tenant, auth, flash, churchSettings } = usePage<PageProps>().props
    const [collapsed, setCollapsed] = useState(false)

    // Dynamic favicon
    useEffect(() => {
        if (churchSettings?.favicon) {
            let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']")
            if (!link) {
                link = document.createElement('link')
                link.rel = 'icon'
                document.head.appendChild(link)
            }
            link.href = churchSettings.favicon
        }
    }, [churchSettings?.favicon])

    return (
        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-30 flex flex-col text-white transition-all duration-300',
                    collapsed ? 'w-16' : 'w-64'
                )}
                style={{ backgroundColor: churchSettings?.primary_color ?? '#00105E' }}
            >
                {/* Logo / Church */}
                <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-4">
                    {churchSettings?.logo ? (
                        <img
                            src={churchSettings.logo}
                            alt="Logo"
                            className="h-8 w-8 shrink-0 rounded object-contain"
                        />
                    ) : (
                        <Church className="h-7 w-7 shrink-0" style={{ color: churchSettings?.secondary_color ?? '#00E1FF' }} />
                    )}
                    {!collapsed && (
                        <span className="truncate text-sm font-semibold" style={{ color: churchSettings?.text_color ?? '#FFFFFF' }}>
                            {churchSettings?.church_name ?? tenant?.church_name ?? 'Poimano'}
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
                    {navigation.map((item) => {
                        const isActive = window.location.pathname === item.href || window.location.pathname.startsWith(item.href + '/')
                        const textColor = churchSettings?.text_color ?? '#FFFFFF'
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-white/10'
                                        : 'hover:bg-white/5'
                                )}
                                style={{
                                    color: isActive
                                        ? (churchSettings?.secondary_color ?? '#00E1FF')
                                        : textColor,
                                    opacity: isActive ? 1 : 0.7,
                                }}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="shrink-0 border-t border-white/10 p-2">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex w-full items-center justify-center rounded-md p-2 hover:bg-white/5"
                        style={{ color: churchSettings?.text_color ?? '#FFFFFF', opacity: 0.5 }}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className={cn('flex flex-1 flex-col overflow-hidden', collapsed ? 'ml-16' : 'ml-64')} style={{ transition: 'margin-left 300ms' }}>
                {/* Top Bar */}
                <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
                    <div>
                        <h2 className="text-lg font-semibold text-black">
                            {/* Page title set by children */}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            {auth?.user?.name}
                        </span>
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <LogOut className="h-4 w-4" />
                        </Link>
                    </div>
                </header>

                {/* Flash messages */}
                {flash?.success && (
                    <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <XCircle className="h-4 w-4 shrink-0" />
                        {flash.error}
                    </div>
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
