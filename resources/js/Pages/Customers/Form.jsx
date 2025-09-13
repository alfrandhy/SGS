import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Form({ auth, customer, mode = "create" }) {
    const isEdit = mode === "edit";

    const { data, setData, post, put, processing, errors } = useForm({
        name: isEdit && customer ? customer.name || "" : "",
        code: isEdit && customer ? customer.code || "" : "",
        telp: isEdit && customer ? customer.telp || "" : "",
        address: isEdit && customer ? customer.address || "" : "",
        customer_logo: null,
    });

    const [preview, setPreview] = useState(
        isEdit && customer && customer.customer_logo
            ? `/storage/${customer.customer_logo}`
            : null
    );

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("customer_logo", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route("customers.update", customer.code));
        } else {
            post(route("customers.store"), {
                onSuccess: () => {
                    // Reset form for create mode
                    setData({
                        name: "",
                        code: "",
                        telp: "",
                        address: "",
                        customer_logo: null,
                    });
                    setPreview(null);
                },
            });
        }
    };

    const pageTitle = isEdit ? "Edit Customer" : "Create Customer";
    const buttonText = isEdit ? "Update Customer" : "Create Customer";
    const processingText = isEdit ? "Updating..." : "Creating...";

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            {pageTitle}
                        </h2>
                        <div className="mt-2">
                            <Breadcrumb
                                items={[
                                    { label: "ERP", href: route("erp") },
                                    {
                                        label: "Marketing",
                                        href: route("marketing"),
                                    },
                                    {
                                        label: "Customers",
                                        href: route("customers.index"),
                                    },
                                    { label: pageTitle },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={pageTitle} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form
                                onSubmit={submit}
                                encType="multipart/form-data"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Customer Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.name && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Customer Code *
                                        </label>
                                        <input
                                            type="text"
                                            value={data.code}
                                            onChange={(e) =>
                                                setData("code", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            required
                                        />
                                        {errors.code && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.code}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.telp}
                                            onChange={(e) =>
                                                setData("telp", e.target.value)
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.telp && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.telp}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <textarea
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            rows="3"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                        {errors.address && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.address}
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Customer Logo
                                        </label>
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {errors.customer_logo && (
                                            <div className="text-red-600 text-sm mt-1">
                                                {errors.customer_logo}
                                            </div>
                                        )}

                                        {preview && (
                                            <div className="mt-2">
                                                <img
                                                    src={preview}
                                                    alt={
                                                        isEdit
                                                            ? "Current logo"
                                                            : "Preview"
                                                    }
                                                    className="h-32 w-32 object-cover rounded"
                                                />
                                                {isEdit &&
                                                    customer &&
                                                    customer.customer_logo_originalname && (
                                                        <p className="text-sm text-gray-500 mt-1">
                                                            Current:{" "}
                                                            {
                                                                customer.customer_logo_originalname
                                                            }
                                                        </p>
                                                    )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end mt-6 space-x-3">
                                    <Link
                                        href={route("customers.index")}
                                        className="inline-flex items-center px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 disabled:opacity-50"
                                    >
                                        {processing
                                            ? processingText
                                            : buttonText}
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
