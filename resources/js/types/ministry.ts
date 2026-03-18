import type { Member } from './members'

export interface MinistryArea {
    id: number
    name: string
    description: string | null
    coordinator_id: number | null
    consolidator_id: number | null
    spiritual_id: number | null
    evangelism_id: number | null
    is_active: boolean
    created_at: string
    updated_at: string
    coordinator?: Pick<Member, 'id' | 'first_name' | 'last_name' | 'full_name'> | null
    consolidator?: Pick<Member, 'id' | 'first_name' | 'last_name' | 'full_name'> | null
    spiritual?: Pick<Member, 'id' | 'first_name' | 'last_name' | 'full_name'> | null
    evangelism?: Pick<Member, 'id' | 'first_name' | 'last_name' | 'full_name'> | null
    network_members?: Pick<Member, 'id' | 'first_name' | 'last_name' | 'full_name' | 'category' | 'member_status' | 'phone' | 'email'>[]
}

export interface MinistryAreaStats {
    total: number
    active: number
}

export interface LeaderOption {
    id: number
    first_name: string
    last_name: string
}

export const roleLabels: Record<string, string> = {
    coordinator: 'Coordinador / Líder',
    consolidator: 'Consolidador',
    spiritual: 'Espiritual',
    evangelism: 'Evangelismo',
}

export const roleDescriptions: Record<string, string> = {
    coordinator: 'Encargado de coordinar, liderar, administrar y gestionar la guía del área ministerial.',
    consolidator: 'Encargado de estar pendiente de los nuevos creyentes y hacer seguimiento.',
    spiritual: 'Encargado de orar, interceder y guiar espiritualmente al grupo.',
    evangelism: 'Encargado de promover actividades evangelísticas del área ministerial.',
}
