import { useForm, Link } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Home, ArrowLeft, Save, Loader2 } from 'lucide-react'
import type { Family } from '@/types/members'

interface FamilyFormProps {
    family?: Family
}

export default function FamilyForm({ family }: FamilyFormProps) {
    const isEdit = !!family

    const form = useForm({
        name: family?.name ?? '',
        address: family?.address ?? '',
        phone: family?.phone ?? '',
        wedding_date: family?.wedding_date ?? '',
        notes: family?.notes ?? '',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (isEdit) {
            form.put(`/families/${family!.id}`)
        } else {
            form.post('/families')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
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
                        <h1 className="text-2xl font-bold text-navy">
                            {isEdit ? 'Editar Familia' : 'Nueva Familia'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {isEdit
                                ? `Editando: ${family!.name}`
                                : 'Registra una nueva familia en el sistema'}
                        </p>
                    </div>
                </div>
                <Button type="submit" disabled={form.processing} className="bg-navy hover:bg-navy/90">
                    {form.processing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    {isEdit ? 'Actualizar' : 'Guardar'}
                </Button>
            </div>

            {/* Form */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <Home className="h-5 w-5 text-cyan" />
                        Datos de la Familia
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="name">
                                Nombre / Apellido de Familia <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                placeholder="Ej: Familia Rodríguez"
                            />
                            {form.errors.name && (
                                <p className="text-xs text-red-500">{form.errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                value={form.data.phone}
                                onChange={(e) => form.setData('phone', e.target.value)}
                                placeholder="+57 300 000 0000"
                            />
                            {form.errors.phone && (
                                <p className="text-xs text-red-500">{form.errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                            id="address"
                            value={form.data.address}
                            onChange={(e) => form.setData('address', e.target.value)}
                            placeholder="Dirección del hogar"
                        />
                        {form.errors.address && (
                            <p className="text-xs text-red-500">{form.errors.address}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="wedding_date">Fecha de Matrimonio</Label>
                            <Input
                                id="wedding_date"
                                type="date"
                                value={form.data.wedding_date}
                                onChange={(e) => form.setData('wedding_date', e.target.value)}
                            />
                            {form.errors.wedding_date && (
                                <p className="text-xs text-red-500">{form.errors.wedding_date}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea
                            id="notes"
                            value={form.data.notes}
                            onChange={(e) => form.setData('notes', e.target.value)}
                            rows={3}
                            placeholder="Notas adicionales sobre la familia..."
                        />
                        {form.errors.notes && (
                            <p className="text-xs text-red-500">{form.errors.notes}</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
