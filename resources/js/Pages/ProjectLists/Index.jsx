import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';
import Pagination from '@/Components/Pagination';

export default function Index({ auth, projectLists, filters, groupedByYear }) {
    const [search, setSearch] = useState(filters.search || "");
    const [selectedYear, setSelectedYear] = useState(filters.year || "");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(route("projectlists.index"), { search: value, year: selectedYear }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleYearChange = (year) => {
        setSelectedYear(year);
        router.get(route("projectlists.index"), { search: search, year: year }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (project) => {
        if (confirm(`Are you sure you want to delete project ${project.projectcode}?`)) {
            router.delete(route("projectlists.destroy", project.projectcode), {
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Project Management
                        </h2>
                        <div className="mt-2">
                            <Breadcrumb
                                items={[
                                    { label: 'ERP', href: route('erp') },
                                    { label: 'Marketing', href: route('marketing') },
                                    { label: 'Project List' }
                                ]}
                            />
                        </div>
                    </div>
                    <Link
                        href={route("projectlists.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Create New Project
                    </Link>
                </div>
            }
        >
            <Head title="Project List" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-3 lg:px-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">
                                    {selectedYear ? `Project List - ${selectedYear}` : "Project List"}
                                </h3>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={search}
                                        onChange={handleSearch}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleYearChange('')}
                                        className={`px-3 py-2 rounded text-sm ${!selectedYear ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                    >
                                        All Years
                                    </button>
                                    {groupedByYear && Object.keys(groupedByYear).sort((a, b) => b - a).map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => handleYearChange(year)}
                                            className={`px-3 py-2 rounded text-sm ${selectedYear === year ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                        >
                                            {year} ({groupedByYear[year].length})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No.
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Project Code
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer Name
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Work Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                SI No
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                PO No
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                PO Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Order Date Received
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Delivery Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {projectLists.data.length > 0 ? (
                                            projectLists.data.map((project, index) => (
                                                <tr key={project.projectcode} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {project.projectcode}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                        {project.customer_name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                                                        {project.descriptionwork}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {project.sino}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {project.pono}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {project.podate}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {project.orderdatereceived}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {project.deliverydate}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route('projectlists.show', project.projectcode)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route('projectlists.edit', project.projectcode)}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(project)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="px-4 py-8 text-center">
                                                    <p className="text-gray-500">
                                                        No projects found.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {projectLists.data.length > 0 ? (
                                    projectLists.data.map((project, index) => (
                                        <div key={project.projectcode} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-gray-900">
                                                    {project.projectcode}
                                                </h4>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {project.customer_name}
                                                </span>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="font-medium text-gray-600">Customer:</span> {project.customer_name}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Work:</span> {project.descriptionwork}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <span className="font-medium text-gray-600">SI No:</span> {project.sino}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-600">PO No:</span> {project.pono}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <span className="font-medium text-gray-600">PO Date:</span> {project.podate}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-600">Order Received:</span> {project.orderdatereceived}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">Delivery Date:</span> {project.deliverydate}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex space-x-2">
                                                <Link
                                                    href={route('projectlists.show', project.projectcode)}
                                                    className="flex-1 text-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('projectlists.edit', project.projectcode)}
                                                    className="flex-1 text-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project)}
                                                    className="flex-1 text-center px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">
                                            No projects found.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <Pagination links={projectLists.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
