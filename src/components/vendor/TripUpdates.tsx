import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TripUpdates = () => {
  // Sample data for trip updates
  const trips = [
    {
      title: "Beach Paradise Tour",
      user: "John Doe",
      status: "Confirmed",
      statusColor: "success",
      date: "2024-03-20",
      location: "Maldives",
      sent: false,
    },
    {
      title: "Mountain Trek",
      user: "Alice Smith",
      status: "Updated",
      statusColor: "warning",
      date: "2024-03-25",
      location: "Swiss Alps",
      sent: true,
    },
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="card-header bg-light d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-0">User Trip Updates</h5>
            <small className="text-muted">
              Send automated trip updates to users
            </small>
          </div>
          <button className="btn btn-secondary" disabled>
            <i className="bi bi-send"></i> Send Selected Updates
          </button>
        </div>
        <div className="card-body">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center py-3 border-bottom"
            >
              {/* Checkbox */}
              <div>
                <input type="checkbox" className="form-check-input" />
              </div>

              {/* Trip Details */}
              <div>
                <h6 className="mb-1">{trip.title}</h6>
                <small className="text-muted">{trip.user}</small>
              </div>

              {/* Status */}
              <div className={`badge bg-${trip.statusColor} px-3 py-2`}>
                {trip.status}
              </div>

              {/* Date */}
              <div>
                <i className="bi bi-calendar-event"></i> {trip.date}
              </div>

              {/* Location */}
              <div>
                <i className="bi bi-geo-alt"></i> {trip.location}
              </div>

              {/* Sent Status */}
              <div>
                {trip.sent && (
                  <span className="text-success">
                    <i className="bi bi-envelope"></i> Sent
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripUpdates;
