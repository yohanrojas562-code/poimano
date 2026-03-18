import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import FamilyForm from '@/components/families/FamilyForm'
import type { Family } from '@/types/members'

interface EditProps {
    family: Family
}

export default function Edit({ family }: EditProps) {
    return (
        <TenantLayout>
            <Head title={`Editar: ${family.name}`} />
            <div className="p-6">
                <FamilyForm family={family} />
            </div>
        </TenantLayout>
    )
}
