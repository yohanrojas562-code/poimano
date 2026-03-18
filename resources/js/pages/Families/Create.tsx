import { Head } from '@inertiajs/react'
import TenantLayout from '@/layouts/TenantLayout'
import FamilyForm from '@/components/families/FamilyForm'

export default function Create() {
    return (
        <TenantLayout>
            <Head title="Nueva Familia" />
            <div className="p-6">
                <FamilyForm />
            </div>
        </TenantLayout>
    )
}
