export interface User {
    id: number
    name: string
    email: string
    role: string
    phone?: string
    avatar?: string
    is_active: boolean
}

export interface Tenant {
    id: string
    church_name: string
    slug: string
    plan_id: number
    status: 'active' | 'trial' | 'suspended' | 'cancelled'
    pastor_name?: string
    email?: string
    phone?: string
    address?: string
}

export interface ChurchBranding {
    church_name: string
    logo: string | null
    favicon: string | null
    slogan: string | null
    primary_color: string
    secondary_color: string
    text_color: string
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User
    }
    tenant?: Tenant
    churchSettings?: ChurchBranding | null
    flash?: {
        success?: string
        error?: string
    }
}
