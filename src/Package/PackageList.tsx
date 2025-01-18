import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";

export const PackageList = () => (
  <>
    <div className="d-flex justify-content-between align-center mb-5 mt-3 p-3">
      <h2>Package Operations</h2>
      {/* <button className="btn btn-primary">Email all Vendors</button> */}
    </div>

    <div className="row m-2 ">
      {/* KPI Cards */}
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
    </div>
    <List>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField source="vendorId" reference="vendor">
          <TextField source="agencyTitle" />
        </ReferenceField>
        <TextField source="title" />
        <TextField source="description" />
        <CurrencyField locale="en-IN" currency="INR" source="price" />
        <NumberField source="durationDays" />
        <TextField source="destination" />
        <NumberField source="availableSlots" />
        {/* <NumberField source="approvedBy" /> */}
        <DateField source="approvedOn" />
        {/* <NumberField source="createdBy" />
            <DateField source="createdOn" />
            <NumberField source="updatedBy" />
            <DateField source="updatedOn" />
            <TextField source="enabled" /> */}
        <EditButton variant="bootstrap" color="primary" />
        <DeleteWithConfirmButton variant="bootstrap" color="danger" />
      </Datagrid>
    </List>
  </>
);
