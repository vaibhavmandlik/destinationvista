import React from "react";

import { Navbar, Nav, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaBell, FaComment, FaUser } from "react-icons/fa";

const Searchbar = () => {
  return (
    <Navbar expand="lg" className="bg-light shadow-sm fixed-top w-100">
      <div className="container-fluid">
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="d-flex justify-content-between">
          
          {/* Search Bar */}
          <Form className="d-flex w-50">
            <FormControl type="search" placeholder="Search..." className="me-2" />
            <Button variant="outline-primary">Search</Button>
          </Form>

          {/* Right Side Icons */}
          <Nav className="align-items-center">
            {/* Notifications */}
            <Nav.Link href="#">
              <FaBell size={20} className="text-dark" />
            </Nav.Link>

            {/* Chat */}
            <Nav.Link href="#">
              <FaComment size={20} className="text-dark" />
            </Nav.Link>

            {/* Profile Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic" className="border-0">
                <FaUser size={22} className="text-dark" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item href="#">Add Vendor</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Searchbar;
