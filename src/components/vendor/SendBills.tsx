import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SendBills = () => {
  // Sample data for the bills
  const bills = [
    {
      title: "March 2024 Commission",
      dueDate: "3/25/2024",
      status: "Pending",
      amount: "$1500",
      statusColor: "warning",
    },
    {
      title: "February 2024 Commission",
      dueDate: "2/25/2024",
      status: "Paid",
      amount: "$2300",
      statusColor: "success",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Bills</h5>
          <button className="btn btn-primary">
            <i className="bi bi-send"></i> Send New Bill
          </button>
        </div>
        <div className="card-body">
          {bills.map((bill, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center py-3 border-bottom"
            >
              {/* Bill Details */}
              <div>
                <h6 className="mb-1">{bill.title}</h6>
                <small className="text-muted">Due: {bill.dueDate}</small>
              </div>

              {/* Status */}
              <div className={`badge bg-${bill.statusColor} px-3 py-2`}>
                {bill.status}
              </div>

              {/* Amount */}
              <div className="fw-bold">{bill.amount}</div>

              {/* Download Icon */}
              <div>
                <i className="bi bi-download fs-5"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SendBills;
