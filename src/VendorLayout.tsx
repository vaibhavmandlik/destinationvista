import React, { useEffect } from "react";
import {
  Layout,
  Menu,
  LayoutProps,
  AppBar,
  TitlePortal,
  useGetList,
  useGetIdentity,
  useLogout,
} from "react-admin";
import {
  FaBookMedical,
  FaChartArea,
  FaChartLine,
  FaHome,
} from "react-icons/fa";
import {
  PiEnvelopeSimpleBold,
  PiLockKeyBold,
  PiPackageBold,
  PiTicket,
  PiUserCircleBold,
  PiUsers,
} from "react-icons/pi";
import { SidebarClasses, useLocale, useSidebarState } from "react-admin";
import "./mylayout.css";
import logo from "./assets/logo.svg";
import { SwitchVendor } from "./SwitchVendor";
import useHasVendors from "./hook/useHasvendors";

import { useState } from "react";
import { Box, Button, Collapse, MenuItem } from "@mui/material";

// Custom Sidebar (Optional)
export const MySidebar = ({ children }) => {
  useLocale(); // force redraw on locale change
  return (
    <>
      <div className="RaSidebar-fixed">{children}</div>{" "}
    </>
  );
};
function CollapsibleMenu({ children, ...props }) {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button onClick={() => setOpen((prev) => !prev)}>{props.menuName}</Button>
      <Collapse in={open} timeout={400}>
        <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 2, mt: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}

export const MyMenu = () => {
  const hasVendors = useHasVendors();
  const { data: user, isLoading: isUserLoading } = useGetIdentity();
  const logout = useLogout();
  const { data: VendorList, isLoading } = useGetList("vendor", {
    filter: { userId: user?.id },
  });
  const [open] = useSidebarState();
  const data =
    VendorList?.map((item: any) => ({
      value: item.id,
      label: item.agencytitle,
    })) || [];
  // const approvedVendors = VendorList?.filter(
  //   (vendor: any) => vendor.isApproved === "1"
  // );
  // useEffect(() => {
  //   if (isLoading) return;
  //   debugger;
  //   if (data.length === 1 && approvedVendors?.length == 0) {
  //     debugger;
  //     logout();
  //   }
  // }, [data,isLoading]);
  useEffect(() => {
    if (isLoading || isUserLoading) return;
    if (data.length >= 1 && user?.isApproved !== "1") {
      alert("Your account is not approved yet. Please contact support.");
      logout();
    }
  }, [isLoading, isUserLoading]);
  return (
    <Menu>
      <br />
      <br />
      <img src={logo} alt="logo" className="logo" />
      {open && <SwitchVendor />}
      <hr />
      {hasVendors && data.length > 0 && (
        <>
          <CollapsibleMenu menuName="Dashboard 1">
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
          </CollapsibleMenu>
          <CollapsibleMenu menuName="Dashboard 2">
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
          </CollapsibleMenu>
          <CollapsibleMenu menuName="Dashboard 3">
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
          </CollapsibleMenu>
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
