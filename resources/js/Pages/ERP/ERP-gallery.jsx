import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ERPGallery({ auth }) {
    // Gallery menu items data
    const galleryMenuItems = [
        {
            id: 1,
            name: 'Marketing',
            description: 'Manage Project List',
            icon: '/src/mainpage/logo.png',
            url: 'erp/marketing',
        },
        {
            id: 2,
            name: 'Engineering',
            description: 'Manage BOQ and Drawing for projects',
            icon: '/src/mainpage/logo.png',
            url: 'erp/engineering',
        },
        {
            id: 3,
            name: 'Procurement',
            description: 'Manage order purchase for projects',
            icon: '/src/mainpage/logo.png',
            url: 'erp/procurement',
        },
        {
            id: 4,
            name: 'PPIC',
            description: 'Manage projects progress',
            icon: '/src/mainpage/logo.png',
            url: 'erp/ppic',
        },
        {
            id: 5,
            name: 'Warehouse',
            description: 'Manage warehouse Inbound and Outbound material and equipment',
            icon: '/src/mainpage/logo.png',
            url: 'erp/warehouse',
        },
        {
            id: 6,
            name: 'Quality Control',
            description: 'Manage Quality of Material and Equipment',
            icon: '/src/mainpage/logo.png',
            url: 'erp/qc',
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ERP Gallery</h2>}
        >
            <Head title="ERP Gallery" />

            <div className="py-3">
                <div className="container mx-auto mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {galleryMenuItems.map(item => (
                            <Link key={item.id} href={item.url} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                                <img className="object-cover w-auto rounded-t-lg h-45 md:h-auto md:w-40 md:rounded-none md:rounded-s-lg" src={item.icon} alt={item.name} />
                                <div className="flex flex-col justify-between p-3 leading-normal">
                                    <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900">{item.name}</h5>
                                    <p className="mb-3 text-sm text-gray-700">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
