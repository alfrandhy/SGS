import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MenuComponent from '@/Pages/Menu/Menu';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function ERP({ auth, children, currentRoute }) {
    // Galaxy menu items data
    const galaxyMenuItems = [
        {
            id: 1,
            name: 'User Management',
            description: 'Manage users and permissions',
            icon: '/src/mainpage/logo.png',
            url: '/users',
            color: 'from-blue-500 to-purple-600',
            position: { top: '20%', left: '50%' }
        },
        {
            id: 2,
            name: 'Project Management',
            description: 'Track and manage projects',
            icon: '/src/mainpage/logo.png',
            url: '/projects',
            color: 'from-green-500 to-teal-600',
            position: { top: '35%', left: '25%' }
        },
        {
            id: 3,
            name: 'BOQ Management',
            description: 'Bill of Quantities',
            icon: '/src/mainpage/logo.png',
            url: '/boqs',
            color: 'from-orange-500 to-red-600',
            position: { top: '35%', left: '75%' }
        },
        {
            id: 4,
            name: 'Inventory',
            description: 'Manage stock and supplies',
            icon: '/src/mainpage/logo.png',
            url: '/inventory',
            color: 'from-pink-500 to-rose-600',
            position: { top: '60%', left: '20%' }
        },
        {
            id: 5,
            name: 'Reports',
            description: 'Generate and view reports',
            icon: '/src/mainpage/logo.png',
            url: '/reports',
            color: 'from-indigo-500 to-blue-600',
            position: { top: '60%', left: '80%' }
        },
        {
            id: 6,
            name: 'Settings',
            description: 'System configuration',
            icon: '/src/mainpage/logo.png',
            url: '/settings',
            color: 'from-gray-500 to-gray-700',
            position: { top: '75%', left: '50%' }
        }
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">ERP</h2>}
        >
            <Head title="ERP" />

            {/* Original List View - Commented Out */}
            {/*
            <div className="py-3">
                <div className="container mx-auto mt-4">
                    <div id="menu-name" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100">
                            <img className="object-cover w-auto rounded-t-lg h-45 md:h-auto md:w-40 md:rounded-none md:rounded-s-lg" src='/src/mainpage/logo.png' alt="ERP Icon" />
                                <div className="flex flex-col justify-between p-3 leading-normal">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">User Management</h5>
                                    <p className="mb-3 text-md text-gray-700">Menu for Management </p>
                                </div>
                        </a>
                    </div>
                </div>
            </div>
            */}

            {/* Galaxy Menu Layout */}
            <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
                {/* Animated background stars */}
                <div className="absolute inset-0">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 3}s`
                            }}
                        />
                    ))}
                </div>

                {/* Central Galaxy Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin-slow opacity-80">
                        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 animate-pulse"></div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-white text-2xl font-bold">ERP</h1>
                    </div>
                </div>

                {/* Orbiting Menu Items */}
                <div className="relative w-full h-screen">
                    {galaxyMenuItems.map((item, index) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{
                                top: item.position.top,
                                left: item.position.left,
                                animation: `orbit${index + 1} 20s linear infinite`,
                                animationDelay: `${index * 3}s`
                            }}
                        >
                            {/* Orbital ring */}
                            <div className="absolute inset-0 rounded-full border border-white/20 animate-pulse"></div>

                            {/* Menu Item */}
                            <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${item.color} shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl`}>
                                <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className="absolute inset-2 rounded-full object-cover"
                                />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
                                    <div className="font-semibold">{item.name}</div>
                                    <div className="text-xs text-gray-300">{item.description}</div>
                                </div>
                                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-black/80 absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Alternative Menu View Toggle */}
                <div className="absolute bottom-8 right-8">
                    <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors">
                        Switch to List View
                    </button>
                </div>
            </div>

            {/* Original Menu Component - Commented Out */}
            {/*
            <div>
                <MenuComponent currentRoute={currentRoute} />
                {children}
            </div>
            */}

            {/* New Menu Integration */}
            <div className="hidden">
                <MenuComponent currentRoute={currentRoute} />
                {children}
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes orbit1 {
                    0% { transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(200px) rotate(-360deg); }
                }
                @keyframes orbit2 {
                    0% { transform: translate(-50%, -50%) rotate(60deg) translateX(180px) rotate(-60deg); }
                    100% { transform: translate(-50%, -50%) rotate(420deg) translateX(180px) rotate(-420deg); }
                }
                @keyframes orbit3 {
                    0% { transform: translate(-50%, -50%) rotate(120deg) translateX(220px) rotate(-120deg); }
                    100% { transform: translate(-50%, -50%) rotate(480deg) translateX(220px) rotate(-480deg); }
                }
                @keyframes orbit4 {
                    0% { transform: translate(-50%, -50%) rotate(180deg) translateX(190px) rotate(-180deg); }
                    100% { transform: translate(-50%, -50%) rotate(540deg) translateX(190px) rotate(-540deg); }
                }
                @keyframes orbit5 {
                    0% { transform: translate(-50%, -50%) rotate(240deg) translateX(210px) rotate(-240deg); }
                    100% { transform: translate(-50%, -50%) rotate(600deg) translateX(210px) rotate(-600deg); }
                }
                @keyframes orbit6 {
                    0% { transform: translate(-50%, -50%) rotate(300deg) translateX(200px) rotate(-300deg); }
                    100% { transform: translate(-50%, -50%) rotate(660deg) translateX(200px) rotate(-660deg); }
                }
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
