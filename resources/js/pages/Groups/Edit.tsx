import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import GroupForm from '@/components/groups/GroupForm'
import type { CellGroup, MemberRef } from '@/types/groups'

interface EditProps {
    group: CellGroup
    members: MemberRef[]
}

export default function Edit({ group, members }: EditProps) {
    return (
        <TenantLayout>
            <Head title={`Editar: ${group.name}`} />
            <GroupForm group={group} members={members} />
        </TenantLayout>
    )
}
