import { useForm, Link, router } from '@inertiajs/react'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    UserRound,
    MapPin,
    Heart,
    Users,
    FileText,
    ArrowLeft,
    Save,
    Loader2,
    Plus,
} from 'lucide-react'
import { useState } from 'react'
import type { Member, Family } from '@/types/members'
import {
    statusLabels,
    categoryLabels,
    maritalStatusLabels,
    familyRoleLabels,
    genderLabels,
} from '@/types/members'

interface MemberFormProps {
    member?: Member
    families: Pick<Family, 'id' | 'name'>[]
    membersForRef: Pick<Member, 'id' | 'first_name' | 'last_name'>[]
}

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'

function toDateInput(date: string | null | undefined): string {
    if (!date) return ''
    return date.substring(0, 10)
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <Label className="text-sm">{label}</Label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    )
}

export default function MemberForm({ member, families: initialFamilies, membersForRef }: MemberFormProps) {
    const isEdit = !!member
    const [families, setFamilies] = useState(initialFamilies)
    const [showNewFamily, setShowNewFamily] = useState(false)
    const [newFamilyName, setNewFamilyName] = useState('')
    const [creatingFamily, setCreatingFamily] = useState(false)

    const form = useForm({
        first_name: member?.first_name ?? '',
        middle_name: member?.middle_name ?? '',
        last_name: member?.last_name ?? '',
        second_last_name: member?.second_last_name ?? '',
        gender: member?.gender ?? 'masculino',
        birth_date: toDateInput(member?.birth_date),
        blood_type: member?.blood_type ?? '',
        marital_status: member?.marital_status ?? '',
        nationality: member?.nationality ?? '',
        document_type: member?.document_type ?? '',
        document_number: member?.document_number ?? '',
        email: member?.email ?? '',
        phone: member?.phone ?? '',
        mobile: member?.mobile ?? '',
        address: member?.address ?? '',
        city: member?.city ?? '',
        state: member?.state ?? '',
        zip_code: member?.zip_code ?? '',
        country_id: member?.country_id?.toString() ?? '',
        member_status: member?.member_status ?? 'activo',
        category: member?.category ?? 'nuevo_creyente',
        is_baptized: member?.is_baptized ?? false,
        baptism_date: toDateInput(member?.baptism_date),
        baptism_church: member?.baptism_church ?? '',
        conversion_date: toDateInput(member?.conversion_date),
        membership_date: toDateInput(member?.membership_date),
        how_arrived: member?.how_arrived ?? '',
        referred_by_id: member?.referred_by_id?.toString() ?? '',
        family_id: member?.family_id?.toString() ?? '',
        family_role: member?.family_role ?? '',
        notes: member?.notes ?? '',
        is_active: member?.is_active ?? true,
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (isEdit) {
            form.put(`/members/${member!.id}`)
        } else {
            form.post('/members')
        }
    }

    function handleCreateFamily() {
        if (!newFamilyName.trim()) return
        setCreatingFamily(true)
        axios
            .post('/families', { name: newFamilyName.trim() }, {
                headers: { Accept: 'application/json' },
            })
            .then(({ data }) => {
                if (data.id) {
                    setFamilies(
                        [...families, { id: data.id, name: data.name }].sort((a, b) =>
                            a.name.localeCompare(b.name)
                        )
                    )
                    form.setData('family_id', String(data.id))
                    setShowNewFamily(false)
                    setNewFamilyName('')
                }
            })
            .catch(() => {})
            .finally(() => setCreatingFamily(false))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        href="/members"
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">
                            {isEdit ? 'Editar Miembro' : 'Nuevo Miembro'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {isEdit
                                ? `Editando: ${member!.full_name}`
                                : 'Completa la información del nuevo miembro'}
                        </p>
                    </div>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                    <Link href="/members">
                        <Button type="button" variant="outline">
                            Cancelar
                        </Button>
                    </Link>
                    <Button type="submit" disabled={form.processing}>
                        {form.processing ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        {isEdit ? 'Guardar Cambios' : 'Registrar Miembro'}
                    </Button>
                </div>
            </div>

            {/* ── Datos Personales ── */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <UserRound className="h-5 w-5 text-cyan" />
                        Datos Personales
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Nombre *" error={form.errors.first_name}>
                        <Input
                            value={form.data.first_name}
                            onChange={(e) => form.setData('first_name', e.target.value)}
                            placeholder="Ej: María"
                        />
                    </Field>
                    <Field label="Segundo Nombre" error={form.errors.middle_name}>
                        <Input
                            value={form.data.middle_name}
                            onChange={(e) => form.setData('middle_name', e.target.value)}
                        />
                    </Field>
                    <Field label="Apellido *" error={form.errors.last_name}>
                        <Input
                            value={form.data.last_name}
                            onChange={(e) => form.setData('last_name', e.target.value)}
                            placeholder="Ej: García"
                        />
                    </Field>
                    <Field label="Segundo Apellido" error={form.errors.second_last_name}>
                        <Input
                            value={form.data.second_last_name}
                            onChange={(e) => form.setData('second_last_name', e.target.value)}
                        />
                    </Field>
                    <Field label="Género *" error={form.errors.gender}>
                        <select
                            className={selectClass}
                            value={form.data.gender}
                            onChange={(e) => form.setData('gender', e.target.value as any)}
                        >
                            {Object.entries(genderLabels).map(([v, l]) => (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Fecha de Nacimiento" error={form.errors.birth_date}>
                        <Input
                            type="date"
                            value={form.data.birth_date}
                            onChange={(e) => form.setData('birth_date', e.target.value)}
                        />
                    </Field>
                    <Field label="Estado Civil" error={form.errors.marital_status}>
                        <select
                            className={selectClass}
                            value={form.data.marital_status}
                            onChange={(e) => form.setData('marital_status', e.target.value as any)}
                        >
                            <option value="">— Seleccionar —</option>
                            {Object.entries(maritalStatusLabels).map(([v, l]) => (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Tipo de Documento" error={form.errors.document_type}>
                        <select
                            className={selectClass}
                            value={form.data.document_type}
                            onChange={(e) => form.setData('document_type', e.target.value)}
                        >
                            <option value="">— Seleccionar —</option>
                            <option value="cedula">Cédula</option>
                            <option value="pasaporte">Pasaporte</option>
                            <option value="otro">Otro</option>
                        </select>
                    </Field>
                    <Field label="Número de Documento" error={form.errors.document_number}>
                        <Input
                            value={form.data.document_number}
                            onChange={(e) => form.setData('document_number', e.target.value)}
                        />
                    </Field>
                    <Field label="Tipo de Sangre" error={form.errors.blood_type}>
                        <select
                            className={selectClass}
                            value={form.data.blood_type}
                            onChange={(e) => form.setData('blood_type', e.target.value)}
                        >
                            <option value="">— Seleccionar —</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Nacionalidad" error={form.errors.nationality}>
                        <Input
                            value={form.data.nationality}
                            onChange={(e) => form.setData('nationality', e.target.value)}
                            placeholder="Ej: Colombiana"
                        />
                    </Field>
                </CardContent>
            </Card>

            {/* ── Información de Contacto ── */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <MapPin className="h-5 w-5 text-cyan" />
                        Información de Contacto
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Correo Electrónico" error={form.errors.email}>
                        <Input
                            type="email"
                            value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            placeholder="miembro@email.com"
                        />
                    </Field>
                    <Field label="Teléfono" error={form.errors.phone}>
                        <Input
                            value={form.data.phone}
                            onChange={(e) => form.setData('phone', e.target.value)}
                            placeholder="+57 300 123 4567"
                        />
                    </Field>
                    <Field label="Celular" error={form.errors.mobile}>
                        <Input
                            value={form.data.mobile}
                            onChange={(e) => form.setData('mobile', e.target.value)}
                        />
                    </Field>
                    <div className="sm:col-span-2 lg:col-span-3">
                        <Field label="Dirección" error={form.errors.address}>
                            <Input
                                value={form.data.address}
                                onChange={(e) => form.setData('address', e.target.value)}
                                placeholder="Calle, número, barrio..."
                            />
                        </Field>
                    </div>
                    <Field label="Ciudad" error={form.errors.city}>
                        <Input
                            value={form.data.city}
                            onChange={(e) => form.setData('city', e.target.value)}
                        />
                    </Field>
                    <Field label="Estado / Provincia" error={form.errors.state}>
                        <Input
                            value={form.data.state}
                            onChange={(e) => form.setData('state', e.target.value)}
                        />
                    </Field>
                    <Field label="Código Postal" error={form.errors.zip_code}>
                        <Input
                            value={form.data.zip_code}
                            onChange={(e) => form.setData('zip_code', e.target.value)}
                        />
                    </Field>
                </CardContent>
            </Card>

            {/* ── Vida Espiritual ── */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <Heart className="h-5 w-5 text-cyan" />
                        Vida Espiritual
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <Field label="Estado *" error={form.errors.member_status}>
                        <select
                            className={selectClass}
                            value={form.data.member_status}
                            onChange={(e) => form.setData('member_status', e.target.value as any)}
                        >
                            {Object.entries(statusLabels).map(([v, l]) => (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="Categoría *" error={form.errors.category}>
                        <select
                            className={selectClass}
                            value={form.data.category}
                            onChange={(e) => form.setData('category', e.target.value as any)}
                        >
                            {Object.entries(categoryLabels).map(([v, l]) => (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </Field>
                    <Field label="¿Cómo llegó?" error={form.errors.how_arrived}>
                        <select
                            className={selectClass}
                            value={form.data.how_arrived}
                            onChange={(e) => form.setData('how_arrived', e.target.value)}
                        >
                            <option value="">— Seleccionar —</option>
                            <option value="invitación">Invitación de un miembro</option>
                            <option value="evangelismo">Evangelismo</option>
                            <option value="redes_sociales">Redes Sociales</option>
                            <option value="transferencia">Transferencia de otra iglesia</option>
                            <option value="familia">Por un familiar</option>
                            <option value="otro">Otro</option>
                        </select>
                    </Field>
                    <div className="flex items-end gap-3 pb-1">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={form.data.is_baptized}
                                onChange={(e) => form.setData('is_baptized', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-navy focus:ring-cyan"
                            />
                            <span className="text-sm font-medium">Bautizado</span>
                        </label>
                    </div>
                    <Field label="Fecha de Bautismo" error={form.errors.baptism_date}>
                        <Input
                            type="date"
                            value={form.data.baptism_date}
                            onChange={(e) => form.setData('baptism_date', e.target.value)}
                            disabled={!form.data.is_baptized}
                        />
                    </Field>
                    <Field label="Iglesia de Bautismo" error={form.errors.baptism_church}>
                        <Input
                            value={form.data.baptism_church}
                            onChange={(e) => form.setData('baptism_church', e.target.value)}
                            disabled={!form.data.is_baptized}
                        />
                    </Field>
                    <Field label="Fecha de Conversión" error={form.errors.conversion_date}>
                        <Input
                            type="date"
                            value={form.data.conversion_date}
                            onChange={(e) => form.setData('conversion_date', e.target.value)}
                        />
                    </Field>
                    <Field label="Fecha de Membresía" error={form.errors.membership_date}>
                        <Input
                            type="date"
                            value={form.data.membership_date}
                            onChange={(e) => form.setData('membership_date', e.target.value)}
                        />
                    </Field>
                    <Field label="Referido por" error={form.errors.referred_by_id}>
                        <select
                            className={selectClass}
                            value={form.data.referred_by_id}
                            onChange={(e) => form.setData('referred_by_id', e.target.value)}
                        >
                            <option value="">— Ninguno —</option>
                            {membersForRef.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.first_name} {m.last_name}
                                </option>
                            ))}
                        </select>
                    </Field>
                </CardContent>
            </Card>

            {/* ── Familia ── */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <Users className="h-5 w-5 text-cyan" />
                        Familia
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <Label className="text-sm">Familia</Label>
                        <div className="flex gap-2">
                            <select
                                className={selectClass + ' flex-1'}
                                value={form.data.family_id}
                                onChange={(e) => form.setData('family_id', e.target.value)}
                            >
                                <option value="">— Sin asignar —</option>
                                {families.map((f) => (
                                    <option key={f.id} value={f.id}>
                                        {f.name}
                                    </option>
                                ))}
                            </select>
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                className="h-9 w-9 shrink-0"
                                onClick={() => setShowNewFamily(true)}
                                title="Crear nueva familia"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        {form.errors.family_id && <p className="text-xs text-red-500">{form.errors.family_id}</p>}
                    </div>
                    <Field label="Rol en la Familia" error={form.errors.family_role}>
                        <select
                            className={selectClass}
                            value={form.data.family_role}
                            onChange={(e) => form.setData('family_role', e.target.value as any)}
                        >
                            <option value="">— Seleccionar —</option>
                            {Object.entries(familyRoleLabels).map(([v, l]) => (
                                <option key={v} value={v}>
                                    {l}
                                </option>
                            ))}
                        </select>
                    </Field>
                </CardContent>
            </Card>

            {/* ── Notas y Estado ── */}
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <FileText className="h-5 w-5 text-cyan" />
                        Notas y Estado
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Field label="Notas" error={form.errors.notes}>
                        <Textarea
                            value={form.data.notes}
                            onChange={(e) => form.setData('notes', e.target.value)}
                            rows={4}
                            placeholder="Notas adicionales sobre el miembro..."
                        />
                    </Field>
                    <label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="checkbox"
                            checked={form.data.is_active}
                            onChange={(e) => form.setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-navy focus:ring-cyan"
                        />
                        <span className="text-sm font-medium">Miembro activo en el sistema</span>
                    </label>
                    {form.errors.is_active && (
                        <p className="text-xs text-red-500">{form.errors.is_active}</p>
                    )}
                </CardContent>
            </Card>

            {/* Bottom actions */}
            <div className="flex justify-end gap-2 pb-4">
                <Link href="/members">
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                </Link>
                <Button type="submit" disabled={form.processing}>
                    {form.processing ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Save className="mr-2 h-4 w-4" />
                    )}
                    {isEdit ? 'Guardar Cambios' : 'Registrar Miembro'}
                </Button>
            </div>

            {/* Dialog: crear familia rápida */}
            <Dialog open={showNewFamily} onOpenChange={setShowNewFamily}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Nueva Familia</DialogTitle>
                        <DialogDescription>
                            Ingresa el nombre de la familia. Podrás completar los datos adicionales luego.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-1.5">
                        <Label htmlFor="new_family_name">Nombre / Apellido</Label>
                        <Input
                            id="new_family_name"
                            value={newFamilyName}
                            onChange={(e) => setNewFamilyName(e.target.value)}
                            placeholder="Ej: Familia Rodríguez"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    handleCreateFamily()
                                }
                            }}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowNewFamily(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCreateFamily}
                            disabled={creatingFamily || !newFamilyName.trim()}
                            className="bg-navy hover:bg-navy/90"
                        >
                            {creatingFamily ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Plus className="mr-2 h-4 w-4" />
                            )}
                            Crear
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </form>
    )
}
