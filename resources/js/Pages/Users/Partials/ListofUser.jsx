import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function ListofUser({ data ='', className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 mb-2">User List Data</h2>
            </header>
            {data.length > 0 ? (
                data
                    .sort((a, b) => a.name.localeCompare(b.name))  // Sort by name
                    .slice(0, 50) // Limit to 50 items
                    .map(user => (
                    <div key={user.id} className="flex justify-between items-center">
                        <div className="py-2">
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                        </div>
                        <div className="flex space-x-4">
                            <div>Edit | Show | Delete</div>
                            {/* <Link href={route('data.edit', user.id)} className="text-blue-600 hover:underline">
                                            Edit
                                        </Link>
                                        <Link href={route('data.show', user.id)} className="ml-4 text-blue-600 hover:underline">
                                            View
                                        </Link>
                                        <Link href={route('data.delete', user.id)} className="ml-4 text-red-600 hover:underline">
                                            Delete
                                        </Link> */}
                        </div>
                    </div>
                    // Pagination can be added here if needed
                    // <div class="flex justify-between items-center">
                    //     <button id="prevPage" class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
                    //     <span id="pageInfo">Page 1 of 1</span>
                    //     <button id="nextPage" class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
                    // </div>
                ))
            ) : (
                <div className="text-gray-500">No data found.</div>
            )}
        </section>
    );
}
