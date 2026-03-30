import { Head, useForm, router } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Globe, Eye, EyeOff, Save, Loader2, ExternalLink,
    Sparkles, GripVertical, ChevronDown, ChevronUp,
    Image as ImageIcon, Clock, Users, Phone, BookOpen,
    Check, Upload, Trash2, Info, Link2, AlertTriangle,
    Code2, MonitorSmartphone, Plus, MessageCircle, Share2,
} from 'lucide-react'
import { useState, useRef, useEffect, useCallback, lazy, Suspense, type FormEvent } from 'react'
import IconPicker from '@/components/ui/icon-picker'
import type { PageProps } from '@/types'

const RichTextEditor = lazy(() => import('@/components/ui/rich-text-editor'))

/* ── Types ── */
interface WebsiteSettings {
    id: number
    template: string
    is_published: boolean
}

interface WebsiteSection {
    id: number
    template: string
    section_key: string
    sort_order: number
    is_visible: boolean
    content: Record<string, unknown>
}

interface Template {
    id: string
    name: string
    description: string
    preview: string
}

interface Props extends PageProps {
    settings: WebsiteSettings
    sections: WebsiteSection[]
    availableTemplates: Template[]
    customDomains: string[]
    websiteMinistries: WebsiteMinistryData[]
    socialNetworks: SocialNetworkData[]
    whatsappConfig: WhatsappConfigData | null
}

interface WebsiteMinistryData {
    id: number
    name: string
    slug: string
    icon: string
    image: string | null
    description: string | null
    content: string | null
    gallery: string[] | null
    sort_order: number
    is_visible: boolean
}

interface SocialNetworkData {
    id: number
    platform: string
    icon: string
    url: string
    sort_order: number
    is_visible: boolean
}

interface WhatsappConfigData {
    id: number
    phone_number: string
    default_message: string | null
    is_active: boolean
}

/* ── Section Labels & Icons ── */
const sectionMeta: Record<string, { label: string; icon: React.ElementType; description: string }> = {
    hero:       { label: 'Hero / Portada',    icon: Sparkles,  description: 'Sección principal con título, subtítulo y botón CTA' },
    about:      { label: 'Nosotros',          icon: BookOpen,  description: 'Historia de la iglesia, descripción y estadísticas' },
    services:   { label: 'Horarios de Culto',  icon: Clock,    description: 'Días y horarios de servicios' },
    ministries: { label: 'Ministerios',        icon: Users,    description: 'Áreas de servicio y ministerios' },
    contact:    { label: 'Contacto',           icon: Phone,    description: 'Información de contacto y mapa' },
    footer:     { label: 'Pie de Página',      icon: Globe,    description: 'Descripción, redes sociales y copyright' },
}

/* ── Image field detection & recommended sizes ── */
const IMAGE_FIELDS: Record<string, { label: string; hint: string; dimensions: string }> = {
    'hero.bg_image':    { label: 'Imagen de Fondo', hint: 'Se muestra como fondo del hero con overlay de color', dimensions: '1920 × 1080 px' },
    'about.image':      { label: 'Imagen de la Iglesia', hint: 'Se muestra junto a la descripción en la sección Nosotros', dimensions: '800 × 600 px' },
    'services.image':   { label: 'Imagen de Horarios', hint: 'Se muestra junto a los horarios de culto', dimensions: '800 × 1000 px' },
}

function isImageField(sectionKey: string, fieldKey: string): boolean {
    return `${sectionKey}.${fieldKey}` in IMAGE_FIELDS
}

function getImageMeta(sectionKey: string, fieldKey: string) {
    return IMAGE_FIELDS[`${sectionKey}.${fieldKey}`] || { label: formatLabel(fieldKey), hint: '', dimensions: '' }
}

/* ── Rich text field detection ── */
const RICHTEXT_FIELDS = new Set([
    'about.description',
])

function isRichTextField(sectionKey: string, fieldKey: string): boolean {
    return RICHTEXT_FIELDS.has(`${sectionKey}.${fieldKey}`)
}

