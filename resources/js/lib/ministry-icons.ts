import {
    Heart, Star, Sparkles, Sun, Moon, Flame, Zap, Award, Crown, Gift, Shield,
    Users, User, Baby, UserPlus, UserCheck, UsersRound,
    Music, Mic, Headphones, Radio, Guitar,
    Globe, Mountain, TreePine, Leaf, Flower2, Cloud, Droplets, Waves, Sunrise,
    Church, Home, Building, Landmark, School, Building2,
    MessageCircle, Phone, Mail, Megaphone, Send,
    BookOpen, GraduationCap, Pen, Pencil, Lightbulb, Library, NotebookPen,
    Calendar, Clock, Flag, Map, Compass, Target, MapPin,
    HeartPulse, Activity, Stethoscope, Cross, CircleDot,
    Wallet, Coins, DollarSign, PiggyBank, HandCoins, Banknote,
    Wrench, Hammer, Scissors, Paintbrush, Palette,
    Camera, Video, Image, Tv, Monitor, Clapperboard,
    Car, Bus, Plane, Ship, Bike,
    UtensilsCrossed, Coffee, Apple, CookingPot,
    Puzzle, Trophy, Medal, Umbrella, Key, Lock,
    Eye, Ear, Hand, Footprints, Brain,
    HeartHandshake, Handshake, CircleUserRound,
    Tent, TreeDeciduous, Sprout,
    BellRing, Bell, AlarmClock,
    Scale, Gavel,
    BookMarked, BookHeart, Bookmark,
    Soup, Salad, Wheat,
    Shirt, Glasses, Watch,
    Rocket, Satellite, Atom,
    Brush, PenTool, Shapes,
    Smile, PartyPopper, Cake,
    Dog, Cat, Bird, Fish, Turtle, Rabbit,
    type LucideIcon,
} from 'lucide-react'

export interface IconEntry {
    key: string
    label: string
    category: string
    component: LucideIcon
}

export const ICON_CATEGORIES = [
    'Todos',
    'General',
    'Personas',
    'Música y Adoración',
    'Naturaleza',
    'Edificios',
    'Comunicación',
    'Educación',
    'Fe y Espiritual',
    'Calendario',
    'Salud',
    'Finanzas',
    'Herramientas',
    'Media',
    'Transporte',
    'Comida',
    'Celebración',
    'Animales',
    'Ciencia',
    'Moda',
] as const

