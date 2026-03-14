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
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface NavItem {
    label: string
    href: string
    icon: React.ElementType
}

const navigation: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Miembros', href: '/members', icon: Users },
    { label: 'Grupos', href: '/groups', icon: UsersRound },
    { label: 'Actividades', href: '/activities', icon: Calendar },
    { label: 'Proyectos', href: '/projects', icon: FolderKanban },
    { label: 'Finanzas', href: '/finance', icon: HandCoins },
    { label: 'Comunicación', href: '/communication', icon: MessageSquare },
    { label: 'Reportes', href: '/reports', icon: BarChart3 },
]

export default function TenantLayout({ children }: { children: React.ReactNode }) {
    const { tenant, auth, flash } = usePage<PageProps>().props
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="flex h-screen overflow-hidden bg-white">
            {/* Sidebar */}
            <aside
                className={cn(
                    'flex flex-col bg-navy text-white transition-all duration-300',
                    collapsed ? 'w-16' : 'w-64'
                )}
            >
                {/* Logo / Church */}
                <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
                    <Church className="h-7 w-7 shrink-0 text-cyan" />
                    {!collapsed && (
                        <span className="truncate text-sm font-semibold text-white">
                            {tenant?.church_name ?? 'Poimano'}
                        </span>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-2 py-4">
                    {navigation.map((item) => {
                        const isActive = window.location.pathname === item.href || window.location.pathname.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-white/10 text-cyan'
                                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                <item.icon className="h-5 w-5 shrink-0" />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="border-t border-white/10 p-2">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex w-full items-center justify-center rounded-md p-2 text-white/50 hover:bg-white/5 hover:text-white"
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
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
