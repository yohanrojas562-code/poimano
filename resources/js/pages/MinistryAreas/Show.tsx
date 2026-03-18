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
    FishSymbol,
} from 'lucide-react'
import type { MinistryArea } from '@/types/ministry'
import { categoryLabels, statusLabels } from '@/types/members'

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
    const networkMembers = area.network_members ?? []

    return (
        <TenantLayout>
            <Head title={area.name} />

            <div className="mx-auto max-w-7xl space-y-6 p-6">
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
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant={area.is_active ? 'default' : 'secondary'}>
                                    {area.is_active ? 'Activa' : 'Inactiva'}
                                </Badge>
                                {area.description && (
                                    <span className="text-sm text-muted-foreground">{area.description}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link href={`/ministry-areas/${area.id}/edit`}>
                        <Button variant="outline">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                    </Link>
                </div>

                {/* 2 columnas: Liderazgo + Red */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Columna izquierda - Estructura de Liderazgo */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="text-navy">Estructura de Liderazgo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                                {roleConfig.map((role) => {
                                    const member = area[role.key as keyof MinistryArea] as MinistryArea['coordinator']
                                    return (
                                        <div key={role.key} className={`rounded-lg border p-3 ${role.bgColor}`}>
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <role.icon className={`h-4 w-4 ${role.color}`} />
                                                <h3 className="font-semibold text-xs">{role.label}</h3>
                                            </div>
                                            <p className="text-[11px] text-muted-foreground mb-2 leading-tight">{role.description}</p>
                                            <Separator className="mb-2" />
                                            {member ? (
                                                <Link
                                                    href={`/members/${member.id}`}
                                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:underline"
                                                >
                                                    <User className="h-3.5 w-3.5" />
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

                    {/* Columna derecha - Red Ministerial */}
                    <Card className="h-fit">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-navy">
                                <FishSymbol className="h-5 w-5 text-cyan" />
                                Red Ministerial
                            </CardTitle>
                            <p className="text-sm text-muted-foreground">
                                Miembros en la red ({networkMembers.length})
                            </p>
                        </CardHeader>
                        <CardContent>
                            {networkMembers.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
                                    <FishSymbol className="mx-auto h-8 w-8 text-gray-300" />
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Aún no hay miembros en esta red.
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Edita un miembro y selecciona esta área en "Red Ministerial".
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                                    {networkMembers.map((member) => (
                                        <Link
                                            key={member.id}
                                            href={`/members/${member.id}`}
                                            className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan/10 text-cyan shrink-0">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-navy truncate">
                                                        {member.first_name} {member.last_name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground truncate">
                                                        {member.phone ?? member.email ?? '—'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                                <Badge variant="outline" className="text-[10px]">
                                                    {categoryLabels[member.category] ?? member.category}
                                                </Badge>
                                                <Badge
                                                    variant={member.member_status === 'activo' ? 'default' : 'secondary'}
                                                    className="text-[10px]"
                                                >
                                                    {statusLabels[member.member_status] ?? member.member_status}
                                                </Badge>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

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
