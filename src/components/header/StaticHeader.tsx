// HeaderComponent.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFacebookF, faTwitter, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const StaticHeader: React.FC = () => {
  return (<>
  
    <div className="container-fluid bg-warning text-center py-2  ">
    <p className="mb-0"><strong>Notice:</strong> We are currently under construction. We apologize for any inconvenience you may experience. Thank you for your patience!</p>
    </div>
    <div className="container-fluid bg-light pt-3 d-none d-lg-block ">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <p><FontAwesomeIcon icon={faInstagram} className="mr-2" />Destinationvista@gmail.com</p>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-primary px-3" href=""><FontAwesomeIcon icon={faFacebookF} /></a>
              <a className="text-primary px-3" href=""><FontAwesomeIcon icon={faTwitter} /></a>
              <a className="text-primary px-3" href=""><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a className="text-primary px-3" href=""><FontAwesomeIcon icon={faInstagram} /></a>
              <a className="text-primary pl-3" href=""><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default StaticHeader;
