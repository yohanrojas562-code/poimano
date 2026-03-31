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
    UsersRound,
    UserCheck,
    Users,
    CalendarPlus,
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Phone,
} from 'lucide-react'
import type {
    CellGroup,
    CellGroupFilters,
    CellGroupStats,
    PaginatedData,
} from '@/types/groups'

interface IndexProps {
    groups: PaginatedData<CellGroup>
    filters: CellGroupFilters
    stats: CellGroupStats
}

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'

function formatDate(date: string | null): string {
    if (!date) return '—'
    return new Date(date).toLocaleDateString('es', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export default function Index({ groups, filters, stats }: IndexProps) {
    const [search, setSearch] = useState(filters.search ?? '')
    const [deleteTarget, setDeleteTarget] = useState<CellGroup | null>(null)
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function applyFilters(newFilters: Partial<CellGroupFilters>) {
        router.get(
            '/groups',
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
        router.delete(`/groups/${deleteTarget.id}`, { preserveScroll: true })
        setDeleteTarget(null)
    }

    const statCards = [
        { title: 'Total Grupos', value: stats.total, icon: UsersRound, color: 'text-cyan' },
        { title: 'Activos', value: stats.active, icon: UserCheck, color: 'text-emerald-500' },
        { title: 'Total Asistentes', value: stats.attendees, icon: Users, color: 'text-blue-500' },
        { title: 'Nuevos este mes', value: stats.new_this_month, icon: CalendarPlus, color: 'text-amber-500' },
    ]

    return (
        <TenantLayout>
            <Head title="Grupos Celulares" />

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-navy">Grupos Celulares</h1>
                    <p className="text-sm text-gray-500">Gestiona los grupos celulares de tu iglesia</p>
                </div>
                <Link href="/groups/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Nuevo Grupo
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
                            placeholder="Buscar por nombre, dirección o anfitrión..."
                            className="pl-9"
                        />
                    </div>
                    <select
                        className={`${selectClass} sm:w-40`}
                        value={filters.status ?? ''}
                        onChange={(e) =>
                            applyFilters({ status: e.target.value as CellGroupFilters['status'] })
                        }
                    >
                        <option value="">Todos los estados</option>
                        <option value="active">Activo</option>
                        <option value="inactive">Inactivo</option>
                    </select>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Grupo</TableHead>
                            <TableHead>Anfitrión</TableHead>
                            <TableHead>Dirección</TableHead>
                            <TableHead className="text-center">Asistentes</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead className="hidden lg:table-cell">Apertura</TableHead>
                            <TableHead className="w-[60px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groups.data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-32 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <UsersRound className="h-8 w-8 text-gray-300" />
                                        <span>No se encontraron grupos celulares</span>
                                        <Link href="/groups/create">
                                            <Button variant="outline" size="sm">
                                                <Plus className="mr-1 h-3 w-3" /> Crear primer grupo
                                            </Button>
                                        </Link>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            groups.data.map((group) => (
                                <TableRow
                                    key={group.id}
                                    className="cursor-pointer"
                                    onClick={() => router.visit(`/groups/${group.id}`)}
                                >
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy/10 text-sm font-semibold text-navy">
                                                <UsersRound className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{group.name}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="text-sm text-gray-900">{group.host_display_name}</p>
                                            {group.host_phone && (
                                                <p className="flex items-center gap-1 text-xs text-gray-500">
                                                    <Phone className="h-3 w-3" />
                                                    {group.host_phone}
                                                </p>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="flex items-center gap-1 text-sm text-gray-600">
                                            <MapPin className="h-3.5 w-3.5 shrink-0" />
                                            <span className="line-clamp-1">{group.address}</span>
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                            <Users className="h-3 w-3" />
                                            {group.attendees_count}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={group.is_active ? 'success' : 'warning'}>
                                            {group.is_active ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden text-gray-600 lg:table-cell">
                                        {formatDate(group.opening_date)}
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
                                                        router.visit(`/groups/${group.id}`)
                                                    }}
                                                >
                                                    <Eye className="mr-2 h-4 w-4" /> Ver detalle
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        router.visit(`/groups/${group.id}/edit`)
                                                    }}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" /> Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setDeleteTarget(group)
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
                {groups.last_page > 1 && (
                    <div className="flex items-center justify-between border-t px-4 py-3">
                        <p className="text-sm text-gray-500">
                            Mostrando {groups.from} a {groups.to} de {groups.total}
                        </p>
                        <div className="flex items-center gap-1">
                            {groups.links.map((link, i) => {
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
                                if (i === groups.links.length - 1) {
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
                                        key={link.label}
                                        href={link.url ?? ''}
                                        preserveState
                                        className={`min-w-[32px] rounded-md px-2 py-1 text-center text-sm ${
                                            link.active
                                                ? 'bg-navy font-semibold text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation */}
            <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar grupo celular?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Se eliminará permanentemente el grupo{' '}
                            <strong>{deleteTarget?.name}</strong> y todos sus asistentes asociados.
                            Esta acción no se puede deshacer.
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
