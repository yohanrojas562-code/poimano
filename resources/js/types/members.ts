export type MemberStatus = 'activo' | 'inactivo' | 'transferido' | 'fallecido' | 'excomunicado'
export type MemberCategory = 'nuevo_creyente' | 'creyente' | 'lider' | 'pastor' | 'misionero'
export type MaritalStatus = 'soltero' | 'casado' | 'viudo' | 'divorciado' | 'union_libre'
export type FamilyRole = 'cabeza' | 'esposa' | 'hijo' | 'otro'
export type Gender = 'masculino' | 'femenino'

export interface Member {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string
    second_last_name: string | null
    gender: Gender
    birth_date: string | null
    photo: string | null
    blood_type: string | null
    marital_status: MaritalStatus | null
    nationality: string | null
    document_type: string | null
    document_number: string | null
    email: string | null
    phone: string | null
    mobile: string | null
    address: string | null
    city: string | null
    state: string | null
    zip_code: string | null
    country_id: number | null
    member_status: MemberStatus
    category: MemberCategory
    is_baptized: boolean
    baptism_date: string | null
    baptism_church: string | null
    conversion_date: string | null
    membership_date: string | null
    how_arrived: string | null
    referred_by_id: number | null
    family_id: number | null
    family_role: FamilyRole | null
    user_id: number | null
    notes: string | null
    is_active: boolean
    created_at: string
    updated_at: string
    deleted_at: string | null
    full_name: string
    complete_name: string
    family?: Family
    referred_by?: Member
    referrals?: Member[]
    skills?: MemberSkill[]
    history?: MemberHistory[]
    ministry_areas?: { id: number; name: string }[]
}

export interface Family {
    id: number
    name: string
    address: string | null
    phone: string | null
    wedding_date: string | null
    notes: string | null
    members?: Member[]
}

export interface MemberSkill {
    id: number
    member_id: number
    skill: string
}

export interface MemberHistory {
    id: number
    member_id: number
    from_status: string | null
    to_status: string
    reason: string | null
    changed_by: number | null
    changed_at: string
    changed_by_user?: { id: number; name: string }
}

export interface MemberFilters {
    search?: string
    status?: MemberStatus | ''
    category?: MemberCategory | ''
}

export interface MemberStats {
    total: number
    active: number
    baptized: number
    new_this_month: number
}

export interface PaginatedData<T> {
    data: T[]
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number | null
    to: number | null
    links: PaginationLink[]
}

export interface PaginationLink {
    url: string | null
    label: string
    active: boolean
}

export const statusLabels: Record<MemberStatus, string> = {
    activo: 'Activo',
    inactivo: 'Inactivo',
    transferido: 'Transferido',
    fallecido: 'Fallecido',
    excomunicado: 'Excomunicado',
}

export const categoryLabels: Record<MemberCategory, string> = {
    nuevo_creyente: 'Nuevo Creyente',
    creyente: 'Creyente',
    lider: 'Líder',
    pastor: 'Pastor',
    misionero: 'Misionero',
}

export const maritalStatusLabels: Record<MaritalStatus, string> = {
    soltero: 'Soltero/a',
    casado: 'Casado/a',
    viudo: 'Viudo/a',
    divorciado: 'Divorciado/a',
    union_libre: 'Unión Libre',
}

export const familyRoleLabels: Record<FamilyRole, string> = {
    cabeza: 'Cabeza de Familia',
    esposa: 'Esposa',
    hijo: 'Hijo/a',
    otro: 'Otro',
}

export const genderLabels: Record<Gender, string> = {
    masculino: 'Masculino',
    femenino: 'Femenino',
}
