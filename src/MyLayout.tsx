import React from "react";
import { Layout, Menu, LayoutProps } from "react-admin";
import Sidebar from "./Sidebar";

// Custom Sidebar (Optional)
const MySidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => (
  <Sidebar {...props} />
);

// Custom Menu (Optional)
const MyMenu: React.FC<React.ComponentProps<typeof Menu>> = (props) => (
  <Menu {...props} />
);

// Custom Layout
const MyLayout: React.FC<LayoutProps> = (props) => (
  <>
    {/* <MyNavbar /> */}
    <Layout
      sx={{
        display: "flex",
        "& .RaLayout-appFrame": { marginTop: 0 },
        "& .RaLayout-content": { backgroundColor: "#f6f7f8" },
      }}
      {...props}
      appBar={() => null} // Disable Material-UI AppBar
      sidebar={MySidebar}
      menu={MyMenu}
    />
  </>
);

export default MyLayout;
