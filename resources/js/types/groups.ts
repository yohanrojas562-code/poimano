export interface CellGroup {
    id: number
    name: string
    opening_date: string
    address: string
    host_type: 'member' | 'external'
    host_member_id: number | null
    host_name: string | null
    host_phone: string | null
    notes: string | null
    is_active: boolean
    created_at: string
    updated_at: string
    host_display_name: string
    attendees_count: number
    host_member?: Pick<MemberRef, 'id' | 'first_name' | 'last_name' | 'full_name'>
    attendees?: CellGroupAttendee[]
}

export interface CellGroupAttendee {
    id: number
    cell_group_id: number
    type: 'member' | 'external'
    member_id: number | null
    name: string | null
    phone: string | null
    display_name: string
    member?: MemberRef
}

export interface MemberRef {
    id: number
    first_name: string
    last_name: string
    full_name?: string
}

export interface CellGroupFilters {
    search?: string
    status?: 'active' | 'inactive' | ''
}

export interface CellGroupStats {
    total: number
    active: number
    attendees: number
    new_this_month: number
}

export interface AttendeeInput {
    type: 'member' | 'external'
    member_id?: number | null
    name?: string | null
    phone?: string | null
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
