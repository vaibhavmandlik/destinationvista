// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";

const WebsiteOperations = () => {
  // Data for the bar chart
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
    <div className="container mt-4">
      <h2 className="mb-4">Website Operations</h2>
      <div className="row">
        {/* KPI Cards */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>2,420</h2>
              <p className="text-success">+12% from last month</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Active Packages</h5>
              <h2>145</h2>
              <p className="text-danger">-2% from last month</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <h2>$12,454</h2>
              <p className="text-success">+8% from last month</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Bookings</h5>
              <h2>564</h2>
              <p className="text-warning">+5% from last month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-5">
        <h4>Performance Overview</h4>
        <div style={{ height: "400px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default WebsiteOperations;
