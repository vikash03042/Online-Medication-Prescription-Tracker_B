import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminService from "../services/admin.service";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState([
        { title: "Total Patients", count: 0, icon: "👥", change: "0%" },
        { title: "Active Doctors", count: 0, icon: "🩺", change: "0%" },
        { title: "Pharmacists", count: 0, icon: "💊", change: "0%" },
        { title: "Total Prescriptions", count: 0, icon: "📝", change: "0%" },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AdminService.getAdminStats().then(
            (response) => {
                const data = response.data;
                setStats([
                    { title: "Total Patients", count: data.totalPatients, icon: "👥", change: data.patientChange },
                    { title: "Active Doctors", count: data.totalDoctors, icon: "🩺", change: data.doctorChange },
                    { title: "Pharmacists", count: data.totalPharmacists, icon: "💊", change: data.pharmacistChange },
                    { title: "Total Prescriptions", count: data.totalPrescriptions, icon: "📝", change: data.prescriptionChange },
                ]);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching admin stats:", error);
                setLoading(false);
            }
        );
    }, []);

    const recentActivity = [
        { user: "System", action: "Data synced with database", time: "Just now" }
    ];

    if (loading) {
        return <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">Loading platform metrics...</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                    <button onClick={() => navigate(-1)} className="text-2xl mr-4 text-green-500 hover:text-green-400">←</button>
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500 text-xl">
                    🛡️
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 hover:border-green-500/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-2xl">{stat.icon}</span>
                            <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">{stat.change}</span>
                        </div>
                        <h3 className="text-zinc-400 text-xs font-medium uppercase tracking-wider">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white mt-1">{stat.count}</p>
                    </div>
                ))}
            </div>

            {/* Management Sections */}
            <h2 className="text-xl font-bold mb-4 text-white">Platform Management</h2>
            <div className="space-y-4 mb-8">
                <button className="w-full bg-zinc-900 p-4 rounded-xl flex items-center justify-between border border-zinc-800 group hover:border-green-500 transition-all">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 text-xl group-hover:scale-110 transition-transform">
                            👥
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-white">User Management</h3>
                            <p className="text-xs text-zinc-500">Manage doctors, patients & staff</p>
                        </div>
                    </div>
                    <span className="text-zinc-500 group-hover:text-green-500">→</span>
                </button>

                <button className="w-full bg-zinc-900 p-4 rounded-xl flex items-center justify-between border border-zinc-800 group hover:border-green-500 transition-all">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 text-xl group-hover:scale-110 transition-transform">
                            ⚙️
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-white">System Settings</h3>
                            <p className="text-xs text-zinc-500">Configure platform parameters</p>
                        </div>
                    </div>
                    <span className="text-zinc-500 group-hover:text-green-500">→</span>
                </button>
            </div>

            {/* Recent Activity */}
            <h2 className="text-xl font-bold mb-4 text-white">Platform Summary</h2>
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
                {recentActivity.map((activity, idx) => (
                    <div key={idx} className={`p-4 flex items-center justify-between ${idx !== recentActivity.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                        <div>
                            <p className="font-bold text-sm text-white">{activity.user}</p>
                            <p className="text-xs text-zinc-400">{activity.action}</p>
                        </div>
                        <span className="text-xs text-zinc-500">{activity.time}</span>
                    </div>
                ))}
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 flex justify-around py-4 z-50">
                <div className="flex flex-col items-center text-green-500"><span className="text-xl">📊</span><span className="text-xs">Overview</span></div>
                <div className="flex flex-col items-center text-zinc-500 hover:text-green-500 transition-colors"><span className="text-xl">👥</span><span className="text-xs">Users</span></div>
                <div className="flex flex-col items-center text-zinc-500 hover:text-green-500 transition-colors"><span className="text-xl">🛡️</span><span className="text-xs">Security</span></div>
                <div className="flex flex-col items-center text-zinc-500 hover:text-green-500 transition-colors"><span className="text-xl">👤</span><span className="text-xs">Profile</span></div>
            </div>
        </div>
    );
};

export default AdminDashboard;
