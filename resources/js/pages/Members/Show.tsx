import { Head, Link } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    ArrowLeft,
    Pencil,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Heart,
    Users,
    Clock,
    UserRound,
    Droplets,
    BookOpen,
} from 'lucide-react'
import type { Member, MemberStatus, MemberCategory, FamilyRole } from '@/types/members'
import {
    statusLabels,
    categoryLabels,
    maritalStatusLabels,
    familyRoleLabels,
    genderLabels,
} from '@/types/members'

interface ShowProps {
    member: Member
}

function getStatusVariant(
    status: MemberStatus
): 'success' | 'warning' | 'secondary' | 'outline' | 'destructive' {
    const map: Record<
        MemberStatus,
        'success' | 'warning' | 'secondary' | 'outline' | 'destructive'
    > = {
        activo: 'success',
        inactivo: 'warning',
        transferido: 'secondary',
        fallecido: 'outline',
        excomunicado: 'destructive',
    }
    return map[status]
}

function getCategoryClasses(cat: MemberCategory): string {
    const map: Record<MemberCategory, string> = {
        nuevo_creyente: 'bg-sky-100 text-sky-800',
        creyente: 'bg-navy/10 text-navy',
        lider: 'bg-purple-100 text-purple-800',
        pastor: 'bg-amber-100 text-amber-800',
        misionero: 'bg-emerald-100 text-emerald-800',
    }
    return map[cat]
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

export default function Show({ member }: ShowProps) {
    return (
        <TenantLayout>
            <Head title={member.full_name} />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/members"
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">{member.complete_name}</h1>
                        <p className="text-sm text-gray-500">Información del miembro</p>
                    </div>
                </div>
                <Link href={`/members/${member.id}/edit`}>
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
                        {member.first_name[0]}
                        {member.last_name[0]}
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-navy">{member.complete_name}</h2>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                            <Badge variant={getStatusVariant(member.member_status)}>
                                {statusLabels[member.member_status]}
                            </Badge>
                            <span
                                className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getCategoryClasses(member.category)}`}
                            >
                                {categoryLabels[member.category]}
                            </span>
                            {member.is_baptized && (
                                <Badge variant="default" className="bg-blue-600">
                                    <Droplets className="mr-1 h-3 w-3" /> Bautizado
                                </Badge>
                            )}
                            {!member.is_active && (
                                <Badge variant="destructive">Desactivado</Badge>
                            )}
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            {member.email && (
                                <span className="flex items-center gap-1">
                                    <Mail className="h-3.5 w-3.5" />
                                    {member.email}
                                </span>
                            )}
                            {member.phone && (
                                <span className="flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5" />
                                    {member.phone}
                                </span>
                            )}
                            {member.city && (
                                <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {member.city}
                                </span>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="info">
                <TabsList className="mb-4 w-full justify-start">
                    <TabsTrigger value="info">Información</TabsTrigger>
                    <TabsTrigger value="spiritual">Vida Espiritual</TabsTrigger>
                    <TabsTrigger value="family">Familia</TabsTrigger>
                    <TabsTrigger value="history">Historial</TabsTrigger>
                </TabsList>

                {/* Tab: Info General */}
                <TabsContent value="info">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-navy">
                                    <UserRound className="h-5 w-5 text-cyan" /> Datos Personales
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-x-6">
                                <InfoRow
                                    icon={UserRound}
                                    label="Nombre Completo"
                                    value={member.complete_name}
                                />
                                <InfoRow
                                    icon={UserRound}
                                    label="Género"
                                    value={
                                        member.gender ? genderLabels[member.gender] : null
                                    }
                                />
                                <InfoRow
                                    icon={Calendar}
                                    label="Fecha de Nacimiento"
                                    value={formatDate(member.birth_date)}
                                />
                                <InfoRow
                                    icon={UserRound}
                                    label="Estado Civil"
                                    value={
                                        member.marital_status
                                            ? maritalStatusLabels[member.marital_status]
                                            : null
                                    }
                                />
                                <InfoRow
                                    icon={BookOpen}
                                    label="Tipo Documento"
                                    value={member.document_type}
                                />
                                <InfoRow
                                    icon={BookOpen}
                                    label="Nro. Documento"
                                    value={member.document_number}
                                />
                                <InfoRow
                                    icon={Heart}
                                    label="Tipo de Sangre"
                                    value={member.blood_type}
                                />
                                <InfoRow
                                    icon={MapPin}
                                    label="Nacionalidad"
                                    value={member.nationality}
                                />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-navy">
                                    <MapPin className="h-5 w-5 text-cyan" /> Contacto
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <InfoRow icon={Mail} label="Email" value={member.email} />
                                <InfoRow icon={Phone} label="Teléfono" value={member.phone} />
                                <InfoRow icon={Phone} label="Celular" value={member.mobile} />
                                <Separator className="my-2" />
                                <InfoRow
                                    icon={MapPin}
                                    label="Dirección"
                                    value={member.address}
                                />
                                <div className="grid grid-cols-3 gap-x-4">
                                    <InfoRow
                                        icon={MapPin}
                                        label="Ciudad"
                                        value={member.city}
                                    />
                                    <InfoRow
                                        icon={MapPin}
                                        label="Estado"
                                        value={member.state}
                                    />
                                    <InfoRow
                                        icon={MapPin}
                                        label="Cód. Postal"
                                        value={member.zip_code}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Tab: Vida Espiritual */}
                <TabsContent value="spiritual">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-navy">
                                <Heart className="h-5 w-5 text-cyan" /> Vida Espiritual
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoRow
                                icon={Heart}
                                label="Estado de Membresía"
                                value={
                                    <Badge
                                        variant={getStatusVariant(member.member_status)}
                                    >
                                        {statusLabels[member.member_status]}
                                    </Badge>
                                }
                            />
                            <InfoRow
                                icon={Heart}
                                label="Categoría"
                                value={
                                    <span
                                        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getCategoryClasses(member.category)}`}
                                    >
                                        {categoryLabels[member.category]}
                                    </span>
                                }
                            />
                            <InfoRow
                                icon={Droplets}
                                label="Bautizado"
                                value={member.is_baptized ? 'Sí' : 'No'}
                            />
                            {member.is_baptized && (
                                <>
                                    <InfoRow
                                        icon={Calendar}
                                        label="Fecha de Bautismo"
                                        value={formatDate(member.baptism_date)}
                                    />
                                    <InfoRow
                                        icon={MapPin}
                                        label="Iglesia de Bautismo"
                                        value={member.baptism_church}
                                    />
                                </>
                            )}
                            <InfoRow
                                icon={Calendar}
                                label="Fecha de Conversión"
                                value={formatDate(member.conversion_date)}
                            />
                            <InfoRow
                                icon={Calendar}
                                label="Fecha de Membresía"
                                value={formatDate(member.membership_date)}
                            />
                            <InfoRow
                                icon={UserRound}
                                label="¿Cómo llegó?"
                                value={member.how_arrived}
                            />
                            {member.referred_by && (
                                <InfoRow
                                    icon={Users}
                                    label="Referido por"
                                    value={
                                        <Link
                                            href={`/members/${member.referred_by.id}`}
                                            className="text-cyan hover:underline"
                                        >
                                            {member.referred_by.full_name}
                                        </Link>
                                    }
                                />
                            )}
                        </CardContent>
                    </Card>

                    {member.skills && member.skills.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-navy">
                                    Habilidades y Dones
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {member.skills.map((s) => (
                                        <Badge key={s.id} variant="outline">
                                            {s.skill}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Tab: Familia */}
                <TabsContent value="family">
                    {member.family ? (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-navy">
                                    <Users className="h-5 w-5 text-cyan" /> Familia{' '}
                                    {member.family.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    <InfoRow
                                        icon={UserRound}
                                        label="Rol"
                                        value={
                                            member.family_role
                                                ? familyRoleLabels[member.family_role]
                                                : '—'
                                        }
                                    />
                                    <InfoRow
                                        icon={Phone}
                                        label="Teléfono Familiar"
                                        value={member.family.phone}
                                    />
                                    <InfoRow
                                        icon={MapPin}
                                        label="Dirección Familiar"
                                        value={member.family.address}
                                    />
                                </div>
                                {member.family.members &&
                                    member.family.members.length > 1 && (
                                        <>
                                            <Separator className="my-4" />
                                            <h4 className="mb-3 text-sm font-semibold text-gray-700">
                                                Miembros de la Familia
                                            </h4>
                                            <div className="space-y-2">
                                                {member.family.members
                                                    .filter((m) => m.id !== member.id)
                                                    .map((m) => (
                                                        <Link
                                                            key={m.id}
                                                            href={`/members/${m.id}`}
                                                            className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50"
                                                        >
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy">
                                                                {m.first_name[0]}
                                                                {m.last_name[0]}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    {m.full_name}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {m.family_role
                                                                        ? familyRoleLabels[
                                                                              m.family_role as FamilyRole
                                                                          ]
                                                                        : ''}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                            </div>
                                        </>
                                    )}
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="flex flex-col items-center gap-3 py-12 text-gray-500">
                                <Users className="h-10 w-10 text-gray-300" />
                                <p>Este miembro no está asignado a ninguna familia</p>
                            </CardContent>
                        </Card>
                    )}

                    {member.referrals && member.referrals.length > 0 && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-navy">
                                    Personas Referidas ({member.referrals.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    {member.referrals.map((r) => (
                                        <Link
                                            key={r.id}
                                            href={`/members/${r.id}`}
                                            className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50"
                                        >
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy">
                                                {r.first_name[0]}
                                                {r.last_name[0]}
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {r.full_name}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>

                {/* Tab: Historial */}
                <TabsContent value="history">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-navy">
                                <Clock className="h-5 w-5 text-cyan" /> Historial de Cambios
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {member.history && member.history.length > 0 ? (
                                <div className="relative space-y-4 pl-6 before:absolute before:left-2 before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-gray-200">
                                    {member.history.map((h) => (
                                        <div key={h.id} className="relative">
                                            <div className="absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-cyan bg-white" />
                                            <div className="rounded-md border p-3">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Badge variant="outline">
                                                        {h.from_status ?? '—'}
                                                    </Badge>
                                                    <span className="text-gray-400">→</span>
                                                    <Badge variant="secondary">
                                                        {h.to_status}
                                                    </Badge>
                                                </div>
                                                {h.reason && (
                                                    <p className="mt-1 text-sm text-gray-600">
                                                        {h.reason}
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-gray-400">
                                                    {formatDate(h.changed_at)}
                                                    {h.changed_by_user &&
                                                        ` · por ${h.changed_by_user.name}`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-2 py-8 text-gray-500">
                                    <Clock className="h-8 w-8 text-gray-300" />
                                    <p>Sin historial de cambios registrado</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {member.notes && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-navy">Notas</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap text-sm text-gray-700">
                                    {member.notes}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>
        </TenantLayout>
    )
}
