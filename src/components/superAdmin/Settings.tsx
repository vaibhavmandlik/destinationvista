import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    websiteName: "Travel Booking System",
    contactEmail: "admin@example.com",
    defaultCurrency: "USD ($)",
    timezone: "UTC",
  });

  const handleSaveChanges = () => {
    alert("Settings have been saved!");
  };

  return (
    <div className="container mt-5">
      <h4>Settings</h4>
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h5 className="mb-4">General Settings</h5>

          {/* Website Name */}
          <div className="mb-3">
            <label className="form-label">Website Name</label>
            <input
              type="text"
              className="form-control"
              value={settings.websiteName}
              onChange={(e) =>
                setSettings({ ...settings, websiteName: e.target.value })
              }
            />
          </div>

          {/* Contact Email */}
          <div className="mb-3">
            <label className="form-label">Contact Email</label>
            <input
              type="email"
              className="form-control"
              value={settings.contactEmail}
              onChange={(e) =>
                setSettings({ ...settings, contactEmail: e.target.value })
              }
            />
          </div>

          {/* Default Currency */}
          <div className="mb-3">
            <label className="form-label">Default Currency</label>
            <select
              className="form-select"
              value={settings.defaultCurrency}
              onChange={(e) =>
                setSettings({ ...settings, defaultCurrency: e.target.value })
              }
            >
              <option value="USD ($)">USD ($)</option>
              <option value="EUR (€)">EUR (€)</option>
              <option value="GBP (£)">GBP (£)</option>
            </select>
          </div>

          {/* Timezone */}
          <div className="mb-3">
            <label className="form-label">Timezone</label>
            <select
              className="form-select"
              value={settings.timezone}
              onChange={(e) =>
                setSettings({ ...settings, timezone: e.target.value })
              }
            >
              <option value="UTC">UTC</option>
              <option value="GMT">GMT</option>
              <option value="PST">PST</option>
              <option value="EST">EST</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
