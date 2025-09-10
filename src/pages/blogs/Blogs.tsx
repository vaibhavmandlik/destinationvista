import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

interface Blog {
  id: number;
  title: string;
  body: string;
  createdOn: string;
}

const BlogItem: React.FC<Blog> = ({ id, title, body, createdOn }) => {
  const dateObj = new Date(createdOn);
  const date = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleString("default", { month: "short" });

  return (
    <div className="col-md-6 mb-4 pb-2">
      <Link className="blog-item text-decoration-none" to={`/blog/${id}`}>
        <div className="position-relative">
          <img className="img-fluid w-100" src="/img/blog-1.jpg" alt="Blog" />
          <div className="blog-date">
            <h6 className="font-weight-bold mb-n1">{date}</h6>
            <small className="text-white text-uppercase">{month}</small>
          </div>
        </div>
        <div className="bg-white p-4">
          <div className="d-flex mb-2">
            <a
              className="text-primary text-uppercase text-decoration-none"
              href="#"
            >
              Admin
            </a>
            <span className="text-primary px-2">|</span>
            <a
              className="text-primary text-uppercase text-decoration-none"
              href="#"
            >
              Tours & Travel
            </a>
          </div>
          <a className="h5 m-0 text-decoration-none" href="#">
            {title}
          </a>
          <div
            className="mt-2 text-muted"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
      </Link>
    </div>
  );
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${apiUrl}/blog`);
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="container-fluid page-header">
        <div className="container">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="display-4 text-white text-uppercase">Blogs</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <a className="text-white" href="/">
                  Home
                </a>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">blogs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            {/* Blog List */}
            <div className="col-lg-8">
              <div className="row pb-3">
                {blogs.length > 0 ? (
                  blogs.map((blog) => <BlogItem key={blog.id} {...blog} />)
                ) : (
                  <p className="text-center w-100">No blogs available</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="bg-light p-4 mb-4">
                <h4 className="text-uppercase mb-4">About Us</h4>
                <p>
                  Welcome to our travel blog! Here, we share our adventures and
                  travel tips to inspire you to explore the world. Join us as we
                  uncover hidden gems and iconic destinations.
                </p>
              </div>
              <div className="bg-light p-4 mb-4">
                <h4 className="text-uppercase mb-4">Categories</h4>
                <div className="d-flex justify-content-between mb-2">
                  <a className="text-decoration-none" href="#">
                    Adventure
                  </a>
                  <span>(10)</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <a className="text-decoration-none" href="#">
                    Cultural
                  </a>
                  <span>(5)</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <a className="text-decoration-none" href="#">
                    Travel Tips
                  </a>
                  <span>(7)</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <a className="text-decoration-none" href="#">
                    Destinations
                  </a>
                  <span>(6)</span>
                </div>
              </div>
              <div className="bg-light p-4 mb-4">
                <h4 className="text-uppercase mb-4">Follow Us</h4>
                <div className="d-flex">
                  <a
                    className="btn btn-outline-primary btn-social mr-2"
                    href="#"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    className="btn btn-outline-primary btn-social mr-2"
                    href="#"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    className="btn btn-outline-primary btn-social mr-2"
                    href="#"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a className="btn btn-outline-primary btn-social" href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
