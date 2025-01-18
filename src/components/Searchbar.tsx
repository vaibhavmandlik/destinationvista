import React from "react";

const Searchbar = () => {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center">
        <input
          type="text"
          className="form-control me-3"
          placeholder="Search..."
          style={{ maxWidth: "300px" }} // Adjust the width as needed
        />
        <div>
          <i
            className="bi bi-bell me-3"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          ></i>
          <i
            className="bi bi-chat-dots"
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
