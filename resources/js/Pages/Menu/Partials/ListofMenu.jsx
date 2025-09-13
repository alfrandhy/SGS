import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function ListofMenu({ data ='', className = '' }) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 mb-2">User List Data</h2>
            </header>
            {data.length > 0 ? (
                data
                    .sort((a, b) => a.name.localeCompare(b.name))  // Sort by name
                    .slice(0, 50) // Limit to 50 items
                    .map(menu => (
                    <div key={menu.id} className="flex justify-between items-center">
                        <div className="py-2">
                            <div>{menu.name}</div>
                            <div>{menu.description}</div>
                            <div>{menu.slug}</div>
                            <div>{menu.icon}</div>
                            <div>{menu.url}</div>
                            <div>{menu.is_active}</div>
                        </div>
                        <div className="flex space-x-4">
                            <div>Edit | Show | Delete</div>
                            {/* <Link href={route('data.edit', menu.id)} className="text-blue-600 hover:underline">
                                            Edit
                                        </Link>
                                        <Link href={route('data.show', menu.id)} className="ml-4 text-blue-600 hover:underline">
                                            View
                                        </Link>
                                        <Link href={route('data.delete', menu.id)} className="ml-4 text-red-600 hover:underline">
                                            Delete
                                        </Link> */}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-gray-500">No data found.</div>
            )}
        </section>
    );
}
