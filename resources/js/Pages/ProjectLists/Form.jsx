import React, { useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";

export default function Form({
    auth,
    customers,
    projectList,
    projectCount = 0,
    mode = "create",
}) {
    const isEdit = mode === "edit";

    const [projectCode, setProjectCode] = useState("");

    const { data, setData, post, put, processing, errors, reset } = useForm({
        projectcode: projectList?.projectcode || "",
        customer_code: projectList?.customer_code || "",
        descriptionwork: projectList?.descriptionwork || "",
        projectcategory: projectList?.projectcategory || "",
        pono: projectList?.pono || "",
        sino: projectList?.sino || "",
        podate: projectList?.podate || "",
        orderdatereceived: projectList?.orderdatereceived || "",
        month: projectList?.month || "",
        year: projectList?.year || "",
        deliverydateaccordingtopo: projectList?.deliverydateaccordingtopo || "",
        deliverydate: projectList?.deliverydate || "",
        remark: projectList?.remark || "",
        location: projectList?.location || "",
        lastpayment: projectList?.lastpayment || "",
        top1: projectList?.top1 || "",
        top2: projectList?.top2 || "",
        top3: projectList?.top3 || "",
        top4: projectList?.top4 || "",
        projectperformance: projectList?.projectperformance || "",
    });

    // Effect to automatically update month and year based on category and date
    useEffect(() => {
        let targetDate = null;

        if (
            data.projectcategory === "SI" ||
            data.projectcategory === "internal"
        ) {
            targetDate = data.orderdatereceived;
        } else if (data.projectcategory === "PO") {
            targetDate = data.podate;
        }

        if (!isEdit && targetDate) {
            const date = new Date(targetDate);
            if (!isNaN(date.getTime())) {
                const yearproject = date.getFullYear().toString().substr(-2);
                const monthproject = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")
                ;
                const nextProjectNo = (Number(projectCount) + 1)
                    .toString()
                    .padStart(3, "00")
                ;
                setData(
                    "projectcode",
                    `${data.customer_code} ${yearproject}${monthproject}${nextProjectNo}`
                );
            }
        }

        if (targetDate) {
            const date = new Date(targetDate);
            if (!isNaN(date.getTime())) {
                const monthName = date.toLocaleString("default", {
                    month: "long",
                });
                const yearValue = date.getFullYear().toString();

                setData("month", monthName);
                setData("year", yearValue);
            }
        }
    }, [
        data.projectcategory,
        data.orderdatereceived,
        data.podate,
        data.customer_code,
        isEdit,
        projectCount,
        setData,
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route("projectlists.update", projectList.projectcode), {
                onSuccess: () => {
                    // Success handled by controller redirect
                },
            });
        } else {
            post(route("projectlists.store"), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const projectCategories = [
        { value: "SI", label: "SI (Sales Invoice)" },
        { value: "internal", label: "Internal Project" },
        { value: "PO", label: "Purchase Order" },
    ];

    const months = [
        { value: "January", label: "January" },
        { value: "February", label: "February" },
        { value: "March", label: "March" },
        { value: "April", label: "April" },
        { value: "May", label: "May" },
        { value: "June", label: "June" },
        { value: "July", label: "July" },
        { value: "August", label: "August" },
        { value: "September", label: "September" },
        { value: "October", label: "October" },
        { value: "November", label: "November" },
        { value: "December", label: "December" },
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => ({
        value: (currentYear - 5 + i).toString(),
        label: (currentYear - 5 + i).toString(),
    }));

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={isEdit ? "Edit Project" : "Create Project"} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold">
                                    {isEdit
                                        ? "Edit Project"
                                        : "Create New Project"}
                                </h2>
                                <Link href={route("projectlists.index")}>
                                    <SecondaryButton>
                                        Back to List
                                    </SecondaryButton>
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Project Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="projectcode"
                                            value="Project Code"
                                        />
                                        <TextInput
                                            id="projectcode"
                                            type="text"
                                            value={data.projectcode}
                                            onChange={(e) =>
                                                setData(
                                                    "projectcode",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                            disabled
                                        />
                                        <InputError
                                            message={errors.projectcode}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="customer_code"
                                            value="Customer"
                                        />
                                        <SelectInput
                                            id="customer_code"
                                            value={data.customer_code}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_code",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        >
                                            <option value="">
                                                Select Customer
                                            </option>
                                            {customers.map((customer) => (
                                                <option
                                                    key={customer.code}
                                                    value={customer.code}
                                                >
                                                    {customer.name}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.customer_code}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="projectcategory"
                                            value="Project Category"
                                        />
                                        <SelectInput
                                            id="projectcategory"
                                            value={data.projectcategory}
                                            onChange={(e) =>
                                                setData(
                                                    "projectcategory",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        >
                                            <option value="">
                                                Select Category
                                            </option>
                                            {projectCategories.map(
                                                (category) => (
                                                    <option
                                                        key={category.value}
                                                        value={category.value}
                                                    >
                                                        {category.label}
                                                    </option>
                                                )
                                            )}
                                        </SelectInput>
                                        <InputError
                                            message={errors.projectcategory}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="pono"
                                            value="PO Number"
                                        />
                                        <TextInput
                                            id="pono"
                                            type="text"
                                            value={data.pono}
                                            onChange={(e) =>
                                                setData("pono", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.pono}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="sino"
                                            value="SI Number"
                                        />
                                        <TextInput
                                            id="sino"
                                            type="text"
                                            value={data.sino}
                                            onChange={(e) =>
                                                setData("sino", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.sino}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="podate"
                                            value="PO Date"
                                        />
                                        <TextInput
                                            id="podate"
                                            type="date"
                                            value={data.podate}
                                            onChange={(e) =>
                                                setData(
                                                    "podate",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.podate}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="orderdatereceived"
                                            value="Order Date Received"
                                        />
                                        <TextInput
                                            id="orderdatereceived"
                                            type="date"
                                            value={data.orderdatereceived}
                                            onChange={(e) =>
                                                setData(
                                                    "orderdatereceived",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                            required
                                        />
                                        <InputError
                                            message={errors.orderdatereceived}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="descriptionwork"
                                            value="Description of Work"
                                        />
                                        <textarea
                                            id="descriptionwork"
                                            value={data.descriptionwork}
                                            onChange={(e) =>
                                                setData(
                                                    "descriptionwork",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows={4}
                                            required
                                        />
                                        <InputError
                                            message={errors.descriptionwork}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="deliverydateaccordingtopo"
                                            value="Delivery Date (PO)"
                                        />
                                        <TextInput
                                            id="deliverydateaccordingtopo"
                                            type="date"
                                            value={
                                                data.deliverydateaccordingtopo
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "deliverydateaccordingtopo",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={
                                                errors.deliverydateaccordingtopo
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="deliverydate"
                                            value="Delivery Date"
                                        />
                                        <TextInput
                                            id="deliverydate"
                                            type="date"
                                            value={data.deliverydate}
                                            onChange={(e) =>
                                                setData(
                                                    "deliverydate",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.deliverydate}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="location"
                                            value="Location"
                                        />
                                        <TextInput
                                            id="location"
                                            type="text"
                                            value={data.location}
                                            onChange={(e) =>
                                                setData(
                                                    "location",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.location}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="month"
                                            value="Month"
                                        />
                                        <SelectInput
                                            id="month"
                                            value={data.month}
                                            onChange={(e) =>
                                                setData("month", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            required
                                            disabled
                                        >
                                            <option value="">
                                                Select Month
                                            </option>
                                            {months.map((month) => (
                                                <option
                                                    key={month.value}
                                                    value={month.value}
                                                >
                                                    {month.label}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.month}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="year"
                                            value="Year"
                                        />
                                        <SelectInput
                                            id="year"
                                            value={data.year}
                                            onChange={(e) =>
                                                setData("year", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            required
                                            disabled
                                        >
                                            <option value="">
                                                Select Year
                                            </option>
                                            {years.map((year) => (
                                                <option
                                                    key={year.value}
                                                    value={year.value}
                                                >
                                                    {year.label}
                                                </option>
                                            ))}
                                        </SelectInput>
                                        <InputError
                                            message={errors.year}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="remark"
                                            value="Remarks"
                                        />
                                        <textarea
                                            id="remark"
                                            value={data.remark}
                                            onChange={(e) =>
                                                setData("remark", e.target.value)
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            rows={3}
                                        />
                                        <InputError
                                            message={errors.remark}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="projectperformance"
                                            value="Project Performance"
                                        />
                                        <TextInput
                                            id="projectperformance"
                                            type="text"
                                            value={data.projectperformance}
                                            onChange={(e) =>
                                                setData(
                                                    "projectperformance",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.projectperformance}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="lastpayment"
                                            value="Last Payment"
                                        />
                                        <TextInput
                                            id="lastpayment"
                                            type="text"
                                            value={data.lastpayment}
                                            onChange={(e) =>
                                                setData(
                                                    "lastpayment",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.lastpayment}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <InputLabel
                                            htmlFor="top1"
                                            value="TOP 1"
                                        />
                                        <TextInput
                                            id="top1"
                                            type="text"
                                            value={data.top1}
                                            onChange={(e) =>
                                                setData("top1", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.top1}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="top2"
                                            value="TOP 2"
                                        />
                                        <TextInput
                                            id="top2"
                                            type="text"
                                            value={data.top2}
                                            onChange={(e) =>
                                                setData("top2", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.top2}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="top3"
                                            value="TOP 3"
                                        />
                                        <TextInput
                                            id="top3"
                                            type="text"
                                            value={data.top3}
                                            onChange={(e) =>
                                                setData("top3", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.top3}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="top4"
                                            value="TOP 4"
                                        />
                                        <TextInput
                                            id="top4"
                                            type="text"
                                            value={data.top4}
                                            onChange={(e) =>
                                                setData("top4", e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                        />
                                        <InputError
                                            message={errors.top4}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex items-center justify-end space-x-3 pt-6">
                                    <Link href={route("projectlists.index")}>
                                        <SecondaryButton>
                                            Cancel
                                        </SecondaryButton>
                                    </Link>
                                    <PrimaryButton disabled={processing}>
                                        {processing
                                            ? "Saving..."
                                            : isEdit
                                            ? "Update Project"
                                            : "Create Project"}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
