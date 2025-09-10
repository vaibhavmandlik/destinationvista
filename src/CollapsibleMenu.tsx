// src/CollapsibleMenu.tsx
import * as React from 'react';
import { useState } from 'react';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useTranslate } from 'react-admin';

interface CollapsibleMenuProps {
    menuName: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    defaultOpen?: boolean; // Add the new prop
}

const CollapsibleMenu = (props: CollapsibleMenuProps) => {
    const { menuName, icon, children, defaultOpen = false } = props; // Destructure defaultOpen with a default of false
    const [open, setOpen] = useState(defaultOpen); // Initialize state with defaultOpen
    const translate = useTranslate();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List sx={{ pt: 0, pb: 0 }}>
            <ListItemButton onClick={handleClick} sx={{ pl: 2 }}>
                {icon && <ListItemIcon sx={{ minWidth: 40 }}>{icon}</ListItemIcon>}
                <ListItemText primary={translate(menuName, { _: menuName })} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {children}
                </List>
            </Collapse>
        </List>
    );
};

export default CollapsibleMenu;