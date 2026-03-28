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
    Check, Upload, Trash2, Info,
} from 'lucide-react'
import { useState, useRef, useEffect, lazy, Suspense, type FormEvent } from 'react'
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
    'hero.bg_image':  { label: 'Imagen de Fondo', hint: 'Se muestra como fondo del hero con overlay de color', dimensions: '1920 × 1080 px' },
    'about.image':    { label: 'Imagen de la Iglesia', hint: 'Se muestra junto a la descripción en la sección Nosotros', dimensions: '800 × 600 px' },
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
export default function WebsiteAdminIndex({ settings, sections, availableTemplates }: Props) {
    const [expandedSection, setExpandedSection] = useState<number | null>(null)

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

                    {sections.map((section) => {
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
            </div>
        </TenantLayout>
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

/* ── Helpers ── */
const FIELD_LABELS: Record<string, string> = {
    logo_height: 'Tamaño del Logo (px)',
    overlay_opacity: 'Opacidad del Overlay (%)',
    cta_text: 'Texto del Botón',
    cta_link: 'Enlace del Botón',
    bg_image: 'Imagen de Fondo',
    show_map: 'Mostrar Mapa',
    map_embed_url: 'URL del Mapa (Google Maps)',
    social_links: 'Redes Sociales',
}

function formatLabel(key: string): string {
    if (FIELD_LABELS[key]) return FIELD_LABELS[key]
    return key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
}
