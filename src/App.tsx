import React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserList } from "./User/UserList";
import { UserCreate } from "./User/UserCreate";
import { UserUpdate } from "./User/UserUpdate";
import { VendorList } from "./Vendor/VendorList";
import { VendorCreate } from "./Vendor/VendorCreate";
import { VendorUpdate } from "./Vendor/VendorUpdate";
import { PackageCreate } from "./Package/PackageCreate";
import { PackageList } from "./Package/PackageList";
import { PackageUpdate } from "./Package/PackageUpdate";
const apiUrl = import.meta.env.VITE_API_URL;
const dataProvider = jsonServerProvider(apiUrl);
//authProvider={authProvider}
const App: React.FC = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="user"
      list={UserList}
      create={UserCreate}
      edit={UserUpdate}
    />
    <Resource
      name="vendor"
      list={VendorList}
      create={VendorCreate}
      edit={VendorUpdate}
    />
    <Resource
      name="package"
      list={PackageList}
      create={PackageCreate}
      edit={PackageUpdate}
    />
  </Admin>
);

export default App;
