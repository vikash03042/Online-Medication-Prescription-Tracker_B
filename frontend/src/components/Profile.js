import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [profile, setProfile] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        UserService.getProfile().then(
            (response) => {
                setProfile(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setProfile(_content);
            }
        );
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfile({ ...profile, [name]: value });
    };

    const updateProfile = (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        UserService.updateProfile(profile).then(
            (response) => {
                setMessage("Profile updated successfully!");
                setLoading(false);
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                setMessage(resMessage);
                setLoading(false);
            }
        );
    };

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong> Profile
                </h3>
            </header>

            {message && (
                <div className="alert alert-info" role="alert">
                    {message}
                </div>
            )}

            <form onSubmit={updateProfile}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={profile.name || ''} disabled />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" className="form-control" value={profile.email || ''} disabled />
                </div>

                {/* Fields for all roles - Conditional rendering can be added if needed, but for now showing all relevant editable fields */}
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" className="form-control" name="phoneNumber" value={profile.phoneNumber || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea className="form-control" name="address" value={profile.address || ''} onChange={handleInputChange} />
                </div>

                {/* Doctor Fields */}
                {currentUser.roles.includes("ROLE_DOCTOR") && (
                    <>
                        <div className="form-group">
                            <label>Medical License Number</label>
                            <input type="text" className="form-control" name="medicalLicenseNumber" value={profile.medicalLicenseNumber || ''} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Specialization</label>
                            <input type="text" className="form-control" name="specialization" value={profile.specialization || ''} onChange={handleInputChange} />
                        </div>
                    </>
                )}

                {/* Pharmacist Fields */}
                {currentUser.roles.includes("ROLE_PHARMACIST") && (
                    <div className="form-group">
                        <label>Shop Details</label>
                        <textarea className="form-control" name="shopDetails" value={profile.shopDetails || ''} onChange={handleInputChange} />
                    </div>
                )}

                {/* Patient Fields */}
                {currentUser.roles.includes("ROLE_PATIENT") && (
                    <div className="form-group">
                        <label>Medical History</label>
                        <textarea className="form-control" name="medicalHistory" value={profile.medicalHistory || ''} onChange={handleInputChange} />
                    </div>
                )}

                <div className="form-group mt-3">
                    <button className="btn btn-primary" disabled={loading}>
                        {loading && <span className="spinner-border spinner-border-sm"></span>}
                        <span>Update Profile</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
