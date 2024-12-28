import React from 'react';



interface Blog {
  id: number;
  image: string;
  date: string;
  month: string;
  author: string;
  category: string;
  title: string;
}

const blogData: Blog[] = [
  {
    id: 1,
    image: 'img/blog-1.jpg',
    date: '01',
    month: 'Jan',
    author: 'Admin',
    category: 'Tours & Travel',
    title: 'Exploring the Beauty of Goa',
  },
  {
    id: 2,
    image: 'img/blog-2.jpg',
    date: '01',
    month: 'Jan',
    author: 'Admin',
    category: 'Tours & Travel',
    title: "A Journey Through Kerala's Backwaters",
  },
  // Add more blog data here
];

const BlogItem: React.FC<Blog> = ({ image, date, month, author, category, title }) => (



  <div className="col-md-6 mb-4 pb-2">
    <div className="blog-item">
      <div className="position-relative">
        <img className="img-fluid w-100" src={image} alt="Blog" />
        <div className="blog-date">
          <h6 className="font-weight-bold mb-n1">{date}</h6>
          <small className="text-white text-uppercase">{month}</small>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="d-flex mb-2">
          <a className="text-primary text-uppercase text-decoration-none" href="">
            {author}
          </a>
          <span className="text-primary px-2">|</span>
          <a className="text-primary text-uppercase text-decoration-none" href="">
            {category}
          </a>
        </div>
        <a className="h5 m-0 text-decoration-none" href="">
          {title}
        </a>
      </div>
    </div>
  </div>
);

const Blogs: React.FC = () => (


  <>
   {/* <!-- Header Start --> */}
   <div className="container-fluid page-header">
        <div className="container">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <h3 className="display-4 text-white text-uppercase">Blogs</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase">
                <a className="text-white" href="">
                  Home
                </a>
              </p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">blogs</p>
            </div>
          </div>
        </div>
      </div>
  <div className="container-fluid py-5">
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="row pb-3">
            {blogData.map((blog) => (
              <BlogItem key={blog.id} {...blog} />
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="bg-light p-4 mb-4">
            <h4 className="text-uppercase mb-4">About Us</h4>
            <p>
              Welcome to our travel blog! Here, we share our adventures and travel tips to inspire you to explore
              the world. Join us as we uncover hidden gems and iconic destinations.
            </p>
          </div>
          <div className="bg-light p-4 mb-4">
            <h4 className="text-uppercase mb-4">Categories</h4>
            <div className="d-flex justify-content-between mb-2">
              <a className="text-decoration-none" href="">
                Adventure
              </a>
              <span>(10)</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <a className="text-decoration-none" href="">
                Cultural
              </a>
              <span>(5)</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <a className="text-decoration-none" href="">
                Travel Tips
              </a>
              <span>(7)</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <a className="text-decoration-none" href="">
                Destinations
              </a>
              <span>(6)</span>
            </div>
          </div>
          <div className="bg-light p-4 mb-4">
            <h4 className="text-uppercase mb-4">Follow Us</h4>
            <div className="d-flex">
              <a className="btn btn-outline-primary btn-social mr-2" href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a className="btn btn-outline-primary btn-social mr-2" href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a className="btn btn-outline-primary btn-social mr-2" href="#">
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

export default Blogs;
