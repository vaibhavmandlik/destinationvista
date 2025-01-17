import React from "react";
import { Layout, Menu, LayoutProps, AppBar, TitlePortal } from "react-admin";
import Sidebar from "./Sidebar";
// Custom Sidebar (Optional)
const MySidebar: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => (
  <Sidebar {...props} />
);

// Custom Menu (Optional)
const MyMenu: React.FC<React.ComponentProps<typeof Menu>> = (props) => (
  <Menu {...props} />
);

const Search: React.FC = () => {
  // materil-ui search input with icon
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Search"
        style={{
          border: "none",
          outline: "none",
          padding: "5px",
          borderRadius: "5px",
        }}
      />
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </div>
  );
};

const MyAppBar: React.FC = (props) => {
  return (
    <AppBar {...props}>
      <TitlePortal />
      <Search />
    </AppBar>
  );
};

// Custom Layout
const MyLayout: React.FC<LayoutProps> = (props) => (
  <>
    {/* <MyNavbar /> */}
    <Layout
      sx={{ display: "flex", "& .RaLayout-appFrame": { marginTop: 0 } }}
      {...props}
      appBar={MyAppBar}
      sidebar={MySidebar}
      menu={MyMenu}
    />
  </>
);

export default MyLayout;
