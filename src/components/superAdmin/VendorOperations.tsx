// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const VendorOperations = () => {
  // Sample data for the vendor list
  const vendorData = [
    {
      name: "Travel Express Ltd",
      contact: "contact@travelexpress.com\n+1234567890",
      status: "active",
      documents: "View Docs",
    },
    {
      name: "Holiday Tours",
      contact: "info@holidaytours.com\n+0987654321",
      status: "pending",
      documents: "View Docs",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Vendor Operations</h2>
        <button className="btn btn-primary">Add New Vendor</button>
      </div>

      <div className="row">
        {/* KPI Cards */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Vendors</h5>
              <h2>145</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Active Vendors</h5>
              <h2>120</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Pending Approval</h5>
              <h2>25</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Revenue</h5>
              <h2>$45,289</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="mt-5">
        <h4>Vendor List</h4>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Documents</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorData.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.name}</td>
                <td>
                  {vendor.contact.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </td>
                <td>
                  <span
                    className={`badge ${
                      vendor.status === "active"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </td>
                <td>
                  <a href="#" className="text-primary">
                    {vendor.documents}
                  </a>
                </td>
                <td>
                  <button className="btn btn-sm btn-secondary me-2">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger">Suspend</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorOperations;
