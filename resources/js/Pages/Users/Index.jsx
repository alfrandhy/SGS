import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import InputUserForm from './Partials/InputUserForm';
import ListofUser from './Partials/ListofUser';

export default function UsersIndex({ auth, users }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>}
        >
            <Head title="Userlist" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <InputUserForm className="max-w-2xl" />
                    </div>
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <ListofUser data={ users } className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}