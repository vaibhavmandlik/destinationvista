import React, { useState } from "react";
import PageHeader from "../pageheader/pageHeader";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required.";
    else if (formData.name.length < 3)
      newErrors.name = "Name must be at least 3 characters.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address.";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    else if (formData.subject.length < 5)
      newErrors.subject = "Subject must be at least 5 characters.";

    if (!formData.message.trim()) newErrors.message = "Message is required.";
    else if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post(`${apiUrl}/common/contact`, formData);
      if (res.status === 200) {
        setStatus({ type: "success", msg: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setErrors({});
      } else {
        setStatus({
          type: "error",
          msg: "Something went wrong. Please try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        msg: "Failed to send message. Please try again later.",
      });
    }
  };

  return (
    <>
      <PageHeader
        title={"Contact"}
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
                {status && (
                  <div
                    className={`alert ${
                      status.type === "success"
                        ? "alert-success"
                        : "alert-danger"
                    }`}
                  >
                    {status.msg}
                  </div>
                )}

                <form id="contactForm" noValidate onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="control-group col-sm-6 mb-3">
                      <input
                        type="text"
                        className="form-control p-4"
                        id="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <small className="text-danger">{errors.name}</small>
                      )}
                    </div>
                    <div className="control-group col-sm-6 mb-3">
                      <input
                        type="email"
                        className="form-control p-4"
                        id="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <small className="text-danger">{errors.email}</small>
                      )}
                    </div>
                  </div>

                  <div className="control-group mb-3">
                    <input
                      type="text"
                      className="form-control p-4"
                      id="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && (
                      <small className="text-danger">{errors.subject}</small>
                    )}
                  </div>

                  <div className="control-group mb-3">
                    <textarea
                      className="form-control py-3 px-4"
                      rows={5}
                      id="message"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <small className="text-danger">{errors.message}</small>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      className="btn btn-success py-3 px-4"
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