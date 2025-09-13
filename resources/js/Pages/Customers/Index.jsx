import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumb from '@/Components/Breadcrumb';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, customers, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(route('customers.index'), { search: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (customer) => {
        if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
            router.delete(route('customers.destroy', customer.code), {
                onSuccess: () => {
                    // The page will reload automatically
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Customers
                        </h2>
                        <div className="mt-2">
                            <Breadcrumb
                                items={[
                                    { label: 'ERP', href: route('erp') },
                                    { label: 'Marketing', href: route('marketing') },
                                    { label: 'Customers' }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Customers" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Customer List</h3>
                                <Link
                                    href={route('customers.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Add New Customer
                                </Link>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={search}
                                    onChange={handleSearch}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Phone
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {customers.data.length > 0 ? (
                                            customers.data.map((customer) => (
                                                <tr key={customer.code}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {customer.code}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {customer.name}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer.telp || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {customer.address || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('customers.show', customer.code)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('customers.edit', customer.code)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(customer)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                    No customers found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {customers.links && (
                                <div className="mt-4">
                                    {customers.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                                                link.active
                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
