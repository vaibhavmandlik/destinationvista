// src/VendorLayout.jsx
import * as React from 'react';
import { Layout } from 'react-admin';
import VendorSidebar from './VendorSidebar';
import MyAppBar from './VendorAppBar';

const VendorLayout = (props:any) => (
    <Layout
        {...props}
        sidebar={VendorSidebar}
        appBar={MyAppBar} // Use your custom AppBar
    />
);

export default VendorLayout;