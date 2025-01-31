import React from "react";
import { Layout, Menu, LayoutProps, AppBar, TitlePortal } from "react-admin";
import Sidebar from "./Sidebar";
import { FaBookMedical } from "react-icons/fa";
import { PiPackageBold, PiUserBold, PiUsers } from "react-icons/pi";
import { Drawer } from '@mui/material';
import { SidebarClasses, useLocale, useSidebarState } from 'react-admin';
import './mylayout.css';
import { Box } from '@mui/material';
import SearchBar from "./Search";
// Custom Sidebar (Optional)
export const MySidebar = ({ children }) => {
  const [open, setOpen] = useSidebarState();
  useLocale(); // force redraw on locale change

  const toggleSidebar = () => setOpen(!open);

  return (
         <>
         <div className="RaSidebar-fixed">
         {children}
         </div>
         </>
      
  );
};
export const MyMenu = () => (
  <Menu>
    <br/>
    <br/>
      <Menu.Item to="/admin/package" primaryText="Packages" leftIcon={<PiPackageBold />}/>
      <Menu.Item to="/admin/user" primaryText="Users" leftIcon={<PiUserBold />}/>
      <Menu.Item to="/admin/vendor" primaryText="Vendors" leftIcon={<PiUsers />}/>
      {/* <Menu.Item to="/comments" primaryText="Comments" leftIcon={<ChatBubbleIcon />}/>
      <Menu.Item to="/users" primaryText="Users" leftIcon={<PeopleIcon />}/>
      <Menu.Item to="/custom-route" primaryText="Miscellaneous" leftIcon={<LabelIcon />}/> */}
  </Menu>
);



const MyAppBar: React.FC = (props) => {
  return (
    <AppBar {...props}>
      <TitlePortal />
      <Box component="span" flex={1} />
      <h1 className="m-0 text-primary"><span className="text-white">DESTINATION</span>VISTA</h1>
      <Box component="span" flex={1} />
      <SearchBar />
    </AppBar>
  );
};

// Custom Layout
const MyLayout: React.FC<LayoutProps> = (props) => (
  <>
    {/* <MyNavbar /> */}
    <Layout
      sx={{
        display: "flex",
        "& .RaLayout-appFrame": { marginTop: 0 },
        "& .RaLayout-content": { paddingTop:5},
      }}
      {...props}
      appBar={MyAppBar}
      sidebar={MySidebar}
      menu={MyMenu}
    />
  </>
);

export default MyLayout;
