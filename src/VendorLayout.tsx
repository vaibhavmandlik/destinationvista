import React from "react";
import {
  Layout,
  Menu,
  LayoutProps,
  AppBar,
  TitlePortal,
} from "react-admin";
import {
  PiMountains,
  PiPackageBold,
  PiSuitcaseBold,
  PiTicket,
} from "react-icons/pi";
import {useLocale, useSidebarState } from "react-admin";
require('./mylayout.css');
import logo from "./assets/logo.svg";
import { SwitchVendor } from "./SwitchVendor";
import useHasVendors from "./hook/useHasvendors";

// Custom Sidebar (Optional)
export const MySidebar = ({ children }) => {
  const [open, setOpen] = useSidebarState();
  useLocale(); // force redraw on locale change

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
