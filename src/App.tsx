import React from "react";
import {
  Admin,
  CustomRoutes,
  fetchUtils,
  List,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./User/UserList";
import { UserCreate } from "./User/UserCreate";
import { UserUpdate } from "./User/UserUpdate";
import { VendorList } from "./Vendor/VendorList";
import { VendorCreate } from "./Vendor/VendorCreate";
import { VendorUpdate } from "./Vendor/VendorUpdate";
import { PackageCreate } from "./Package/PackageCreate";
import { PackageList } from "./Package/PackageList";
import { PackageUpdate } from "./Package/PackageUpdate";
import VendorLayout from "./VendorLayout";
import theme from "./Theme";
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Footer from "./components/footer/Footer";
import DynamicHeader from "./components/header/DynamicHeader";
import AboutUs from "./pages/about/AboutUs";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/contact/Contact";
import PackageDetailsWrapper from "./pages/packages/PackageDetailsWrapper";
import PackagesList from "./pages/packages/PackagesList";
import Registration from "./pages/registration/Registration";
import Home from "./pages/home/Home";
import Destination from "./pages/destinations/Destination";
import BookingsHistory from "./pages/dropDown/BookingsHistory";
import PackageCart from "./pages/dropDown/PackageCart";
import Profile from "./pages/dropDown/Profile";
const apiUrl = import.meta.env.VITE_API_URL;
import VendorResistration from "./components/vendor/Register";
import authProvider from "./authProvider";
import MyLoginPage from "./pages/login/LoginPage";
import { dataProviders } from "./DataProviders";
import { BookingList } from "./Booking/BookingList";
import { DestinationList } from "./Destination/DestinationList";
import ViewDetails from "./Package/ViewDetails";
import { UserShow } from "./User/UserShow";
import VendorDashboard from "./VendorDashboard/VendorDashboard";
import AdminLayout from "./AdminLayout";
import { VendorListAdmin } from "./VendorAdmin/VendorList";
import { PackageAdminList } from "./PackageAdmin/PackageList";
import DestinationCreate from "./Destination/DestinationCreate";
import { PackageShow } from "./PackageAdmin/PackageShow";
const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const auth = localStorage?.getItem("auth");
  const { data } = auth ? JSON.parse(auth) : { data: null };
  options.headers.set("Authorization", `Bearer ${data?.accessToken}`);
  return fetchUtils.fetchJson(url, options);
};
const dataProvider = jsonServerProvider(apiUrl, httpClient);

const VendorRoute: React.FC = () => {
  return (
    <Admin
      basename="/vendor"
      dataProvider={dataProviders}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      layout={VendorLayout}
      theme={theme}
      dashboard={VendorDashboard}
    >
      
      <Resource
        name="vendor"
        list={VendorList}
        create={VendorCreate}
        edit={VendorUpdate}
      />
      <Resource
        name="package"
        list={PackageList}
        create={PackageCreate}
        edit={PackageUpdate}
        // show={ShowGuesser}
        show={ViewDetails}
      />
      <Resource name="booking" list={BookingList} />
      <Resource name="destination" list={DestinationList} />
      <Resource
      name="user"
      list={UserList}
      create={UserCreate}
      show={UserShow}
      edit={UserUpdate}
    />
    </Admin>
  );
};

const AdminRoute: React.FC = () => {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProviders}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      layout={AdminLayout}
      theme={theme}
      // dashboard={VendorDashboard}
    >
      
      <Resource
        name="vendor"
        list={VendorListAdmin}
        create={VendorCreate}
        edit={VendorUpdate}
      />
      <Resource
        name="package"
        list={PackageAdminList}
        edit={PackageUpdate}
        show={PackageShow}
        // show={ViewDetails}
      />
      <Resource name="booking" list={BookingList} />
      <Resource name="destination" list={DestinationList} create={DestinationCreate} />
      <Resource
      name="user"
      list={UserList}
      create={UserCreate}
      show={UserShow}
      edit={UserUpdate}
    />
    </Admin>
  );
};

const OpenRoute: React.FC = () => (
  <Admin basename="/open" dataProvider={dataProvider}>
    <CustomRoutes noLayout>
      <Route path="/vendorRegistration" element={<VendorResistration />} />
    </CustomRoutes>
  </Admin>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="destinations" element={<Destination />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<MyLoginPage/>} />
          <Route path="bookingshistory" element={<BookingsHistory/>}/>
          <Route path="packagecart" element={<PackageCart/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route
            path="packages"
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
          <Route path="packages/:id" element={<PackageDetailsWrapper />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="Vendor/*" element={<VendorRoute />} />
        <Route path="admin/*" element={<AdminRoute />} />
        <Route path="/open/*" element={<OpenRoute />} />
      </Routes>
    </Router>
  );
}

const Layout: React.FC = () => {
  return (
    <>
      <DynamicHeader />
      <main><Outlet /></main>
      <Footer />
    </>
  );
};


export default App;
