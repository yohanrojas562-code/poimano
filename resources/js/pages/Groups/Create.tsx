import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import GroupForm from '@/components/groups/GroupForm'
import type { MemberRef } from '@/types/groups'

interface CreateProps {
    members: MemberRef[]
}

export default function Create({ members }: CreateProps) {
    return (
        <TenantLayout>
            <Head title="Nuevo Grupo Celular" />
            <GroupForm members={members} />
        </TenantLayout>
    )
}
