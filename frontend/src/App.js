import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PatientDashboard from "./components/PatientDashboard";
import DoctorDashboard from "./components/DoctorDashboard";
import PharmacistDashboard from "./components/PharmacistDashboard";
import AdminDashboard from "./components/AdminDashboard";

import MedicationTracker from "./components/MedicationTracker";
import Inventory from "./components/Inventory";
import Analytics from "./components/Analytics";

const App = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            // If name is missing, try to fetch it from profile
            if (!user.name) {
                const token = user.token ? `Bearer ${user.token}` : '';
                import("axios").then(axios => {
                    axios.default.get("http://localhost:8080/api/user/profile", {
                        headers: { "Authorization": token }
                    }).then(res => {
                        const updatedUser = { ...user, name: res.data.name };
                        localStorage.setItem("user", JSON.stringify(updatedUser));
                        setCurrentUser(updatedUser);
                    }).catch(err => console.error("Could not fetch profile name", err));
                });
            }
        }
    }, []);

    const logOut = () => {
        AuthService.logout();
        setCurrentUser(undefined);
    };

    return (
        <div className="min-h-screen bg-black text-white m-0 p-0">
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/"} className="navbar-brand">
                    Online Medication & Prescription Tracker
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/home"} className="nav-link">Home</Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/analytics"} className="nav-link">Analytics</Link>
                        </li>
                    )}

                    {/* Show specific dashboard links only if logged in */}
                    {currentUser && currentUser.roles.includes("ROLE_PATIENT") && (
                        <li className="nav-item">
                            <Link to={"/patient-dashboard"} className="nav-link">My Meds</Link>
                        </li>
                    )}
                    {currentUser && currentUser.roles.includes("ROLE_DOCTOR") && (
                        <li className="nav-item">
                            <Link to={"/doctor-dashboard"} className="nav-link">Doctor Panel</Link>
                        </li>
                    )}
                    {currentUser && currentUser.roles.includes("ROLE_PHARMACIST") && (
                        <li className="nav-item">
                            <Link to={"/pharmacist-dashboard"} className="nav-link">Inventory</Link>
                        </li>
                    )}
                    {currentUser && currentUser.roles.includes("ROLE_ADMIN") && (
                        <li className="nav-item">
                            <Link to={"/admin-dashboard"} className="nav-link">Admin Panel</Link>
                        </li>
                    )}
                </div>

                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">{currentUser.name || currentUser.username}</Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>LogOut</a>
                        </li>
                    </div>
                ) : (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/login"} className="nav-link">Login</Link>
                        </li>
                    </div>
                )}
            </nav>

            <div className="container mt-3">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />

                    {/* Dashboards */}
                    <Route path="/patient-dashboard" element={<PatientDashboard />} />
                    <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                    <Route path="/pharmacist-dashboard" element={<PharmacistDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/medication-tracker" element={<MedicationTracker />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/analytics" element={currentUser ? <Analytics /> : <Login />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;