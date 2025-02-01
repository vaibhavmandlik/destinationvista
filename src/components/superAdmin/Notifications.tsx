import React, { useState } from "react";

// import "bootstrap-icons/font/bootstrap-icons.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New vendor registration request from Travel Express Ltd",
      timestamp: "3/10/2024 10:00:00 AM",
      read: false,
      details:
        "A new vendor, Travel Express Ltd, has submitted a registration request for your platform. Please review and approve it.",
    },
    {
      id: 2,
      title: "User John Doe reported an issue with booking #12345",
      timestamp: "3/10/2024 9:30:00 AM",
      read: false,
      details:
        "John Doe reported an issue with booking #12345. The user mentioned that the payment was deducted, but the booking was not confirmed.",
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const openNotificationDetails = (notification) => {
    // Mark notification as read
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    setSelectedNotification(notification);
  };

  const closeNotificationDetails = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="container mt-5 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold">Notifications</h4>
        <button className="btn btn-primary btn-sm" onClick={markAllAsRead}>
          <i className="bi bi-check-circle-fill me-1"></i>
          Mark all as read
        </button>
      </div>
      <div className="row">
        {notifications.map((notification) => (
          <div className="col-md-6 mb-3" key={notification.id}>
            <div
              className={`card shadow-sm ${
                notification.read ? "bg-light" : ""
              }`}
              onClick={() => openNotificationDetails(notification)}
              style={{ cursor: "pointer" }}
            >
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h6
                    className={`mb-1 ${
                      notification.read ? "text-muted" : "text-dark"
                    }`}
                  >
                    {notification.title}
                  </h6>
                  <small className="text-muted">{notification.timestamp}</small>
                </div>
                <div>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-circle"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      deleteNotification(notification.id);
                    }}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {notifications.length === 0 && (
        <div className="text-center mt-4">
          <i className="bi bi-inbox text-muted" style={{ fontSize: "2rem" }}></i>
          <p className="text-muted mt-2">No notifications to display</p>
        </div>
      )}

     
      {selectedNotification && (
        <div
          className="modal show fade"
          style={{ display: "block" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedNotification.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeNotificationDetails}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedNotification.details}</p>
                <small className="text-muted">
                  Timestamp: {selectedNotification.timestamp}
                </small>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeNotificationDetails}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
