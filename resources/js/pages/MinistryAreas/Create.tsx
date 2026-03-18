import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import MinistryAreaForm from '@/components/ministry/MinistryAreaForm'
import type { LeaderOption } from '@/types/ministry'

interface CreateProps {
    leaders: LeaderOption[]
}

export default function Create({ leaders }: CreateProps) {
    return (
        <TenantLayout>
            <Head title="Nueva Área Ministerial" />
            <div className="p-6">
                <MinistryAreaForm leaders={leaders} />
            </div>
        </TenantLayout>
    )
}
