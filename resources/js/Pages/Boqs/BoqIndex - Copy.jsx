import React, { useState } from 'react';
import SidebarLayout from '@/Layouts/SidebarLayout';
import BoqSidebar from '@/Components/BoqSidebar';
import { Head, Link, router } from '@inertiajs/react';

export default function BoqIndex({ auth, boqs, grouped_boqs, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [expandedProjects, setExpandedProjects] = useState({});

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        router.get(route('boqs.index'), { search: value }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleProject = (projectCode) => {
        setExpandedProjects(prev => ({
            ...prev,
            [projectCode]: !prev[projectCode]
        }));
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

    return (
        <SidebarLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            BOQ Management
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Engineering Department - BOQ Management System
                        </p>
                    </div>
                    <Link
                        href={route("boqs.create")}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Add New BOQ
                    </Link>
                </div>
            }
            sidebarContent={<BoqSidebar groupedBoqs={grouped_boqs} filters={filters} />}
        >
            <Head title="BOQ Management" />

            <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">BOQ Details</h3>
                        <p className="text-sm text-gray-600">
                            Select a project from the sidebar to view detailed BOQ information.
                            Use the search bar in the sidebar to filter projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-800">Total Projects</h4>
                            <p className="text-2xl font-bold text-blue-600">{Object.keys(grouped_boqs).length}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-green-800">Total BOQs</h4>
                            <p className="text-2xl font-bold text-green-600">
                                {Object.values(grouped_boqs).reduce((total, project) => total + project.items.length, 0)}
                            </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-purple-800">Active Projects</h4>
                            <p className="text-2xl font-bold text-purple-600">
                                {Object.values(grouped_boqs).filter(project => project.items.length > 0).length}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-medium text-gray-900 mb-4">Quick Actions</h4>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={route("boqs.create")}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                Create New BOQ
                            </Link>
                            <Link
                                href={route("boqs.index")}
                                className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                                View All BOQs
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>
    );
}
