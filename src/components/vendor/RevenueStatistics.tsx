import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenueStatistics = () => {
  // Data for the pie chart
  const pieData = {
    labels: [
      "Adventure Tours",
      "Beach Packages",
      "City Tours",
      "Mountain Treks",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [45000, 35000, 25000, 15000],
        backgroundColor: ["#4caf50", "#2196f3", "#ff9800", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  // Performance details
  const performanceData = [
    { name: "Adventure Tours", revenue: "$45,000", trend: "up" },
    { name: "Beach Packages", revenue: "$35,000", trend: "down" },
    { name: "City Tours", revenue: "$25,000", trend: "up" },
    { name: "Mountain Treks", revenue: "$15,000", trend: "down" },
  ];

  // Function to render the trend icon
  const renderTrendIcon = (trend) => {
    if (trend === "up") {
      return <i className="bi bi-arrow-up text-success"></i>;
    }
    if (trend === "down") {
      return <i className="bi bi-arrow-down text-danger"></i>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Revenue Statistics</h5>
          <i className="bi bi-currency-dollar text-success fs-3"></i>
        </div>
        <div className="card-body row">
          {/* Pie Chart Section */}
          <div className="col-md-6 d-flex flex-column align-items-center">
            <h6 className="mb-3">Revenue by Package Type</h6>
            <div style={{ width: "80%" }}>
              <Pie data={pieData} />
            </div>
          </div>

          {/* Performance Section */}
          <div className="col-md-6">
            <h6>Package Performance</h6>
            <ul className="list-group">
              {performanceData.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  style={{ backgroundColor: "#f9fafb" }}
                >
                  <div>
                    <strong>{item.name}</strong>
                    <p className="mb-0">{item.revenue}</p>
                  </div>
                  <div>{renderTrendIcon(item.trend)}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueStatistics;
