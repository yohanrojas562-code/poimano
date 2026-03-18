import { useForm } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Save, ArrowLeft, Crown, Heart, Flame, Megaphone } from 'lucide-react'
import { Link } from '@inertiajs/react'
import type { MinistryArea, LeaderOption, roleLabels, roleDescriptions } from '@/types/ministry'

interface MinistryAreaFormProps {
    area?: MinistryArea
    leaders: LeaderOption[]
}

const roles = [
    { key: 'coordinator_id', label: 'Coordinador / Líder', icon: Crown, color: 'text-amber-600', description: 'Encargado de coordinar, liderar, administrar y gestionar la guía del área ministerial.' },
    { key: 'consolidator_id', label: 'Consolidador', icon: Heart, color: 'text-rose-600', description: 'Encargado de estar pendiente de los nuevos creyentes y hacer seguimiento.' },
    { key: 'spiritual_id', label: 'Espiritual', icon: Flame, color: 'text-purple-600', description: 'Encargado de orar, interceder y guiar espiritualmente al grupo.' },
    { key: 'evangelism_id', label: 'Evangelismo', icon: Megaphone, color: 'text-green-600', description: 'Encargado de promover actividades evangelísticas del área ministerial.' },
] as const

type FormData = {
    name: string
    description: string
    coordinator_id: string
    consolidator_id: string
    spiritual_id: string
    evangelism_id: string
    is_active: boolean
}

export default function MinistryAreaForm({ area, leaders }: MinistryAreaFormProps) {
    const form = useForm<FormData>({
        name: area?.name ?? '',
        description: area?.description ?? '',
        coordinator_id: area?.coordinator_id ? String(area.coordinator_id) : '',
        consolidator_id: area?.consolidator_id ? String(area.consolidator_id) : '',
        spiritual_id: area?.spiritual_id ? String(area.spiritual_id) : '',
        evangelism_id: area?.evangelism_id ? String(area.evangelism_id) : '',
        is_active: area?.is_active ?? true,
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        const url = area ? `/ministry-areas/${area.id}` : '/ministry-areas'
        const method = area ? 'put' : 'post'

        const data = {
            ...form.data,
            coordinator_id: form.data.coordinator_id || null,
            consolidator_id: form.data.consolidator_id || null,
            spiritual_id: form.data.spiritual_id || null,
            evangelism_id: form.data.evangelism_id || null,
        }

        if (method === 'put') {
            form.put(url, { data })
        } else {
            form.post(url, { data })
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link href="/ministry-areas">
                        <Button type="button" variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-navy">
                        {area ? 'Editar Área Ministerial' : 'Nueva Área Ministerial'}
                    </h1>
                </div>
                <Button type="submit" disabled={form.processing} className="bg-navy hover:bg-navy/90">
                    <Save className="mr-2 h-4 w-4" />
                    {form.processing ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>

            {/* Información General */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-navy">Información General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Área Ministerial *</Label>
                        <Input
                            id="name"
                            value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)}
                            placeholder="Ej: Alabanza y Adoración, Jóvenes, Niños..."
                        />
                        {form.errors.name && <p className="text-sm text-red-500">{form.errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={form.data.description}
                            onChange={(e) => form.setData('description', e.target.value)}
                            placeholder="Describe el propósito y visión de esta área ministerial..."
                            rows={3}
                        />
                        {form.errors.description && <p className="text-sm text-red-500">{form.errors.description}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                        <Label htmlFor="is_active">Estado</Label>
                        <Select
                            value={form.data.is_active ? 'true' : 'false'}
                            onValueChange={(val) => form.setData('is_active', val === 'true')}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Activa</SelectItem>
                                <SelectItem value="false">Inactiva</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Estructura de Liderazgo */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-navy">Estructura de Liderazgo</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Asigna los roles de liderazgo para esta área ministerial. Solo se pueden asignar miembros con categoría <strong>Líder</strong>.
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {roles.map((role) => {
                            const fieldKey = role.key as keyof FormData
                            return (
                                <div key={role.key} className="rounded-lg border p-4 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <role.icon className={`h-5 w-5 ${role.color}`} />
                                        <h3 className="font-semibold text-sm">{role.label}</h3>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{role.description}</p>
                                    <Select
                                        value={form.data[fieldKey] as string}
                                        onValueChange={(val) => form.setData(fieldKey, val === '__none__' ? '' : val)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar líder..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="__none__">— Sin asignar —</SelectItem>
                                            {leaders.map((leader) => (
                                                <SelectItem key={leader.id} value={String(leader.id)}>
                                                    {leader.first_name} {leader.last_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {form.errors[fieldKey] && (
                                        <p className="text-sm text-red-500">{form.errors[fieldKey]}</p>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {leaders.length === 0 && (
                        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4 text-center">
                            <p className="text-sm text-amber-800">
                                No hay miembros con categoría <strong>Líder</strong> registrados.
                                <br />
                                <Link href="/members/create" className="text-amber-600 underline hover:text-amber-800">
                                    Registra un miembro como líder
                                </Link>{' '}
                                para poder asignarlo a un área ministerial.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </form>
    )
}
