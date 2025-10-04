// src/MySidebar.tsx
import { Theme, useMediaQuery } from "@mui/material";
import { Menu, Sidebar, useSidebarState } from "react-admin";
import CollapsibleMenu from "./CollapsibleMenu";

// Import your icons for menu items AND for the collapsible menu headers
import {
    FaBookMedical,
    FaChartArea, // Example icon for Dashboard 2
    FaEnvelopeOpenText,
    FaHome, // Example icon for Dashboard 1
    FaUserEdit, // Example icon for Dashboard 2
} from "react-icons/fa";
import {
    PiEnvelopeSimpleBold,
    PiPackageBold,
    PiTicket,
    PiUserCircleBold
} from "react-icons/pi";

const MySidebar = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [open] = useSidebarState();

  // The 'hasVendors' variable needs to be defined or come from context/props
  const hasVendors = localStorage.getItem("selectedVendor"); // Replace with actual logic to get vendor ID

  return (
    <Sidebar
      sx={{
        md: {
          width: 200,
          flexShrink: 0,
          "& .RaSidebar-fixed": {
            position: "relative",
            transform: "none !important",
            transition: "none !important",
            height: "auto",
            borderRight: "1px solid lightgray",
          },
        },
      }}
      {...props}
    >
      <Menu>
        {/* Dashboard 1 with a new icon - Now defaultOpen is true */}
        <CollapsibleMenu
          menuName="Dashboard 1"
          icon={<FaHome size={22} />}
          defaultOpen={true} // Set this to true to make it open by default
        >
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to="/vendor/"
            primaryText="Stastistics"
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

        {/* Dashboard 2 with a new icon */}
        <CollapsibleMenu
          menuName="Dashboard 2"
          icon={<FaUserEdit size={22} />}
          // defaultOpen is false here by default (or explicitly set to false if desired)
        >
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to={"/vendor/vendor/" + hasVendors}
            primaryText="Edit Profile"
            leftIcon={<PiUserCircleBold size={22} />}
          />
        </CollapsibleMenu>

        {/* Dashboard 3 with a new icon */}
        <CollapsibleMenu
          menuName="Dashboard 3"
          icon={<FaEnvelopeOpenText size={22} />}
          // defaultOpen is false here by default
        >
          <Menu.Item
            sx={{ fontSize: "0.875rem" }}
            to="/vendor/mailingservice"
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
      </Menu>
    </Sidebar>
  );
};

export default MySidebar;
