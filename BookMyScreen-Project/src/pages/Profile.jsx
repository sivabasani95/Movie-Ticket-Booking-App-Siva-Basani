

import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    birthday: "",
    identity: "",
    married: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">+</div>
          <h2>Hi, User</h2>
        </div>

        {/* ACCOUNT DETAILS */}
        <div className="profile-section">
          <h3>Account Details</h3>

          <div className="profile-row">
            <span className="label">Email Address</span>

            <input
              type="email"
              name="email"
              className="input-field"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />

            <label className="verified-checkbox">
              <input type="checkbox" disabled />
              <span className="custom-check"></span>
              Verified
            </label>
          </div>

          <div className="profile-row">
            <span className="label">Mobile Number</span>

            <input
              type="text"
              name="mobile"
              className="input-field"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />

            <label className="verified-checkbox">
              <input type="checkbox" disabled />
              <span className="custom-check"></span>
              Verified
            </label>
          </div>
        </div>

        {/* PERSONAL DETAILS */}
        <div className="profile-section">
          <h3>Personal Details</h3>

          <div className="profile-grid">
            <div className="profile-field">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                className="input-field"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                className="input-field"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Birthday (Optional)</label>
              <input
                type="text"
                name="birthday"
                className="input-field"
                placeholder="DD-MM-YYYY"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>

            <div className="profile-field">
              <label>Identity</label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="identity"
                    value="Man"
                    checked={formData.identity === "Man"}
                    onChange={handleChange}
                  />
                  <span className="custom-radio"></span>
                  Man
                </label>

                <label className="radio-item">
                  <input
                    type="radio"
                    name="identity"
                    value="Woman"
                    checked={formData.identity === "Woman"}
                    onChange={handleChange}
                  />
                  <span className="custom-radio"></span>
                  Woman
                </label>
              </div>
            </div>

            <div className="profile-field full-width">
              <label>Married?</label>
              <div className="radio-group">
                <label className="radio-item">
                  <input
                    type="radio"
                    name="married"
                    value="Yes"
                    checked={formData.married === "Yes"}
                    onChange={handleChange}
                  />
                  <span className="custom-radio"></span>
                  Yes
                </label>

                <label className="radio-item">
                  <input
                    type="radio"
                    name="married"
                    value="No"
                    checked={formData.married === "No"}
                    onChange={handleChange}
                  />
                  <span className="custom-radio"></span>
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="save-btn">Save Details</button>
        </div>


      </div>


      {/* profile section */}
      {/* booking section */}
      <div className="profile-container">
        <div className="profile-wrapper">
            {activeTab === "Profile" && (
                <>...
                {/* profile section */}</>
            )}

            {activeTab === "Your Order" && <BookingHistorey />}
        </div>

      </div>

      
    </div>
  );
};

export default Profile;