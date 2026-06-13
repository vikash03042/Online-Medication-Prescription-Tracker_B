import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrescriptionService from "../services/prescription.service";
import AuthService from "../services/auth.service";

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const currentUser = AuthService.getCurrentUser();

    const [patientEmail, setPatientEmail] = useState("");
    const [medicationName, setMedicationName] = useState("");
    const [dosage, setDosage] = useState("");
    const [duration, setDuration] = useState("");
    const [instructions, setInstructions] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [prescriptions, setPrescriptions] = useState([]);
    const [groupedPatients, setGroupedPatients] = useState({});
    const [selectedPatientName, setSelectedPatientName] = useState(null);
    const [editingPrescription, setEditingPrescription] = useState(null);

    useEffect(() => {
        loadPrescriptions();
    }, []);

    const loadPrescriptions = () => {
        PrescriptionService.getDoctorPrescriptions().then(
            (response) => {
                const data = response.data;
                setPrescriptions(data);

                // Group by patient name for display
                const grouped = data.reduce((acc, curr) => {
                    const name = curr.patientName || curr.patientEmail || `Patient #${curr.patientId}`;
                    if (!acc[name]) acc[name] = [];
                    acc[name].push(curr);
                    return acc;
                }, {});
                setGroupedPatients(grouped);
            },
            (error) => {
                console.error("Error fetching prescriptions:", error);
            }
        );
    };

    const handleIssuePrescription = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        PrescriptionService.issuePrescription(patientEmail, medicationName, dosage, duration, instructions, file).then(
            () => {
                setMessage("Prescription issued successfully!");
                setLoading(false);
                setPatientEmail("");
                setMedicationName("");
                setDosage("");
                setDuration("");
                setInstructions("");
                setFile(null);
                loadPrescriptions();
            },
            (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this prescription?")) {
            PrescriptionService.deletePrescription(id).then(
                () => {
                    setMessage("Prescription deleted successfully!");
                    loadPrescriptions();
                },
                (error) => {
                    setMessage("Error deleting prescription.");
                }
            );
        }
    };

    const startEdit = (p) => {
        setEditingPrescription(p);
        setMedicationName(p.medicationName);
        setDosage(p.dosage);
        setDuration(p.duration);
        setInstructions(p.instructions);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            medicationName,
            dosage,
            duration,
            instructions
        };
        PrescriptionService.updatePrescription(editingPrescription.id, data).then(
            () => {
                setMessage("Prescription updated!");
                setLoading(false);
                setEditingPrescription(null);
                setMedicationName("");
                setDosage("");
                setDuration("");
                setInstructions("");
                loadPrescriptions();
            },
            (error) => {
                setMessage("Error updating prescription.");
                setLoading(false);
            }
        );
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            {/* Header */}
            <div className="flex items-center mb-8">
                <button onClick={() => navigate(-1)} className="text-2xl mr-4">←</button>
                <h1 className="text-xl font-bold">Doctor Panel</h1>
            </div>

            <h2 className="text-2xl font-bold mb-6">{editingPrescription ? "Modify Prescription" : "Issue Prescription"}</h2>

            <form onSubmit={editingPrescription ? handleUpdate : handleIssuePrescription} className="space-y-4 mb-10">
                {!editingPrescription && (
                    <input required className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" placeholder="Patient Email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} />
                )}
                <input required className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" placeholder="Medication Name" value={medicationName} onChange={(e) => setMedicationName(e.target.value)} />
                <div className="flex gap-4">
                    <input required className="w-1/2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" placeholder="Dosage (e.g. 500mg)" value={dosage} onChange={(e) => setDosage(e.target.value)} />
                    <input required className="w-1/2 p-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white" placeholder="Duration (Days)" value={duration} onChange={(e) => setDuration(e.target.value)} />
                </div>
                <textarea required className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl h-32 text-white" placeholder="Doctor's Notes / Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />

                {!editingPrescription && (
                    <div className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-xl">
                        <label className="block text-sm text-zinc-400 mb-2">Upload PDF (Optional)</label>
                        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} className="text-white" />
                    </div>
                )}

                <div className="flex gap-4">
                    <button type="submit" disabled={loading} className="flex-1 bg-green-500 text-black font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 disabled:opacity-50">
                        {loading ? "Processing..." : (editingPrescription ? "Update Prescription" : "Issue Digital Prescription")}
                    </button>
                    {editingPrescription && (
                        <button type="button" onClick={() => { setEditingPrescription(null); setMedicationName(""); setDosage(""); setDuration(""); setInstructions(""); }} className="px-6 bg-zinc-800 text-white rounded-xl">Cancel</button>
                    )}
                </div>

                {message && (
                    <div className={`p-4 rounded-lg text-sm ${message.includes("successfully") || message.includes("updated") ? "bg-green-900 text-green-100" : "bg-red-900 text-red-100"}`}>
                        {message}
                    </div>
                )}
            </form>

            <h3 className="text-lg font-bold mb-4 text-zinc-400">Recent Patients</h3>
            <div className="space-y-4">
                {Object.keys(groupedPatients).length === 0 ? (
                    <p className="text-zinc-500 italic">No patients yet.</p>
                ) : (
                    Object.keys(groupedPatients).map(name => (
                        <div key={name} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                            <div
                                className="p-4 flex justify-between items-center cursor-pointer hover:bg-zinc-800/50"
                                onClick={() => setSelectedPatientName(selectedPatientName === name ? null : name)}
                            >
                                <div>
                                    <p className="font-bold">{name}</p>
                                    <p className="text-xs text-zinc-500">{groupedPatients[name].length} Prescription(s)</p>
                                </div>
                                <span>{selectedPatientName === name ? "▼" : "▶"}</span>
                            </div>

                            {selectedPatientName === name && (
                                <div className="p-4 bg-black/40 border-t border-zinc-800 space-y-4">
                                    {groupedPatients[name].map(p => (
                                        <div key={p.id} className="p-3 bg-zinc-900/50 rounded-xl border border-zinc-800 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-sm">{p.medicationName} <span className="text-xs font-normal text-zinc-500 ml-2">{p.dosage}</span></p>
                                                <p className="text-xs text-zinc-400 italic">"{p.instructions}"</p>
                                                <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-1">ID: {p.id} • Issued to: {p.patientEmail}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEdit(p)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg">✎</button>
                                                <button onClick={() => handleDelete(p.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">🗑</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800 flex justify-around py-4">
                <div onClick={() => navigate('/doctor-dashboard')} className="flex flex-col items-center text-white cursor-pointer"><span className="text-xl">🏠</span><span className="text-xs">Dashboard</span></div>
                <div className="flex flex-col items-center text-zinc-500"><span className="text-xl">📊</span><span className="text-xs">Analytics</span></div>
                <div onClick={() => navigate('/profile')} className="flex flex-col items-center text-zinc-500 cursor-pointer"><span className="text-xl">👤</span><span className="text-xs">Profile</span></div>
            </div>
        </div>
    );
};

export default DoctorDashboard;
