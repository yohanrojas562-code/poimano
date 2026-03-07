import TenantLayout from '@/layouts/TenantLayout'
import { Head } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Calendar, HandCoins, TrendingUp } from 'lucide-react'

interface DashboardProps {
    stats?: {
        total_members: number
        active_groups: number
        upcoming_events: number
        monthly_income: number
    }
}

export default function Dashboard({ stats }: DashboardProps) {
    const summaryCards = [
        {
            title: 'Miembros',
            value: stats?.total_members ?? 0,
            icon: Users,
            color: 'text-cyan',
        },
        {
            title: 'Grupos Activos',
            value: stats?.active_groups ?? 0,
            icon: TrendingUp,
            color: 'text-cyan',
        },
        {
            title: 'Próximos Eventos',
            value: stats?.upcoming_events ?? 0,
            icon: Calendar,
            color: 'text-cyan',
        },
        {
            title: 'Ingreso Mensual',
            value: `$${(stats?.monthly_income ?? 0).toLocaleString()}`,
            icon: HandCoins,
            color: 'text-cyan',
        },
    ]

    return (
        <TenantLayout>
            <Head title="Dashboard" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
                <p className="text-sm text-gray-500">Resumen general de tu iglesia</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summaryCards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                {card.title}
                            </CardTitle>
                            <card.icon className={`h-5 w-5 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-navy">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-navy">Actividad Reciente</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            Las actividades recientes se mostrarán aquí.
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-navy">Asistencia Semanal</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500">
                            El gráfico de asistencia se mostrará aquí.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </TenantLayout>
    )
}
