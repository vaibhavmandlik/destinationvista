import React from "react";
import { Admin, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import jsonServerProvider from "ra-data-json-server";

// Pages and Components
import AboutUs from "./pages/about/AboutUs";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import PackagesList from "./pages/packages/PackagesList";
import Destination from "./pages/destinations/Destination";
import LoginPage from "./pages/login/LoginPage";
import Registration from "./pages/registration/Registration";
import Blogs from "./pages/blogs/Blogs";
import DynamicHeader from "./components/header/DynamicHeader";
import PackageDetailsWrapper from "./pages/packages/PackageDetailsWrapper";
import Footer from "./components/footer/Footer";
import HomeRegistration from "./pages/registration/HomeRegistration";

// import DestinationCategorySection from "./pages/home/HomeDestinationCategorySection";
// import BackToTop from "./pages/backtotop/BackToTop";
// import HomeBlogSection from "./pages/blogs/HomeBlogSection";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App: React.FC = () => (
  <Admin dataProvider={dataProvider} disableTelemetry>
    {/* Custom Routes */}
    {/* <CustomRoutes noLayout> */}
      {/* Public Pages */}
      {/* <Route path="/" element={<Home />} />
      <Route path="/home/:id/blogs" element={<HomeBlogSection />} />
     
      <Route path="/packages" element={<PackagesList />} />
      <Route path="/packages/:packageId" element={<PackageDetailsWrapper />} />
      <Route path="/destinations" element={<Destination />} />
      <Route path="/register" element={<Registration />} /> */}
     
     
    {/* </CustomRoutes> */}

    {/* Common Header and Footer */}
    <CustomRoutes noLayout>
      <Route path="*" element={<DynamicHeader />} />
        <Route path="/" element={<Home />} />
       <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route path="/packages" element={<PackagesList />} />
      <Route path="/packages/:packageId" element={<PackageDetailsWrapper />} />
      <Route path="*" element={<Footer />} />
    </CustomRoutes>
  </Admin>
);

export default App;
