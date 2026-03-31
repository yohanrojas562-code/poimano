import { useState } from 'react'
import { router } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    UsersRound,
    MapPin,
    Calendar,
    UserRound,
    Phone,
    X,
    Search,
} from 'lucide-react'
import type { CellGroup, MemberRef, AttendeeInput } from '@/types/groups'

interface GroupFormProps {
    group?: CellGroup
    members: MemberRef[]
}

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'

export default function GroupForm({ group, members }: GroupFormProps) {
    const isEdit = !!group

    const [form, setForm] = useState({
        name: group?.name ?? '',
        opening_date: group?.opening_date?.split('T')[0] ?? '',
        address: group?.address ?? '',
        host_type: group?.host_type ?? 'external',
        host_member_id: group?.host_member_id ?? '',
        host_name: group?.host_name ?? '',
        host_phone: group?.host_phone ?? '',
        notes: group?.notes ?? '',
        is_active: group?.is_active ?? true,
    })

    const [attendees, setAttendees] = useState<AttendeeInput[]>(
        group?.attendees?.map((a) => ({
            type: a.type,
            member_id: a.member_id,
            name: a.name,
            phone: a.phone,
        })) ?? []
    )

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [processing, setProcessing] = useState(false)
    const [memberSearch, setMemberSearch] = useState('')
    const [attendeeMemberSearch, setAttendeeMemberSearch] = useState('')
    const [showHostMemberDropdown, setShowHostMemberDropdown] = useState(false)
    const [activeAttendeeIndex, setActiveAttendeeIndex] = useState<number | null>(null)

    function updateField(field: string, value: any) {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev }
                delete next[field]
                return next
            })
        }
    }

    function addAttendee() {
        setAttendees((prev) => [...prev, { type: 'member', member_id: null, name: '', phone: '' }])
    }

    function updateAttendee(index: number, field: string, value: any) {
        setAttendees((prev) => {
            const next = [...prev]
            next[index] = { ...next[index], [field]: value }
            if (field === 'type') {
                next[index].member_id = null
                next[index].name = ''
                next[index].phone = ''
            }
            return next
        })
    }

    function removeAttendee(index: number) {
        setAttendees((prev) => prev.filter((_, i) => i !== index))
    }

    function selectHostMember(member: MemberRef) {
        updateField('host_member_id', member.id)
        setMemberSearch(`${member.first_name} ${member.last_name}`)
        setShowHostMemberDropdown(false)
    }

    function selectAttendeeMember(index: number, member: MemberRef) {
        updateAttendee(index, 'member_id', member.id)
        setActiveAttendeeIndex(null)
        setAttendeeMemberSearch('')
    }

    function getMemberName(memberId: number | null | undefined): string {
        if (!memberId) return ''
        const m = members.find((m) => m.id === memberId)
        return m ? `${m.first_name} ${m.last_name}` : ''
    }

    const filteredHostMembers = members.filter(
        (m) =>
            memberSearch.length > 0 &&
            `${m.first_name} ${m.last_name}`.toLowerCase().includes(memberSearch.toLowerCase())
    )

    const filteredAttendeeMembers = members.filter(
        (m) =>
            attendeeMemberSearch.length > 0 &&
            `${m.first_name} ${m.last_name}`
                .toLowerCase()
                .includes(attendeeMemberSearch.toLowerCase())
    )

    // Members already selected as attendees (to avoid duplicates)
    const selectedMemberIds = new Set(
        attendees.filter((a) => a.type === 'member' && a.member_id).map((a) => a.member_id!)
    )

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setProcessing(true)

        const data = {
            ...form,
            host_member_id: form.host_type === 'member' ? form.host_member_id || null : null,
            host_name: form.host_type === 'external' ? form.host_name : null,
            host_phone: form.host_phone || null,
            attendees: attendees.filter(
                (a) => (a.type === 'member' && a.member_id) || (a.type === 'external' && a.name)
            ),
        }

        const url = isEdit ? `/groups/${group.id}` : '/groups'
        const method = isEdit ? 'put' : 'post'

        router[method](url, data as any, {
            onError: (errs) => {
                setErrors(errs)
                setProcessing(false)
            },
            onFinish: () => setProcessing(false),
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.visit('/groups')}
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-navy">
                            {isEdit ? 'Editar Grupo Celular' : 'Nuevo Grupo Celular'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {isEdit ? `Editando: ${group.name}` : 'Registra un nuevo grupo celular'}
                        </p>
                    </div>
                </div>
                <Button type="submit" disabled={processing}>
                    <Save className="mr-2 h-4 w-4" />
                    {processing ? 'Guardando...' : 'Guardar'}
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Información del Grupo */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <UsersRound className="h-5 w-5 text-cyan" /> Información del Grupo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nombre del grupo *</Label>
                            <Input
                                id="name"
                                value={form.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                placeholder="Ej: Grupo Celular Norte"
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="opening_date">Fecha de apertura *</Label>
                            <Input
                                id="opening_date"
                                type="date"
                                value={form.opening_date}
                                onChange={(e) => updateField('opening_date', e.target.value)}
                            />
                            {errors.opening_date && (
                                <p className="mt-1 text-xs text-red-500">{errors.opening_date}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="address">Dirección *</Label>
                            <Textarea
                                id="address"
                                value={form.address}
                                onChange={(e) => updateField('address', e.target.value)}
                                placeholder="Dirección del grupo celular"
                                rows={2}
                            />
                            {errors.address && (
                                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="notes">Notas</Label>
                            <Textarea
                                id="notes"
                                value={form.notes}
                                onChange={(e) => updateField('notes', e.target.value)}
                                placeholder="Notas adicionales..."
                                rows={3}
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={form.is_active}
                                onChange={(e) => updateField('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Grupo activo
                            </Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Anfitrión */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <UserRound className="h-5 w-5 text-cyan" /> Anfitrión
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Tipo de anfitrión *</Label>
                            <select
                                className={selectClass}
                                value={form.host_type}
                                onChange={(e) => {
                                    updateField('host_type', e.target.value)
                                    updateField('host_member_id', '')
                                    updateField('host_name', '')
                                    updateField('host_phone', '')
                                    setMemberSearch('')
                                }}
                            >
                                <option value="member">Miembro de la iglesia</option>
                                <option value="external">Persona externa</option>
                            </select>
                        </div>

                        {form.host_type === 'member' ? (
                            <div className="relative">
                                <Label>Seleccionar miembro *</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        value={
                                            form.host_member_id
                                                ? getMemberName(Number(form.host_member_id))
                                                : memberSearch
                                        }
                                        onChange={(e) => {
                                            setMemberSearch(e.target.value)
                                            updateField('host_member_id', '')
                                            setShowHostMemberDropdown(true)
                                        }}
                                        onFocus={() => setShowHostMemberDropdown(true)}
                                        placeholder="Buscar miembro..."
                                        className="pl-9"
                                    />
                                    {form.host_member_id && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                updateField('host_member_id', '')
                                                setMemberSearch('')
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    )}
                                </div>
                                {showHostMemberDropdown && filteredHostMembers.length > 0 && (
                                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white shadow-lg">
                                        {filteredHostMembers.slice(0, 10).map((m) => (
                                            <button
                                                key={m.id}
                                                type="button"
                                                onClick={() => selectHostMember(m)}
                                                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                                            >
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy">
                                                    {m.first_name[0]}{m.last_name[0]}
                                                </div>
                                                {m.first_name} {m.last_name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {errors.host_member_id && (
                                    <p className="mt-1 text-xs text-red-500">{errors.host_member_id}</p>
                                )}
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Label htmlFor="host_name">Nombre del anfitrión *</Label>
                                    <Input
                                        id="host_name"
                                        value={form.host_name}
                                        onChange={(e) => updateField('host_name', e.target.value)}
                                        placeholder="Nombre completo"
                                    />
                                    {errors.host_name && (
                                        <p className="mt-1 text-xs text-red-500">{errors.host_name}</p>
                                    )}
                                </div>
                            </>
                        )}

                        <div>
                            <Label htmlFor="host_phone">Teléfono de contacto</Label>
                            <Input
                                id="host_phone"
                                value={form.host_phone}
                                onChange={(e) => updateField('host_phone', e.target.value)}
                                placeholder="Ej: +57 300 123 4567"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Asistentes */}
            <Card className="mt-6">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <UsersRound className="h-5 w-5 text-cyan" /> Asistentes
                            <Badge variant="secondary" className="ml-2">
                                {attendees.length}
                            </Badge>
                        </CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addAttendee}>
                            <Plus className="mr-1 h-4 w-4" /> Agregar Asistente
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {attendees.length === 0 ? (
                        <div className="flex flex-col items-center gap-2 py-8 text-gray-400">
                            <UsersRound className="h-10 w-10" />
                            <p className="text-sm">Aún no hay asistentes registrados</p>
                            <Button type="button" variant="outline" size="sm" onClick={addAttendee}>
                                <Plus className="mr-1 h-4 w-4" /> Agregar primer asistente
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {attendees.map((attendee, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center"
                                >
                                    <select
                                        className={`${selectClass} sm:w-44`}
                                        value={attendee.type}
                                        onChange={(e) => updateAttendee(index, 'type', e.target.value)}
                                    >
                                        <option value="member">Miembro</option>
                                        <option value="external">Externo</option>
                                    </select>

                                    {attendee.type === 'member' ? (
                                        <div className="relative flex-1">
                                            <div className="relative">
                                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    value={
                                                        attendee.member_id
                                                            ? getMemberName(attendee.member_id)
                                                            : activeAttendeeIndex === index
                                                              ? attendeeMemberSearch
                                                              : ''
                                                    }
                                                    onChange={(e) => {
                                                        setAttendeeMemberSearch(e.target.value)
                                                        setActiveAttendeeIndex(index)
                                                        updateAttendee(index, 'member_id', null)
                                                    }}
                                                    onFocus={() => {
                                                        setActiveAttendeeIndex(index)
                                                        setAttendeeMemberSearch('')
                                                    }}
                                                    placeholder="Buscar miembro..."
                                                    className="pl-9"
                                                />
                                                {attendee.member_id && (
                                                    <button
                                                        type="button"
                                                        onClick={() => updateAttendee(index, 'member_id', null)}
                                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                            {activeAttendeeIndex === index &&
                                                filteredAttendeeMembers.length > 0 && (
                                                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white shadow-lg">
                                                        {filteredAttendeeMembers
                                                            .filter((m) => !selectedMemberIds.has(m.id) || m.id === attendee.member_id)
                                                            .slice(0, 10)
                                                            .map((m) => (
                                                                <button
                                                                    key={m.id}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        selectAttendeeMember(index, m)
                                                                    }
                                                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                                                                >
                                                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs font-semibold text-navy">
                                                                        {m.first_name[0]}{m.last_name[0]}
                                                                    </div>
                                                                    {m.first_name} {m.last_name}
                                                                </button>
                                                            ))}
                                                    </div>
                                                )}
                                        </div>
                                    ) : (
                                        <>
                                            <Input
                                                className="flex-1"
                                                value={attendee.name ?? ''}
                                                onChange={(e) =>
                                                    updateAttendee(index, 'name', e.target.value)
                                                }
                                                placeholder="Nombre del asistente"
                                            />
                                            <Input
                                                className="sm:w-44"
                                                value={attendee.phone ?? ''}
                                                onChange={(e) =>
                                                    updateAttendee(index, 'phone', e.target.value)
                                                }
                                                placeholder="Teléfono"
                                            />
                                        </>
                                    )}

                                    {attendee.type === 'member' && (
                                        <Input
                                            className="sm:w-44"
                                            value={attendee.phone ?? ''}
                                            onChange={(e) =>
                                                updateAttendee(index, 'phone', e.target.value)
                                            }
                                            placeholder="Teléfono"
                                        />
                                    )}

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                                        onClick={() => removeAttendee(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </form>
    )
}
