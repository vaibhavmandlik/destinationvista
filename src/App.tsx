import jsonServerProvider from "ra-data-json-server";
import React from "react";
import {
  Admin,
  CustomRoutes,
  fetchUtils,
  Resource
} from "react-admin";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminLayout1 from "./AdminLayout1";
import AdminSupport from "./AdminSupport/AdminSupport";
import { UpdateBlog } from "./Blog/UpdateBlog";
import { createBlog } from "./Blog/createBlog";
import { listBlog } from "./Blog/listBlog";
import { BookingList } from "./Booking/BookingList";
import CategoryCreate from "./Category/CategoryCreate";
import { CategoryList } from "./Category/CategoryList";
import { dataProviders } from "./DataProviders";
import DestinationCreate from "./Destination/DestinationCreate";
import { DestinationList } from "./Destination/DestinationList";
import { DestinationUpdate } from "./Destination/DestinationUpdate";
import EmailToUsers from "./Email/EmailToUser";
import EmailToUserAdmin from "./EmailAdmin/EmailToUserAdmin";
import {
  EmailTemplateCreate,
  EmailTemplateEdit,
  EmailTemplateList,
} from "./EmailTemplate/createEmailTemplate";
import { LoginProvider } from "./LoginContext";
import OfferCreate from "./Offer/OfferCreate";
import { OfferList } from "./Offer/OfferList";
import OfferUpdate from "./Offer/OfferUpdate";
import { PackageCreate } from "./Package/PackageCreate";
import { PackageList } from "./Package/PackageList";
import { PackageUpdate } from "./Package/PackageUpdate";
import { PackageAdminCreate } from "./PackageAdmin/PackageCreate";
import { PackageAdminList } from "./PackageAdmin/PackageList";
import CreateTicket from "./SupportTicket/CreateTicket";
import SupportTicket from "./SupportTicket/SupportTicket";
import { TicketList } from "./SupportTicket/Ticket";
import theme from "./Theme";
import { UserCreate } from "./User/UserCreate";
import { UserList } from "./User/UserList";
import { UserShow } from "./User/UserShow";
import { UserUpdate } from "./User/UserUpdate";
import { VendorCreate } from "./Vendor/VendorCreate";
import { VendorCreateOpen } from "./Vendor/VendorCreateOpen";
import { VendorList } from "./Vendor/VendorList";
import { VendorUpdate } from "./Vendor/VendorUpdate";
import { VendorListAdmin } from "./VendorAdmin/VendorList";
import VendorDashboard from "./VendorDashboard/VendorDashboard";
import VendorLayout from "./VendorLayout";
import authProvider from "./authProvider";
import authProviderAdmin from "./authProviderAdmin";
import Footer from "./components/footer/Footer";
import DynamicHeader from "./components/header/DynamicHeader";
import VendorResistration from "./components/vendor/Register";
import { SearchProvider } from "./pages/Searchbar/SearchContext";
import AboutUs from "./pages/about/AboutUs";
import CookiesPolicy from "./pages/agreements/CookiesPolicy";
import DateRetension from "./pages/agreements/DateRetension";
import Disclaimer from "./pages/agreements/Disclaimer";
import GrievanceAndRedressel from "./pages/agreements/GrievanceAndRedressel";
import NewsLetter from "./pages/agreements/NewsLetter";
import PaymentPolicy from "./pages/agreements/PaymentPolicy";
import PrivateAndPolicy from "./pages/agreements/PrivateAndPolicy";
import RefundPolicy from "./pages/agreements/RefundPolicy";
import Rights from "./pages/agreements/Rights";
import Support from "./pages/agreements/Support";
import TermsAndCondition from "./pages/agreements/TermsAndCondition";
import VendorPolicy from "./pages/agreements/VendorPolicy";
import BlogDetail from "./pages/blogs/BlogDetail";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/contact/Contact";
import Destination from "./pages/destinations/Destination";
import DestinationDetails from "./pages/destinations/DestinationDetails";
import BookingsHistory from "./pages/dropDown/BookingsHistory";
import PackageCart from "./pages/dropDown/PackageCart";
import Profile from "./pages/dropDown/Profile";
import Faq from "./pages/faq/Faq";
import Home from "./pages/home/Home";
import ForgotPassword from "./pages/login/ForgotPassword";
import MyLoginPage from "./pages/login/LoginPage";
import LoginPageAdmin from "./pages/login/LoginPageAdmin";
import UserLoginPage from "./pages/login/UserLoginPage";
import PackageDetailsWrapper from "./pages/packages/PackageDetailsWrapper";
import PackagesList from "./pages/packages/PackagesList";
import Registration from "./pages/registration/Registration";

