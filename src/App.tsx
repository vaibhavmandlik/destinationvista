import React from "react";
import { Admin, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import jsonServerProvider from "ra-data-json-server";

import AboutUs from "./pages/about/AboutUs";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import PackagesList from "./pages/packages/PackagesList";

import LoginPage from "./pages/login/LoginPage";
import Registration from "./pages/registration/Registration";
import Blogs from "./pages/blogs/Blogs";
import DynamicHeader from "./components/header/DynamicHeader";
import PackageDetailsWrapper from "./pages/packages/PackageDetailsWrapper";
import Footer from "./components/footer/Footer";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App: React.FC = () => (
  <Admin dataProvider={dataProvider} disableTelemetry>
    {/* Common Header and Footer */}
    <CustomRoutes noLayout>
      <Route path="*" element={<DynamicHeader />} />
      <Route path="/" element={<Home />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/loginpage" element={<LoginPage />} />
      <Route
        path="/packages"
        element={
          <PackagesList
            heading={""}
            subheading={""}
            packages={[]}
            onDetailsBookNowClick={function (): void {
              throw new Error("Function not implemented.");
            }}
            onExploreMoreClick={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        }
      />
      <Route path="/packages/:packageId" element={<PackageDetailsWrapper />} />
      <Route path="*" element={<Footer />} />
    </CustomRoutes>
  </Admin>
);

export default App;
