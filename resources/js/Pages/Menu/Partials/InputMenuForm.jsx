import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import ImageInput2 from '@/Components/ImageInput2';
import ShowImageFile from '@/Components/ShowImageFile';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function InputMenuForm({ className = '' }) {
    const [previewUrl, setPreviewUrl] = useState(null); // State for image preview
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: '',
        description: '',
        slug: '',
        icon: '',
        url: '',
        is_active: true,
        created_by: usePage().props.auth.user.id,
        updated_by: usePage().props.auth.user.id,
    });

    const handleImageChange = (file, previewUrl) => {
        setData('icon', file); // Set the file in the form data
        setPreviewUrl(previewUrl); // Set the preview URL for the image
    };

    const storeMenu = (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            post(route('menu.store'), {
                data: {
                    name: data.name,
                    description: data.description,
                    slug: data.slug,
                    icon: data.icon,
                    url: data.url,
                    is_active: data.is_active,
                    created_by: data.created_by,
                    updated_by: data.updated_by,
                },
                onSuccess: () => {
                    reset();
                    setPreviewUrl(null); // Reset preview URL on success
                },
            });
        } catch (error) {
            console.log('Error storing menu:', error);
            // Optionally handle error state here
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">User  New Form</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Create a new menu by filling out the form below.
                </p>
            </header>

            <form className="mt-6 space-y-6" onSubmit={storeMenu}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="description" value="Description" />
                    <TextInput
                        id="description"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        required
                        autoComplete="description"
                    />
                    <InputError className="mt-2" message={errors.description} />
                </div>

                <div>
                    <InputLabel htmlFor="icon" value="Icon" />
                    <ImageInput2 
                        id="icon"
                        type="file"
                        className="mt-1 block w-full"
                        onFileSelect={handleImageChange} // Use the new prop
                        required
                        autoComplete="icon"
                    />
                    {previewUrl && (
                        <ShowImageFile 
                            id="icon-preview"
                            className="mt-2"
                            src={previewUrl}
                            alt="ERP Icon"
                        />
                    )}
                    <InputError className="mt-2" message={errors.icon} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
