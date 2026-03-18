import TenantLayout from '@/layouts/TenantLayout'
import { Head, Link } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    Heart,
    Home,
    Layers,
    UserPlus,
    Droplets,
    Activity,
    TrendingUp,
} from 'lucide-react'
import {
    BarChart,
    Bar,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import { categoryLabels, statusLabels } from '@/types/members'
import type { MemberCategory, MemberStatus } from '@/types/members'

interface DashboardProps {
    stats: {
        total_members: number
        active_members: number
        total_families: number
        total_areas: number
        baptized: number
        new_this_month: number
    }
    byCategory: Record<string, number>
    byStatus: Record<string, number>
    byGender: Record<string, number>
    monthlyGrowth: { month: string; count: number }[]
    recentMembers: {
        id: number
        full_name: string
        category: string
        status: string
        created_at: string
    }[]
    recentActivity: {
        description: string
        subject: string
        subject_id: number | null
        date: string
    }[]
}

const CATEGORY_COLORS: Record<string, string> = {
    nuevo_creyente: '#06b6d4',
    creyente: '#3b82f6',
    lider: '#f59e0b',
    pastor: '#8b5cf6',
    misionero: '#10b981',
}

const STATUS_COLORS: Record<string, string> = {
    activo: '#10b981',
    inactivo: '#94a3b8',
    transferido: '#f59e0b',
    fallecido: '#6b7280',
    excomunicado: '#ef4444',
}

const GENDER_COLORS: Record<string, string> = {
    masculino: '#3b82f6',
    femenino: '#ec4899',
}

const GENDER_LABELS: Record<string, string> = {
    masculino: 'Masculino',
    femenino: 'Femenino',
}

export default function Dashboard({
    stats,
    byCategory,
    byStatus,
    byGender,
    monthlyGrowth,
    recentMembers,
    recentActivity,
}: DashboardProps) {
    const summaryCards = [
        {
            title: 'Total Miembros',
            value: stats.total_members,
            icon: Users,
            color: 'bg-blue-500',
            subtitle: `${stats.active_members} activos`,
        },
        {
            title: 'Nuevos este Mes',
            value: stats.new_this_month,
            icon: UserPlus,
            color: 'bg-cyan-500',
            subtitle: 'Registrados este mes',
        },
        {
            title: 'Familias',
            value: stats.total_families,
            icon: Home,
            color: 'bg-amber-500',
            subtitle: 'Familias registradas',
        },
        {
            title: 'Áreas Ministeriales',
            value: stats.total_areas,
            icon: Layers,
            color: 'bg-purple-500',
            subtitle: 'Áreas activas',
        },
        {
            title: 'Bautizados',
            value: stats.baptized,
            icon: Droplets,
            color: 'bg-teal-500',
            subtitle: `${stats.total_members > 0 ? Math.round((stats.baptized / stats.total_members) * 100) : 0}% del total`,
        },
    ]

    // Preparar datos para charts
    const categoryData = Object.entries(byCategory).map(([key, value]) => ({
        name: categoryLabels[key as MemberCategory] ?? key,
        value,
        fill: CATEGORY_COLORS[key] ?? '#94a3b8',
    }))

    const statusData = Object.entries(byStatus).map(([key, value]) => ({
        name: statusLabels[key as MemberStatus] ?? key,
        value,
        fill: STATUS_COLORS[key] ?? '#94a3b8',
    }))

    const genderData = Object.entries(byGender).map(([key, value]) => ({
        name: GENDER_LABELS[key] ?? key,
        value,
        fill: GENDER_COLORS[key] ?? '#94a3b8',
    }))

    const hasData = stats.total_members > 0

    return (
        <TenantLayout>
            <Head title="Dashboard" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Resumen general de tu iglesia</p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {summaryCards.map((card) => (
                        <Card key={card.title} className="relative overflow-hidden">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-medium text-muted-foreground truncate">
                                            {card.title}
                                        </p>
                                        <p className="text-2xl font-bold text-navy mt-1">{card.value}</p>
                                        <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                                            {card.subtitle}
                                        </p>
                                    </div>
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color} shrink-0`}>
                                        <card.icon className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {hasData ? (
                    <>
                        {/* Row: Crecimiento + Categorías */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Crecimiento mensual — ocupa 2 cols */}
                            <Card className="lg:col-span-2">
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-navy text-base">
                                        <TrendingUp className="h-4 w-4 text-cyan" />
                                        Crecimiento de Miembros
                                    </CardTitle>
                                    <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={260}>
                                        <AreaChart data={monthlyGrowth}>
                                            <defs>
                                                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#00E1FF" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#00E1FF" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                                            <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                                formatter={(value: number) => [value, 'Nuevos']}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#00E1FF"
                                                strokeWidth={2}
                                                fill="url(#colorCount)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Miembros por categoría */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-navy text-base">Por Categoría</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {categoryData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={260}>
                                            <BarChart data={categoryData} layout="vertical" margin={{ left: 10 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                                                <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 10 }} />
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                                    formatter={(value: number) => [value, 'Miembros']}
                                                />
                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                                                    {categoryData.map((entry, index) => (
                                                        <Cell key={index} fill={entry.fill} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-8">Sin datos</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Row: Género + Estado + Actividad Reciente */}
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Género */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-navy text-base">Por Género</CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    {genderData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={220}>
                                            <PieChart>
                                                <Pie
                                                    data={genderData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={80}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                >
                                                    {genderData.map((entry, index) => (
                                                        <Cell key={index} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                                    formatter={(value: number) => [value, 'Miembros']}
                                                />
                                                <Legend
                                                    wrapperStyle={{ fontSize: '11px' }}
                                                    formatter={(value: string) => <span className="text-gray-700">{value}</span>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p className="text-sm text-muted-foreground py-8">Sin datos</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Estado */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-navy text-base">Por Estado</CardTitle>
                                </CardHeader>
                                <CardContent className="flex items-center justify-center">
                                    {statusData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height={220}>
                                            <PieChart>
                                                <Pie
                                                    data={statusData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={50}
                                                    outerRadius={80}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                >
                                                    {statusData.map((entry, index) => (
                                                        <Cell key={index} fill={entry.fill} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
                                                    formatter={(value: number) => [value, 'Miembros']}
                                                />
                                                <Legend
                                                    wrapperStyle={{ fontSize: '11px' }}
                                                    formatter={(value: string) => <span className="text-gray-700">{value}</span>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <p className="text-sm text-muted-foreground py-8">Sin datos</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Actividad reciente */}
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="flex items-center gap-2 text-navy text-base">
                                        <Activity className="h-4 w-4 text-cyan" />
                                        Actividad Reciente
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {recentActivity.length > 0 ? (
                                        <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                                            {recentActivity.map((item, i) => (
                                                <div key={i} className="flex items-start gap-2">
                                                    <div className="mt-1.5 h-2 w-2 rounded-full bg-cyan shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-medium text-navy truncate">
                                                            {item.description}
                                                        </p>
                                                        <p className="text-[10px] text-muted-foreground">
                                                            {item.subject} · {item.date}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground text-center py-8">Sin actividad aún</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Miembros Recientes */}
                        <Card>
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-navy text-base">
                                        <UserPlus className="h-4 w-4 text-cyan" />
                                        Miembros Recientes
                                    </CardTitle>
                                    <Link href="/members" className="text-xs text-cyan hover:underline">
                                        Ver todos →
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {recentMembers.length > 0 ? (
                                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                                        {recentMembers.map((member) => (
                                            <Link
                                                key={member.id}
                                                href={`/members/${member.id}`}
                                                className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                                            >
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/10 text-navy shrink-0">
                                                    <Users className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-navy truncate">{member.full_name}</p>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                                            {categoryLabels[member.category as MemberCategory] ?? member.category}
                                                        </Badge>
                                                        <span className="text-[10px] text-muted-foreground">{member.created_at}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No hay miembros registrados</p>
                                )}
                            </CardContent>
                        </Card>
                    </>
                ) : (
                    /* Estado vacío cuando no hay datos */
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Users className="mx-auto h-12 w-12 text-gray-300" />
                            <h3 className="mt-3 text-lg font-semibold text-navy">Comienza a gestionar tu iglesia</h3>
                            <p className="mt-1 text-sm text-muted-foreground max-w-md mx-auto">
                                Registra miembros, familias y áreas ministeriales para ver las estadísticas y gráficos en tu dashboard.
                            </p>
                            <Link
                                href="/members/create"
                                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy/90 transition-colors"
                            >
                                <UserPlus className="h-4 w-4" />
                                Registrar primer miembro
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </TenantLayout>
    )
}
