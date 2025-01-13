import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmailUpdates = () => {
  const [emails, setEmails] = useState([
    {
      id: 1,
      title: "New Package Update",
      sender: "admin@travel.com",
      content: "We have updated the pricing for summer packages...",
      date: "2024-03-10",
      starred: false,
    },
    {
      id: 2,
      title: "Monthly Revenue Report",
      sender: "system@travel.com",
      content: "Your monthly revenue report is now available...",
      date: "2024-03-09",
      starred: false,
    },
  ]);

  // Toggle star status
  const toggleStar = (id) => {
    setEmails(
      emails.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email,
      ),
    );
  };

  // Delete email
  const deleteEmail = (id) => {
    setEmails(emails.filter((email) => email.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Email Updates</h5>
          <i className="bi bi-envelope fs-4"></i>
        </div>
        <div className="list-group">
          {emails.map((email) => (
            <div
              key={email.id}
              className="list-group-item d-flex justify-content-between align-items-start"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`checkbox-${email.id}`}
                />
              </div>
              <div className="ms-3 flex-grow-1">
                <h6 className="mb-1">
                  {email.title}{" "}
                  <i
                    className={`bi ${
                      email.starred ? "bi-star-fill text-warning" : "bi-star"
                    }`}
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleStar(email.id)}
                  ></i>
                </h6>
                <p className="mb-0 text-muted">{email.sender}</p>
                <p className="mb-0 text-muted">{email.content}</p>
                <small className="text-muted">{email.date}</small>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => deleteEmail(email.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailUpdates;
