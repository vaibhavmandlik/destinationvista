import React, { useEffect, useState } from "react";
import PageHeader from "../pageheader/pageHeader";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  createdOn: string;
}

const Faq: React.FC = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get(`${apiUrl}/common/faq`);
        if (res.status === 200) {
          setFaqs(res.data);
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const toggleFaq = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="FAQ"
        breadcrumb={[{ name: "Home", href: "/" }, { name: "FAQ" }]}
      />

      {/* FAQ Section */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h6
            className="text-primary text-uppercase"
            style={{ letterSpacing: "5px" }}
          >
            FAQ
          </h6>
          <h1>Frequently Asked Questions</h1>
          <p className="text-muted">
            Find answers to the most common questions about our services.
          </p>
        </div>

        {loading ? (
          <div className="text-center my-5">Loading FAQs...</div>
        ) : faqs.length === 0 ? (
          <div className="alert alert-info text-center">
            No FAQs available at the moment.
          </div>
        ) : (
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq) => (
              <div
                className="card mb-2 shadow-sm border-0"
                key={faq.id}
                style={{ borderRadius: "10px" }}
              >
                <div
                  className="card-header bg-white d-flex justify-content-between align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <div>
                    <h5 className="mb-1">{faq.question}</h5>
                    <small className="text-muted">
                      Added on {formatDate(faq.createdOn)}
                    </small>
                  </div>
                  <i
                    className={`fa fa-chevron-${
                      activeId === faq.id ? "up" : "down"
                    } text-primary`}
                  ></i>
                </div>
                {activeId === faq.id && (
                  <div className="card-body border-top">
                    <p dangerouslySetInnerHTML={{ __html: faq.answer }}></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Faq;
