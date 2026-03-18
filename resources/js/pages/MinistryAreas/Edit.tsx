import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import MinistryAreaForm from '@/components/ministry/MinistryAreaForm'
import type { MinistryArea, LeaderOption } from '@/types/ministry'

interface EditProps {
    area: MinistryArea
    leaders: LeaderOption[]
}

export default function Edit({ area, leaders }: EditProps) {
    return (
        <TenantLayout>
            <Head title={`Editar: ${area.name}`} />
            <div className="p-6">
                <MinistryAreaForm area={area} leaders={leaders} />
            </div>
        </TenantLayout>
    )
}
