// src/AdminLayout1.jsx
import * as React from 'react';
import { Layout } from 'react-admin';
import MyAppBar from './VendorAppBar';
import AdminSideBar from './AdminSidebar';

const AdminLayout1 = (props:any) => (
    <Layout
        {...props}
        sidebar={AdminSideBar}
        appBar={MyAppBar} // Use your custom AppBar
    />
);

export default AdminLayout1;