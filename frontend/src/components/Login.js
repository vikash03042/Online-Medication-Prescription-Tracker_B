import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Login = () => {
    const form = useRef();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("PATIENT");
    const [medicalLicenseNumber, setMedicalLicenseNumber] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [shopDetails, setShopDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAuth = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        if (isLogin) {
            // LOGIN LOGIC
            AuthService.login(email, password).then(
                (user) => {
                    // Logic to navigate based on role
                    const userRole = user.roles[0]; // Assuming backend returns ROLE_DOCTOR, etc.

                    if (userRole === "ROLE_DOCTOR") navigate("/doctor-dashboard");
                    else if (userRole === "ROLE_PHARMACIST") navigate("/pharmacist-dashboard");
                    else if (userRole === "ROLE_ADMIN") navigate("/admin-dashboard");
                    else navigate("/patient-dashboard");

                    window.location.reload(); // Refresh to update App.js state
                },
                (error) => {
                    let resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    if (error.response && error.response.status === 401) {
                        resMessage = "Invalid email or password. Please try again.";
                    }
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            // SIGNUP LOGIC
            // Ensure roles match backend expectation (usually an array)
            const signupRole = role;
            const optionalFields = {
                medicalLicenseNumber,
                specialization,
                shopDetails
            };

            AuthService.register(name, email, password, signupRole, optionalFields).then(
                () => {
                    setMessage("Account created successfully! Please log in.");
                    setLoading(false);
                    setIsLogin(true);
                },
                (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4 py-8">
            {/* Back Button */}
            <a href="/" className="fixed top-20 left-60 text-green-500 hover:text-green-400 font-semibold flex items-center space-x-2 transition-colors z-10 bg-black/60 px-3 py-2 rounded-lg backdrop-blur-sm">
                <span className="text-xl">←</span>
                <span className="hidden sm:inline text-sm md:text-base">Back to Home</span>
            </a>

            <div className="w-full max-w-md">
                <div className="bg-black rounded-lg p-6 md:p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            {isLogin ? "Welcome Back" : "Create Account"}
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base">
                            {isLogin ? "Sign in to manage your health" : "Join MediTrack today"}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} ref={form} className="space-y-5 md:space-y-6">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-white mb-3">Full Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-semibold text-white mb-3">Email</label>
                            <input type="email" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-white mb-3">Password</label>
                            <input type="password" name="password" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-semibold text-white mb-3">Role</label>
                                <select className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="PATIENT">Patient</option>
                                    <option value="DOCTOR">Doctor</option>
                                    <option value="PHARMACIST">Pharmacist</option>
                                    <option value="ADMIN">Admin</option>
                                </select>
                            </div>
                        )}

                        {/* Extra fields logic remains same as your UI */}
                        {!isLogin && role === "DOCTOR" && (
                            <>
                                <input type="text" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white mt-4" placeholder="Medical License Number" value={medicalLicenseNumber} onChange={(e) => setMedicalLicenseNumber(e.target.value)} />
                                <input type="text" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white mt-4" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                            </>
                        )}
                        {!isLogin && role === "PHARMACIST" && (
                            <input type="text" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white mt-4" placeholder="Shop Details" value={shopDetails} onChange={(e) => setShopDetails(e.target.value)} />
                        )}

                        <button type="submit" disabled={loading} className="w-full bg-green-500 hover:bg-green-600 text-black py-3 rounded-lg font-bold text-lg mt-8 flex justify-center">
                            {loading && <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>}
                            {isLogin ? "Sign In" : "Sign Up"}
                        </button>

                        {message && (
                            <div className={`p-4 rounded-lg text-sm ${message.includes("successfully") ? "bg-green-900 text-green-100" : "bg-red-900 text-red-100"}`}>
                                {message}
                            </div>
                        )}
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                        <p className="text-gray-400">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button onClick={() => { setIsLogin(!isLogin); setMessage(""); }} className="font-semibold text-green-400">
                                {isLogin ? "Sign up" : "Sign in"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;