import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  PiChartBarBold,
  PiChatCircleDotsBold,
  PiCreditCardBold,
  PiEnvelopeSimpleBold,
  PiLockKeyBold,
  PiMountains,
  PiPackageBold,
  PiSuitcaseBold,
  PiTicket,
  PiTicketBold,
  PiUserBold,
  PiUserCircleBold,
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
import { JSONTree } from "react-json-tree";
import { Home } from "@mui/icons-material";

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

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const { data: user } = useGetIdentity();
  const { data: VendorList } = useGetList('vendor', { filter: { 'userId': user?.id } });
  const data = VendorList?.map((item: any) => ({ value: item.id, label: item.agencytitle })) || [];
  return (
    <Menu>
      <br />
      <br />
      <img src={logo} alt="logo" className="logo" />
      <SwitchVendor />
      <hr />
      {(hasVendors && data.length > 0) && <>
        {/* Dashboard 1 */}
        <div className="menu-section">
          <div
            className="menu-section-header"
            onClick={() => setOpen1((prev) => !prev)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "8px 0",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            <span>Dashboard 1</span>
            <span style={{ marginLeft: "auto" }}>
              {open1 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {open1 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden", marginLeft: "10px", marginTop: "8px" }}
              >
               <Menu.Item to={"/vendor/"} primaryText="Home" leftIcon={<Home/>}/>
                <Menu.Item
                to="/vendor/vendor"
                primaryText="Agency"
                leftIcon={<PiSuitcaseBold />}
              />

                {(
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
                    {/* <Menu.Item
                      to="/vendor/destination"
                      primaryText="Destination"
                      leftIcon={<PiMountains />}
                    />
                    <Menu.Item
                      to="/vendor/support-ticket"
                      primaryText="Support Ticket"
                      leftIcon={<FaBookMedical />}
                    /> */}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard 2 */}
        <div className="menu-section">
          <div
            className="menu-section-header"
            onClick={() => setOpen2((prev) => !prev)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "8px 0",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            <span>Dashboard 2</span>
            <span style={{ marginLeft: "auto" }}>
              {open2 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {open2 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden", marginLeft: "10px", marginTop: "8px" }}
              >
                <Menu.Item
                  to="/profile/edit"
                  primaryText="Edit Profile"
                  leftIcon={<PiUserCircleBold />}
                />
                <Menu.Item
                  to="/profile/forgot-password"
                  primaryText="Forget Password"
                  leftIcon={<PiLockKeyBold />}
                />
                {/* <Menu.Item
                  to="/vendor/statistics"
                  primaryText="Vendor Statistics"
                  leftIcon={<PiChartBarBold />}
                /> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dashboard 3 */}
        <div className="menu-section">
          <div
            className="menu-section-header"
            onClick={() => setOpen3((prev) => !prev)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              padding: "8px 0",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            <span>Dashboard 3</span>
            <span style={{ marginLeft: "auto" }}>
              {open3 ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          </div>

          <AnimatePresence initial={false}>
            {open3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden", marginLeft: "10px", marginTop: "8px" }}
              >
                <Menu.Item
                  to="/admin/mailing-services"
                  primaryText="Mailing Services"
                  leftIcon={<PiEnvelopeSimpleBold />}
                />
                <Menu.Item
                  to="/admin/connection"
                  primaryText="Chat with super Admin"
                  leftIcon={<PiChatCircleDotsBold />}
                />
                <Menu.Item
                      to="/vendor/ticket"
                      primaryText="Support Ticket"
                      leftIcon={<FaBookMedical />}
                    />
                {/* <Menu.Item
                  to="/admin/tickets"
                  primaryText="Ticket Rising"
                  leftIcon={<PiTicketBold />}
                />
                <Menu.Item
                  to="/admin/payments"
                  primaryText="Payments Received"
                  leftIcon={<PiCreditCardBold />}
                /> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>}
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