const apiUrl = import.meta.env.VITE_API_URL;
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
        edit={VendorUpdate}
      />
      <Resource
        name="package"
        list={PackageList}
        create={PackageCreate}
        edit={PackageUpdate}
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
      <Resource name="ticket" list={TicketList} create={CreateTicket} />
      <CustomRoutes>
        <Route path="/support-ticket" element={<SupportTicket />} />
        <Route
          path="/mailingservice"
          element={<EmailToUsers />}
        />
      </CustomRoutes>
    </Admin>
  );
};

const AdminRoute: React.FC = () => {
  return (
    <Admin
      basename="/admin"
      dataProvider={dataProviders}
      authProvider={authProviderAdmin}
      loginPage={LoginPageAdmin}
      layout={AdminLayout1}
      theme={theme}
    >
      <Resource
        name="vendor"
        list={VendorListAdmin}
        create={VendorCreate}
        edit={VendorUpdate}
      />
      <Resource
        name="package"
        create={PackageAdminCreate}
        list={PackageAdminList}
        edit={PackageUpdate}
        // show={ViewDetails}
      />
      <Resource
        name="blog"
        create={createBlog}
        list={listBlog}
        edit={UpdateBlog} // Assuming UpdateBlog is defined`
      />
      <Resource name="booking" list={BookingList} />
      <Resource
        name="destination"
        list={DestinationList}
        create={DestinationCreate}
        edit={DestinationUpdate}
      />
      <Resource name="category" list={CategoryList} create={CategoryCreate} />
      <Resource
        name="offer"
        list={OfferList}
        create={OfferCreate}
        edit={OfferUpdate}
      />
      <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserUpdate}
        show={UserShow}
      />
      <Resource
        name="cannedMail"
        list={EmailTemplateList}
        create={EmailTemplateCreate}
        edit={EmailTemplateEdit}
      />
      <CustomRoutes>
        <Route path="/support" element={<AdminSupport />} />
        <Route path="/email" element={<EmailToUserAdmin isAdmin={true} />} />
      </CustomRoutes>
    </Admin>
  );
};

const OpenRoute: React.FC = () => (
  <Admin basename="/open" dataProvider={dataProvider}>
    <CustomRoutes noLayout>
      <Route
        path="/vendorRegistration"
        element={<VendorResistration userType="1" />}
      />
      <Route path="/UserRegistration" element={<VendorResistration />} />
      <Route path="/login" element={<VendorResistration />} />
      <Route path="/agencyRegistration" element={<VendorCreateOpen />} />
    </CustomRoutes>
  </Admin>
);

const App: React.FC = () => {
  return (
    <Router>
      <LoginProvider>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="home" element={<Home />} />
              <Route path="destinations" element={<Destination />} />
              <Route path="destinations/:id" element={<DestinationDetails />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blog/:id" element={<BlogDetail />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="registration" element={<Registration />} />
              <Route path="loginpage" element={<UserLoginPage />} />
              <Route path="bookingshistory" element={<BookingsHistory />} />
              <Route path="packagecart" element={<PackageCart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="FAQ" element={<Faq />} />
              <Route path="terms" element={<TermsAndCondition />} />
              <Route path="privacy" element={<PrivateAndPolicy />} />

              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="support" element={<Support />} />
              <Route path="paymentpolicy" element={<PaymentPolicy />} />
              <Route path="newsletter" element={<NewsLetter />} />
              <Route path="refundpolicy" element={<RefundPolicy />} />
              <Route path="vendorpolicy" element={<VendorPolicy />} />
              <Route
                path="grievanceandredressalpolicy"
                element={<GrievanceAndRedressel />}
              />
              <Route path="cookiespolicy" element={<CookiesPolicy />} />
              <Route path="dateretension" element={<DateRetension />} />
              <Route path="rights" element={<Rights />} />
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
            <Route path="open/*" element={<OpenRoute />} />
            <Route path="vendor/forgotpass" element={<ForgotPassword />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </SearchProvider>
      </LoginProvider>
    </Router>
  );
};

const Layout: React.FC = () => {
  return (
    <>
      <DynamicHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
