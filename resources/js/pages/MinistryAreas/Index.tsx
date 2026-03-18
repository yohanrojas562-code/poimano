import { Head, Link, router } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
    Plus,
    Search,
    MoreHorizontal,
    Eye,
    Pencil,
    Trash2,
    Crown,
    Heart,
    Flame,
    Megaphone,
    Layers,
    CheckCircle2,
    FishSymbol,
} from 'lucide-react'
import { useState, useEffect } from 'react'
import type { MinistryArea, MinistryAreaStats } from '@/types/ministry'
import type { PaginatedData, PaginationLink } from '@/types/members'

interface IndexProps {
    areas: PaginatedData<MinistryArea & { network_members_count?: number }>
    filters: { search?: string }
    stats: MinistryAreaStats
}

export default function Index({ areas, filters, stats }: IndexProps) {
    const [search, setSearch] = useState(filters.search ?? '')
    const [deleteArea, setDeleteArea] = useState<MinistryArea | null>(null)

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/ministry-areas', { search: search || undefined }, { preserveState: true, replace: true })
        }, 300)
        return () => clearTimeout(timeout)
    }, [search])

    function handleDelete() {
        if (!deleteArea) return
        router.delete(`/ministry-areas/${deleteArea.id}`, {
            onFinish: () => setDeleteArea(null),
        })
    }

    function renderLeaderBadge(member: { first_name: string; last_name: string } | null | undefined, icon: React.ElementType, color: string) {
        const Icon = icon
        if (!member) return <span className="text-xs text-muted-foreground">Sin asignar</span>
        return (
            <span className="inline-flex items-center gap-1 text-xs">
                <Icon className={`h-3 w-3 ${color}`} />
                {member.first_name} {member.last_name}
            </span>
        )
    }

    return (
        <TenantLayout>
            <Head title="Áreas Ministeriales" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-navy">Áreas Ministeriales</h1>
                    <Link href="/ministry-areas/create">
                        <Button className="bg-navy hover:bg-navy/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Área
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Áreas</CardTitle>
                            <Layers className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-navy">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Áreas Activas</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar área ministerial..."
                        className="pl-10"
                    />
                </div>

                {/* Table */}
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Coordinador</TableHead>
                                    <TableHead>Consolidador</TableHead>
                                    <TableHead>Espiritual</TableHead>
                                    <TableHead>Evangelismo</TableHead>
                                    <TableHead>Red</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="w-10" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {areas.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                                            No se encontraron áreas ministeriales.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    areas.data.map((area) => (
                                        <TableRow key={area.id}>
                                            <TableCell>
                                                <Link href={`/ministry-areas/${area.id}`} className="font-medium text-navy hover:underline">
                                                    {area.name}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{renderLeaderBadge(area.coordinator, Crown, 'text-amber-600')}</TableCell>
                                            <TableCell>{renderLeaderBadge(area.consolidator, Heart, 'text-rose-600')}</TableCell>
                                            <TableCell>{renderLeaderBadge(area.spiritual, Flame, 'text-purple-600')}</TableCell>
                                            <TableCell>{renderLeaderBadge(area.evangelism, Megaphone, 'text-green-600')}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs gap-1">
                                                    <FishSymbol className="h-3 w-3 text-cyan" />
                                                    {(area as any).network_members_count ?? 0}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={area.is_active ? 'default' : 'secondary'}>
                                                    {area.is_active ? 'Activa' : 'Inactiva'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/ministry-areas/${area.id}`}>
                                                                <Eye className="mr-2 h-4 w-4" /> Ver
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/ministry-areas/${area.id}/edit`}>
                                                                <Pencil className="mr-2 h-4 w-4" /> Editar
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            className="text-red-600"
                                                            onClick={() => setDeleteArea(area)}
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
                    </CardContent>
                </Card>

                {/* Pagination */}
                {areas.last_page > 1 && (
                    <div className="flex justify-center gap-1">
                        {areas.links.map((link: PaginationLink, i: number) => (
                            <Button
                                key={i}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.get(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={link.active ? 'bg-navy' : ''}
                            />
                        ))}
                    </div>
                )}

                {/* Delete Dialog */}
                <AlertDialog open={!!deleteArea} onOpenChange={() => setDeleteArea(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar área ministerial?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción eliminará permanentemente el área <strong>{deleteArea?.name}</strong>. Esta acción no se puede deshacer.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </TenantLayout>
    )
}
