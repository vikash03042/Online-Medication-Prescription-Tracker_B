import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MedicationService from '../services/medication.service';

const MedicationTracker = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [dosage, setDosage] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [timeOfDay, setTimeOfDay] = useState("09:00");
    const [notificationType, setNotificationType] = useState("PUSH");
    const [medications, setMedications] = useState([]);
    const [adherence, setAdherence] = useState(100);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        MedicationService.getPatientMedications().then(
            (response) => setMedications(response.data),
            (error) => console.log(error)
        );
        MedicationService.getAdherence().then(
            (response) => setAdherence(response.data),
            (error) => console.log(error)
        );
    };

    const handleSave = (e) => {
        e.preventDefault();
        setMessage("");
        MedicationService.addMedication(name, dosage, frequency, timeOfDay + ":00", notificationType).then(
            () => {
                setMessage("Medication saved successfully!");
                loadData();
                setName("");
                setDosage("");
            },
            (error) => {
                setMessage("Error saving medication.");
            }
        );
    };

    const handleLogDose = (medicationId, status) => {
        MedicationService.logDose(medicationId, status).then(() => {
            loadData(); // Refresh adherence
        });
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* Header */}
            <div className="flex items-center mb-6">
                <button onClick={() => navigate(-1)} className="text-2xl mr-4">←</button>
                <h1 className="text-xl font-bold">Medication Tracker</h1>
            </div>

            <h2 className="text-2xl font-bold mb-6">Add Medication</h2>

            <form onSubmit={handleSave} className="space-y-4 mb-10">
                <input required className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" placeholder="Medication Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input required className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" placeholder="Dosage (e.g., 200mg)" value={dosage} onChange={(e) => setDosage(e.target.value)} />

                <div className="relative">
                    <select className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white appearance-none" value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                        <option value="DAILY">Daily</option>
                        <option value="ALTERNATE_DAYS">Alternate Days</option>
                        <option value="CUSTOM">Custom</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none">⌄</div>
                </div>

                <div className="relative">
                    <input type="time" className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} />
                </div>

                <div className="relative">
                    <select className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white appearance-none" value={notificationType} onChange={(e) => setNotificationType(e.target.value)}>
                        <option value="PUSH">Push Notification</option>
                        <option value="EMAIL">Email</option>
                    </select>
                    <div className="absolute right-4 top-4 pointer-events-none">⌄</div>
                </div>

                <button type="submit" className="w-full bg-green-500 text-black font-bold py-4 rounded-xl shadow-lg shadow-green-500/20">
                    Save Medication
                </button>

                {message && <p className="text-green-500 text-center">{message}</p>}
            </form>

            {/* Reminders Section */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-zinc-400">Today's Reminders</h3>
                <span className="text-green-500 text-xs bg-green-900/30 px-2 py-1 rounded">Adherence: {adherence.toFixed(0)}%</span>
            </div>

            <div className="space-y-3">
                {medications.map((med) => (
                    <div key={med.id} className="bg-zinc-900 p-4 rounded-xl flex justify-between items-center border border-zinc-800">
                        <div>
                            <p className="font-bold">{med.name}</p>
                            <p className="text-xs text-zinc-500">{med.dosage} • {med.timeOfDay}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleLogDose(med.id, "TAKEN")} className="bg-green-600 text-white text-xs px-3 py-2 rounded-lg">Taken</button>
                            <button onClick={() => handleLogDose(med.id, "MISSED")} className="bg-red-900/50 text-red-500 text-xs px-3 py-2 rounded-lg">Missed</button>
                        </div>
                    </div>
                ))}
                {medications.length === 0 && <p className="text-zinc-600 text-center">No medications scheduled.</p>}
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 flex justify-around py-4">
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">🏠</span><span className="text-xs">Dashboard</span></div>
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">📋</span><span className="text-xs">Prescriptions</span></div>
                <div className="flex flex-col items-center text-white"><span className="text-xl">🔔</span><span className="text-xs">Reminders</span></div>
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">👤</span><span className="text-xs">Profile</span></div>
            </div>
        </div>
    );
};

export default MedicationTracker;
