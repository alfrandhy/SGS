import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MenuComponent from '@/Pages/Menu/Menu';
import { Head, usePage } from '@inertiajs/react';

export default function ERP({ auth, children, currentRoute }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ERP</h2>}
        >
            <Head title="ERP" />

            {/* <div className="py-3">
                <div className="container mx-auto mt-4">
                    <div id="menu-name" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100">
                            <img className="object-cover w-auto rounded-t-lg h-45 md:h-auto md:w-40 md:rounded-none md:rounded-s-lg" src='/src/mainpage/logo.png' alt="ERP Icon" />
                                <div className="flex flex-col justify-between p-3 leading-normal">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">User Management</h5>
                                    <p className="mb-3 text-md text-gray-700">Menu for Management </p>
                                </div>
                        </a>
                    </div>
                </div>
            </div> */}
            <div>
                {/* Other layout elements */}
                <MenuComponent currentRoute={currentRoute} />
                {/* Main content */}
                {children}
            </div>

        </AuthenticatedLayout>
    );
}
