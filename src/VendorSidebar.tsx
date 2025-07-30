// src/MySidebar.tsx
import * as React from 'react';
import { Sidebar, Menu, useSidebarState } from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';
import CollapsibleMenu from './CollapsibleMenu';

// Import your icons for menu items AND for the collapsible menu headers
import {
    FaChartArea, FaBookMedical,
    FaHome, // Example icon for Dashboard 1
    FaUserEdit, // Example icon for Dashboard 2
    FaEnvelopeOpenText // Example icon for Dashboard 3
} from 'react-icons/fa';
import { PiPackageBold, PiTicket, PiUserCircleBold, PiLockKeyBold, PiEnvelopeSimpleBold } from 'react-icons/pi';


const MySidebar = (props: any) => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const [open] = useSidebarState();

    // The 'hasVendors' variable needs to be defined or come from context/props
    const hasVendors = localStorage.getItem('selectedVendor'); // Replace with actual logic to get vendor ID

    return (
        <Sidebar
            sx={{
                md: {
                    width: 200,
                    flexShrink: 0,
                    '& .RaSidebar-fixed': {
                        position: 'relative',
                        transform: 'none !important',
                        transition: 'none !important',
                        height: 'auto',
                        borderRight: '1px solid lightgray',
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
                    {/* <Menu.Item
                        sx={{ fontSize: "0.875rem" }}
                        to="/profile/forgot-password"
                        primaryText="Forget Password"
                        leftIcon={<PiLockKeyBold size={22} />}
                    /> */}
                </CollapsibleMenu>

                {/* Dashboard 3 with a new icon */}
                <CollapsibleMenu
                    menuName="Dashboard 3"
                    icon={<FaEnvelopeOpenText size={22} />}
                    // defaultOpen is false here by default
                >
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

            </Menu>
        </Sidebar>
    );
};

export default MySidebar;