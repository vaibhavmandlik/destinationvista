import React from "react";
import PageHeader from "../pageheader/pageHeader";

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <>
      {/* <!-- Header Start --> */}
      <PageHeader
        title={"About"}
        breadcrumb={[{ name: "Home", href: "/" }, { name: "Contact" }]}
      />
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="text-center mb-3 pb-3">
            <h6
              className="text-primary text-uppercase"
              style={{ letterSpacing: "5px" }}
            >
              Contact
            </h6>
            <h1>Contact For Any Query</h1>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div
                className="contact-form bg-white"
                style={{ padding: "30px" }}
              >
                <form
                  name="sentMessage"
                  id="contactForm"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="form-row">
                    <div className="control-group col-sm-6">
                      <input
                        type="text"
                        className="form-control p-4"
                        id="name"
                        placeholder="Your Name"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                    <div className="control-group col-sm-6">
                      <input
                        type="email"
                        className="form-control p-4"
                        id="email"
                        placeholder="Your Email"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="control-group">
                    <input
                      type="text"
                      className="form-control p-4"
                      id="subject"
                      placeholder="Subject"
                      required
                    />
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="control-group">
                    <textarea
                      className="form-control py-3 px-4"
                      rows={5}
                      id="message"
                      placeholder="Message"
                      required
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div className="text-center">
                    <button
                      className="btn btn-primary py-3 px-4"
                      type="submit"
                      id="sendMessageButton"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
