import { useState, useRef } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
    Users,
    UserCheck,
    Droplets,
    UserPlus,
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react'
import type {
    Member,
    MemberFilters,
    MemberStats,
    MemberStatus,
    MemberCategory,
    PaginatedData,
} from '@/types/members'
import { statusLabels, categoryLabels } from '@/types/members'

interface IndexProps {
    members: PaginatedData<Member>
    filters: MemberFilters
    stats: MemberStats
}

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'

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

function getInitials(member: Member): string {
    return `${member.first_name[0]}${member.last_name[0]}`.toUpperCase()
}

export default function Index({ members, filters, stats }: IndexProps) {
    const [search, setSearch] = useState(filters.search ?? '')
    const [deleteTarget, setDeleteTarget] = useState<Member | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function applyFilters(newFilters: Partial<MemberFilters>) {
        router.get(
            '/members',
            { ...filters, ...newFilters, page: undefined } as any,
            { preserveState: true, replace: true }
        )
    }

    function handleSearch(value: string) {
        setSearch(value)
        if (debounceRef.current) clearTimeout(debounceRef.current)
        debounceRef.current = setTimeout(() => applyFilters({ search: value }), 400)
    }

    function handleDelete() {
        if (!deleteTarget) return
        router.delete(`/members/${deleteTarget.id}`, { preserveScroll: true })
        setDeleteTarget(null)
    }

    const statCards = [
        { title: 'Total Miembros', value: stats.total, icon: Users, color: 'text-cyan' },
        { title: 'Activos', value: stats.active, icon: UserCheck, color: 'text-emerald-500' },
        { title: 'Bautizados', value: stats.baptized, icon: Droplets, color: 'text-blue-500' },
        {
            title: 'Nuevos este mes',
            value: stats.new_this_month,
            icon: UserPlus,
            color: 'text-amber-500',
        },
    ]

    return (
        <TenantLayout>
            <Head title="Miembros" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Miembros</h1>
                    <p className="text-sm text-gray-500">Gestiona los miembros de tu iglesia</p>
                </div>
                <Link href="/members/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Miembro
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {statCards.map((card) => (
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

            {/* Filters */}
            <Card className="mb-6">
                <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Buscar por nombre, email o teléfono..."
                            className="pl-9"
                        />
                    </div>
                    <select
                        className={`${selectClass} sm:w-40`}
                        value={filters.status ?? ''}
                        onChange={(e) =>
                            applyFilters({ status: e.target.value as MemberStatus | '' })
                        }
                    >
                        <option value="">Todos los estados</option>
                        {Object.entries(statusLabels).map(([v, l]) => (
                            <option key={v} value={v}>
                                {l}
                            </option>
                        ))}
                    </select>
                    <select
                        className={`${selectClass} sm:w-44`}
                        value={filters.category ?? ''}
                        onChange={(e) =>
                            applyFilters({ category: e.target.value as MemberCategory | '' })
                        }
                    >
                        <option value="">Todas las categorías</option>
                        {Object.entries(categoryLabels).map(([v, l]) => (
                            <option key={v} value={v}>
                                {l}
                            </option>
                        ))}
                    </select>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[280px]">Miembro</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Teléfono</TableHead>
                            <TableHead className="hidden lg:table-cell">Email</TableHead>
                            <TableHead className="w-[60px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-32 text-center text-gray-500"
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <Users className="h-8 w-8 text-gray-300" />
                                        <span>No se encontraron miembros</span>
                                        <Link href="/members/create">
                                            <Button variant="outline" size="sm">
                                                <Plus className="mr-1 h-3 w-3" /> Registrar
                                                primer miembro
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            members.data.map((member) => (
                                <TableRow
                                    key={member.id}
                                    className="cursor-pointer"
                                    onClick={() => router.visit(`/members/${member.id}`)}
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/10 text-sm font-semibold text-navy">
                                                {getInitials(member)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {member.full_name}
                                                </p>
                                                {member.family && (
                                                    <p className="text-xs text-gray-500">
                                                        Familia {member.family.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${getCategoryClasses(member.category)}`}
                                        >
                                            {categoryLabels[member.category]}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(member.member_status)}>
                                            {statusLabels[member.member_status]}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-600">
                                        {member.phone ?? '—'}
                                    </TableCell>
                                    <TableCell className="hidden text-gray-600 lg:table-cell">
                                        {member.email ?? '—'}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        router.visit(`/members/${member.id}`)
                                                    }}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" /> Ver perfil
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        router.visit(
                                                            `/members/${member.id}/edit`
                                                        )
                                                    }}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" /> Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setDeleteTarget(member)
                                                    }}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {members.last_page > 1 && (
                    <div className="flex items-center justify-between border-t px-4 py-3">
                        <p className="text-sm text-gray-500">
                            Mostrando {members.from} a {members.to} de {members.total}
                        </p>
                        <div className="flex items-center gap-1">
                            {members.links.map((link, i) => {
                                if (i === 0) {
                                    return (
                                        <Link
                                            key="prev"
                                            href={link.url ?? ''}
                                            preserveState
                                            className={`rounded-md p-2 ${link.url ? 'text-gray-600 hover:bg-gray-100' : 'pointer-events-none text-gray-300'}`}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Link>
                                    )
                                }
                                if (i === members.links.length - 1) {
                                    return (
                                        <Link
                                            key="next"
                                            href={link.url ?? ''}
                                            preserveState
                                            className={`rounded-md p-2 ${link.url ? 'text-gray-600 hover:bg-gray-100' : 'pointer-events-none text-gray-300'}`}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    )
                                }
                                return (
                                    <Link
                                        key={i}
                                        href={link.url ?? ''}
                                        preserveState
                                        className={`rounded-md px-3 py-1 text-sm ${
                                            link.active
                                                ? 'bg-navy text-white'
                                                : link.url
                                                  ? 'text-gray-600 hover:bg-gray-100'
                                                  : 'pointer-events-none text-gray-300'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                )}
            </Card>

            {/* Delete confirmation */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar miembro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción moverá a <strong>{deleteTarget?.full_name}</strong> a la
                            papelera. Podrás restaurarlo después si es necesario.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </TenantLayout>
    )
}
