import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import {
    Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Heading1, Heading2, Heading3, Undo, Redo,
} from 'lucide-react'
import { useEffect } from 'react'

interface Props {
    value: string
    onChange: (html: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Underline,
        ],
        content: value || '',
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none min-h-[120px] px-3 py-2 focus:outline-none',
            },
        },
    })

    // Sync external value changes
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    if (!editor) return null

    const btnClass = (active: boolean) =>
        `p-1.5 rounded transition-colors ${active ? 'bg-cyan/15 text-cyan' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`

    return (
        <div className="rounded-md border overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-0.5 border-b bg-gray-50/80 px-2 py-1.5">
                {/* Text style */}
                <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Negrita">
                    <Bold className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Cursiva">
                    <Italic className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Subrayado">
                    <UnderlineIcon className="h-3.5 w-3.5" />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-300" />

                {/* Headings */}
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Título 1">
                    <Heading1 className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Título 2">
                    <Heading2 className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Título 3">
                    <Heading3 className="h-3.5 w-3.5" />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-300" />

                {/* Lists */}
                <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Lista con viñetas">
                    <List className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Lista numerada">
                    <ListOrdered className="h-3.5 w-3.5" />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-300" />

                {/* Alignment */}
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Alinear izquierda">
                    <AlignLeft className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Centrar">
                    <AlignCenter className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Alinear derecha">
                    <AlignRight className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={btnClass(editor.isActive({ textAlign: 'justify' }))} title="Justificar">
                    <AlignJustify className="h-3.5 w-3.5" />
                </button>

                <div className="mx-1 h-4 w-px bg-gray-300" />

                {/* Undo / Redo */}
                <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={`${btnClass(false)} disabled:opacity-30`} title="Deshacer">
                    <Undo className="h-3.5 w-3.5" />
                </button>
                <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={`${btnClass(false)} disabled:opacity-30`} title="Rehacer">
                    <Redo className="h-3.5 w-3.5" />
                </button>
            </div>

            {/* Editor area */}
            <EditorContent editor={editor} />
        </div>
    )
}
