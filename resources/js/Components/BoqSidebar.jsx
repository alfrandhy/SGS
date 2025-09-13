import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function BoqSidebar({ groupedBoqs, filters, selectedProject }) {
    const [search, setSearch] = useState(filters?.search || '');

    const handleProjectClick = (projectCode) => {
        router.get(route('boqs.index'), {
            project: projectCode,
            search: search
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleAllProjects = () => {
        router.get(route('boqs.index'), {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        const params = { search: value };
        if (selectedProject) {
            params.project = selectedProject;
        }

        router.get(route('boqs.index'), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="h-full bg-white">
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects</h3>
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <div className="space-y-1 p-4">
                    {/* All Projects option */}
                    <button
                        onClick={handleAllProjects}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            !selectedProject
                                ? 'bg-blue-100 text-blue-800'
                                : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        All Projects
                    </button>

                    {/* Project list */}
                    {Object.keys(groupedBoqs).length > 0 ? (
                        Object.entries(groupedBoqs).map(([projectCode, projectData]) => (
                            <button
                                key={projectCode}
                                onClick={() => handleProjectClick(projectCode)}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                                    selectedProject === projectCode
                                        ? 'bg-blue-100 text-blue-800 font-medium'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="truncate">{projectCode}</span>
                                    <span className="text-xs text-gray-500">
                                        {projectData.items.length}
                                    </span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-sm text-gray-500">No projects found.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 border-t">
                <Link
                    href={route("boqs.create")}
                    className="w-full inline-flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
                >
                    + Add New BOQ
                </Link>
            </div>
        </div>
    );
}
