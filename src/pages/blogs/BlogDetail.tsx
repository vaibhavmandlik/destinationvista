import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import "/styles/Blogdetails.css";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  createdOn: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

const staticData = [
  { imgSrc: "/img/blog-1.jpg", category: "Travel Tips" },
  { imgSrc: "/img/blog-2.jpg", category: "Destinations" },
  { imgSrc: "/img/blog-3.jpg", category: "Travel Advice" },
];

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const numericId = Number(id ?? 0);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${apiUrl}/blog/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = (await response.json()) as BlogPost;
        if (isMounted) {
          setPost(data);
          setAnimate(true); // trigger flip animation
          setTimeout(() => setAnimate(false), 700); // remove class after animation
        }
      } catch (err) {
        if (isMounted) setError("Failed to load blog post.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const fetchRelatedPosts = async () => {
      try {
        const res = await fetch(`${apiUrl}/blog`);
        const data = (await res.json()) as BlogPost[];
        if (isMounted) setRelatedPosts(data);
      } catch {
        // silent fail
      }
    };

    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchRelatedPosts();
    fetchPost();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error || !post)
    return (
      <div className="alert alert-danger text-center">
        {error || "Post not found"}
      </div>
    );

  const staticInfo = staticData[numericId % staticData.length] || staticData[0];

  return (
    <div className="container py-5">
      <div className="mb-4 text-center">
        <img
          src={staticInfo.imgSrc}
          alt="Cover"
          className="img-fluid mb-3"
          style={{
            maxHeight: "400px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <span className="badge bg-primary text-uppercase mb-2">
          {staticInfo.category}
        </span>
        <h1 className="mt-2 mb-3">{post.title}</h1>
        <div className="text-muted mb-3">
          <small>By Admin | {new Date(post.createdOn).toDateString()}</small>
        </div>
      </div>

      {/* Page Flip Animation */}
      <div className={`page-flip ${animate ? "animate" : ""}`}>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </div>

      <div className="my-5 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXX"
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <h4 className="mt-5">Related Blogs</h4>
      <div className="row">
        {relatedPosts.map((rp) => (
          <div className="col-md-4" key={rp.id}>
            <div className="card mb-3 h-100">
              <img src="/img/blog-1.jpg" className="card-img-top" alt="Related Blog" />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{rp.title}</h5>
                <div
                  className="card-text text-truncate mb-3"
                  dangerouslySetInnerHTML={{ __html: rp.body }}
                />
                <Link
                  to={`/blog/${rp.id}`}
                  className="btn btn-sm btn-outline-primary mt-auto"
                >
                  Read Blog
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
