import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaRegUser } from "react-icons/fa";

import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { LoginContext } from "../../LoginContext";

const DynamicHeader: React.FC = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <>
      <div className="container-fluid bg-warning text-center py-2">
        <p className="mb-0">
          <strong>Notice:</strong> We are currently under construction. We
          apologize for any inconvenience you may experience. Thank you for your
          patience!
        </p>
      </div>

      <div className="container-fluid bg-light pt-3 d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <p>
                  <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                  contact@destinationvista.in
                </p>
              </div>
            </div>
            <div className="col-lg-6 text-center text-lg-right">
              <div className="d-inline-flex align-items-center">
                <a className="text-primary px-3" href="#">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a className="text-primary px-3" href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="text-primary px-3" href="#">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a className="text-primary px-3" href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a className="text-primary pl-3" href="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("form open");
                  }}
                  className="text-primary px-3"
                >
                  Join as Travel Agent
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid position-relative nav-bar p-0">
        <div
          className="container-lg position-relative p-0 px-lg-3"
          style={{ zIndex: 9 }}
        >
          <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0 pl-3 pl-lg-5">
            <Link to="/" className="navbar-brand">
              <h1 className="m-0 text-primary">
                <span className="text-dark">DESTINATION</span>VISTA
              </h1>
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              onClick={toggleNavbar}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse justify-content-between px-3 ${isCollapsed ? "" : "show"}`}
            >
              <div className="navbar-nav ml-auto py-0">
                <Link to="/home" className="nav-item nav-link">
                  Home
                </Link>
                <Link to="/packages" className="nav-item nav-link">
                  Tour Packages
                </Link>
                <Link to="/about" className="nav-item nav-link">
                  About
                </Link>
                <Link to="/contact" className="nav-item nav-link">
                  Contact
                </Link>
                <Link to="/destinations" className="nav-item nav-link">
                  Destinations
                </Link>

                {!isLogin ? (
                  <Link to="/loginpage" className="nav-item nav-link active">
                    Login
                  </Link>
                ) : (
                  <div
                    className="nav-item nav-link active position-relative dropdown"
                    onClick={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <FaRegUser />
                    {isOpen && (
                      <div
                        className="position-absolute top-10 left-0 bg-white shadow rounded-lg p-3"
                        style={{ width: "250px" }}
                      >
                        <ul className="mr-5">
                          <li className="py-1 rounded list-unstyled dropdown-menu-tab">
                            <Link to="/profile" style={{ width: "150px" }}>
                              Profile
                            </Link>
                          </li>
                          <li className="py-1 rounded list-unstyled dropdown-menu-tab">
                            <Link to="/bookingshistory" style={{ width: "150px" }}>
                              My Bookings
                            </Link>
                          </li>
                          <li className="py-1 rounded list-unstyled dropdown-menu-tab">
                            <Link
                              to="/home"
                              style={{ width: "150px" }}
                              onClick={handleLogout}
                            >
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default DynamicHeader;
