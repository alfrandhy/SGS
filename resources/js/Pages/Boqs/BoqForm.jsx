import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function BoqForm({ auth, boq }) {
    const isEdit = !!boq;

    const { data, setData, post, put, processing, errors } = useForm({
        boqcode: '',
        projectcode: '',
        partno: '',
        description: '',
        detail: '',
        dimension: '',
        material: '',
        qty: '',
        unit: '',
        type: '',
    });

    // Populate form data when boq is available
    useEffect(() => {
        if (boq) {
            setData({
                boqcode: boq.boqcode || '',
                projectcode: boq.projectcode || '',
                partno: boq.partno || '',
                description: boq.description || '',
                detail: boq.detail || '',
                dimension: boq.dimension || '',
                material: boq.material || '',
                qty: boq.qty || '',
                unit: boq.unit || '',
                type: boq.type || '',
            });
        }
    }, [boq]);

    const UNIT_OPTIONS = [
        { value: 'pc', label: 'Piece' },
        { value: 'pcs', label: 'Pieces' },
        { value: 'm', label: 'Meter' },
        { value: 'kg', label: 'Kilogram' },
        { value: 'set', label: 'Set' },
        { value: 'lot', label: 'Lot' },
    ];

    const TYPE_OPTIONS = [
        { value: 'material', label: 'Material' },
        { value: 'labor', label: 'Labor / Jasa' },
        { value: 'construction', label: 'Construction' },
    ];

    useEffect(() => {
        if (!isEdit) {
            setData('boqcode', `${data.projectcode}_${data.partno}`);
        }
    }, [data.projectcode, data.partno, isEdit]);

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('boqs.update', boq.boqcode));
        } else {
            post(route('boqs.store'), {
                onSuccess: () => {
                    if (!isEdit) {
                        setData({
                            boqcode: '',
                            projectcode: '',
                            partno: '',
                            description: '',
                            detail: '',
                            dimension: '',
                            material: '',
                            qty: '',
                            unit: '',
                            type: '',
                        });
                    }
                },
            });
        }
    };

    const pageTitle = isEdit ? 'Edit BOQ' : 'Create BOQ';
    const buttonText = isEdit ? 'Update BOQ' : 'Create BOQ';
    const processingText = isEdit ? 'Updating...' : 'Creating...';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {pageTitle}
                </h2>
            }
        >
            <Head title={pageTitle} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            BOQ Code *
                                        </label>
                                        <input
                                            type="text"
                                            value={isEdit ? data.boqcode : `${data.projectcode}_${data.partno}`}
                                            onChange={(e) => setData('boqcode', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                            disabled
                                        />
                                        {errors.boqcode && (
                                            <div className="text-red-600 text-sm mt-1">{errors.boqcode}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Project Code *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.projectcode}
                                            onChange={(e) => setData('projectcode', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                            disabled={isEdit}
                                        />
                                        {errors.projectcode && (
                                            <div className="text-red-600 text-sm mt-1">{errors.projectcode}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Part No *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.partno}
                                            onChange={(e) => setData('partno', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                            disabled={isEdit}
                                        />
                                        {errors.partno && (
                                            <div className="text-red-600 text-sm mt-1">{errors.partno}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Dimension
                                        </label>
                                        <input
                                            type="text"
                                            value={data.dimension}
                                            onChange={(e) => setData('dimension', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.dimension && (
                                            <div className="text-red-600 text-sm mt-1">{errors.dimension}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Material
                                        </label>
                                        <input
                                            type="text"
                                            value={data.material}
                                            onChange={(e) => setData('material', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.material && (
                                            <div className="text-red-600 text-sm mt-1">{errors.material}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Quantity *
                                        </label>
                                        <input
                                            type="number"
                                            value={data.qty}
                                            onChange={(e) => setData('qty', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.qty && (
                                            <div className="text-red-600 text-sm mt-1">{errors.qty}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Unit *
                                        </label>
                                        <select
                                            value={data.unit}
                                            onChange={(e) => setData('unit', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select unit</option>
                                            {UNIT_OPTIONS.map(({ value, label }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.unit && (
                                            <div className="text-red-600 text-sm mt-1">{errors.unit}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Type *
                                        </label>
                                        <select
                                            value={data.type}
                                            onChange={(e) => setData('type', e.target.value)}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        >
                                            <option value="">Select type</option>
                                            {TYPE_OPTIONS.map(({ value, label }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.type && (
                                            <div className="text-red-600 text-sm mt-1">{errors.type}</div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Description *
                                        </label>
                                        <textarea
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.description && (
                                            <div className="text-red-600 text-sm mt-1">{errors.description}</div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Details
                                        </label>
                                        <textarea
                                            value={data.detail}
                                            onChange={(e) => setData('detail', e.target.value)}
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.detail && (
                                            <div className="text-red-600 text-sm mt-1">{errors.detail}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6 space-x-3">
                                    <Link
                                        href={route('boqs.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        {processing ? processingText : buttonText}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
