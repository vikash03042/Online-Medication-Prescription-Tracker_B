import React from "react";

const Home = () => {
    const handleLoginClick = () => {
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Navigation Bar */}
            <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-black font-bold text-lg">💊</span>
                            </div>
                            <span className="text-sm sm:text-base md:text-lg font-bold text-white">Online Medication & Prescription Tracker</span>
                        </div>
                        <button
                            onClick={handleLoginClick}
                            className="bg-green-500 hover:bg-green-600 text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 flex-shrink-0"
                        >
                            Sign In / Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Your Health,
                                <span className="text-green-500">
                                    {" "}Our Priority
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                                Your one-stop solution for managing prescriptions, tracking medication adherence, and staying connected with healthcare providers.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleLoginClick}
                                className="bg-green-500 hover:bg-green-600 text-black px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 text-center"
                            >
                                Get Started Now
                            </button>
                            <button
                                onClick={handleLoginClick}
                                className="border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative hidden md:block">
                        <div className="absolute inset-0 bg-green-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-xl">📋</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Easy Tracking</p>
                                        <p className="text-sm text-gray-400">Manage all prescriptions</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-xl">⏰</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Smart Reminders</p>
                                        <p className="text-sm text-gray-400">Never miss a dose</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center">
                                        <span className="text-xl">🏥</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">Doctor Connect</p>
                                        <p className="text-sm text-gray-400">Stay connected with providers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-900 border-y border-gray-800 py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose MediTrack?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Built for patients, doctors, and pharmacists to streamline healthcare management
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 rounded-lg bg-gray-800 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">👤</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">For Patients</h3>
                            <p className="text-gray-400">
                                Track your medications, set reminders, and maintain better health outcomes with an intuitive interface.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 rounded-lg bg-gray-800 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">⚕️</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">For Doctors</h3>
                            <p className="text-gray-400">
                                Issue prescriptions digitally and monitor patient adherence in real-time for better care.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 rounded-lg bg-gray-800 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-14 h-14 bg-green-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-2xl">💊</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">For Pharmacists</h3>
                            <p className="text-gray-400">
                                Manage inventory, fulfill prescriptions efficiently, and optimize stock management.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Benefits That Matter
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Improved Medication Adherence</h4>
                                    <p className="text-gray-400">Smart reminders help you never miss a dose</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Better Health Outcomes</h4>
                                    <p className="text-gray-400">Track your health metrics and progress</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Seamless Doctor Connection</h4>
                                    <p className="text-gray-400">Stay in touch with your healthcare providers</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-black font-bold">✓</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Secure & Private</h4>
                                    <p className="text-gray-400">Your health data is protected and encrypted</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-500/10 rounded-3xl blur-3xl"></div>
                        <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-6 text-center">
                                    <p className="text-3xl font-bold text-green-500 mb-2">10k+</p>
                                    <p className="text-gray-400 text-sm">Active Users</p>
                                </div>
                                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-6 text-center">
                                    <p className="text-3xl font-bold text-green-500 mb-2">98%</p>
                                    <p className="text-gray-400 text-sm">Satisfaction</p>
                                </div>
                                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-6 text-center">
                                    <p className="text-3xl font-bold text-green-500 mb-2">24/7</p>
                                    <p className="text-gray-400 text-sm">Support</p>
                                </div>
                                <div className="bg-gray-800 border border-green-500/30 rounded-lg p-6 text-center">
                                    <p className="text-3xl font-bold text-green-500 mb-2">100%</p>
                                    <p className="text-gray-400 text-sm">Secure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="bg-gray-900 border-2 border-green-500 rounded-3xl p-8 md:p-16 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Transform Your Healthcare Experience?
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of users managing their health better. Sign up today and take control of your medications.
                    </p>
                    <button
                        onClick={handleLoginClick}
                        className="bg-green-500 hover:bg-green-600 text-black px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
                    >
                        Create Your Account Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                    <span className="text-black font-bold">💊</span>
                                </div>
                                <span className="text-white font-bold text-lg">MediTrack</span>
                            </div>
                            <p className="text-sm text-gray-500">Healthcare management made simple.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="hover:text-green-500 transition">Features</a></li>
                                <li><a href="/" className="hover:text-green-500 transition">Pricing</a></li>
                                <li><a href="/" className="hover:text-green-500 transition">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="hover:text-green-500 transition">About</a></li>
                                <li><a href="/" className="hover:text-green-500 transition">Blog</a></li>
                                <li><a href="/" className="hover:text-green-500 transition">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="/" className="hover:text-green-500 transition">Privacy</a></li>
                                <li><a href="/" className="hover:text-green-500 transition">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>&copy; 2024 Online Medication & Prescription Tracker
                            . All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;