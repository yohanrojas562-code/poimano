import { Head, useForm, usePage } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Church,
    Palette,
    Globe,
    MapPin,
    Upload,
    Trash2,
    Save,
    Loader2,
    Image as ImageIcon,
    Phone,
    Mail,
    Link as LinkIcon,
    CalendarDays,
    BookOpen,
    LayoutDashboard,
    Users,
    Home,
} from 'lucide-react'
import { type FormEvent, useState, useRef } from 'react'
import type { PageProps } from '@/types'

interface ChurchSettings {
    id: number
    church_name: string
    logo: string | null
    favicon: string | null
    slogan: string | null
    primary_color: string
    secondary_color: string
    text_color: string
    language: string
    currency: string
    timezone: string
    phone: string | null
    email: string | null
    address: string | null
    city: string | null
    country_id: number | null
    website: string | null
    founded_at: string | null
    denomination: string | null
}

interface Props extends PageProps {
    settings: ChurchSettings
}

const timezones = [
    { value: 'America/Bogota', label: 'Bogotá (GMT-5)' },
    { value: 'America/Mexico_City', label: 'Ciudad de México (GMT-6)' },
    { value: 'America/Lima', label: 'Lima (GMT-5)' },
    { value: 'America/Santiago', label: 'Santiago (GMT-4)' },
    { value: 'America/Buenos_Aires', label: 'Buenos Aires (GMT-3)' },
    { value: 'America/Sao_Paulo', label: 'São Paulo (GMT-3)' },
    { value: 'America/New_York', label: 'New York (GMT-5)' },
    { value: 'America/Los_Angeles', label: 'Los Ángeles (GMT-8)' },
    { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
    { value: 'America/Panama', label: 'Panamá (GMT-5)' },
    { value: 'America/Guayaquil', label: 'Guayaquil (GMT-5)' },
    { value: 'America/Caracas', label: 'Caracas (GMT-4)' },
    { value: 'America/Costa_Rica', label: 'Costa Rica (GMT-6)' },
    { value: 'America/Guatemala', label: 'Guatemala (GMT-6)' },
]

const currencies = [
    { value: 'USD', label: 'USD — Dólar Estadounidense' },
    { value: 'COP', label: 'COP — Peso Colombiano' },
    { value: 'MXN', label: 'MXN — Peso Mexicano' },
    { value: 'EUR', label: 'EUR — Euro' },
    { value: 'BRL', label: 'BRL — Real Brasileño' },
    { value: 'PEN', label: 'PEN — Sol Peruano' },
    { value: 'ARS', label: 'ARS — Peso Argentino' },
    { value: 'CLP', label: 'CLP — Peso Chileno' },
]

const languages = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'pt', label: 'Português' },
]

const presetColors = [
    { name: 'Navy / Cyan', primary: '#00105E', secondary: '#00E1FF' },
    { name: 'Azul / Dorado', primary: '#1E3A8A', secondary: '#F59E0B' },
    { name: 'Verde / Blanco', primary: '#065F46', secondary: '#10B981' },
    { name: 'Púrpura / Rosa', primary: '#581C87', secondary: '#EC4899' },
    { name: 'Gris / Rojo', primary: '#1F2937', secondary: '#EF4444' },
    { name: 'Índigo / Ámbar', primary: '#312E81', secondary: '#F97316' },
]

