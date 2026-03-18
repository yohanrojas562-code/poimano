import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import MemberForm from '@/components/members/MemberForm'
import type { Member, Family } from '@/types/members'

interface CreateProps {
    families: Pick<Family, 'id' | 'name'>[]
    membersForRef: Pick<Member, 'id' | 'first_name' | 'last_name'>[]
    ministryAreas: { id: number; name: string }[]
}

export default function Create({ families, membersForRef, ministryAreas }: CreateProps) {
    return (
        <TenantLayout>
            <Head title="Nuevo Miembro" />
            <MemberForm families={families} membersForRef={membersForRef} ministryAreas={ministryAreas} />
        </TenantLayout>
    )
}
