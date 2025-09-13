import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function BoqDetail({ auth, boq }) {
    if (!boq) {
        return (
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        BOQ Details
                    </h2>
                }
            >
                <Head title="BOQ Details" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <p>BOQ details not available.</p>
                                <Link
                                    href={route('boqs.index')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 mt-4"
                                >
                                    Back to BOQs
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    BOQ Details
                </h2>
            }
        >
            <Head title="BOQ Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">BOQ Information</h3>
                                <div className="space-x-3">
                                    <Link
                                        href={route('boqs.edit', boq.boqcode)}
                                        className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route('boqs.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Basic Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">BOQ Code:</span>
                                            <p className="text-lg text-gray-900">{boq.boqcode}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Project Code:</span>
                                            <p className="text-lg text-gray-900">{boq.projectcode}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Part No:</span>
                                            <p className="text-lg text-gray-900">{boq.partno}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Description:</span>
                                            <p className="text-lg text-gray-900">{boq.description || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Technical Details</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Details:</span>
                                            <p className="text-lg text-gray-900">{boq.detail || '-'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Dimension:</span>
                                            <p className="text-lg text-gray-900">{boq.dimension || '-'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Material:</span>
                                            <p className="text-lg text-gray-900">{boq.material || '-'}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Type:</span>
                                            <p className="text-lg text-gray-900">{boq.type || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">Quantity & Pricing</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Quantity:</span>
                                            <p className="text-lg text-gray-900">{boq.qty}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Unit:</span>
                                            <p className="text-lg text-gray-900">{boq.unit}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">System Information</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Created:</span>
                                            <p className="text-lg text-gray-900">
                                                {new Date(boq.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">Last Updated:</span>
                                            <p className="text-lg text-gray-900">
                                                {new Date(boq.updated_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
