import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="PT. Sabatani Global Solusindo - Engineering, Procurement & Construction" />
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
                {/* Navigation */}
                <nav className="fixed top-0 w-full bg-blue-900/90 backdrop-blur-sm z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <img
                                    src="/src/mainpage/logo.png"
                                    alt="PT. Sabatani Global Solusindo Logo"
                                    className="h-10 w-auto"
                                />
                                <span className="text-xl font-bold">PT. SGS</span>
                            </div>
                            <div className="hidden md:flex space-x-8">
                                <a href="#services" className="hover:text-blue-300 transition-colors">Services</a>
                                <a href="#projects" className="hover:text-blue-300 transition-colors">Projects</a>
                                <a href="#about" className="hover:text-blue-300 transition-colors">About</a>
                                <a href="#contact" className="hover:text-blue-300 transition-colors">Contact</a>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-6 py-2 rounded-lg border border-white hover:bg-white hover:text-blue-700 transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-white text-blue-700 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Engineering Excellence
                            <br />
                            <span className="text-blue-300">Built to Last</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-3xl mx-auto leading-relaxed">
                            PT. Sabatani Global Solusindo delivers comprehensive Engineering, Procurement, and Construction solutions
                            with precision, quality materials, competitive pricing, and unwavering commitment to client success.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#contact" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
                                Start Your Project
                            </a>
                            <a href="#services" className="border-2 border-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-700 transition-colors">
                                Our Services
                            </a>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-20 bg-white text-gray-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Our Core Services</h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Comprehensive solutions from concept to completion
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-blue-50 p-8 rounded-2xl text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Engineering</h3>
                                <p className="text-gray-600">
                                    Innovative design solutions with cutting-edge technology and meticulous attention to detail.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-8 rounded-2xl text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Procurement</h3>
                                <p className="text-gray-600">
                                    Strategic sourcing and supply chain management ensuring quality materials and timely delivery.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-8 rounded-2xl text-center">
                                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">Construction</h3>
                                <p className="text-gray-600">
                                    Expert project execution with safety-first approach and commitment to excellence.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Showcase */}
                <section id="projects" className="py-20 bg-gray-100 text-gray-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
                            <p className="text-xl text-gray-600">
                                Delivering excellence across diverse industries
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                                    <span className="text-white text-xl font-semibold">Industrial Plant</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Chemical Processing Facility</h3>
                                    <p className="text-gray-600">Complete EPC solution for state-of-the-art chemical plant</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="h-48 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                                    <span className="text-white text-xl font-semibold">Energy</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Renewable Energy Park</h3>
                                    <p className="text-gray-600">Sustainable energy infrastructure development</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                                <div className="h-48 bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center">
                                    <span className="text-white text-xl font-semibold">Infrastructure</span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">Commercial Complex</h3>
                                    <p className="text-gray-600">Modern commercial infrastructure development</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-20 bg-white text-gray-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl font-bold mb-6">Why Choose PT. Sabatani Global Solusindo?</h2>
                                <p className="text-lg text-gray-600 mb-6">
                                    With extensive experience in the EPC industry, PT. Sabatani Global Solusindo stands as a trusted partner
                                    for complex engineering projects. Our commitment to professionalism, quality, safety,
                                    reliability, and customer satisfaction sets us apart.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-lg">Quality Assurance & Control</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-lg">Safety-First Approach</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-lg">Timely Project Delivery</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-lg">Cost-Effective Solutions</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-8 rounded-2xl">
                                <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                                <p className="text-gray-600 mb-6">
                                    Providing effective equipment solutions with quality materials and competitive pricing,
                                    driven by a professional, skilled team committed to excellence and customer satisfaction.
                                </p>
                                <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                                <p className="text-gray-600">
                                    To be a leading provider of reliable, efficient plant equipment that enhances
                                    client productivity and drives industrial progress.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
                        <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
                            Contact us today to discuss how PT. Sabatani Global Solusindo can bring your vision to life with our
                            comprehensive EPC solutions and professional expertise.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                <svg className="w-12 h-12 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                                <p className="text-blue-200">+62 (21) 1234-5678</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                <svg className="w-12 h-12 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <h3 className="text-xl font-semibold mb-2">Email</h3>
                                <p className="text-blue-200">info@sabatani-global.com</p>
                            </div>
                            <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                                <svg className="w-12 h-12 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold mb-2">Location</h3>
                                <p className="text-blue-200">Jl. Industri Raya No. 123, Jakarta 12560, Indonesia</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-blue-900 py-12 text-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <img
                                        src="/src/mainpage/logo.png"
                                        alt="PT. Sabatani Global Solusindo Logo"
                                        className="h-8 w-auto"
                                    />
                                    <span className="text-xl font-bold">PT. SGS</span>
                                </div>
                                <p className="text-blue-200">
                                    Providing effective equipment solutions with quality materials and competitive pricing,
                                    driven by a professional, skilled team.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Services</h3>
                                <ul className="space-y-2 text-blue-200">
                                    <li>Engineering Design</li>
                                    <li>Procurement Management</li>
                                    <li>Construction Services</li>
                                    <li>Project Management</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                                <ul className="space-y-2 text-blue-200">
                                    <li><a href="#services" className="hover:text-white">Services</a></li>
                                    <li><a href="#projects" className="hover:text-white">Projects</a></li>
                                    <li><a href="#about" className="hover:text-white">About</a></li>
                                    <li><a href="#contact" className="hover:text-white">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                                <div className="flex space-x-4">
                                    <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
                            <p>&copy; 2024 PT. Sabatani Global Solusindo. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
