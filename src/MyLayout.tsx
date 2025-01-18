import React from "react";
import { Layout, Menu, LayoutProps, AppBar } from "react-admin";
import Sidebar from "./Sidebar";

// Custom Sidebar (Optional)
const MySidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => (
  <Sidebar {...props} />
);

// Custom Menu (Optional)
const MyMenu: React.FC<React.ComponentProps<typeof Menu>> = (props) => (
  <Menu {...props} />
);
const MyAppBar: React.FC = (props) => {
  return <AppBar {...props} title="Destination Vista" />;
};

// Custom Layout
const MyLayout: React.FC<LayoutProps> = (props) => (
  <>
    {/* <MyNavbar /> */}
    <Layout
      sx={{ display: "flex", "& .RaLayout-appFrame": { marginTop: 6 } }}
      {...props}
      appBar={MyAppBar}
      sidebar={MySidebar}
      menu={MyMenu}
    />
  </>
);

export default MyLayout;
