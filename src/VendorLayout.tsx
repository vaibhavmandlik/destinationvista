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
  const hasVendors = useHasVendors();

  return (
    <Menu>
      <br />
      <br />
      <img src={logo} alt="logo" className="logo" />
      <SwitchVendor />
      <hr />

      <Menu.Item
        to="/vendor/vendor"
        primaryText="Agency"
        leftIcon={<PiSuitcaseBold />}
      />
      {hasVendors && (
        <>
          <Menu.Item
            to="/vendor/package"
            primaryText="Package"
            leftIcon={<PiPackageBold />}
          />
          <Menu.Item
            to="/vendor/booking"
            primaryText="Booking"
            leftIcon={<PiTicket />}
          />
          <Menu.Item
            to="/vendor/destination"
            primaryText="Destination"
            leftIcon={<PiMountains />}
          />
          <Menu.Item to="/vendor/support-ticket" primaryText="Support Ticket" leftIcon={<FaBookMedical />} />
          {/* <Menu.Item to="/vendor/user" primaryText="Users" leftIcon={<PiUserBold />} /> */}
        </>
      )}

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
const VendorLayout: React.FC<LayoutProps> = (props) => (
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

export default VendorLayout;
