import { useForm } from '@inertiajs/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Save, ArrowLeft, Crown, Heart, Flame, Megaphone, Search, X, User, Check } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { useState, useRef, useEffect } from 'react'
import type { MinistryArea, LeaderOption } from '@/types/ministry'

interface MinistryAreaFormProps {
    area?: MinistryArea
    leaders: LeaderOption[]
}

const roles = [
    { key: 'coordinator_id', label: 'Coordinador / Líder', icon: Crown, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', ring: 'ring-amber-300', description: 'Coordinar, liderar, administrar y gestionar la guía del área.' },
    { key: 'consolidator_id', label: 'Consolidador', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200', ring: 'ring-rose-300', description: 'Seguimiento a nuevos creyentes del ministerio.' },
    { key: 'spiritual_id', label: 'Espiritual', icon: Flame, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', ring: 'ring-purple-300', description: 'Orar, interceder y guiar espiritualmente al grupo.' },
    { key: 'evangelism_id', label: 'Evangelismo', icon: Megaphone, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', ring: 'ring-green-300', description: 'Promover actividades evangelísticas del área.' },
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

// ── Componente de selector de líder con búsqueda ──
function LeaderPicker({
    leaders,
    value,
    onChange,
    placeholder,
}: {
    leaders: LeaderOption[]
    value: string
    onChange: (val: string) => void
    placeholder?: string
}) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const selected = leaders.find((l) => String(l.id) === value)

    const filtered = leaders.filter((l) => {
        if (!search) return true
        const q = search.toLowerCase()
        return `${l.first_name} ${l.last_name}`.toLowerCase().includes(q)
    })

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={containerRef} className="relative">
            {/* Trigger */}
            {!open ? (
                <button
                    type="button"
                    onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }}
                    className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 transition-colors"
                >
                    {selected ? (
                        <span className="flex items-center gap-2">
                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                            {selected.first_name} {selected.last_name}
                        </span>
                    ) : (
                        <span className="text-muted-foreground">{placeholder ?? 'Seleccionar líder...'}</span>
                    )}
                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
            ) : (
                <div className="flex h-9 items-center rounded-md border border-input bg-white px-3 shadow-sm ring-2 ring-navy/20">
                    <Search className="mr-2 h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar líder por nombre..."
                        className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    {search && (
                        <button type="button" onClick={() => setSearch('')} className="ml-1 p-0.5 hover:bg-gray-100 rounded">
                            <X className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                    )}
                </div>
            )}

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded-md border bg-white shadow-lg">
                    {/* Sin asignar */}
                    <button
                        type="button"
                        onClick={() => { onChange(''); setOpen(false); setSearch('') }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-gray-50"
                    >
                        <X className="h-3.5 w-3.5" />
                        Sin asignar
                        {!value && <Check className="ml-auto h-3.5 w-3.5 text-navy" />}
                    </button>
                    {filtered.length === 0 ? (
                        <div className="px-3 py-3 text-center text-sm text-muted-foreground">
                            No se encontraron líderes
                        </div>
                    ) : (
                        filtered.map((leader) => (
                            <button
                                type="button"
                                key={leader.id}
                                onClick={() => { onChange(String(leader.id)); setOpen(false); setSearch('') }}
                                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                            >
                                <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <span>{leader.first_name} {leader.last_name}</span>
                                {String(leader.id) === value && <Check className="ml-auto h-3.5 w-3.5 text-navy" />}
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
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

        const data = {
            ...form.data,
            coordinator_id: form.data.coordinator_id || null,
            consolidator_id: form.data.consolidator_id || null,
            spiritual_id: form.data.spiritual_id || null,
            evangelism_id: form.data.evangelism_id || null,
        }

        if (area) {
            form.put(url, { data })
        } else {
            form.post(url, { data })
        }
    }

    function getSelectedLeaderName(fieldKey: keyof FormData): string | null {
        const val = form.data[fieldKey] as string
        if (!val) return null
        const leader = leaders.find((l) => String(l.id) === val)
        return leader ? `${leader.first_name} ${leader.last_name}` : null
    }

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-6">
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

            {/* Layout 2 columnas */}
            <div className="grid gap-6 lg:grid-cols-5">
                {/* Columna izquierda — Info general (2/5) */}
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-navy text-base">Información General</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre *</Label>
                                <Input
                                    id="name"
                                    value={form.data.name}
                                    onChange={(e) => form.setData('name', e.target.value)}
                                    placeholder="Ej: Alabanza, Jóvenes, Niños..."
                                />
                                {form.errors.name && <p className="text-sm text-red-500">{form.errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción</Label>
                                <Textarea
                                    id="description"
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                    placeholder="Propósito y visión del área..."
                                    rows={4}
                                />
                                {form.errors.description && <p className="text-sm text-red-500">{form.errors.description}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label>Estado</Label>
                                <Select
                                    value={form.data.is_active ? 'true' : 'false'}
                                    onValueChange={(val) => form.setData('is_active', val === 'true')}
                                >
                                    <SelectTrigger>
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

                    {/* Resumen de asignaciones */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-navy text-base">Resumen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {roles.map((role) => {
                                const name = getSelectedLeaderName(role.key as keyof FormData)
                                return (
                                    <div key={role.key} className="flex items-center justify-between py-1.5">
                                        <span className="flex items-center gap-2 text-sm">
                                            <role.icon className={`h-4 w-4 ${role.color}`} />
                                            {role.label}
                                        </span>
                                        {name ? (
                                            <Badge variant="secondary" className="text-xs font-normal">{name}</Badge>
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">Sin asignar</span>
                                        )}
                                    </div>
                                )
                            })}
                        </CardContent>
                    </Card>
                </div>

                {/* Columna derecha — Liderazgo (3/5) */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-semibold text-navy">Estructura de Liderazgo</h2>
                            <p className="text-xs text-muted-foreground mt-0.5">
                                Solo miembros con categoría <strong>Líder</strong> · {leaders.length} disponible{leaders.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    </div>

                    {leaders.length === 0 ? (
                        <Card className="border-amber-200 bg-amber-50">
                            <CardContent className="pt-6 text-center">
                                <p className="text-sm text-amber-800">
                                    No hay miembros con categoría <strong>Líder</strong> registrados.
                                </p>
                                <Link href="/members/create" className="mt-2 inline-block text-sm text-amber-600 underline hover:text-amber-800">
                                    Registrar un líder
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {roles.map((role) => {
                                const fieldKey = role.key as keyof FormData
                                const selectedName = getSelectedLeaderName(fieldKey)
                                return (
                                    <Card key={role.key} className={`${role.border} ${role.bg} border`}>
                                        <CardContent className="pt-5 pb-4 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className={`rounded-lg p-2 ${role.bg} border ${role.border}`}>
                                                    <role.icon className={`h-5 w-5 ${role.color}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm text-gray-900">{role.label}</h3>
                                                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{role.description}</p>
                                                </div>
                                            </div>

                                            <LeaderPicker
                                                leaders={leaders}
                                                value={form.data[fieldKey] as string}
                                                onChange={(val) => form.setData(fieldKey, val)}
                                                placeholder={`Asignar ${role.label.toLowerCase()}...`}
                                            />

                                            {form.errors[fieldKey] && (
                                                <p className="text-xs text-red-500">{form.errors[fieldKey]}</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>
        </form>
    )
}