export default function ChurchSettingsPage() {
    const { settings } = usePage<Props>().props
    const fileInputRef = useRef<HTMLInputElement>(null)
    const faviconInputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(
        settings.logo ? `/storage/${settings.logo}` : null
    )
    const [faviconPreview, setFaviconPreview] = useState<string | null>(
        settings.favicon ? `/storage/${settings.favicon}` : null
    )

    const { data, setData, post, processing, errors } = useForm({
        church_name: settings.church_name ?? '',
        slogan: settings.slogan ?? '',
        primary_color: settings.primary_color ?? '#00105E',
        secondary_color: settings.secondary_color ?? '#00E1FF',
        text_color: settings.text_color ?? '#FFFFFF',
        language: settings.language ?? 'es',
        currency: settings.currency ?? 'USD',
        timezone: settings.timezone ?? 'America/Bogota',
        phone: settings.phone ?? '',
        email: settings.email ?? '',
        address: settings.address ?? '',
        city: settings.city ?? '',
        website: settings.website ?? '',
        founded_at: settings.founded_at?.split('T')[0] ?? '',
        denomination: settings.denomination ?? '',
        logo: null as File | null,
        remove_logo: false,
        favicon: null as File | null,
        remove_favicon: false,
        _method: 'PUT',
    })

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setData('logo', file)
            setData('remove_logo', false)
            setPreview(URL.createObjectURL(file))
        }
    }

    const removeLogo = () => {
        setData('logo', null)
        setData('remove_logo', true)
        setPreview(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setData('favicon', file)
            setData('remove_favicon', false)
            setFaviconPreview(URL.createObjectURL(file))
        }
    }

    const removeFavicon = () => {
        setData('favicon', null)
        setData('remove_favicon', true)
        setFaviconPreview(null)
        if (faviconInputRef.current) faviconInputRef.current.value = ''
    }

    const applyPreset = (primary: string, secondary: string) => {
        setData('primary_color', primary)
        setData('secondary_color', secondary)
    }

    const submit = (e: FormEvent) => {
        e.preventDefault()
        post('/settings/church', {
            forceFormData: true,
        })
    }

    return (
        <TenantLayout>
            <Head title="Configuración de Iglesia" />

            <form onSubmit={submit} className="mx-auto max-w-5xl space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Configuración de Iglesia</h1>
                        <p className="text-sm text-muted-foreground">
                            Personaliza la información y apariencia de tu iglesia
                        </p>
                    </div>
                    <Button type="submit" disabled={processing} className="bg-navy hover:bg-navy/90">
                        {processing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Guardar Cambios
                            </>
                        )}
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* ── Columna izquierda (2/3) ── */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Información General */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-navy text-base">
                                    <Church className="h-4 w-4 text-cyan" />
                                    Información General
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="church_name">Nombre de la Iglesia *</Label>
                                        <Input
                                            id="church_name"
                                            value={data.church_name}
                                            onChange={(e) => setData('church_name', e.target.value)}
                                            placeholder="Ej: Iglesia Cristiana La Salle"
                                        />
                                        {errors.church_name && <p className="text-xs text-red-500">{errors.church_name}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="denomination">Denominación</Label>
                                        <div className="relative">
                                            <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="denomination"
                                                value={data.denomination}
                                                onChange={(e) => setData('denomination', e.target.value)}
                                                placeholder="Ej: Bautista, Pentecostal, etc."
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="slogan">Slogan / Lema</Label>
                                    <Input
                                        id="slogan"
                                        value={data.slogan}
                                        onChange={(e) => setData('slogan', e.target.value)}
                                        placeholder="Ej: Transformando vidas con el amor de Cristo"
                                    />
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="founded_at">Fecha de Fundación</Label>
                                        <div className="relative">
                                            <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="founded_at"
                                                type="date"
                                                value={data.founded_at}
                                                onChange={(e) => setData('founded_at', e.target.value)}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="website">Sitio Web</Label>
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="website"
                                                value={data.website}
                                                onChange={(e) => setData('website', e.target.value)}
                                                placeholder="https://www.miiglesia.com"
                                                className="pl-10"
                                            />
                                        </div>
                                        {errors.website && <p className="text-xs text-red-500">{errors.website}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contacto y Ubicación */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-navy text-base">
                                    <MapPin className="h-4 w-4 text-cyan" />
                                    Contacto y Ubicación
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="phone">Teléfono</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder="+57 300 123 4567"
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Correo Electrónico</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="contacto@miiglesia.com"
                                                className="pl-10"
                                            />
                                        </div>
                                        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="address">Dirección</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="Calle 123 # 45-67, Barrio Centro"
                                        rows={2}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="city">Ciudad</Label>
                                    <Input
                                        id="city"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="Ej: Bogotá"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Regionalización */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-navy text-base">
                                    <Globe className="h-4 w-4 text-cyan" />
                                    Regionalización
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <div className="space-y-1.5">
                                        <Label>Idioma</Label>
                                        <Select value={data.language} onValueChange={(v) => setData('language', v)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {languages.map((l) => (
                                                    <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Moneda</Label>
                                        <Select value={data.currency} onValueChange={(v) => setData('currency', v)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {currencies.map((c) => (
                                                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Zona Horaria</Label>
                                        <Select value={data.timezone} onValueChange={(v) => setData('timezone', v)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {timezones.map((t) => (
                                                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* ── Columna derecha (1/3) ── */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-navy text-base">
                                    <ImageIcon className="h-4 w-4 text-cyan" />
                                    Logo de la Iglesia
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Preview */}
                                <div className="flex flex-col items-center">
                                    <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Logo"
                                                className="h-full w-full object-contain p-2"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <Church className="mx-auto h-10 w-10 text-gray-300" />
                                                <p className="mt-1 text-[10px] text-gray-400">Sin logo</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/svg+xml"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                />

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <Upload className="mr-1.5 h-3.5 w-3.5" />
                                        Subir Logo
                                    </Button>
                                    {preview && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={removeLogo}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    )}
                                </div>
                                {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}
                                <p className="text-[10px] text-muted-foreground text-center">
                                    JPG, PNG, WebP o SVG. Máximo 2MB.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Favicon */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-navy text-base">
                                    <Globe className="h-4 w-4 text-cyan" />
                                    Favicon
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col items-center">
                                    <div className="relative flex h-20 w-20 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden">
                                        {faviconPreview ? (
                                            <img
                                                src={faviconPreview}
                                                alt="Favicon"
                                                className="h-full w-full object-contain p-2"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                <Globe className="mx-auto h-6 w-6 text-gray-300" />
                                                <p className="mt-0.5 text-[9px] text-gray-400">Sin favicon</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <input
                                    ref={faviconInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/x-icon,image/vnd.microsoft.icon"
                                    onChange={handleFaviconChange}
                                    className="hidden"
                                />

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                        onClick={() => faviconInputRef.current?.click()}
                                    >
                                        <Upload className="mr-1.5 h-3.5 w-3.5" />
                                        Subir Favicon
                                    </Button>
                                    {faviconPreview && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={removeFavicon}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    )}
                                </div>
                                {errors.favicon && <p className="text-xs text-red-500">{errors.favicon}</p>}
                                <p className="text-[10px] text-muted-foreground text-center">
                                    Icono del navegador. PNG o ICO. Recomendado: 32 × 32 px. Máx 512KB.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Colores */}
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-navy text-base">
                                    <Palette className="h-4 w-4 text-cyan" />
                                    Colores de Marca
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="primary_color" className="text-xs">Color Primario</Label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                id="primary_color"
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                                className="h-9 w-12 cursor-pointer rounded border border-gray-200 p-0.5"
                                            />
                                            <Input
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                                className="font-mono text-xs uppercase"
                                                maxLength={7}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="secondary_color" className="text-xs">Color Secundario</Label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                id="secondary_color"
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                                className="h-9 w-12 cursor-pointer rounded border border-gray-200 p-0.5"
                                            />
                                            <Input
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                                className="font-mono text-xs uppercase"
                                                maxLength={7}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="text_color" className="text-xs">Color Texto del Menú</Label>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="color"
                                                id="text_color"
                                                value={data.text_color}
                                                onChange={(e) => setData('text_color', e.target.value)}
                                                className="h-9 w-12 cursor-pointer rounded border border-gray-200 p-0.5"
                                            />
                                            <Input
                                                value={data.text_color}
                                                onChange={(e) => setData('text_color', e.target.value)}
                                                className="font-mono text-xs uppercase"
                                                maxLength={7}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="rounded-lg border p-3">
                                    <p className="text-[10px] font-medium text-muted-foreground mb-2">Vista previa</p>
                                    <div className="flex items-center gap-2 rounded-md p-3" style={{ backgroundColor: data.primary_color }}>
                                        {preview ? (
                                            <img src={preview} alt="" className="h-6 w-6 rounded object-contain" />
                                        ) : (
                                            <Church className="h-5 w-5" style={{ color: data.secondary_color }} />
                                        )}
                                        <span className="text-xs font-semibold" style={{ color: data.secondary_color }}>
                                            {data.church_name || 'Mi Iglesia'}
                                        </span>
                                    </div>
                                    <div className="mt-2 space-y-1 rounded-md p-2" style={{ backgroundColor: data.primary_color }}>
                                        <div className="flex items-center gap-2 rounded px-2 py-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                                            <LayoutDashboard className="h-3.5 w-3.5" style={{ color: data.secondary_color }} />
                                            <span className="text-[10px] font-medium" style={{ color: data.secondary_color }}>Dashboard</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded px-2 py-1">
                                            <Users className="h-3.5 w-3.5" style={{ color: data.text_color, opacity: 0.7 }} />
                                            <span className="text-[10px]" style={{ color: data.text_color, opacity: 0.7 }}>Miembros</span>
                                        </div>
                                        <div className="flex items-center gap-2 rounded px-2 py-1">
                                            <Home className="h-3.5 w-3.5" style={{ color: data.text_color, opacity: 0.7 }} />
                                            <span className="text-[10px]" style={{ color: data.text_color, opacity: 0.7 }}>Familias</span>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex gap-2">
                                        <div className="h-8 flex-1 rounded" style={{ backgroundColor: data.primary_color }} />
                                        <div className="h-8 flex-1 rounded" style={{ backgroundColor: data.secondary_color }} />
                                        <div className="h-8 flex-1 rounded border" style={{ backgroundColor: data.text_color }} />
                                    </div>
                                </div>

                                {/* Presets */}
                                <div>
                                    <p className="text-[10px] font-medium text-muted-foreground mb-2">Paletas predefinidas</p>
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {presetColors.map((preset) => (
                                            <button
                                                key={preset.name}
                                                type="button"
                                                onClick={() => applyPreset(preset.primary, preset.secondary)}
                                                className="flex items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="flex gap-0.5">
                                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: preset.primary }} />
                                                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: preset.secondary }} />
                                                </div>
                                                <span className="truncate">{preset.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </form>
        </TenantLayout>
    )
}
