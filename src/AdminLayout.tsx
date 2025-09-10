import React from "react";
import {
  Layout,
  Menu,
  LayoutProps,
  AppBar,
  TitlePortal,
  useGetList,
  useGetIdentity,
} from "react-admin";
import Sidebar from "./Sidebar";
import { FaBookMedical } from "react-icons/fa";
import {
  PiEnvelopeSimpleBold,
  PiMountains,
  PiPackageBold,
  PiSuitcaseBold,
  PiTicket,
  PiUserBold,
  PiUsers,
} from "react-icons/pi";
import { Drawer } from "@mui/material";
import { SidebarClasses, useLocale, useSidebarState } from "react-admin";
import "./mylayout.css";
import { Box } from "@mui/material";
import SearchBar from "./Search";
import logo from "./assets/logo.svg";
import { SwitchVendor } from "./SwitchVendor";
import useHasVendors from "./hook/useHasvendors";

// Custom Sidebar (Optional)
export const MySidebar = ({ children }) => {
  const [open, setOpen] = useSidebarState();
  useLocale(); // force redraw on locale change

  const toggleSidebar = () => setOpen(!open);

  return (
    <>
      <div className="RaSidebar-fixed">{children}</div>
    </>
  );
};
export const MyMenu = () => {
  return (
    <Menu>
      <br />
      <br />
      <img src={logo} alt="logo" className="logo" />
      <hr />

      <Menu.Item
        to="/admin/vendor"
        primaryText="Agency"
        leftIcon={<PiSuitcaseBold />}
      />
      {
        <>
          <Menu.Item
            to="/admin/package"
            primaryText="Package"
            leftIcon={<PiPackageBold />}
          />
          <Menu.Item
            to="/admin/booking"
            primaryText="Booking"
            leftIcon={<PiTicket />}
          />
          <Menu.Item
            to="/admin/destination"
            primaryText="Destination"
            leftIcon={<PiMountains />}
          />
          <Menu.Item leftIcon={<FaBookMedical />} to="/admin/blog" primaryText="Blog" />
          <Menu.Item
            to="/admin/user"
            primaryText="Users"
            leftIcon={<PiUserBold />}
          />
          <Menu.Item
            to="/admin/support"
            primaryText="Support"
            leftIcon={<PiTicket />}
          />
        </>
      }
      <Menu.Item
        sx={{ fontSize: "0.875rem" }}
        to="/admin/email"
        primaryText="Mailing Services"
        leftIcon={<PiEnvelopeSimpleBold size={22} />}
      />
      {/* <Menu.Item to="/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />}/>
      <Menu.Item to="/users" primaryText="Users" leftIcon={<PeopleIcon />}/>
      <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/> */}
    </Menu>
  );
};

const MyAppBar: React.FC = (props) => {
  return (
    <AppBar {...props}>
      <TitlePortal />

      {/* <SearchBar /> */}
    </AppBar>
  );
};

// Custom Layout
const AdminLayout: React.FC<LayoutProps> = (props) => (
  <>
    {/* <MyNavbar /> */}
    <Layout
      sx={{
        display: "flex",
        "& .RaLayout-appFrame": { marginTop: 0 },
        "& .RaLayout-content": { paddingTop: 5 },
      }}
      {...props}
      appBar={MyAppBar}
      sidebar={MySidebar}
      menu={MyMenu}
    />
  </>
);

export default AdminLayout;
