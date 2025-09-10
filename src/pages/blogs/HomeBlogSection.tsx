import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  link: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const staticBlogData = [
  {
    imgSrc: "img/blog-1.jpg",
    category: "Travel Tips",
  },
  {
    imgSrc: "img/blog-2.jpg",
    category: "Destinations",
  },
  {
    imgSrc: "img/blog-3.jpg",
    category: "Travel Advice",
  },
];

const HomeBlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/blog`);
        if (!response.ok) {
          throw new Error(`Error fetching blogs: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-3 pb-3">
          <h6
            className="text-primary text-uppercase"
            style={{ letterSpacing: "5px" }}
          >
            Our Blog
          </h6>
          <h1>Latest From Our Blog</h1>
        </div>

        {isLoading ? (
          <div className="text-center">Loading blog posts...</div>
        ) : error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : (
          <div className="row pb-3">
            {posts.map((post, index) => {
              const staticData = staticBlogData[index] || staticBlogData[0];
              return (
                <div
                  className="col-lg-4 col-md-6 mb-4 pb-2"
                  key={post.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/blog/${post.id}`)} // 👈 Navigate on click
                >
                  <div className="blog-item">
                    <div className="position-relative">
                      <img
                        className="img-fluid w-100"
                        src={staticData.imgSrc}
                        alt={`Blog ${index + 1}`}
                      />
                    </div>
                    <div className="bg-white p-4">
                      <div className="d-flex mb-2">
                        <span className="text-primary px-2">|</span>
                        <p className="text-primary text-uppercase m-0">
                          {staticData.category}
                        </p>
                      </div>
                      <h5 className="m-0 text-decoration-none">{post.title}</h5>
                      <p
                        className="m-0 text-truncate"
                        style={{
                          maxWidth: "15rem",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                        dangerouslySetInnerHTML={{ __html: post.body }}
                      ></p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeBlogSection;
