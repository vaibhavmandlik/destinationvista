import React, { useState } from "react";

const RaiseTickets = () => {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: "Payment Processing Issue",
      description: "Unable to process customer payment for Package #123",
      createdDate: "3/10/2024",
      status: "Pending",
    },
    {
      id: 2,
      title: "Booking System Error",
      description: "System showing incorrect availability for packages",
      createdDate: "3/9/2024",
      status: "Approved",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicketData = {
      id: tickets.length + 1,
      title: newTicket.title,
      description: newTicket.description,
      createdDate: new Date().toLocaleDateString(),
      status: "Pending",
    };
    setTickets((prevTickets) => [...prevTickets, newTicketData]);
    setShowModal(false);
    setNewTicket({ title: "", description: "" });
  };

  const getStatusBadge = (status) => {
    if (status === "Pending") {
      return <span className="badge bg-warning text-dark">Pending</span>;
    } else if (status === "Approved") {
      return <span className="badge bg-success">Approved</span>;
    }
  };

  return (
    <div
      className="container mt-5"
      style={{ backgroundColor: "rgb(232, 232, 232)" }}
    >
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Support Tickets</h5>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            New Ticket
          </button>
        </div>
        <div className="list-group">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#f9fafb" }}
            >
              <div className="flex-grow-1">
                <h6 className="mb-1">
                  <i className="bi bi-file-text me-2"></i>
                  {ticket.title}
                </h6>
                <p className="mb-0 text-muted">{ticket.description}</p>
                <small className="text-muted">
                  Created: {ticket.createdDate}
                </small>
              </div>
              <div>{getStatusBadge(ticket.status)}</div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Ticket</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={newTicket.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows="4"
                      value={newTicket.description}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Ticket
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaiseTickets;
