import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New vendor registration request from Travel Express Ltd",
      timestamp: "3/10/2024 10:00:00 AM",
      read: false,
    },
    {
      id: 2,
      title: "User John Doe reported an issue with booking #12345",
      timestamp: "3/10/2024 9:30:00 AM",
      read: false,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Notifications</h4>
        <button
          className="btn btn-link text-decoration-none"
          onClick={markAllAsRead}
        >
          Mark all as read
        </button>
      </div>
      <div className="list-group">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              notification.read ? "bg-light" : ""
            }`}
          >
            <div>
              <span className="me-2">
                <i
                  className={`bi ${
                    notification.read ? "bi-bell" : "bi-bell-fill"
                  }`}
                ></i>
              </span>
              <div>{notification.title}</div>
              <small className="text-muted">{notification.timestamp}</small>
            </div>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => deleteNotification(notification.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
