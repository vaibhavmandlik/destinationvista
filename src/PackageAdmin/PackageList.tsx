import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceManyCount,
  ShowButton,
  TextField,
  useGetIdentity,
  WrapperField,
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";
import { Chip } from "@mui/material";
import { Close } from "@mui/icons-material";

import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  AccountBox as AccountBoxIcon,
} from "@mui/icons-material";
import ImageField from "../components/CustomFields/ImageField";
import StatusDropdown from "./StatusDropdown";

export const PackageAdminList = () => {
  const { data: user } = useGetIdentity();

  return (
    <>
      <div>
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            startIcon={<HomeIcon />}
          >
            Packages
          </Link>
          {/* <Link component={RouterLink} to="/account" color="inherit" startIcon={<AccountBoxIcon />}>
          Account
        </Link> */}
          <Typography color="textPrimary">Package List</Typography>
        </Breadcrumbs>
      </div>
      {/* <div className="d-flex justify-content-between align-center mb-5 mt-3 p-3">
      <h2>Package Operations</h2>
    
    </div> */}

      {/* <div className="row m-2 ">
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title medium">Total Packages</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">2,502</h2>
              <i
                className="bi bi-boxes"
                style={{ fontSize: "2rem", color: "blue" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Approved Packages</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">1,500</h2>
              <i
                className="bi bi-box-seam"
                style={{ fontSize: "2rem", color: "green" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Unapproved Packages</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">400</h2>
              <i
                className="bi bi-journal-x"
                style={{ fontSize: "2rem", color: "red" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Average Bookings</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">200</h2>
              <i
                className="bi bi-journal-text"
                style={{ fontSize: "2rem", color: "black" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div> */}
      <List filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          
          <ImageField source="imagePaths" />
          {/* <ReferenceField source="vendorId" reference="vendor">
          <TextField source="agencyTitle" />
        </ReferenceField> */}
          <TextField source="title" />
          {/* <TextField source="description" /> */}
          <CurrencyField locale="en-IN" currency="INR" source="price" />
          <NumberField label={"duration"} source="durationDays" />
          <TextField source="destination" />
          <ReferenceManyCount
            label="Booking"
            reference="booking"
            target="packageId"
            link
          />
          <NumberField label="available" source="availableSlots" />

          {/* <NumberField source="approvedBy" /> */}
          {/* <DateField source="approvedOn" /> */}
          {/* <FunctionField
            label="Approved On"
            render={(record) =>
              !record.approvedOn ? (
                <Chip
                  sx={{ background: "#dc3545", color: "#fff" }}
                  label="Approval Pending"
                />
              ) : (
                record.approvedOn
              )
            }
          /> */}
          {/* <NumberField source="createdBy" />
            <DateField source="createdOn" />
            <NumberField source="updatedBy" />
            <DateField source="updatedOn" />
            <TextField source="enabled" /> */}
          <FunctionField
            source=""
            render={(record) => (
              <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                <StatusDropdown source="status" />
                <ShowButton variant="bootstrap" label="Details" color="info" />
                <EditButton variant="bootstrap" color="primary" />
                <DeleteWithConfirmButton variant="bootstrap" color="danger" />
              </div>
            )}
          />
        </Datagrid>
      </List>
    </>
  );
};
