import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function InputUserForm({className = '' }) {
    const storeUser = (e) => {
        e.preventDefault(); // Implement the logic to store a new user
        // console.log('Storing user:', data);
        try {
            post(route('users.store'), {
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                },
            });
        } catch (error) {
            console.log('Error storing user:', error);
            // Optionally handle error state here
        }
    };

    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        password: '@Sabatani123',
        
    });

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">User New Form</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create a new user by filling out the form below.
                </p>
            </header>

            <form className="mt-6 space-y-6" onSubmit={storeUser}>
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
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        className="mt-1 block w-full"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        disabled={true}
                        autoComplete="new-password"
                    />

                    <InputError className="mt-2" message={errors.password} />
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
