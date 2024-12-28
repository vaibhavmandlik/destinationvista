import React from "react";
import { Admin, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import jsonServerProvider from "ra-data-json-server";
import TourPackages from "./pages/packages/TourPackages";


// Pages and Components
// import AboutUs from "./pages/about/AboutUs";
// import Home from "./pages/home/Home";
// import Contact from "./pages/contact/Contact";
// import PackagesList from "./pages/packages/PackagesList";
// import Destination from "./pages/destinations/Destination";
// import LoginPage from "./pages/login/LoginPage";
// import Registration from "./pages/registration/Registration";
// import Blogs from "./pages/blogs/Blogs";
// import DynamicHeader from "./components/header/DynamicHeader";
// import PackageDetailsWrapper from "./pages/packages/PackageDetailsWrapper";
// import Footer from "./components/footer/Footer";
// import StaticHeader from "./components/header/StaticHeader";
// import DestinationCategorySection from "./pages/home/HomeDestinationCategorySection";
// import Blogs from "./pages/blogs/Blogs";
// import BackToTop from "./pages/backtotop/BackToTop";

// import HomeBlogSection from "./pages/blogs/HomeBlogSection";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App: React.FC = () => (
  <Admin dataProvider={dataProvider} disableTelemetry>
    <CustomRoutes noLayout>
      {/* Common Header */}
      
      {/* <Route path="/" element={<TourPackages/>} /> */}
    </CustomRoutes>
  </Admin>
);

export default App;
