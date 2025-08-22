import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Offer {
  id: number;
  title: string;
  discountPercent: number;
  for: string;
  description: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const HomeRegistration: React.FC = () => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchActiveOffer = async () => {
      try {
        const response = await fetch(`${apiUrl}/offer?isActive=1`);
        if (!response.ok) throw new Error("Failed to fetch offer.");
        const data = await response.json();
        setOffer(data[0] ?? null);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(
          "Oops! We couldn't load the latest offer. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActiveOffer();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/registration");
  };

  return (
    <div
      className="container-fluid bg-registration py-5"
      style={{ margin: "90px 0" }}
    >
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Offer Section */}
          <div className="col-lg-7 col-md-12 mb-5 mb-lg-0 text-center text-lg-left">
            {loading ? (
              <div className="text-white">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : offer ? (
              <>
                <div className="mb-4">
                  <h6
                    className="text-primary text-uppercase"
                    style={{ letterSpacing: "5px" }}
                  >
                    {offer.title}
                  </h6>
                  <h1 className="text-white text-capitalize">
                    <span className="text-primary">
                      {offer.discountPercent}% OFF
                    </span>{" "}
                    {offer.for}
                  </h1>
                </div>
                <p className="text-white">{offer.description}</p>
              </>
            ) : (
              <div className="text-white">
                🎉 Stay tuned! A new offer will be available soon.
              </div>
            )}
          </div>

          {/* Registration Form */}
          <div className="col-lg-5">
            {/* Submit Button */}
            <div>
              <button
                className="btn btn-success btn-block py-3 border border-white rounded"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRegistration;
