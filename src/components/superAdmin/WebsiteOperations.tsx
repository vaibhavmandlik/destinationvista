import React from "react";

import { Bar } from "react-chartjs-2";
import { FaUsers, FaBox, FaDollarSign, FaCalendarCheck } from "react-icons/fa";

const WebsiteOperations = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Revenue",
        data: [2500, 3000, 9000, 7000],
        backgroundColor: "#007bff",
      },
      {
        label: "Users",
        data: [2000, 2500, 7500, 5000],
        backgroundColor: "#28a745",
      },
      {
        label: "Packages",
        data: [1500, 2000, 8000, 4000],
        backgroundColor: "#ffc107",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: "#c1c6cf" }}>
      <h2 className="fw-bold mb-4">Website Operations</h2>

      {/* Cards Section */}
      <div className="row g-3">
        {[
          { title: "Total Users", value: "2,420", change: "+12% from last month", icon: <FaUsers />, color: "#198754", textColor: "text-success" },
          { title: "Active Packages", value: "145", change: "-2% from last month", icon: <FaBox />, color: "#6c757d", textColor: "text-danger" },
          { title: "Revenue", value: "$12,454", change: "+8% from last month", icon: <FaDollarSign />, color: "#0dcaf0", textColor: "text-success" },
          { title: "Total Bookings", value: "564", change: "+5% from last month", icon: <FaCalendarCheck />, color: "#6f42c1", textColor: "text-warning" },
        ].map((item, index) => (
          <div className="col-md-3" key={index}>
            <div className="card text-start border-0 shadow-sm p-3" style={{ background: "#f8f9fa", borderRadius: "10px" }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted mb-1">{item.title}</h6>
                  <h4 className="fw-bold">{item.value}</h4>
                  <p className={`fw-bold ${item.textColor}`} style={{ fontSize: "14px" }}>{item.change}</p>
                </div>
                <div style={{ color: item.color, fontSize: "28px" }}>
                  {item.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Overview Chart */}

      <div className=" mt-5" style={{ backgroundColor: "white" }}>
        <h4 className="text-secondary">Performance Overview</h4>
        <div style={{ height: "350px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>

    </div>
  );
};

export default WebsiteOperations;
