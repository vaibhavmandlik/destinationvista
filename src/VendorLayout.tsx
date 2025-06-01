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
import { FaBookMedical, FaChartArea, FaChartLine, FaHome } from "react-icons/fa";
import {
  PiEnvelopeSimpleBold,
  PiLockKeyBold,
  PiPackageBold,
  PiTicket,
  PiUserCircleBold,
  PiUsers,
} from "react-icons/pi";
import { Drawer, Paper } from "@mui/material";
import { SidebarClasses, useLocale, useSidebarState } from "react-admin";
import "./mylayout.css";
import { Box } from "@mui/material";
import SearchBar from "./Search";
import logo from "./assets/logo.svg";
import { SwitchVendor } from "./SwitchVendor";
import useHasVendors from "./hook/useHasvendors";
import { JSONTree } from "react-json-tree";
import { Dashboard, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Custom Sidebar (Optional)
export const MySidebar = ({ children }) => {
  useLocale(); // force redraw on locale change
  return (
    <>
      <div className="RaSidebar-fixed">{children}</div>{" "}
    </>
  );
};

export const MyMenu = () => {
  const hasVendors = useHasVendors();
  const { data: user } = useGetIdentity();
  const { data: VendorList } = useGetList("vendor", {
    filter: { userId: user?.id },
  });
  const [open] = useSidebarState();
  const data =
    VendorList?.map((item: any) => ({
      value: item.id,
      label: item.agencytitle,
    })) || [];
  return (
    <Menu>
      <br />
      <br />
      <img src={logo} alt="logo" className="logo" />
      {open && <SwitchVendor />}
      <hr />
      {hasVendors && data.length > 0 && (
        <>
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to={"/vendor/"}
            primaryText="Dashboard"
            leftIcon={<FaChartArea size={22} />}
          />

          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to="/vendor/package"
            primaryText="Package"
            leftIcon={<PiPackageBold size={22} />}
          />
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to="/vendor/booking"
            primaryText="Booking"
            leftIcon={<PiTicket size={22} />}
          />

          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to={"/vendor/vendor/" + hasVendors}
            primaryText="Edit Profile"
            leftIcon={<PiUserCircleBold size={22} />}
          />
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to="/profile/forgot-password"
            primaryText="Forget Password"
            leftIcon={<PiLockKeyBold size={22} />}
          />
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to="/vendor/email"
            primaryText="Mailing Services"
            leftIcon={<PiEnvelopeSimpleBold size={22} />}
          />
          <Menu.Item
            to="/vendor/ticket"
            sx={{ fontSize: "0.875rem" }}
            primaryText="Support Ticket"
            leftIcon={<FaBookMedical size={22} />}
          />
        </>
      )}
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
