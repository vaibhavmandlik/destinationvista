import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface BlogPost {
  id: number;
  title: string;
  body: string;
  createdOn: string;
}

const apiUrl = import.meta.env.VITE_API_URL;

// Static cover image and category list
const staticData = [
  {
    imgSrc: "/img/blog-1.jpg",
    category: "Travel Tips",
  },
  {
    imgSrc: "/img/blog-2.jpg",
    category: "Destinations",
  },
  {
    imgSrc: "/img/blog-3.jpg",
    category: "Travel Advice",
  },
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/blog/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError("Failed to load blog post.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async () => {
      try {
        const res = await fetch(`${apiUrl}/blog`);
        const data = await res.json();
        setRelatedPosts(data);
      } catch (err) {
        console.error("Related posts fetch failed");
      }
    };

    // Reload ad after component mounts
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense error", e);
    }

    fetchRelatedPosts();
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (error || !post)
    return (
      <div className="alert alert-danger text-center">
        {error || "Post not found"}
      </div>
    );

  // Pick static data based on index or fallback
  const staticInfo =
    staticData[Number(id) % staticData.length] || staticData[0];

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
        {/* Author and Date */}
        <div className="text-muted mb-3">
          <small>By Admin | {new Date(post.createdOn).toDateString()}</small>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />

      <div className="my-5 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXX" // Replace with your AdSense client ID
          data-ad-slot="1234567890" // Replace with your ad slot
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      <h4 className="mt-5">Related Blogs</h4>
      <div className="row">
        {relatedPosts.map((rp) => (
          <div className="col-md-4" key={rp.id}>
            <div className="card mb-3">
              <img
                src="/img/blog-1.jpg"
                className="card-img-top"
                alt="Related Blog"
              />
              <div className="card-body">
                <h5 className="card-title">{rp.title}</h5>
                <p
                  className="card-text text-truncate"
                  dangerouslySetInnerHTML={{ __html: rp.body }}
                ></p>
                <a
                  href={`/blog/${rp.id}`}
                  className="btn btn-sm btn-outline-primary"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
