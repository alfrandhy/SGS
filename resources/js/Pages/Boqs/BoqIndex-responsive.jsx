import React, { useState } from "react";
import SidebarLayout from "@/Layouts/SidebarLayout";
import BoqSidebar from "@/Components/BoqSidebar";
import { Head, Link, router } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";
import Pagination from "@/Components/Pagination";

export default function BoqIndex({ auth, boqs, grouped_boqs, filters }) {
    const [search, setSearch] = useState(filters.search || "");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const params = { search: value };
        if (filters.project) {
            params.project = filters.project;
        }

        router.get(route("boqs.index"), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (boq) => {
        if (confirm(`Are you sure you want to delete BOQ ${boq.boqcode}?`)) {
            router.delete(route("boqs.destroy", boq.boqcode), {
                onSuccess: () => {
                    // The page will reload automatically
                },
            });
        }
    };

    // Filter boqs based on selected project
    const filteredBoqs = filters.project
        ? boqs.data.filter((boq) => boq.projectcode === filters.project)
        : boqs.data;

    return (
        <SidebarLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            BOQ Management
                        </h2>
                        <div className="mt-2">
                            <Breadcrumb
                                items={[
                                    {
                                        label: "ERP",
                                        href: route("erp"),
                                    },
                                    {
                                        label: "Engineering",
                                        href: route("engineering"),
                                    },
                                    { label: "BOQ List" },
                                ]}
                            />
                        </div>
                        {filters.project && (
                            <p className="text-sm text-gray-600 mt-1">
                                Project:{" "}
                                <span className="font-medium">
                                    {filters.project}
                                </span>
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
            sidebarContent={
                <BoqSidebar
                    groupedBoqs={grouped_boqs}
                    filters={filters}
                    selectedProject={filters.project}
                />
            }
        >
            <Head title="BOQ Management" />

            <div className="py-2">
                <div className="max-w-7xl mx-auto sm:px-3 lg:px-2">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                <h3 className="text-lg font-medium">
                                    {filters.project
                                        ? `BOQ List - ${filters.project}`
                                        : "BOQ List"}
                                </h3>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Search BOQs..."
                                    value={search}
                                    onChange={handleSearch}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                />
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden lg:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                BOQ Code
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Part No
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Material
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Dimension
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Qty
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Unit
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Project
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredBoqs.length > 0 ? (
                                            filteredBoqs.map((boq) => (
                                                <tr
                                                    key={boq.boqcode}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {boq.boqcode}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                        {boq.partno}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                                                        {boq.description}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.material}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.dimension}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.qty}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.unit}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.type}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                        {boq.projectcode}
                                                    </td>
                                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={route(
                                                                    "boqs.show",
                                                                    boq.boqcode
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "boqs.edit",
                                                                    boq.boqcode
                                                                )}
                                                                className="text-indigo-600 hover:text-indigo-900"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        boq
                                                                    )
                                                                }
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
                                                <td
                                                    colSpan="10"
                                                    className="px-4 py-8 text-center"
                                                >
                                                    <p className="text-gray-500">
                                                        No BOQs found.
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="lg:hidden space-y-4">
                                {filteredBoqs.length > 0 ? (
                                    filteredBoqs.map((boq) => (
                                        <div
                                            key={boq.boqcode}
                                            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-medium text-gray-900">
                                                    {boq.boqcode}
                                                </h4>
                                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {boq.type}
                                                </span>
                                            </div>

                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="font-medium text-gray-600">
                                                        Part No:
                                                    </span>{" "}
                                                    {boq.partno}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">
                                                        Description:
                                                    </span>{" "}
                                                    {boq.description}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">
                                                        Material:
                                                    </span>{" "}
                                                    {boq.material}
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">
                                                        Dimension:
                                                    </span>{" "}
                                                    {boq.dimension}
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div>
                                                        <span className="font-medium text-gray-600">
                                                            Qty:
                                                        </span>{" "}
                                                        {boq.qty}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-gray-600">
                                                            Unit:
                                                        </span>{" "}
                                                        {boq.unit}
                                                    </div>
                                                </div>
                                                <div>
                                                    <span className="font-medium text-gray-600">
                                                        Project:
                                                    </span>{" "}
                                                    {boq.projectcode}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex space-x-2">
                                                <Link
                                                    href={route(
                                                        "boqs.show",
                                                        boq.boqcode
                                                    )}
                                                    className="flex-1 text-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "boqs.edit",
                                                        boq.boqcode
                                                    )}
                                                    className="flex-1 text-center px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-sm"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(boq)
                                                    }
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
                                            No BOQs found.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <Pagination links={boqs.links} />
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
