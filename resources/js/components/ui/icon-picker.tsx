import { useState, useMemo, useRef, useEffect } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { ICON_LIBRARY, ICON_CATEGORIES, ICON_MAP } from '@/lib/ministry-icons'

interface IconPickerProps {
    value: string
    onChange: (value: string) => void
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('Todos')
    const containerRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)

    // Close on outside click
    useEffect(() => {
        if (!open) return
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [open])

    // Focus search when opened
    useEffect(() => {
        if (open) searchRef.current?.focus()
    }, [open])

    const filtered = useMemo(() => {
        let items = ICON_LIBRARY
        if (category !== 'Todos') {
            items = items.filter((i) => i.category === category)
        }
        if (search.trim()) {
            const q = search.toLowerCase()
            items = items.filter(
                (i) =>
                    i.label.toLowerCase().includes(q) ||
                    i.key.toLowerCase().includes(q) ||
                    i.category.toLowerCase().includes(q)
            )
        }
        return items
    }, [search, category])

    const SelectedIcon = ICON_MAP[value]

    return (
        <div ref={containerRef} className="relative">
            {/* Trigger button */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm hover:border-gray-300 transition-colors"
            >
                <span className="flex items-center gap-2">
                    {SelectedIcon ? (
                        <SelectedIcon className="h-4 w-4 text-gray-700" />
                    ) : (
                        <span className="h-4 w-4" />
                    )}
                    <span className="text-gray-700">
                        {ICON_LIBRARY.find((i) => i.key === value)?.label || value}
                    </span>
                </span>
                <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-1 duration-150">
                    {/* Search */}
                    <div className="border-b p-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
                            <input
                                ref={searchRef}
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar icono..."
                                className="w-full rounded-md border border-gray-200 py-1.5 pl-8 pr-8 text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category tabs */}
                    <div className="flex gap-1 overflow-x-auto border-b px-2 py-1.5 scrollbar-thin">
                        {ICON_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setCategory(cat)}
                                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                                    category === cat
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Icon grid */}
                    <div className="max-h-64 overflow-y-auto p-2">
                        {filtered.length === 0 ? (
                            <p className="py-6 text-center text-xs text-gray-400">
                                No se encontraron iconos
                            </p>
                        ) : (
                            <div className="grid grid-cols-8 gap-1">
                                {filtered.map((entry) => {
                                    const Icon = entry.component
                                    const isSelected = value === entry.key
                                    return (
                                        <button
                                            key={entry.key}
                                            type="button"
                                            title={entry.label}
                                            onClick={() => {
                                                onChange(entry.key)
                                                setOpen(false)
                                                setSearch('')
                                                setCategory('Todos')
                                            }}
                                            className={`group relative flex h-9 w-full items-center justify-center rounded-md transition-colors ${
                                                isSelected
                                                    ? 'bg-blue-100 ring-2 ring-blue-500'
                                                    : 'hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon
                                                className={`h-4.5 w-4.5 ${
                                                    isSelected ? 'text-blue-600' : 'text-gray-600 group-hover:text-gray-900'
                                                }`}
                                            />
                                            {/* Tooltip */}
                                            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                                                {entry.label}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t px-3 py-1.5">
                        <p className="text-[10px] text-gray-400">
                            {filtered.length} icono{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}
