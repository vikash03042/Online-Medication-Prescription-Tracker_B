import React, { useState, useEffect } from "react";
import PrescriptionService from "../services/prescription.service";

const PatientDashboard = () => {
    const [activePrescriptions, setActivePrescriptions] = useState([]);
    const [pastPrescriptions, setPastPrescriptions] = useState([]);

    useEffect(() => {
        PrescriptionService.getPatientPrescriptions().then(
            (response) => {
                const allPrescriptions = response.data;
                setActivePrescriptions(allPrescriptions.filter(p => p.status === 'ACTIVE'));
                setPastPrescriptions(allPrescriptions.filter(p => p.status !== 'ACTIVE'));
            },
            (error) => {
                console.log("Error fetching prescriptions:", error);
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-3">
                        <button className="text-green-500 hover:text-green-400 text-2xl transition-colors">
                            ←
                        </button>
                        <h1 className="text-2xl md:text-3xl font-bold text-white">Prescriptions</h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Active Prescriptions Section */}
                <section className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Active Prescriptions
                    </h2>
                    <div className="space-y-4">
                        {activePrescriptions.map((prescription) => (
                            <div
                                key={prescription.id}
                                className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex items-start space-x-4 hover:border-green-500 transition-colors"
                            >
                                <div className="w-12 h-12 bg-green-500/20 border border-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl">💊</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg md:text-xl font-bold text-white">
                                        {prescription.medicationName}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base">
                                        {prescription.dosage} - {prescription.duration}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {prescription.instructions}
                                    </p>
                                </div>
                                {prescription.pdfFileName && (
                                    <a
                                        href={`http://localhost:8080/api/prescriptions/${prescription.id}/download`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-500 hover:text-green-400 transition-colors flex-shrink-0 text-sm md:text-base font-semibold"
                                    >
                                        View PDF
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Past Prescriptions Section */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                        Past Prescriptions
                    </h2>
                    <div className="space-y-4">
                        {pastPrescriptions.map((prescription) => (
                            <div
                                key={prescription.id}
                                className="bg-gray-900 border border-gray-800 rounded-lg p-6 flex items-start space-x-4 hover:border-green-500 transition-colors opacity-75"
                            >
                                <div className="w-12 h-12 bg-green-500/20 border border-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xl">💊</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg md:text-xl font-bold text-white">
                                        {prescription.type}
                                    </h3>
                                    <p className="text-gray-400 text-sm md:text-base">
                                        {prescription.name}
                                    </p>
                                </div>
                                <button className="text-green-500 hover:text-green-400 transition-colors flex-shrink-0 text-sm md:text-base font-semibold">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-4 gap-4 py-4">
                        <button
                            className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-green-500 transition-colors bg-transparent border-0"
                        >
                            <span className="text-2xl">🏠</span>
                            <span className="text-xs md:text-sm font-semibold">Dashboard</span>
                        </button>
                        <a
                            href="/patient-dashboard" // Assuming this links to itself/refresh or main view
                            className="flex flex-col items-center justify-center space-y-1 text-green-500"
                        >
                            <span className="text-2xl">📋</span>
                            <span className="text-xs md:text-sm font-semibold">Prescriptions</span>
                        </a>
                        <a
                            href="/medication-tracker"
                            className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-green-500 transition-colors"
                        >
                            <span className="text-2xl">🔔</span>
                            <span className="text-xs md:text-sm font-semibold">Reminders</span>
                        </a>
                        <a
                            href="/analytics"
                            className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-green-500 transition-colors"
                        >
                            <span className="text-2xl">📊</span>
                            <span className="text-xs md:text-sm font-semibold">Analytics</span>
                        </a>
                    </div>
                    {/* Profile link extracted if needed or kept as is if valid href exists, but user error showed empty href on line 112/119. 
                       Line 112 matches the first anchor (Home). Line 119 matches 'Prescriptions' if array index... wait.
                       The error log said line 112 and 119.
                       Original file has 'Home' at 112 (href="#") and 'Prescriptions' at 120 (href="#").
                       I will fix both to be valid or buttons. 
                    */}
                </div>
            </nav>

            {/* Bottom padding for fixed nav */}
            <div className="h-24"></div>
        </div>
    );
};

export default PatientDashboard;