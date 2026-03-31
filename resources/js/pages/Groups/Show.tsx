import { Head, Link } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    ArrowLeft,
    Pencil,
    Calendar,
    MapPin,
    UserRound,
    Phone,
    UsersRound,
    Users,
    FileText,
} from 'lucide-react'
import type { CellGroup } from '@/types/groups'

interface ShowProps {
    group: CellGroup
}

function formatDate(date: string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('es', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType
    label: string
    value: React.ReactNode
}) {
    return (
        <div className="flex items-start gap-3 py-2">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-medium text-gray-900">{value || '—'}</p>
            </div>
        </div>
    )
}

export default function Show({ group }: ShowProps) {
    const memberAttendees = group.attendees?.filter((a) => a.type === 'member') ?? []
    const externalAttendees = group.attendees?.filter((a) => a.type === 'external') ?? []

    return (
        <TenantLayout>
            <Head title={group.name} />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/groups"
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">{group.name}</h1>
                        <p className="text-sm text-gray-500">Detalle del grupo celular</p>
                    </div>
                </div>
                <Link href={`/groups/${group.id}/edit`}>
                    <Button variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                    </Button>
                </Link>
            </div>

            {/* Profile header */}
            <Card className="mb-6">
                <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-navy text-2xl font-bold text-white">
                        <UsersRound className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-navy">{group.name}</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant={group.is_active ? 'success' : 'warning'}>
                                {group.is_active ? 'Activo' : 'Inactivo'}
                            </Badge>
                            <Badge variant="secondary" className="gap-1">
                                <Users className="h-3 w-3" />
                                {group.attendees?.length ?? 0} asistentes
                            </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Apertura: {formatDate(group.opening_date)}
                            </span>
                            <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {group.address}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Información del Grupo */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <UsersRound className="h-5 w-5 text-cyan" /> Información
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InfoRow icon={UsersRound} label="Nombre" value={group.name} />
                        <InfoRow
                            icon={Calendar}
                            label="Fecha de Apertura"
                            value={formatDate(group.opening_date)}
                        />
                        <InfoRow icon={MapPin} label="Dirección" value={group.address} />
                        {group.notes && (
                            <>
                                <Separator className="my-2" />
                                <InfoRow icon={FileText} label="Notas" value={group.notes} />
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Anfitrión */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <UserRound className="h-5 w-5 text-cyan" /> Anfitrión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InfoRow
                            icon={UserRound}
                            label="Nombre"
                            value={
                                group.host_type === 'member' && group.host_member ? (
                                    <Link
                                        href={`/members/${group.host_member.id}`}
                                        className="text-cyan hover:underline"
                                    >
                                        {group.host_display_name}
                                    </Link>
                                ) : (
                                    group.host_display_name
                                )
                            }
                        />
                        <InfoRow
                            icon={UserRound}
                            label="Tipo"
                            value={
                                <Badge variant={group.host_type === 'member' ? 'default' : 'secondary'}>
                                    {group.host_type === 'member' ? 'Miembro' : 'Externo'}
                                </Badge>
                            }
                        />
                        {group.host_phone && (
                            <InfoRow icon={Phone} label="Teléfono" value={group.host_phone} />
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Asistentes */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <Users className="h-5 w-5 text-cyan" /> Asistentes
                        <Badge variant="secondary" className="ml-2">
                            {group.attendees?.length ?? 0}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {(!group.attendees || group.attendees.length === 0) ? (
                        <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
                            <Users className="h-10 w-10" />
                            <p className="text-sm">No hay asistentes registrados</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Miembros de la iglesia */}
                            {memberAttendees.length > 0 && (
                                <div>
                                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                                        Miembros de la Iglesia ({memberAttendees.length})
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                        {memberAttendees.map((a) => (
                                            <div
                                                key={a.id}
                                                className="flex items-center gap-3 rounded-lg border p-3"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy">
                                                    {a.member
                                                        ? `${a.member.first_name[0]}${a.member.last_name[0]}`
                                                        : '??'}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    {a.member ? (
                                                        <Link
                                                            href={`/members/${a.member.id}`}
                                                            className="block truncate text-sm font-medium text-cyan hover:underline"
                                                        >
                                                            {a.display_name}
                                                        </Link>
                                                    ) : (
                                                        <p className="truncate text-sm font-medium text-gray-900">
                                                            {a.display_name}
                                                        </p>
                                                    )}
                                                    {a.phone && (
                                                        <p className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Phone className="h-3 w-3" />
                                                            {a.phone}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Externos */}
                            {externalAttendees.length > 0 && (
                                <div>
                                    <h4 className="mb-2 text-xs font-semibold uppercase text-gray-500">
                                        Asistentes Externos ({externalAttendees.length})
                                    </h4>
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                        {externalAttendees.map((a) => (
                                            <div
                                                key={a.id}
                                                className="flex items-center gap-3 rounded-lg border p-3"
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-semibold text-amber-800">
                                                    {a.name ? a.name[0].toUpperCase() : '?'}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium text-gray-900">
                                                        {a.display_name}
                                                    </p>
                                                    {a.phone && (
                                                        <p className="flex items-center gap-1 text-xs text-gray-500">
                                                            <Phone className="h-3 w-3" />
                                                            {a.phone}
                                                        </p>
                                                    )}
                                                </div>
                                                <Badge variant="outline" className="shrink-0 text-xs">
                                                    Externo
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </TenantLayout>
    )
}
