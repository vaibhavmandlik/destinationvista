import { FaUsers } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
} from "react-admin";
import useHasVendors from "../hook/useHasvendors";
import AgencyManagement from "../Vendor/AgencyManagement ";

export const UserList = () => {
  const hasVendors = useHasVendors(); 
  if(!hasVendors) 
    return (<>
   <AgencyManagement/>
    </>)
  return (
    <>
    
      <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
        <h2>User Operations</h2>
        <button className="btn btn-info">Email All Users</button>
      </div>

      <div className="row p-3">
        {/* KPI Cards */}
        <div
          className="card shadow-sm p-3 mb-3 m-2 border border-primary"
          style={{ maxWidth: "18rem", border: "none" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted mb-1">Total Users</p>
              <h3 className="mb-0">2,420</h3>
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-light"
              style={{ width: "50px", height: "50px" }}
            >
              <FaUsers className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div
          className="card shadow-sm p-3 mb-3 m-2 border border-success"
          style={{ maxWidth: "18rem", border: "none" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted mb-1">Active Users</p>
              <h3 className="mb-0">1,890</h3>
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-light"
              style={{ width: "50px", height: "50px" }}
            >
              <FaRunning size={24} color="#28a745" />
            </div>
          </div>
        </div>

        <div
          className="card shadow-sm p-3 mb-3 m-2 border border-danger"
          style={{ maxWidth: "18rem", border: "none" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted mb-1">Inactive Users</p>
              <h3 className="mb-0">530</h3>
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-light"
              style={{ width: "50px", height: "50px" }}
            >
              <FaUserAltSlash size={24} color="#dc3545" />
            </div>
          </div>
        </div>

        <div
          className="card shadow-sm p-3 mb-3 m-2 border border-primary"
          style={{ maxWidth: "18rem", border: "none" }}
        >
          <div className="card-body d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted mb-1">Recent Activity</p>
              <h3 className="mb-0">120</h3>
            </div>
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-light"
              style={{ width: "50px", height: "50px" }}
            >
              <FaSyncAlt size={24} color="#28a745" />
            </div>
          </div>
        </div>
      </div>

      <List>
        <Datagrid>
          <TextField source="id" />
          {/* <TextField source="category" /> */}
          <TextField source="firstName" />
          <TextField source="lastName" />
          <EmailField source="email" />
          <TextField source="referCode" />
          {/* <DateField source="createdBy" /> */}
          {/* <DateField source="createdOn" /> */}
          {/* <DateField source="updatedOn" /> */}
          {/* <CustomBooleanField source="enabled"  /> */}
          <EditButton variant="text" color="primary" />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" />
        </Datagrid>
      </List>
    </>
  );
};
