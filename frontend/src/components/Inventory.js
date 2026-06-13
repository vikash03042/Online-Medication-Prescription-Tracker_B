import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InventoryService from '../services/inventory.service';

const Inventory = () => {
    const navigate = useNavigate();
    const [drugs, setDrugs] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);

    // Form state
    const [newDrug, setNewDrug] = useState({ name: '', batchNumber: '', expiryDate: '', quantity: '', price: '' });

    useEffect(() => {
        loadDrugs();
    }, []);

    const loadDrugs = () => {
        InventoryService.getAllDrugs().then(
            (response) => setDrugs(response.data),
            (error) => console.log(error)
        );
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim()) {
            InventoryService.searchDrugs(query).then(
                (response) => setDrugs(response.data),
                (error) => console.log(error)
            );
        } else {
            loadDrugs();
        }
    };

    const handleAddDrug = (e) => {
        e.preventDefault();
        InventoryService.addDrug(newDrug).then(() => {
            setShowAddModal(false);
            setNewDrug({ name: '', batchNumber: '', expiryDate: '', quantity: '', price: '' });
            loadDrugs();
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Delete this drug?")) {
            InventoryService.deleteDrug(id).then(() => loadDrugs());
        }
    };

    // Mock External API fetch
    const fetchDrugDetails = (drugName) => {
        alert(`Fetching external details for ${drugName}...\n\n(Simulated OpenFDA Response)\nActive Ingredient: ${drugName}\nUsage: Pain relief/Fever reducer\nWarnings: Do not exceed recommended dose.`);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-2xl mr-4">←</button>
                <h1 className="text-xl font-bold">Inventory</h1>
            </div>

            {/* Search Bar matching image */}
            <div className="relative mb-8">
                <span className="absolute left-4 top-3.5 text-zinc-500">🔍</span>
                <input
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-green-500"
                    placeholder="Search for drugs"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <h2 className="text-lg font-bold mb-4">Drug Inventory</h2>

            {/* Inventory List */}
            <div className="space-y-4">
                {drugs.map((drug) => (
                    <div key={drug.id} className="bg-[#E6CAA4] p-4 rounded-xl flex items-center shadow-lg text-black relative">
                        {/* Mock Image Placeholder from design */}
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
                            <span className="text-2xl">💊</span>
                        </div>

                        <div className="flex-1">
                            <h3 className="font-bold text-lg">{drug.name}</h3>
                            <p className="text-xs text-gray-800">Batch: {drug.batchNumber}, Exp: {drug.expiryDate}</p>
                            <p className="text-xs text-gray-800 font-semibold">Qty: {drug.quantity}</p>
                            {drug.quantity <= 10 && <span className="text-xs text-red-600 font-bold animate-pulse">LOW STOCK ALERT</span>}
                        </div>

                        <div className="flex flex-col gap-2">
                            <button onClick={() => fetchDrugDetails(drug.name)} className="text-xs bg-black/10 px-2 py-1 rounded">Details</button>
                            <button onClick={() => handleDelete(drug.id)} className="text-xs text-red-600 font-bold">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Add Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 text-3xl font-light text-black"
            >
                +
            </button>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md border border-zinc-800">
                        <h2 className="text-xl font-bold mb-4">Add New Drug</h2>
                        <form onSubmit={handleAddDrug} className="space-y-3">
                            <input required className="w-full p-3 bg-black border border-zinc-700 rounded-lg" placeholder="Name" value={newDrug.name} onChange={e => setNewDrug({ ...newDrug, name: e.target.value })} />
                            <input required className="w-full p-3 bg-black border border-zinc-700 rounded-lg" placeholder="Batch Number" value={newDrug.batchNumber} onChange={e => setNewDrug({ ...newDrug, batchNumber: e.target.value })} />
                            <input required type="date" className="w-full p-3 bg-black border border-zinc-700 rounded-lg text-white" value={newDrug.expiryDate} onChange={e => setNewDrug({ ...newDrug, expiryDate: e.target.value })} />
                            <input required type="number" className="w-full p-3 bg-black border border-zinc-700 rounded-lg" placeholder="Quantity" value={newDrug.quantity} onChange={e => setNewDrug({ ...newDrug, quantity: e.target.value })} />
                            <input required type="number" className="w-full p-3 bg-black border border-zinc-700 rounded-lg" placeholder="Price" value={newDrug.price} onChange={e => setNewDrug({ ...newDrug, price: e.target.value })} />

                            <div className="flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-zinc-400">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-green-500 text-black rounded-lg font-bold">Add Drug</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
