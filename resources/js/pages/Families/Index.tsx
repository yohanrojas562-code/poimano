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
    Home,
    Users,
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Phone,
    MapPin,
} from 'lucide-react'
import type { Family, PaginatedData } from '@/types/members'

interface FamilyWithCount extends Family {
    members_count: number
}

interface IndexProps {
    families: PaginatedData<FamilyWithCount>
    filters: { search?: string }
    stats: {
        total: number
        with_members: number
    }
}

export default function Index({ families, filters, stats }: IndexProps) {
    const [search, setSearch] = useState(filters.search ?? '')
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    function handleSearch(value: string) {
        setSearch(value)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            router.get('/families', { search: value || undefined }, { preserveState: true, replace: true })
        }, 400)
    }

    function handleDelete() {
        if (deleteId) {
            router.delete(`/families/${deleteId}`)
            setDeleteId(null)
        }
    }

    return (
        <TenantLayout>
            <Head title="Familias" />

            <div className="space-y-6 p-6">
                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-lg bg-navy/10 p-3">
                                <Home className="h-6 w-6 text-navy" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-navy">{stats.total}</p>
                                <p className="text-sm text-gray-500">Total Familias</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="flex items-center gap-4 p-4">
                            <div className="rounded-lg bg-cyan/10 p-3">
                                <Users className="h-6 w-6 text-cyan" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-navy">{stats.with_members}</p>
                                <p className="text-sm text-gray-500">Con Miembros</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Buscar familia..."
                            className="pl-10"
                        />
                    </div>
                    <Link href="/families/create">
                        <Button className="bg-navy hover:bg-navy/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Familia
                        </Button>
                    </Link>
                </div>

                {/* Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Familia</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Dirección</TableHead>
                                    <TableHead className="text-center">Miembros</TableHead>
                                    <TableHead>Matrimonio</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {families.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="py-12 text-center text-gray-500">
                                            <Home className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                                            <p className="font-medium">No hay familias registradas</p>
                                            <p className="text-sm">Crea la primera familia para empezar</p>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    families.data.map((family) => (
                                        <TableRow key={family.id}>
                                            <TableCell>
                                                <Link
                                                    href={`/families/${family.id}`}
                                                    className="font-medium text-navy hover:underline"
                                                >
                                                    {family.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                {family.phone ? (
                                                    <span className="flex items-center gap-1 text-sm text-gray-600">
                                                        <Phone className="h-3.5 w-3.5" />
                                                        {family.phone}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {family.address ? (
                                                    <span className="flex items-center gap-1 text-sm text-gray-600">
                                                        <MapPin className="h-3.5 w-3.5" />
                                                        <span className="max-w-[200px] truncate">{family.address}</span>
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">—</span>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="secondary">
                                                    {family.members_count}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm text-gray-600">
                                                    {family.wedding_date
                                                        ? new Date(family.wedding_date).toLocaleDateString('es')
                                                        : '—'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/families/${family.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                Ver detalle
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/families/${family.id}/edit`}>
                                                                <Pencil className="mr-2 h-4 w-4" />
                                                                Editar
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => setDeleteId(family.id)}
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {families.last_page > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                            Mostrando {families.from}–{families.to} de {families.total}
                        </p>
                        <div className="flex gap-1">
                            {families.links.map((link, i) => {
                                if (!link.url) return null
                                const label = link.label
                                    .replace('&laquo;', '«')
                                    .replace('&raquo;', '»')
                                return (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`rounded-md px-3 py-1.5 text-sm ${
                                            link.active
                                                ? 'bg-navy text-white'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                        preserveState
                                    >
                                        {label}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Dialog */}
            <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar esta familia?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará la familia. Los miembros asociados no serán eliminados, pero
                            perderán su vínculo familiar.
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
