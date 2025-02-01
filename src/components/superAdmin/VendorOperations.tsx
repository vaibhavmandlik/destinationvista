import React from "react";

import {
  FaUsers,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";

const VendorOperations = () => {
  const vendorData = [
    {
      name: "Travel Express Ltd",
      contactEmail: "contact@travelexpress.com",
      contactPhone: "+1234567890",
      status: "active",
      documents: "View Docs",
    },
    {
      name: "Holiday Tours",
      contactEmail: "info@holidaytours.com",
      contactPhone: "+0987654321",
      status: "pending",
      documents: "View Docs",
    },
  ];

  const vendorCards = [
    { title: "Total Vendors", value: "145", change: "+12% from last month", icon: <FaUsers />, color: "#6c757d", textColor: "text-success" },
    { title: "Active Vendors", value: "120", change: "-2% from last month", icon: <FaCheckCircle />, color: "#198754", textColor: "text-danger" },
    { title: "Pending Approval", value: "25", change: "+8% from last month", icon: <FaClock />, color: "#ffc107", textColor: "text-success" },
    { title: "Total Revenue", value: "$45,289", change: "+15% from last month", icon: <FaDollarSign />, color: "#0dcaf0", textColor: "text-warning" },
  ];

  const handleEdit = (vendor) => {
    console.log("Editing vendor:", vendor);
  };

  const handleSuspend = (vendor) => {
    console.log("Suspending vendor:", vendor);
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: "#c1c6cf" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Vendor Operations</h2>
        <button className="btn btn-primary rounded">Add New Vendor</button>
      </div>

      {/* Cards Section */}
      <div className="row g-3">
        {vendorCards.map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card text-start border-0 shadow-sm p-3 rounded-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{item.title}</h6>
                  <h4 className="fw-bold">{item.value}</h4>
                  <p className={`fw-bold ${item.textColor}`} style={{ fontSize: "14px" }}>{item.change}</p>
                </div>
                <div style={{ color: item.color, fontSize: "28px" }}>{item.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vendor List */}
      <div className="mt-5 p-3">
        <h4 className="text-secondary">Vendor List</h4>
        <div className="table-container shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Vendor Name</th>
                <th>Contact Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Documents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorData.map((vendor, index) => (
                <tr key={index}>
                  <td className="fw-bold">{vendor.name}</td>
                  <td>{vendor.contactEmail}</td>
                  <td>{vendor.contactPhone}</td>
                  <td>
                    <span
                      className={`badge rounded-pill px-3 py-2 text-capitalize ${
                        vendor.status === "active" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td>
                    <a href="#" className="text-decoration-none text-primary fw-bold">
                      {vendor.documents}
                    </a>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleEdit(vendor)}>
                      <FaEdit className="me-1" /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleSuspend(vendor)}>
                      <FaTrashAlt className="me-1" /> Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorOperations;

