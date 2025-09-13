import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import InputMenuForm from './Partials/InputMenuForm';
import ListofMenu from './Partials/ListofMenu';
import MenuAdmin from '@/Pages/MenuAdmin';

export default function UsersIndex({ auth, menus }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Menu List</h2>}
        >
            <Head title="Menu List" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <InputMenuForm className="max-w-2xl" />
                        {/* <MenuAdmin className="max-w-2xl" /> */}
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <ListofMenu data={ menus } className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}