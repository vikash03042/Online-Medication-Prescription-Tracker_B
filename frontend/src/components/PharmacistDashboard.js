import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryService from '../services/inventory.service';

const PharmacistDashboard = () => {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        loadInventory();
    }, []);

    const loadInventory = () => {
        InventoryService.getAllDrugs().then(
            (response) => {
                setInventory(response.data);
            },
            (error) => {
                console.log("Error fetching inventory:", error);
            }
        );
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <div className="flex items-center justify-center mb-6">
                <h1 className="text-xl font-bold">Inventory</h1>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div onClick={() => navigate('/inventory')} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-green-500 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-3xl">📦</span>
                        <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded text-xs">Manage</span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Inventory Management</h3>
                    <p className="text-zinc-500 text-sm">Track stock, expiry dates, and batches</p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
                <span className="absolute left-4 top-3.5 text-zinc-500">🔍</span>
                <input className="w-full bg-zinc-900 p-3 pl-12 rounded-xl text-zinc-300" placeholder="Search for drugs" />
            </div>

            <h2 className="text-xl font-bold mb-6">Drug Inventory</h2>

            <div className="space-y-4">
                {inventory.slice(0, 5).map((item) => (
                    <div key={item.id} className="bg-zinc-900 p-4 rounded-2xl flex items-center border border-zinc-800">
                        <div className="w-16 h-16 bg-orange-200/20 rounded-xl flex items-center justify-center mr-4 text-2xl">
                            💊
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{item.name}</h3>
                            <p className="text-xs text-zinc-500">Batch: {item.batchNumber}, Exp: {item.expiryDate}, Qty: {item.quantity}</p>
                        </div>
                        {item.quantity <= (item.lowStockThreshold || 10) && <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-1 rounded">Low Stock</span>}
                    </div>
                ))}
                {inventory.length === 0 && <p className="text-zinc-500 text-center">Loading inventory...</p>}
            </div>

            {/* Floating Action Button */}
            <button onClick={() => navigate('/inventory')} className="fixed bottom-28 right-6 w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-3xl text-black shadow-xl">
                +
            </button>


            {/* Bottom Nav matches Picture 5 */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 flex justify-around py-4">
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">🏠</span><span className="text-xs">Dashboard</span></div>
                <div className="flex flex-col items-center text-white"><span className="text-xl">💊</span><span className="text-xs">Inventory</span></div>
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">📜</span><span className="text-xs">Orders</span></div>
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">👤</span><span className="text-xs">Profile</span></div>
            </div>
        </div>
    );
};

export default PharmacistDashboard;