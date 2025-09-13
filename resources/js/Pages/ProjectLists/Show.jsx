import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import Breadcrumb from '@/Components/Breadcrumb';

export default function Show({ auth, projectList }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Project Details
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
                                    {
                                        label: "Project List",
                                        href: route("projectlists.index"),
                                    },
                                    { label: "Project Details" },
                                ]}
                            />
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Link
                            href={route('projectlists.edit', projectList.projectcode )}
                            className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Edit Project
                        </Link>
                        <Link
                            href={route('projectlists.index')}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Back to List
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title={`Project Details - ${projectList.projectcode}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Project Header */}
                            <div className="border-b border-gray-200 pb-6 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">
                                            {projectList.project_name}
                                        </h1>
                                        <p className="mt-2 text-lg text-gray-600">
                                            Project Code: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{projectList.projectcode}</span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${projectList.status === 'Active' ? 'bg-green-100 text-green-800' : projectList.status === 'Completed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {projectList.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Project Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Customer Information */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.customer_name}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.contact_person || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.phone || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Work Description</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.descriptionwork}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">SI Number</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.sino || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">PO Number</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.pono || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">PO Date</label>
                                                <p className="mt-1 text-sm text-gray-900">{projectList.podate || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dates Section */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Order Date Received</label>
                                        <p className="mt-1 text-sm text-gray-900">{projectList.orderdatereceived || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
                                        <p className="mt-1 text-sm text-gray-900">{projectList.deliverydate || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Created At</label>
                                        <p className="mt-1 text-sm text-gray-900">{new Date(projectList.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <p className="mt-1 text-sm text-gray-900">{projectList.remarks || 'No remarks'}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                        <p className="mt-1 text-sm text-gray-900">{new Date(projectList.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 border-t border-gray-200 pt-6 flex justify-end space-x-3">
                                <Link
                                    href={route('projectlists.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Back to List
                                </Link>
                                <Link
                                    href={route('projectlists.edit', projectList.projectcode)}
                                    className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                >
                                    Edit Project
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
