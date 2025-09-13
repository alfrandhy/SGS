import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function ERPGallery({ auth }) {
    // Gallery menu items data
    const galleryMenuItems = [
        {
            id: 1,
            name: 'BOQ Management',
            description: 'Manage List of Part, Construction and Labor',
            icon: '/src/mainpage/logo.png',
            url: 'engineering/boqs',
        },
        {
            id: 2,
            name: 'Drawing Management',
            description: 'Track and manage projects drawings',
            icon: '/src/mainpage/logo.png',
            url: 'engineering/drawings',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ERP Gallery</h2>}
        >
            <Head title="ERP Gallery" />

            <div className="py-3">
                <div className="container mx-auto mt-4">
                    <Link href={ route('erp') } className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md mb-2">
                        Back to ERP List
                    </Link>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryMenuItems.map(item => (
                            <Link key={item.id} href={item.url} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
                                <img className="object-cover w-auto rounded-t-lg h-45 md:h-auto md:w-40 md:rounded-none md:rounded-s-lg" src={item.icon} alt={item.name} />
                                <div className="flex flex-col justify-between p-3 leading-normal">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{item.name}</h5>
                                    <p className="mb-3 text-md text-gray-700">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
