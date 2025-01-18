import React from "react";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

// Register ChartJS modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DailyReports = () => {
  // Data for the bar chart (Daily Trips)
  const barData = {
    labels: [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
    ],
    datasets: [
      {
        label: "Trips",
        data: [4, 2, 7, 4, 6],
        backgroundColor: "#4A90E2",
      },
    ],
  };

  // Data for the line chart (Daily Revenue)
  const lineData = {
    labels: [
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
      "2024-03-05",
    ],
    datasets: [
      {
        label: "Revenue",
        data: [2700, 1800, 3600, 2000, 3000],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Options for the bar chart
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Options for the line chart
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Show legend at the top
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Daily Reports</h2>
      <div className="row">
        {/* Bar Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Daily Trips</h4>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Line Chart */}
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="card-title">Daily Revenue</h4>
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyReports;
