import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import BoqSidebar from '@/Components/BoqSidebar';
import { Head, Link, router } from '@inertiajs/react';
import Pagination from "@/Components/Pagination";

export default function BoqIndex({ auth, boqs, grouped_boqs, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const params = { search: value };
        if (filters.project) {
            params.project = filters.project;
        }

        router.get(route('boqs.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (boq) => {
        if (confirm(`Are you sure you want to delete BOQ ${boq.boqcode}?`)) {
            router.delete(route('boqs.destroy', boq.boqcode), {
                onSuccess: () => {
                    // The page will reload automatically
                },
            });
        }
    };

    // Filter boqs based on selected project
    const filteredBoqs = filters.project
        ? boqs.data.filter(boq => boq.projectcode === filters.project)
        : boqs.data;

    return (
        <SidebarLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            BOQ Management
                        </h2>
                        {filters.project && (
                            <p className="text-sm text-gray-600 mt-1">
                                Project: <span className="font-medium">{filters.project}</span>
                            </p>
                        )}
                    </div>
                    <Link
                        href={route("boqs.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Add New BOQ
                    </Link>
                </div>
            }
            sidebarContent={<BoqSidebar groupedBoqs={grouped_boqs} filters={filters} selectedProject={filters.project} />}
        >
            <Head title="BOQ Management" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-3 lg:px-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">
                                    {filters.project ? `BOQ List - ${filters.project}` : 'BOQ List'}
                                </h3>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search BOQs by project code, part no, description or type..."
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
                                                BOQ Code
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Part No
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Material
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dimension
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Qty
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Unit
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Project
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredBoqs.length > 0 ? (
                                            filteredBoqs.map((boq) => (
                                                <tr key={boq.boqcode}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {boq.boqcode}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {boq.partno}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {boq.description}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.material}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.dimension}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.qty}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.unit}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.projectcode}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('boqs.show', boq.boqcode)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            View
                                                        </Link>
                                                        <Link
                                                            href={route('boqs.edit', boq.boqcode)}
                                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(boq)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="px-6 py-8 text-center">
                                                    <p className="text-gray-500">No BOQs found.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination links={boqs.links} />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
