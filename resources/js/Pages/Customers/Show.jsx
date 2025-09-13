import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Breadcrumb from "@/Components/Breadcrumb";

export default function Show({ auth, customer }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Customer Details
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
                                    { label: customer.name },
                                ]}
                            />
                        </div>
                    </div>
                </div>
            }
        >
            <Head title="Customer Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">
                                    Customer Information
                                </h3>
                                <div className="space-x-3">
                                    <Link
                                        href={route(
                                            "customers.edit",
                                            customer.code
                                        )}
                                        className="inline-flex items-center px-4 py-2 bg-yellow-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-yellow-700 focus:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={route("customers.index")}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Back to List
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">
                                        Basic Information
                                    </h4>
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">
                                                Customer Code:
                                            </span>
                                            <p className="text-lg text-gray-900">
                                                {customer.code}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">
                                                Customer Name:
                                            </span>
                                            <p className="text-lg text-gray-900">
                                                {customer.name}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">
                                                Phone Number:
                                            </span>
                                            <p className="text-lg text-gray-900">
                                                {customer.telp || "-"}
                                            </p>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-gray-500">
                                                Address:
                                            </span>
                                            <p className="text-lg text-gray-900">
                                                {customer.address || "-"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-md font-semibold text-gray-700 mb-2">
                                        Logo
                                    </h4>
                                    {customer.customer_logo ? (
                                        <div>
                                            <img
                                                src={`/storage/${customer.customer_logo}`}
                                                alt={customer.name}
                                                className="h-48 w-48 object-cover rounded-lg border"
                                            />
                                            <p className="text-sm text-gray-500 mt-2">
                                                Original filename:{" "}
                                                {customer.customer_logo_originalname ||
                                                    "N/A"}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="h-48 w-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                            <span className="text-gray-500">
                                                No Logo
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-md font-semibold text-gray-700 mb-2">
                                    System Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-500">
                                            Created:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {new Date(
                                                customer.created_at
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-500">
                                            Last Updated:
                                        </span>
                                        <span className="ml-2 text-gray-900">
                                            {new Date(
                                                customer.updated_at
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
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
