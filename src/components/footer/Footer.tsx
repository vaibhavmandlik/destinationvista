import React from 'react';
import { Link } from 'react-admin';


const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container-fluid bg-dark text-white-50 py-5 px-3 px-lg-5 footer">
      <div className="row pt-4">
        {/* Brand and Social Links */}
        <div className="col-lg-3 col-md-6 mb-4">
          <a href="/" className="navbar-brand">
            <h1 className="text-primary" style={{ fontSize: '2rem' }}>
              <span className="text-white">DESTINATION</span>VISTA
            </h1>
          </a>
          <p>Your dream vacation starts here at Destination Vista!</p>
        </div>

        {/* Our Services */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Our Services</h5>
          <ul className="list-unstyled">
            <li><a className="text-white-50" href="/about"><i className="fa fa-angle-right mr-2"></i>About Us</a></li>
            <li><a className="text-white-50" href="/destinations"><i className="fa fa-angle-right mr-2"></i>Destinations</a></li>
            <li><a className="text-white-50" href="/packages"><i className="fa fa-angle-right mr-2"></i>Packages</a></li>
            <li><a className="text-white-50" href="/service"><i className="fa fa-angle-right mr-2"></i>Services</a></li>
            <li><a className="text-white-50" href="/home"><i className="fa fa-angle-right mr-2"></i>Blogs</a></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Customer Support</h5>
          <ul className="list-unstyled">
            <li><a className="text-white-50" href="/contact"><i className="fa fa-angle-right mr-2"></i>Contact Us</a></li>
            <li><a className="text-white-50" href="/FAQ"><i className="fa fa-angle-right mr-2"></i>FAQs</a></li>
            <li><a className="text-white-50" href="/cancellation"><i className="fa fa-angle-right mr-2"></i>Cancellation Policy</a></li>
            <li><a className="text-white-50" href="/support"><i className="fa fa-angle-right mr-2"></i>Customer Support</a></li>
          </ul>
        </div>

        {/* Popular Destinations */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Popular Destinations</h5>
          <ul className="list-unstyled">
            <li><a className="text-white-50" href="/destinations/goa"><i className="fa fa-angle-right mr-2"></i>Goa</a></li>
            <li><a className="text-white-50" href="/destinations/kashmir"><i className="fa fa-angle-right mr-2"></i>Kashmir</a></li>
            <li><a className="text-white-50" href="/destinations/kerala"><i className="fa fa-angle-right mr-2"></i>Kerala</a></li>
            <li><a className="text-white-50" href="/destinations/ladakh"><i className="fa fa-angle-right mr-2"></i>Ladakh</a></li>
            <li><a className="text-white-50" href="/destinations/rajasthan"><i className="fa fa-angle-right mr-2"></i>Rajasthan</a></li>
          </ul>
        </div>
      </div>

      {/* Additional Footer Content Row */}
      <div className="row pt-2">
        {/* Legal Information */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Legal</h5>
          <div className='d-flex justify-conten-between'>
          <ul className="list-unstyled me-3">
            <li><Link className="text-white-50" to="/terms"><i className="fa fa-angle-right mr-2"></i>Terms & Conditions</Link></li>
            <li><Link className="text-white-50" to="/privacy"><i className="fa fa-angle-right mr-2"></i>Privacy Policy</Link></li>
            <li><Link className="text-white-50" to="/disclaimer"><i className="fa fa-angle-right mr-2"></i>Disclaimer</Link></li>
            <li><Link className="text-white-50" to="/support"><i className="fa fa-angle-right mr-2"></i>Support</Link></li>
            <li><Link className="text-white-50" to="/newsletter"><i className="fa fa-angle-right mr-2"></i>Newsletter</Link></li>
            <li><Link className="text-white-50" to="/dateretension"><i className="fa fa-angle-right mr-2"></i>Data Retension</Link></li>
          </ul>

          <ul className='list-unstyled'>
            <li><Link className="text-white-50" to="/paymentpolicy"><i className="fa fa-angle-right mr-2"></i>Payment Policy</Link></li>
            <li><Link className="text-white-50" to="/refundpolicy"><i className="fa fa-angle-right mr-2"></i>Refund Policy</Link></li>
            <li><Link className="text-white-50" to="/vendorpolicy"><i className="fa fa-angle-right mr-2"></i>Vendor Policy</Link></li>
            <li><Link className="text-white-50" to="/cookiespolicy"><i className="fa fa-angle-right mr-2"></i>Cookies Policy</Link></li>
            <li><Link className="text-white-50" to="/rights"><i className="fa fa-angle-right mr-2"></i>Third Party Rights</Link></li>
            <li><Link className="text-white-50" to="/grievanceandredressalpolicy"><i className="fa fa-angle-right mr-2"></i>Grievance & Redressal Policy</Link></li>
          </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Newsletter</h5>
          <p>Subscribe to our newsletter for the latest updates on destinations and offers.</p>
          <div className="input-group">
            <input type="text" className="form-control border-light" placeholder="Your Email" />
            <div className="input-group-append">
              <button className="btn btn-primary px-3">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Contact Us</h5>
          <p><i className="fa fa-envelope mr-2"></i>info@DestinationVista.com</p>
        </div>

        {/* Follow Us */}
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="text-white text-uppercase mb-3">Follow Us</h5>
          <p>Stay connected for travel inspiration and updates:</p>
          <div className="d-flex">
            <a className="btn btn-outline-primary btn-square mr-2" href="#"><i className="fab fa-twitter"></i></a>
            <a className="btn btn-outline-primary btn-square mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
            <a className="btn btn-outline-primary btn-square mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
            <a className="btn btn-outline-primary btn-square" href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-3 mt-3">
        <p className="mb-0">&copy; {currentYear} Destination Vista. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
