import { Head, Link } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
    ArrowLeft,
    Pencil,
    Crown,
    Heart,
    Flame,
    Megaphone,
    User,
} from 'lucide-react'
import type { MinistryArea } from '@/types/ministry'

interface ShowProps {
    area: MinistryArea
}

const roleConfig = [
    { key: 'coordinator', label: 'Coordinador / Líder', icon: Crown, color: 'text-amber-600', bgColor: 'bg-amber-50 border-amber-200', description: 'Encargado de coordinar, liderar, administrar y gestionar la guía del área ministerial.' },
    { key: 'consolidator', label: 'Consolidador', icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-50 border-rose-200', description: 'Encargado de estar pendiente de los nuevos creyentes y hacer seguimiento.' },
    { key: 'spiritual', label: 'Espiritual', icon: Flame, color: 'text-purple-600', bgColor: 'bg-purple-50 border-purple-200', description: 'Encargado de orar, interceder y guiar espiritualmente al grupo.' },
    { key: 'evangelism', label: 'Evangelismo', icon: Megaphone, color: 'text-green-600', bgColor: 'bg-green-50 border-green-200', description: 'Encargado de promover actividades evangelísticas del área ministerial.' },
] as const

export default function Show({ area }: ShowProps) {
    return (
        <TenantLayout>
            <Head title={area.name} />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/ministry-areas">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-navy">{area.name}</h1>
                            <Badge variant={area.is_active ? 'default' : 'secondary'} className="mt-1">
                                {area.is_active ? 'Activa' : 'Inactiva'}
                            </Badge>
                        </div>
                    </div>
                    <Link href={`/ministry-areas/${area.id}/edit`}>
                        <Button variant="outline">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                    </Link>
                </div>

                {/* Descripción */}
                {area.description && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-navy">Descripción</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{area.description}</p>
                        </CardContent>
                    </Card>
                )}

                {/* Estructura de Liderazgo */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-navy">Estructura de Liderazgo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                            {roleConfig.map((role) => {
                                const member = area[role.key as keyof MinistryArea] as MinistryArea['coordinator']
                                return (
                                    <div key={role.key} className={`rounded-lg border p-4 ${role.bgColor}`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <role.icon className={`h-5 w-5 ${role.color}`} />
                                            <h3 className="font-semibold text-sm">{role.label}</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-3">{role.description}</p>
                                        <Separator className="mb-3" />
                                        {member ? (
                                            <Link
                                                href={`/members/${member.id}`}
                                                className="inline-flex items-center gap-2 text-sm font-medium text-navy hover:underline"
                                            >
                                                <User className="h-4 w-4" />
                                                {member.first_name} {member.last_name}
                                            </Link>
                                        ) : (
                                            <p className="text-sm text-muted-foreground italic">Sin asignar</p>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Info */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-4 text-sm sm:grid-cols-2">
                            <div>
                                <span className="text-muted-foreground">Fecha de creación:</span>
                                <p className="font-medium">
                                    {new Date(area.created_at).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div>
                                <span className="text-muted-foreground">Última actualización:</span>
                                <p className="font-medium">
                                    {new Date(area.updated_at).toLocaleDateString('es-CO', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TenantLayout>
    )
}
