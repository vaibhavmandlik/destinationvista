import React from 'react';

// Define the interface for blog posts
interface BlogPost {
  imgSrc: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  link: string;
}

// Example blog posts data
const blogPosts: BlogPost[] = [
  {
    imgSrc: "img/blog-1.jpg",
    alt: "Blog 1",
    category: "Travel Tips",
    title: "10 Essential Tips for First-Time Travelers",
    description: "Explore our top ten tips to ensure your first trip is both enjoyable and stress-free.",
    link: "/blog/first-time-travelers",
  },
  {
    imgSrc: "img/blog-2.jpg",
    alt: "Blog 2",
    category: "Destinations",
    title: "Top 5 Destinations for a Weekend Getaway",
    description: "Discover five beautiful locations perfect for a short escape from the everyday hustle.",
    link: "/blog/weekend-getaway",
  },
  {
    imgSrc: "img/blog-3.jpg",
    alt: "Blog 3",
    category: "Travel Advice",
    title: "Traveling on a Budget: How to Save on Your Next Trip",
    description: "Discover budget-friendly travel tips, including smart booking strategies for savings on your next trip.",
    link: "/blog/travel-on-a-budget",
  },
];

const HomeBlogSection: React.FC = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-3 pb-3">
          <h6 className="text-primary text-uppercase" style={{ letterSpacing: "5px" }}>
            Our Blog
          </h6>
          <h1>Latest From Our Blog</h1>
        </div>
        <div className="row pb-3">
          {blogPosts.map((post, index) => (
            <div className="col-lg-4 col-md-6 mb-4 pb-2" key={index}>
              <div className="blog-item">
                <div className="position-relative">
                  <img className="img-fluid w-100" src={post.imgSrc} alt={post.alt} />
                </div>
                <div className="bg-white p-4">
                  <div className="d-flex mb-2">
                    <span className="text-primary px-2">|</span>
                    <a className="text-primary text-uppercase text-decoration-none" href="#">
                      {post.category}
                    </a>
                  </div>
                  <a className="h5 m-0 text-decoration-none" href={post.link}>
                    {post.title}
                  </a>
                  <p className="m-0">{post.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeBlogSection;