/* ── Main Component ── */
export default function WebsiteAdminIndex({ settings, sections, availableTemplates, customDomains, websiteMinistries, socialNetworks, whatsappConfig }: Props) {
    const [expandedSection, setExpandedSection] = useState<number | null>(null)
    const uploadingRef = useRef(false)

    /* ── Real-time polling: refresh props every 10s (paused during uploads) ── */
    const pollRef = useRef<ReturnType<typeof setInterval>>()
    useEffect(() => {
        pollRef.current = setInterval(() => {
            if (!uploadingRef.current) {
                router.reload({ preserveScroll: true, preserveState: true })
            }
        }, 10000)
        return () => clearInterval(pollRef.current)
    }, [])

    // Settings form
    const settingsForm = useForm({
        template: settings.template,
        is_published: settings.is_published,
    })

    const saveSettings = (e: FormEvent) => {
        e.preventDefault()
        settingsForm.put('/settings/website')
    }

    const togglePublish = () => {
        const newVal = !settingsForm.data.is_published
        settingsForm.setData('is_published', newVal)
        router.put('/settings/website', {
            template: settingsForm.data.template,
            is_published: newVal,
        }, { preserveScroll: true })
    }

    return (
        <TenantLayout>
            <Head title="Sitio Web" />

            <div className="mx-auto max-w-5xl space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-navy">Sitio Web</h1>
                        <p className="text-sm text-muted-foreground">
                            Administra la página pública de tu iglesia
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
                        >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Ver sitio
                        </a>
                        <Button
                            onClick={togglePublish}
                            variant={settings.is_published ? 'outline' : 'default'}
                            className={settings.is_published ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50' : 'bg-navy hover:bg-navy/90'}
                        >
                            {settings.is_published ? (
                                <>
                                    <Eye className="mr-1.5 h-4 w-4" />
                                    Publicado
                                </>
                            ) : (
                                <>
                                    <EyeOff className="mr-1.5 h-4 w-4" />
                                    Publicar Sitio
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Template Selector */}
                <Card>
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-navy text-base">
                            <Sparkles className="h-4 w-4 text-cyan" />
                            Plantilla Activa
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {availableTemplates.map((tpl) => (
                                <button
                                    key={tpl.id}
                                    type="button"
                                    onClick={() => {
                                        settingsForm.setData('template', tpl.id)
                                        router.put('/settings/website', {
                                            template: tpl.id,
                                            is_published: settingsForm.data.is_published,
                                        }, { preserveScroll: true })
                                    }}
                                    className={`relative rounded-xl border-2 p-4 text-left transition-all ${
                                        settings.template === tpl.id
                                            ? 'border-cyan bg-cyan/5 shadow-sm'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {settings.template === tpl.id && (
                                        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-cyan text-white">
                                            <Check className="h-3 w-3" />
                                        </div>
                                    )}
                                    <div className="flex h-28 items-center justify-center rounded-lg bg-gradient-to-br from-navy/5 to-cyan/5">
                                        <Globe className="h-10 w-10 text-navy/30" />
                                    </div>
                                    <h3 className="mt-3 font-semibold text-navy">{tpl.name}</h3>
                                    <p className="mt-1 text-xs text-gray-500">{tpl.description}</p>
                                </button>
                            ))}

                            {/* Coming soon placeholder */}
                            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-4 text-center">
                                <Globe className="h-8 w-8 text-gray-300" />
                                <p className="mt-2 text-sm font-medium text-gray-400">Más plantillas</p>
                                <p className="text-[10px] text-gray-300">Próximamente</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sections Editor */}
                <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-navy">Secciones del Sitio</h2>
                    <p className="text-sm text-muted-foreground">
                        Edita el contenido de cada sección. Los cambios se reflejan en tu sitio público.
                    </p>

                    {sections.filter(s => s.section_key !== 'ministries').map((section) => {
                        const meta = sectionMeta[section.section_key] || {
                            label: section.section_key,
                            icon: Globe,
                            description: '',
                        }
                        const Icon = meta.icon
                        const isExpanded = expandedSection === section.id

                        return (
                            <SectionEditor
                                key={section.id}
                                section={section}
                                meta={meta}
                                Icon={Icon}
                                isExpanded={isExpanded}
                                onToggle={() => setExpandedSection(isExpanded ? null : section.id)}
                            />
                        )
                    })}
                </div>

                {/* Ministry Manager */}
                <MinistryManager ministries={websiteMinistries} uploadingRef={uploadingRef} />

                {/* Social Networks Manager */}
                <SocialNetworkManager networks={socialNetworks} whatsapp={whatsappConfig} />

                {/* Custom Domain */}
                <CustomDomainManager domains={customDomains} />
            </div>
        </TenantLayout>
    )
}

/* ── Custom Domain Manager ── */
function CustomDomainManager({ domains }: { domains: string[] }) {
    const [newDomain, setNewDomain] = useState('')
    const [adding, setAdding] = useState(false)
    const [removingDomain, setRemovingDomain] = useState<string | null>(null)

    const serverIp = '187.124.157.50'

    const addDomain = (e: FormEvent) => {
        e.preventDefault()
        if (!newDomain.trim()) return

        setAdding(true)
        router.post('/settings/website/domain', {
            domain: newDomain.trim().toLowerCase(),
        }, {
            preserveScroll: true,
            onFinish: () => {
                setAdding(false)
                setNewDomain('')
            },
        })
    }

    const removeDomain = (domain: string) => {
        setRemovingDomain(domain)
        router.delete('/settings/website/domain', {
            data: { domain },
            preserveScroll: true,
            onFinish: () => setRemovingDomain(null),
        })
    }

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-navy text-base">
                    <Link2 className="h-4 w-4 text-cyan" />
                    Dominio Propio
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    Conecta tu propio dominio para que tu sitio web sea accesible desde tu propia dirección.
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Existing domains */}
                {domains.length > 0 && (
                    <div className="space-y-2">
                        {domains.map((d) => (
                            <div key={d} className="flex items-center justify-between rounded-lg border bg-gray-50/50 px-4 py-3">
                                <div className="flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-emerald-500" />
                                    <span className="text-sm font-medium">{d}</span>
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeDomain(d)}
                                    disabled={removingDomain === d}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                    {removingDomain === d ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                        <Trash2 className="h-3.5 w-3.5" />
                                    )}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add domain form */}
                <form onSubmit={addDomain} className="flex gap-2">
                    <Input
                        placeholder="ejemplo: www.miiglesia.com"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={adding || !newDomain.trim()}
                        className="bg-navy hover:bg-navy/90"
                    >
                        {adding ? (
                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        ) : (
                            <Link2 className="mr-1.5 h-3.5 w-3.5" />
                        )}
                        Conectar
                    </Button>
                </form>

                {/* DNS Instructions */}
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                        <AlertTriangle className="h-4 w-4" />
                        Configuración DNS requerida
                    </div>
                    <p className="text-xs text-amber-700">
                        Para que tu dominio funcione, configura los siguientes registros DNS en tu proveedor de dominio:
                    </p>
                    <div className="rounded-md bg-white/80 p-3 font-mono text-xs text-amber-900 space-y-1">
                        <p><strong>Tipo:</strong> A &nbsp; <strong>Nombre:</strong> @ &nbsp; <strong>Valor:</strong> {serverIp}</p>
                        <p><strong>Tipo:</strong> A &nbsp; <strong>Nombre:</strong> www &nbsp; <strong>Valor:</strong> {serverIp}</p>
                    </div>
                    <p className="text-[11px] text-amber-600">
                        Los cambios DNS pueden tardar hasta 48 horas en propagarse.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}

/* ── Section Editor ── */
function SectionEditor({
    section,
    meta,
    Icon,
    isExpanded,
    onToggle,
}: {
    section: WebsiteSection
    meta: { label: string; description: string }
    Icon: React.ElementType
    isExpanded: boolean
    onToggle: () => void
}) {
    const form = useForm({
        content: section.content as Record<string, unknown>,
        is_visible: section.is_visible,
    })

    // Sync form data when the section prop changes (e.g. after image upload redirect)
    useEffect(() => {
        form.setData({
            content: section.content as Record<string, unknown>,
            is_visible: section.is_visible,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section.content, section.is_visible])

    const save = () => {
        // Exclude image fields from the save payload — they're managed by separate upload
        const contentToSave = { ...form.data.content }
        for (const key of Object.keys(contentToSave)) {
            if (isImageField(section.section_key, key)) {
                delete contentToSave[key]
            }
        }
        router.put(`/settings/website/sections/${section.id}`, {
            content: contentToSave,
            is_visible: form.data.is_visible,
        }, { preserveScroll: true })
    }

    const toggleVisibility = () => {
        const newVal = !form.data.is_visible
        form.setData('is_visible', newVal)
        router.put(`/settings/website/sections/${section.id}`, {
            content: form.data.content,
            is_visible: newVal,
        }, { preserveScroll: true })
    }

    const updateContent = (key: string, value: unknown) => {
        form.setData('content', { ...form.data.content, [key]: value })
    }

    return (
        <Card className={!form.data.is_visible ? 'opacity-60' : ''}>
            <div
                className="flex cursor-pointer items-center justify-between px-6 py-4"
                onClick={onToggle}
            >
                <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-300" />
                    <Icon className="h-4 w-4 text-cyan" />
                    <div>
                        <p className="font-medium text-navy">{meta.label}</p>
                        <p className="text-xs text-gray-400">{meta.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            toggleVisibility()
                        }}
                        className={`rounded-md px-2 py-1 text-xs font-medium transition ${
                            form.data.is_visible
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-gray-100 text-gray-400'
                        }`}
                    >
                        {form.data.is_visible ? 'Visible' : 'Oculto'}
                    </button>
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                </div>
            </div>

            {isExpanded && (
                <CardContent className="border-t pt-6">
                    <div className="space-y-4">
                        {/* Image uploaders for registered IMAGE_FIELDS not present in content */}
                        {Object.keys(IMAGE_FIELDS)
                            .filter(k => k.startsWith(section.section_key + '.'))
                            .map(k => k.split('.')[1])
                            .filter(fieldKey => !(fieldKey in (form.data.content as Record<string, unknown>)))
                            .map(fieldKey => {
                                const imgMeta = getImageMeta(section.section_key, fieldKey)
                                const freshValue = (section.content as Record<string, unknown>)[fieldKey]
                                return (
                                    <ImageUploader
                                        key={fieldKey}
                                        sectionId={section.id}
                                        fieldKey={fieldKey}
                                        currentValue={(freshValue as string) ?? null}
                                        label={imgMeta.label}
                                        hint={imgMeta.hint}
                                        dimensions={imgMeta.dimensions}
                                    />
                                )
                            })
                        }

                        {/* Dynamic fields based on section content */}
                        {Object.entries(form.data.content).map(([key, value]) => {
                            // Image fields → uploader (use section prop directly for fresh data)
                            if (isImageField(section.section_key, key)) {
                                const imgMeta = getImageMeta(section.section_key, key)
                                const freshValue = (section.content as Record<string, unknown>)[key]
                                return (
                                    <ImageUploader
                                        key={key}
                                        sectionId={section.id}
                                        fieldKey={key}
                                        currentValue={(freshValue as string) ?? null}
                                        label={imgMeta.label}
                                        hint={imgMeta.hint}
                                        dimensions={imgMeta.dimensions}
                                    />
                                )
                            }

                            // Skip complex arrays/objects — they get their own renderers
                            if (Array.isArray(value)) {
                                return (
                                    <ArrayFieldEditor
                                        key={key}
                                        fieldKey={key}
                                        items={value}
                                        onChange={(items) => updateContent(key, items)}
                                    />
                                )
                            }

                            if (typeof value === 'object' && value !== null) {
                                return (
                                    <ObjectFieldEditor
                                        key={key}
                                        fieldKey={key}
                                        obj={value as Record<string, string>}
                                        onChange={(obj) => updateContent(key, obj)}
                                    />
                                )
                            }

                            if (typeof value === 'boolean') {
                                return (
                                    <div key={key} className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={value}
                                            onChange={(e) => updateContent(key, e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label className="text-sm">{formatLabel(key)}</Label>
                                    </div>
                                )
                            }

                            if (typeof value === 'number') {
                                return (
                                    <div key={key} className="space-y-1.5">
                                        <Label className="text-xs">{formatLabel(key)}</Label>
                                        <Input
                                            type="number"
                                            value={value}
                                            onChange={(e) => updateContent(key, parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                )
                            }

                            // Rich text fields
                            if (typeof value === 'string' && isRichTextField(section.section_key, key)) {
                                return (
                                    <div key={key} className="space-y-1.5">
                                        <Label className="text-xs">{formatLabel(key)}</Label>
                                        <Suspense fallback={<div className="h-32 rounded-md border bg-gray-50 animate-pulse" />}>
                                            <RichTextEditor
                                                value={value}
                                                onChange={(html) => updateContent(key, html)}
                                            />
                                        </Suspense>
                                    </div>
                                )
                            }

                            // String fields
                            const isLong = typeof value === 'string' && value.length > 80
                            return (
                                <div key={key} className="space-y-1.5">
                                    <Label className="text-xs">{formatLabel(key)}</Label>
                                    {isLong ? (
                                        <Textarea
                                            value={(value as string) ?? ''}
                                            onChange={(e) => updateContent(key, e.target.value)}
                                            rows={3}
                                        />
                                    ) : (
                                        <Input
                                            value={(value as string) ?? ''}
                                            onChange={(e) => updateContent(key, e.target.value)}
                                        />
                                    )}
                                </div>
                            )
                        })}

                        <div className="flex justify-end pt-2">
                            <Button
                                onClick={save}
                                disabled={form.processing}
                                size="sm"
                                className="bg-navy hover:bg-navy/90"
                            >
                                {form.processing ? (
                                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    <Save className="mr-1.5 h-3.5 w-3.5" />
                                )}
                                Guardar sección
                            </Button>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}

/* ── Array Field Editor ── */
function ArrayFieldEditor({
    fieldKey,
    items,
    onChange,
}: {
    fieldKey: string
    items: Array<Record<string, string>>
    onChange: (items: Array<Record<string, string>>) => void
}) {
    const updateItem = (index: number, key: string, value: string) => {
        const updated = [...items]
        updated[index] = { ...updated[index], [key]: value }
        onChange(updated)
    }

    const addItem = () => {
        if (items.length === 0) return
        const template: Record<string, string> = {}
        Object.keys(items[0]).forEach((k) => (template[k] = ''))
        onChange([...items, template])
    }

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold">{formatLabel(fieldKey)} ({items.length})</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    + Agregar
                </Button>
            </div>
            {items.map((item, i) => (
                <div key={i} className="rounded-lg border bg-gray-50/50 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-gray-400">#{i + 1}</span>
                        <button
                            type="button"
                            onClick={() => removeItem(i)}
                            className="text-[10px] text-red-400 hover:text-red-600"
                        >
                            Eliminar
                        </button>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2">
                        {Object.entries(item).map(([key, val]) => (
                            <div key={key} className="space-y-1">
                                <Label className="text-[10px] text-gray-500">{formatLabel(key)}</Label>
                                <Input
                                    value={val}
                                    onChange={(e) => updateItem(i, key, e.target.value)}
                                    className="text-xs"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

/* ── Object Field Editor ── */
function ObjectFieldEditor({
    fieldKey,
    obj,
    onChange,
}: {
    fieldKey: string
    obj: Record<string, string>
    onChange: (obj: Record<string, string>) => void
}) {
    return (
        <div className="space-y-2">
            <Label className="text-xs font-semibold">{formatLabel(fieldKey)}</Label>
            <div className="grid gap-2 sm:grid-cols-2">
                {Object.entries(obj).map(([key, val]) => (
                    <div key={key} className="space-y-1">
                        <Label className="text-[10px] text-gray-500">{formatLabel(key)}</Label>
                        <Input
                            value={val}
                            onChange={(e) => onChange({ ...obj, [key]: e.target.value })}
                            className="text-xs"
                            placeholder={`URL de ${formatLabel(key)}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ── Image Uploader ── */
function ImageUploader({
    sectionId,
    fieldKey,
    currentValue,
    label,
    hint,
    dimensions,
}: {
    sectionId: number
    fieldKey: string
    currentValue: string | null
    label: string
    hint: string
    dimensions: string
}) {
    const fileRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [removing, setRemoving] = useState(false)

    const imageUrl = currentValue ? `/storage/${currentValue}` : null

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        router.post(`/settings/website/sections/${sectionId}/image`, {
            image: file,
            field: fieldKey,
        }, {
            preserveScroll: true,
            forceFormData: true,
            onFinish: () => setUploading(false),
        })
    }

    const handleRemove = () => {
        setRemoving(true)
        router.delete(`/settings/website/sections/${sectionId}/image`, {
            data: { field: fieldKey },
            preserveScroll: true,
            onFinish: () => setRemoving(false),
        })
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Label className="text-xs">{label}</Label>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600">
                    <Info className="h-2.5 w-2.5" />
                    {dimensions}
                </span>
            </div>
            {hint && <p className="text-[11px] text-gray-400">{hint}</p>}

            {imageUrl ? (
                <div className="relative group rounded-lg border overflow-hidden bg-gray-50">
                    <img
                        src={imageUrl}
                        alt={label}
                        className="w-full max-h-48 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => fileRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="mr-1 h-3.5 w-3.5" />}
                            Cambiar
                        </Button>
                        <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={handleRemove}
                            disabled={removing}
                        >
                            {removing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="mr-1 h-3.5 w-3.5" />}
                            Eliminar
                        </Button>
                    </div>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center hover:border-cyan/50 hover:bg-cyan/5 transition-colors"
                >
                    {uploading ? (
                        <Loader2 className="h-6 w-6 animate-spin text-cyan" />
                    ) : (
                        <ImageIcon className="h-8 w-8 text-gray-300" />
                    )}
                    <div>
                        <p className="text-sm font-medium text-gray-600">
                            {uploading ? 'Subiendo...' : 'Subir imagen'}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                            JPG, PNG, WebP, GIF o SVG · Máx. 5MB · Recomendado: {dimensions}
                        </p>
                    </div>
                </button>
            )}

            <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                className="hidden"
                onChange={handleUpload}
            />
        </div>
    )
}

/* ── Ministry Manager ── */
function MinistryManager({ ministries, uploadingRef }: { ministries: WebsiteMinistryData[]; uploadingRef: React.MutableRefObject<boolean> }) {
    const [editing, setEditing] = useState<number | null>(null)
    const [syncing, setSyncing] = useState(false)
    const fileRefs = useRef<Record<number, HTMLInputElement | null>>({})
    const galleryRefs = useRef<Record<number, HTMLInputElement | null>>({})

    const syncFromAreas = () => {
        setSyncing(true)
        router.post('/settings/website/ministries/sync', {}, {
            preserveScroll: true,
            onFinish: () => setSyncing(false),
        })
    }

    const updateMinistry = (id: number, data: Record<string, unknown>) => {
        router.put(`/settings/website/ministries/${id}`, data, {
            preserveScroll: true,
            preserveState: true,
        })
    }

    const deleteMinistry = (id: number) => {
        if (!confirm('¿Eliminar este ministerio del sitio web?')) return
        router.delete(`/settings/website/ministries/${id}`, { preserveScroll: true })
    }

    const uploadImage = (id: number, file: File) => {
        uploadingRef.current = true
        router.post(`/settings/website/ministries/${id}/image`, {
            image: file,
        }, { preserveScroll: true, preserveState: true, forceFormData: true, onFinish: () => { uploadingRef.current = false } })
    }

    const removeImage = (id: number) => {
        router.delete(`/settings/website/ministries/${id}/image`, { preserveScroll: true, preserveState: true })
    }

    const uploadGalleryImage = (id: number, file: File) => {
        uploadingRef.current = true
        router.post(`/settings/website/ministries/${id}/gallery`, {
            image: file,
        }, { preserveScroll: true, preserveState: true, forceFormData: true, onFinish: () => { uploadingRef.current = false } })
    }

    const removeGalleryImage = (id: number, index: number) => {
        router.delete(`/settings/website/ministries/${id}/gallery`, {
            data: { index },
            preserveScroll: true,
            preserveState: true,
        })
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-navy">Ministerios del Sitio Web</h2>
                    <p className="text-sm text-muted-foreground">
                        Gestiona los ministerios que se muestran en el sitio. Cada uno tendrá su propia subpágina.
                    </p>
                </div>
                <Button
                    onClick={syncFromAreas}
                    variant="outline"
                    size="sm"
                    disabled={syncing}
                >
                    {syncing ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Users className="mr-1.5 h-3.5 w-3.5" />}
                    Importar de Áreas Ministeriales
                </Button>
            </div>

            {ministries.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <Users className="h-10 w-10 text-gray-300" />
                        <p className="mt-3 text-sm font-medium text-gray-500">No hay ministerios configurados</p>
                        <p className="text-xs text-gray-400 mt-1">Usa "Importar de Áreas Ministeriales" para comenzar</p>
                    </CardContent>
                </Card>
            ) : (
                ministries.map((m) => (
                    <MinistryCard
                        key={m.id}
                        ministry={m}
                        isExpanded={editing === m.id}
                        onToggle={() => setEditing(editing === m.id ? null : m.id)}
                        onUpdate={(data) => updateMinistry(m.id, data)}
                        onDelete={() => deleteMinistry(m.id)}
                        onUploadImage={(file) => uploadImage(m.id, file)}
                        onRemoveImage={() => removeImage(m.id)}
                        onUploadGallery={(file) => uploadGalleryImage(m.id, file)}
                        onRemoveGallery={(index) => removeGalleryImage(m.id, index)}
                        fileRef={(el) => { fileRefs.current[m.id] = el }}
                        galleryRef={(el) => { galleryRefs.current[m.id] = el }}
                    />
                ))
            )}
        </div>
    )
}

/* ── Social Icon Library ── */
const SOCIAL_ICONS: { key: string; label: string; color: string }[] = [
    { key: 'facebook', label: 'Facebook', color: '#1877F2' },
    { key: 'instagram', label: 'Instagram', color: '#E4405F' },
    { key: 'youtube', label: 'YouTube', color: '#FF0000' },
    { key: 'tiktok', label: 'TikTok', color: '#000000' },
    { key: 'twitter', label: 'X (Twitter)', color: '#1DA1F2' },
    { key: 'threads', label: 'Threads', color: '#000000' },
    { key: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
    { key: 'spotify', label: 'Spotify', color: '#1DB954' },
    { key: 'telegram', label: 'Telegram', color: '#26A5E4' },
    { key: 'pinterest', label: 'Pinterest', color: '#E60023' },
    { key: 'snapchat', label: 'Snapchat', color: '#FFFC00' },
    { key: 'twitch', label: 'Twitch', color: '#9146FF' },
    { key: 'website', label: 'Sitio Web', color: '#6B7280' },
]

function SocialIconSvg({ icon, size = 18 }: { icon: string; size?: number }) {
    const s = size
    const map: Record<string, React.ReactNode> = {
        facebook: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
        instagram: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z"/></svg>,
        youtube: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
        tiktok: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>,
        twitter: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
        threads: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.186.408-2.26 1.33-3.023.812-.672 1.927-1.073 3.222-1.161 1.06-.072 2.056.04 2.986.335l.027.01c-.006-.636-.06-1.218-.168-1.74-.26-1.26-.784-2.136-1.56-2.602-1.073-.645-2.384-.601-3.27-.378l-.544-1.924c1.2-.339 2.857-.424 4.357.476 1.12.673 1.887 1.847 2.221 3.39.17.782.235 1.657.197 2.612.497.234.963.522 1.393.871 1.018.826 1.742 1.943 2.093 3.228.486 1.778.284 4.278-1.774 6.294-1.818 1.782-4.063 2.544-7.18 2.568zm-1.17-7.025c-.81.055-1.448.272-1.896.645-.45.373-.648.853-.612 1.468.028.506.26.95.692 1.229.539.35 1.285.52 2.097.476 1.074-.058 1.89-.446 2.425-1.152.432-.57.718-1.32.85-2.23-.695-.232-1.471-.354-2.317-.354-.4 0-.82.027-1.239.082v-.164z"/></svg>,
        linkedin: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
        spotify: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
        telegram: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0 12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
        pinterest: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>,
        snapchat: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.87-.21.24-.12.36-.15.51-.15.18 0 .33.06.45.18.15.135.21.3.21.48-.015.36-.36.63-.795.93-.36.24-.765.465-1.17.585-.045.015-.105.03-.15.045-.088.022-.165.045-.225.07-.18.074-.189.135-.21.315v.015c.06.45.135.885.33 1.29.36.72 1.08 1.305 1.86 1.545.15.045.285.075.405.09a.696.696 0 01.59.525c.015.06.015.135 0 .21-.105.45-.75.75-1.86.87l-.06.01c-.12.015-.24.03-.33.045-.51.06-1.11.15-1.44.435-.375.33-.51.39-.66.585-.21.3-1.245 1.89-3.87 1.89-2.625 0-3.66-1.59-3.87-1.89-.15-.195-.285-.255-.66-.585-.33-.285-.93-.375-1.44-.435a8.632 8.632 0 00-.33-.045l-.06-.01c-1.11-.12-1.755-.42-1.86-.87a.578.578 0 010-.21.696.696 0 01.59-.525c.12-.015.255-.045.405-.09.78-.24 1.5-.825 1.86-1.545.195-.405.27-.84.33-1.29v-.015c-.021-.18-.03-.241-.21-.315a1.567 1.567 0 00-.225-.07c-.045-.015-.105-.03-.15-.045-.42-.12-.81-.345-1.17-.585-.435-.3-.78-.57-.795-.93a.524.524 0 01.21-.48.5.5 0 01.45-.18c.15 0 .27.03.51.15.21.09.57.194.87.21.198 0 .326-.045.401-.09a8.087 8.087 0 01-.033-.57c-.096-1.629-.222-3.654.297-4.847C7.86 1.069 11.216.793 12.206.793z"/></svg>,
        twitch: <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>,
        website: <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    }
    return <span className="inline-flex">{map[icon] || map.website}</span>
}

/* ── Social Network Manager ── */
function SocialNetworkManager({ networks, whatsapp }: { networks: SocialNetworkData[]; whatsapp: WhatsappConfigData | null }) {
    const [adding, setAdding] = useState(false)
    const [newPlatform, setNewPlatform] = useState('')
    const [newIcon, setNewIcon] = useState('facebook')
    const [newUrl, setNewUrl] = useState('')
    const [saving, setSaving] = useState(false)

    const [wppPhone, setWppPhone] = useState(whatsapp?.phone_number || '')
    const [wppMsg, setWppMsg] = useState(whatsapp?.default_message || '')
    const [wppActive, setWppActive] = useState(whatsapp?.is_active ?? false)
    const [savingWpp, setSavingWpp] = useState(false)

    useEffect(() => {
        setWppPhone(whatsapp?.phone_number || '')
        setWppMsg(whatsapp?.default_message || '')
        setWppActive(whatsapp?.is_active ?? false)
    }, [whatsapp])

    const addNetwork = () => {
        if (!newUrl.trim()) return
        setSaving(true)
        const platformLabel = SOCIAL_ICONS.find(s => s.key === newIcon)?.label || newPlatform || newIcon
        router.post('/settings/website/social', {
            platform: newPlatform.trim() || platformLabel,
            icon: newIcon,
            url: newUrl.trim(),
        }, {
            preserveScroll: true,
            onFinish: () => {
                setSaving(false)
                setAdding(false)
                setNewPlatform('')
                setNewIcon('facebook')
                setNewUrl('')
            },
        })
    }

    const removeNetwork = (id: number) => {
        router.delete(`/settings/website/social/${id}`, { preserveScroll: true })
    }

    const toggleVisibility = (n: SocialNetworkData) => {
        router.put(`/settings/website/social/${n.id}`, {
            platform: n.platform,
            icon: n.icon,
            url: n.url,
            is_visible: !n.is_visible,
        }, { preserveScroll: true })
    }

    const saveWhatsapp = () => {
        if (!wppPhone.trim()) return
        setSavingWpp(true)
        router.put('/settings/website/whatsapp', {
            phone_number: wppPhone.trim(),
            default_message: wppMsg.trim() || null,
            is_active: true,
        }, { preserveScroll: true, onFinish: () => setSavingWpp(false) })
    }

    const removeWhatsapp = () => {
        setSavingWpp(true)
        router.delete('/settings/website/whatsapp', { preserveScroll: true, onFinish: () => setSavingWpp(false) })
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-navy">Redes Sociales</h2>
                    <p className="text-sm text-muted-foreground">
                        Agrega tus redes sociales. Aparecerán en el pie de página del sitio.
                    </p>
                </div>
                <Button onClick={() => setAdding(true)} variant="outline" size="sm" disabled={adding}>
                    <Plus className="mr-1 h-3.5 w-3.5" /> Agregar Red
                </Button>
            </div>

            {/* Add new network form */}
            {adding && (
                <Card>
                    <CardContent className="pt-5 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-1.5">
                                <Label className="text-xs">Red Social</Label>
                                <select
                                    value={newIcon}
                                    onChange={(e) => {
                                        setNewIcon(e.target.value)
                                        const found = SOCIAL_ICONS.find(s => s.key === e.target.value)
                                        if (found && !newPlatform) setNewPlatform(found.label)
                                    }}
                                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm"
                                >
                                    {SOCIAL_ICONS.map(s => (
                                        <option key={s.key} value={s.key}>{s.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Nombre (opcional)</Label>
                                <Input
                                    value={newPlatform}
                                    onChange={(e) => setNewPlatform(e.target.value)}
                                    placeholder="Ej: Facebook Iglesia"
                                    className="text-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">URL / Enlace</Label>
                                <Input
                                    value={newUrl}
                                    onChange={(e) => setNewUrl(e.target.value)}
                                    placeholder="https://facebook.com/tu-pagina"
                                    className="text-sm"
                                />
                            </div>
                        </div>

                        {/* Icon preview */}
                        <div className="flex items-center gap-3 rounded-lg border bg-gray-50 px-4 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: SOCIAL_ICONS.find(s => s.key === newIcon)?.color || '#6B7280' }}>
                                <SocialIconSvg icon={newIcon} size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{newPlatform || SOCIAL_ICONS.find(s => s.key === newIcon)?.label}</p>
                                <p className="text-xs text-gray-400 truncate max-w-xs">{newUrl || 'Sin enlace'}</p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancelar</Button>
                            <Button onClick={addNetwork} size="sm" disabled={!newUrl.trim() || saving} className="bg-navy hover:bg-navy/90">
                                {saving ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Plus className="mr-1 h-3.5 w-3.5" />}
                                Agregar
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Network list */}
            {networks.length === 0 && !adding ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10 text-center">
                        <Share2 className="h-10 w-10 text-gray-200" />
                        <p className="mt-3 text-sm font-medium text-gray-500">Sin redes sociales</p>
                        <p className="text-xs text-gray-400">Agrega redes sociales para que aparezcan en tu sitio web</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-2">
                    {networks.map((n) => {
                        const meta = SOCIAL_ICONS.find(s => s.key === n.icon)
                        return (
                            <Card key={n.id} className={!n.is_visible ? 'opacity-60' : ''}>
                                <div className="flex items-center justify-between px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg text-white" style={{ backgroundColor: meta?.color || '#6B7280' }}>
                                            <SocialIconSvg icon={n.icon} size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-navy">{n.platform}</p>
                                            <p className="text-[11px] text-gray-400 truncate max-w-[250px]">{n.url}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleVisibility(n)}
                                            className={`rounded-md px-2 py-1 text-xs font-medium transition ${n.is_visible ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}
                                        >
                                            {n.is_visible ? 'Visible' : 'Oculto'}
                                        </button>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => removeNetwork(n.id)}>
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}

            {/* WhatsApp Configuration */}
            <div className="mt-6">
                <div className="flex items-center gap-2 mb-2">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    <h3 className="text-base font-semibold text-navy">WhatsApp en Línea</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                    Agrega un número de WhatsApp y aparecerá un botón flotante en tu sitio web.
                </p>

                <Card>
                    <CardContent className="pt-5 space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-1.5">
                                <Label className="text-xs">Número de WhatsApp</Label>
                                <Input
                                    value={wppPhone}
                                    onChange={(e) => setWppPhone(e.target.value)}
                                    placeholder="573001234567 (sin + ni espacios)"
                                    className="text-sm"
                                />
                                <p className="text-[10px] text-gray-400">Código de país + número, sin espacios ni símbolos. Ej: 573001234567</p>
                            </div>
                            <div className="space-y-1.5">
                                <Label className="text-xs">Mensaje predeterminado</Label>
                                <Textarea
                                    value={wppMsg}
                                    onChange={(e) => setWppMsg(e.target.value)}
                                    placeholder="¡Hola! Me gustaría obtener más información..."
                                    rows={2}
                                    className="text-sm"
                                />
                                <p className="text-[10px] text-gray-400">Se pre-llenará al abrir el chat de WhatsApp</p>
                            </div>
                        </div>

                        {/* Preview */}
                        {wppPhone.trim() && (
                            <div className="flex items-center gap-3 rounded-lg border bg-green-50 px-4 py-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                                    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-green-800">Botón flotante activo</p>
                                    <p className="text-xs text-green-600">+{wppPhone}</p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                            {whatsapp && (
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={removeWhatsapp}>
                                    <Trash2 className="mr-1 h-3.5 w-3.5" /> Desactivar WhatsApp
                                </Button>
                            )}
                            <div className="ml-auto">
                                <Button onClick={saveWhatsapp} size="sm" disabled={!wppPhone.trim() || savingWpp} className="bg-green-600 hover:bg-green-700">
                                    {savingWpp ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
                                    Guardar WhatsApp
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

/* ── Content Editor (Visual + Code + Preview) ── */
function ContentEditor({ content, onChange }: { content: string; onChange: (v: string) => void }) {
    const [tab, setTab] = useState<'visual' | 'code' | 'preview'>('visual')
    const [codeValue, setCodeValue] = useState(content)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    // Sync codeValue when switching TO code tab
    useEffect(() => {
        if (tab === 'code') setCodeValue(content)
    }, [tab])

    const applyCode = useCallback(() => {
        onChange(codeValue)
    }, [codeValue, onChange])

    // Auto-resize textarea
    useEffect(() => {
        if (tab === 'code' && textareaRef.current) {
            const el = textareaRef.current
            el.style.height = 'auto'
            el.style.height = Math.max(300, el.scrollHeight) + 'px'
        }
    }, [tab, codeValue])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Tab key inserts spaces
        if (e.key === 'Tab') {
            e.preventDefault()
            const el = e.currentTarget
            const start = el.selectionStart
            const end = el.selectionEnd
            const val = el.value
            const newVal = val.substring(0, start) + '  ' + val.substring(end)
            setCodeValue(newVal)
            requestAnimationFrame(() => { el.selectionStart = el.selectionEnd = start + 2 })
        }
    }

    const tabs = [
        { key: 'visual' as const, label: 'Editor Visual', icon: ImageIcon },
        { key: 'code' as const, label: 'Código HTML', icon: Code2 },
        { key: 'preview' as const, label: 'Vista Previa', icon: MonitorSmartphone },
    ]

    return (
        <div className="space-y-1.5">
            <Label className="text-xs">Contenido de la página del ministerio</Label>
            <p className="text-[11px] text-gray-400">Texto, imágenes y formato libre. Se muestra al entrar al ministerio.</p>

            {/* Tab bar */}
            <div className="flex items-center gap-1 rounded-lg border bg-gray-50 p-1">
                {tabs.map(({ key, label, icon: TabIcon }) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => {
                            // When leaving code tab, apply code changes
                            if (tab === 'code' && key !== 'code') applyCode()
                            setTab(key)
                        }}
                        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                            tab === key
                                ? 'bg-white text-navy shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                        }`}
                    >
                        <TabIcon className="h-3.5 w-3.5" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Visual editor */}
            {tab === 'visual' && (
                <Suspense fallback={<div className="h-32 rounded-md border bg-gray-50 animate-pulse" />}>
                    <RichTextEditor value={content} onChange={onChange} />
                </Suspense>
            )}

            {/* Code editor */}
            {tab === 'code' && (
                <div className="space-y-2">
                    <div className="relative rounded-lg border border-gray-200 bg-[#1e1e2e] overflow-hidden">
                        <div className="flex items-center justify-between bg-[#181825] px-3 py-1.5 border-b border-[#313244]">
                            <span className="text-[10px] font-mono text-[#cdd6f4]/50">HTML</span>
                            <button
                                type="button"
                                onClick={applyCode}
                                className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-emerald-400 hover:bg-emerald-400/10 transition-colors"
                            >
                                <Check className="h-3 w-3" /> Aplicar
                            </button>
                        </div>
                        <textarea
                            ref={textareaRef}
                            value={codeValue}
                            onChange={(e) => setCodeValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            spellCheck={false}
                            className="w-full min-h-[300px] resize-none bg-transparent p-4 font-mono text-sm leading-relaxed text-[#cdd6f4] placeholder-[#585b70] focus:outline-none"
                            style={{ tabSize: 2 }}
                            placeholder="<div>\n  <h2>Título del ministerio</h2>\n  <p>Escribe tu contenido aquí...</p>\n</div>"
                        />
                    </div>
                    <p className="text-[10px] text-gray-400">
                        Escribe HTML directamente. Presiona <kbd className="rounded bg-gray-100 px-1 py-0.5 text-[9px] font-mono">Tab</kbd> para indentar.
                        Haz clic en <span className="text-emerald-600 font-medium">Aplicar</span> o cambia de pestaña para guardar los cambios.
                    </p>
                </div>
            )}

            {/* Live Preview */}
            {tab === 'preview' && (
                <div className="rounded-lg border bg-white">
                    <div className="flex items-center gap-2 border-b bg-gray-50 px-3 py-2">
                        <div className="flex gap-1">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono">/ministerios/vista-previa</span>
                    </div>
                    <div
                        className="prose prose-sm max-w-none p-6"
                        dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400 italic">Sin contenido aún...</p>' }}
                    />
                </div>
            )}
        </div>
    )
}

/* ── Ministry Card ── */
function MinistryCard({
    ministry,
    isExpanded,
    onToggle,
    onUpdate,
    onDelete,
    onUploadImage,
    onRemoveImage,
    onUploadGallery,
    onRemoveGallery,
    fileRef,
    galleryRef,
}: {
    ministry: WebsiteMinistryData
    isExpanded: boolean
    onToggle: () => void
    onUpdate: (data: Record<string, unknown>) => void
    onDelete: () => void
    onUploadImage: (file: File) => void
    onRemoveImage: () => void
    onUploadGallery: (file: File) => void
    onRemoveGallery: (index: number) => void
    fileRef: (el: HTMLInputElement | null) => void
    galleryRef: (el: HTMLInputElement | null) => void
}) {
    const [name, setName] = useState(ministry.name)
    const [icon, setIcon] = useState(ministry.icon)
    const [description, setDescription] = useState(ministry.description || '')
    const [content, setContent] = useState(ministry.content || '')
    const [visible, setVisible] = useState(ministry.is_visible)
    const mainImgRef = useRef<HTMLInputElement>(null)
    const galImgRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        setName(ministry.name)
        setIcon(ministry.icon)
        setDescription(ministry.description || '')
        setContent(ministry.content || '')
        setVisible(ministry.is_visible)
    }, [ministry])

    const save = () => {
        onUpdate({ name, icon, description, content, is_visible: visible, sort_order: ministry.sort_order })
    }

    const toggleVisibility = () => {
        const newVal = !visible
        setVisible(newVal)
        onUpdate({ name: ministry.name, icon: ministry.icon, description: ministry.description, content: ministry.content, is_visible: newVal, sort_order: ministry.sort_order })
    }

    const imageUrl = ministry.image ? `/storage/${ministry.image}` : null

    return (
        <Card className={!visible ? 'opacity-60' : ''}>
            <div className="flex cursor-pointer items-center justify-between px-6 py-4" onClick={onToggle}>
                <div className="flex items-center gap-3">
                    <GripVertical className="h-4 w-4 text-gray-300" />
                    {imageUrl ? (
                        <img src={imageUrl} alt="" className="h-8 w-8 rounded-lg object-cover" />
                    ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan/10">
                            <Users className="h-4 w-4 text-cyan" />
                        </div>
                    )}
                    <div>
                        <p className="font-medium text-navy">{ministry.name}</p>
                        <p className="text-xs text-gray-400">/ministerios/{ministry.slug}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); toggleVisibility() }}
                        className={`rounded-md px-2 py-1 text-xs font-medium transition ${visible ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}
                    >
                        {visible ? 'Visible' : 'Oculto'}
                    </button>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                </div>
            </div>

            {isExpanded && (
                <CardContent className="border-t pt-6 space-y-5">
                    {/* Basic fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label className="text-xs">Nombre</Label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-xs">Icono (cuando no hay imagen)</Label>
                            <IconPicker value={icon} onChange={setIcon} />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label className="text-xs">Descripción breve (se muestra en el home)</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={2}
                            maxLength={1000}
                        />
                    </div>

                    {/* Main Image */}
                    <div className="space-y-2">
                        <Label className="text-xs">Imagen Principal</Label>
                        <p className="text-[11px] text-gray-400">Se muestra en el home y como portada. Recomendado: 800 × 600 px</p>
                        {imageUrl ? (
                            <div className="relative group rounded-lg border overflow-hidden bg-gray-50">
                                <img src={imageUrl} alt="" className="w-full max-h-48 object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button type="button" size="sm" variant="secondary" onClick={() => mainImgRef.current?.click()}>
                                        <Upload className="mr-1 h-3.5 w-3.5" /> Cambiar
                                    </Button>
                                    <Button type="button" size="sm" variant="destructive" onClick={onRemoveImage}>
                                        <Trash2 className="mr-1 h-3.5 w-3.5" /> Eliminar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => mainImgRef.current?.click()}
                                className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center hover:border-cyan/50 hover:bg-cyan/5 transition-colors"
                            >
                                <ImageIcon className="h-8 w-8 text-gray-300" />
                                <p className="text-sm font-medium text-gray-600">Subir imagen</p>
                                <p className="text-[10px] text-gray-400">JPG, PNG, WebP · Máx 5MB</p>
                            </button>
                        )}
                        <input ref={mainImgRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUploadImage(f); e.target.value = '' }} />
                    </div>

                    {/* Rich Content - Tabbed Editor */}
                    <ContentEditor content={content} onChange={setContent} />

                    {/* Gallery */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-xs">Galería de Imágenes</Label>
                                <p className="text-[11px] text-gray-400">Fotos del ministerio. Se muestran en la subpágina.</p>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={() => galImgRef.current?.click()}>
                                <Upload className="mr-1 h-3.5 w-3.5" /> Agregar
                            </Button>
                        </div>
                        {ministry.gallery && ministry.gallery.length > 0 && (
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {ministry.gallery.map((img, i) => (
                                    <div key={i} className="group relative rounded-lg overflow-hidden border bg-gray-50">
                                        <img src={`/storage/${img}`} alt="" className="aspect-square w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => onRemoveGallery(i)}
                                            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input ref={galImgRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) onUploadGallery(f); e.target.value = '' }} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={onDelete}>
                            <Trash2 className="mr-1 h-3.5 w-3.5" /> Eliminar
                        </Button>
                        <Button onClick={save} size="sm" className="bg-navy hover:bg-navy/90">
                            <Save className="mr-1.5 h-3.5 w-3.5" /> Guardar
                        </Button>
                    </div>
                </CardContent>
            )}
        </Card>
    )
}

/* ── Helpers ── */
const FIELD_LABELS: Record<string, string> = {
    logo_height: 'Tamaño del Logo (px)',
    overlay_opacity: 'Opacidad del Overlay (%)',
    cta_text: 'Texto del Botón',
    cta_link: 'Enlace del Botón',
    bg_image: 'Imagen de Fondo',
    show_map: 'Mostrar Mapa',
    map_embed_url: 'Mapa de Google Maps (pega la URL o el código de incrustar)',
    social_links: 'Redes Sociales',
}

function formatLabel(key: string): string {
    if (FIELD_LABELS[key]) return FIELD_LABELS[key]
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
}
