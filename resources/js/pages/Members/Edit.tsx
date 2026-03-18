import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import MemberForm from '@/components/members/MemberForm'
import type { Member, Family } from '@/types/members'

interface EditProps {
    member: Member
    families: Pick<Family, 'id' | 'name'>[]
    membersForRef: Pick<Member, 'id' | 'first_name' | 'last_name'>[]
    ministryAreas: { id: number; name: string }[]
}

export default function Edit({ member, families, membersForRef, ministryAreas }: EditProps) {
    return (
        <TenantLayout>
            <Head title={`Editar: ${member.full_name}`} />
            <MemberForm member={member} families={families} membersForRef={membersForRef} ministryAreas={ministryAreas} />
        </TenantLayout>
    )
}