export const ICON_LIBRARY: IconEntry[] = [
    // General
    { key: 'heart', label: 'Corazón', category: 'General', component: Heart },
    { key: 'star', label: 'Estrella', category: 'General', component: Star },
    { key: 'sparkles', label: 'Destellos', category: 'General', component: Sparkles },
    { key: 'sun', label: 'Sol', category: 'General', component: Sun },
    { key: 'moon', label: 'Luna', category: 'General', component: Moon },
    { key: 'flame', label: 'Llama', category: 'General', component: Flame },
    { key: 'zap', label: 'Rayo', category: 'General', component: Zap },
    { key: 'award', label: 'Premio', category: 'General', component: Award },
    { key: 'crown', label: 'Corona', category: 'General', component: Crown },
    { key: 'gift', label: 'Regalo', category: 'General', component: Gift },
    { key: 'shield', label: 'Escudo', category: 'General', component: Shield },
    { key: 'eye', label: 'Ojo', category: 'General', component: Eye },
    { key: 'key', label: 'Llave', category: 'General', component: Key },
    { key: 'lock', label: 'Candado', category: 'General', component: Lock },
    { key: 'lightbulb', label: 'Bombilla', category: 'General', component: Lightbulb },
    { key: 'target', label: 'Objetivo', category: 'General', component: Target },
    { key: 'flag', label: 'Bandera', category: 'General', component: Flag },
    { key: 'compass', label: 'Brújula', category: 'General', component: Compass },
    { key: 'rocket', label: 'Cohete', category: 'General', component: Rocket },
    { key: 'umbrella', label: 'Paraguas', category: 'General', component: Umbrella },
    { key: 'smile', label: 'Sonrisa', category: 'General', component: Smile },
    { key: 'puzzle', label: 'Rompecabezas', category: 'General', component: Puzzle },
    { key: 'shapes', label: 'Formas', category: 'General', component: Shapes },

    // Personas
    { key: 'users', label: 'Personas', category: 'Personas', component: Users },
    { key: 'user', label: 'Persona', category: 'Personas', component: User },
    { key: 'baby', label: 'Bebé / Niños', category: 'Personas', component: Baby },
    { key: 'user-plus', label: 'Agregar Persona', category: 'Personas', component: UserPlus },
    { key: 'user-check', label: 'Persona Verificada', category: 'Personas', component: UserCheck },
    { key: 'users-round', label: 'Grupo', category: 'Personas', component: UsersRound },
    { key: 'circle-user-round', label: 'Perfil', category: 'Personas', component: CircleUserRound },
    { key: 'heart-handshake', label: 'Ayuda Mutua', category: 'Personas', component: HeartHandshake },
    { key: 'handshake', label: 'Acuerdo', category: 'Personas', component: Handshake },
    { key: 'hand', label: 'Mano', category: 'Personas', component: Hand },
    { key: 'footprints', label: 'Huellas', category: 'Personas', component: Footprints },
    { key: 'brain', label: 'Cerebro', category: 'Personas', component: Brain },
    { key: 'ear', label: 'Oído', category: 'Personas', component: Ear },

    // Música y Adoración
    { key: 'music', label: 'Música', category: 'Música y Adoración', component: Music },
    { key: 'mic', label: 'Micrófono', category: 'Música y Adoración', component: Mic },
    { key: 'headphones', label: 'Audífonos', category: 'Música y Adoración', component: Headphones },
    { key: 'radio', label: 'Radio', category: 'Música y Adoración', component: Radio },
    { key: 'guitar', label: 'Guitarra', category: 'Música y Adoración', component: Guitar },

    // Naturaleza
    { key: 'globe', label: 'Mundo', category: 'Naturaleza', component: Globe },
    { key: 'mountain', label: 'Montaña', category: 'Naturaleza', component: Mountain },
    { key: 'tree-pine', label: 'Pino', category: 'Naturaleza', component: TreePine },
    { key: 'tree-deciduous', label: 'Árbol', category: 'Naturaleza', component: TreeDeciduous },
    { key: 'leaf', label: 'Hoja', category: 'Naturaleza', component: Leaf },
    { key: 'flower2', label: 'Flor', category: 'Naturaleza', component: Flower2 },
    { key: 'sprout', label: 'Brote', category: 'Naturaleza', component: Sprout },
    { key: 'cloud', label: 'Nube', category: 'Naturaleza', component: Cloud },
    { key: 'droplets', label: 'Gotas', category: 'Naturaleza', component: Droplets },
    { key: 'waves', label: 'Olas', category: 'Naturaleza', component: Waves },
    { key: 'sunrise', label: 'Amanecer', category: 'Naturaleza', component: Sunrise },
    { key: 'wheat', label: 'Trigo', category: 'Naturaleza', component: Wheat },

    // Edificios
    { key: 'church', label: 'Iglesia', category: 'Edificios', component: Church },
    { key: 'home', label: 'Casa', category: 'Edificios', component: Home },
    { key: 'building', label: 'Edificio', category: 'Edificios', component: Building },
    { key: 'building-2', label: 'Edificio 2', category: 'Edificios', component: Building2 },
    { key: 'landmark', label: 'Monumento', category: 'Edificios', component: Landmark },
    { key: 'school', label: 'Escuela', category: 'Edificios', component: School },
    { key: 'tent', label: 'Carpa', category: 'Edificios', component: Tent },

    // Comunicación
    { key: 'message-circle', label: 'Mensaje', category: 'Comunicación', component: MessageCircle },
    { key: 'phone', label: 'Teléfono', category: 'Comunicación', component: Phone },
    { key: 'mail', label: 'Correo', category: 'Comunicación', component: Mail },
    { key: 'megaphone', label: 'Megáfono', category: 'Comunicación', component: Megaphone },
    { key: 'send', label: 'Enviar', category: 'Comunicación', component: Send },
    { key: 'bell', label: 'Campana', category: 'Comunicación', component: Bell },
    { key: 'bell-ring', label: 'Campana Sonando', category: 'Comunicación', component: BellRing },
    { key: 'alarm', label: 'Alarma', category: 'Comunicación', component: AlarmClock },

    // Educación
    { key: 'book-open', label: 'Libro Abierto', category: 'Educación', component: BookOpen },
    { key: 'book-marked', label: 'Libro Marcado', category: 'Educación', component: BookMarked },
    { key: 'book-heart', label: 'Libro Corazón', category: 'Educación', component: BookHeart },
    { key: 'bookmark', label: 'Marcador', category: 'Educación', component: Bookmark },
    { key: 'graduation-cap', label: 'Graduación', category: 'Educación', component: GraduationCap },
    { key: 'pen', label: 'Pluma', category: 'Educación', component: Pen },
    { key: 'pencil', label: 'Lápiz', category: 'Educación', component: Pencil },
    { key: 'notebook-pen', label: 'Cuaderno', category: 'Educación', component: NotebookPen },
    { key: 'library', label: 'Biblioteca', category: 'Educación', component: Library },

    // Fe y Espiritual
    { key: 'cross', label: 'Cruz', category: 'Fe y Espiritual', component: Cross },
    { key: 'circle-dot', label: 'Punto Central', category: 'Fe y Espiritual', component: CircleDot },

    // Calendario y Tiempo
    { key: 'calendar', label: 'Calendario', category: 'Calendario', component: Calendar },
    { key: 'clock', label: 'Reloj', category: 'Calendario', component: Clock },
    { key: 'map', label: 'Mapa', category: 'Calendario', component: Map },
    { key: 'map-pin', label: 'Ubicación', category: 'Calendario', component: MapPin },

    // Salud
    { key: 'heart-pulse', label: 'Pulso', category: 'Salud', component: HeartPulse },
    { key: 'activity', label: 'Actividad', category: 'Salud', component: Activity },
    { key: 'stethoscope', label: 'Estetoscopio', category: 'Salud', component: Stethoscope },

    // Finanzas
    { key: 'wallet', label: 'Billetera', category: 'Finanzas', component: Wallet },
    { key: 'coins', label: 'Monedas', category: 'Finanzas', component: Coins },
    { key: 'dollar-sign', label: 'Dólar', category: 'Finanzas', component: DollarSign },
    { key: 'piggy-bank', label: 'Alcancía', category: 'Finanzas', component: PiggyBank },
    { key: 'hand-coins', label: 'Ofrenda', category: 'Finanzas', component: HandCoins },
    { key: 'banknote', label: 'Billete', category: 'Finanzas', component: Banknote },
    { key: 'scale', label: 'Balanza', category: 'Finanzas', component: Scale },
    { key: 'gavel', label: 'Mazo', category: 'Finanzas', component: Gavel },

    // Herramientas
    { key: 'wrench', label: 'Llave Inglesa', category: 'Herramientas', component: Wrench },
    { key: 'hammer', label: 'Martillo', category: 'Herramientas', component: Hammer },
    { key: 'scissors', label: 'Tijeras', category: 'Herramientas', component: Scissors },
    { key: 'paintbrush', label: 'Pincel', category: 'Herramientas', component: Paintbrush },
    { key: 'palette', label: 'Paleta', category: 'Herramientas', component: Palette },
    { key: 'brush', label: 'Brocha', category: 'Herramientas', component: Brush },
    { key: 'pen-tool', label: 'Herramienta Pluma', category: 'Herramientas', component: PenTool },

    // Media
    { key: 'camera', label: 'Cámara', category: 'Media', component: Camera },
    { key: 'video', label: 'Video', category: 'Media', component: Video },
    { key: 'clapperboard', label: 'Claqueta', category: 'Media', component: Clapperboard },
    { key: 'image', label: 'Imagen', category: 'Media', component: Image },
    { key: 'tv', label: 'Televisión', category: 'Media', component: Tv },
    { key: 'monitor', label: 'Monitor', category: 'Media', component: Monitor },

    // Transporte
    { key: 'car', label: 'Auto', category: 'Transporte', component: Car },
    { key: 'bus', label: 'Autobús', category: 'Transporte', component: Bus },
    { key: 'plane', label: 'Avión', category: 'Transporte', component: Plane },
    { key: 'ship', label: 'Barco', category: 'Transporte', component: Ship },
    { key: 'bike', label: 'Bicicleta', category: 'Transporte', component: Bike },

    // Comida
    { key: 'utensils-crossed', label: 'Cubiertos', category: 'Comida', component: UtensilsCrossed },
    { key: 'coffee', label: 'Café', category: 'Comida', component: Coffee },
    { key: 'apple', label: 'Manzana', category: 'Comida', component: Apple },
    { key: 'cooking-pot', label: 'Olla', category: 'Comida', component: CookingPot },
    { key: 'soup', label: 'Sopa', category: 'Comida', component: Soup },
    { key: 'salad', label: 'Ensalada', category: 'Comida', component: Salad },

    // Celebración
    { key: 'party-popper', label: 'Fiesta', category: 'Celebración', component: PartyPopper },
    { key: 'cake', label: 'Pastel', category: 'Celebración', component: Cake },
    { key: 'trophy', label: 'Trofeo', category: 'Celebración', component: Trophy },
    { key: 'medal', label: 'Medalla', category: 'Celebración', component: Medal },

    // Animales
    { key: 'dog', label: 'Perro', category: 'Animales', component: Dog },
    { key: 'cat', label: 'Gato', category: 'Animales', component: Cat },
    { key: 'bird', label: 'Pájaro / Paloma', category: 'Animales', component: Bird },
    { key: 'fish', label: 'Pez', category: 'Animales', component: Fish },
    { key: 'turtle', label: 'Tortuga', category: 'Animales', component: Turtle },
    { key: 'rabbit', label: 'Conejo', category: 'Animales', component: Rabbit },

    // Ciencia
    { key: 'atom', label: 'Átomo', category: 'Ciencia', component: Atom },
    { key: 'satellite', label: 'Satélite', category: 'Ciencia', component: Satellite },

    // Moda
    { key: 'shirt', label: 'Camisa', category: 'Moda', component: Shirt },
    { key: 'glasses', label: 'Gafas', category: 'Moda', component: Glasses },
    { key: 'watch', label: 'Reloj de Mano', category: 'Moda', component: Watch },
]

/**
 * Map from icon key → Lucide component.
 * Used by templates (Esperanza, MinistryDetail) to render icons.
 */
export const ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
    ICON_LIBRARY.map((entry) => [entry.key, entry.component])
) as Record<string, LucideIcon>
