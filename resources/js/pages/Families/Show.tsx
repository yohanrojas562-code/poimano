import { Head, Link } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Home,
    ArrowLeft,
    Pencil,
    Phone,
    MapPin,
    CalendarHeart,
    Users,
    FileText,
} from 'lucide-react'
import type { Family } from '@/types/members'
import { familyRoleLabels } from '@/types/members'

interface ShowProps {
    family: Family
}

export default function Show({ family }: ShowProps) {
    return (
        <TenantLayout>
            <Head title={family.name} />

            <div className="mx-auto max-w-4xl space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/families"
                            className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-navy">{family.name}</h1>
                            <p className="text-sm text-gray-500">
                                {family.members?.length ?? 0} miembro(s) registrado(s)
                            </p>
                        </div>
                    </div>
                    <Link href={`/families/${family.id}/edit`}>
                        <Button variant="outline">
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                        </Button>
                    </Link>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-medium text-navy">
                                <Home className="h-4 w-4 text-cyan" />
                                Información
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <InfoRow icon={Phone} label="Teléfono" value={family.phone} />
                            <InfoRow icon={MapPin} label="Dirección" value={family.address} />
                            <InfoRow
                                icon={CalendarHeart}
                                label="Fecha de Matrimonio"
                                value={
                                    family.wedding_date
                                        ? new Date(family.wedding_date).toLocaleDateString('es', {
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                          })
                                        : null
                                }
                            />
                        </CardContent>
                    </Card>

                    {family.notes && (
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="flex items-center gap-2 text-sm font-medium text-navy">
                                    <FileText className="h-4 w-4 text-cyan" />
                                    Notas
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 whitespace-pre-line">{family.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Members Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <Users className="h-5 w-5 text-cyan" />
                            Miembros de la Familia
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {!family.members || family.members.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                                            <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                                            <p className="text-sm">No hay miembros asignados a esta familia</p>
                                            <Link
                                                href="/members/create"
                                                className="mt-2 inline-block text-sm text-cyan hover:underline"
                                            >
                                                Crear un miembro y asignarlo
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    family.members.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <Link
                                                    href={`/members/${member.id}`}
                                                    className="font-medium text-navy hover:underline"
                                                >
                                                    {member.first_name} {member.last_name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {member.family_role ? (
                                                    <Badge variant="outline">
                                                        {familyRoleLabels[member.family_role] ?? member.family_role}
                                                    </Badge>
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-gray-600">
                                                    {member.phone || member.mobile || '—'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={
                                                        member.member_status === 'activo'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-gray-100 text-gray-600'
                                                    }
                                                >
                                                    {member.member_status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </TenantLayout>
    )
}

function InfoRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType
    label: string
    value: string | null | undefined
}) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
            <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-sm text-gray-700">{value || '—'}</p>
            </div>
        </div>
    )
}
