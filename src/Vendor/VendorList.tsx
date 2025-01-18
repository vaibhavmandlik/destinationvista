import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
  ReferenceField,
} from "react-admin";

export const VendorList = () => (
  <>
    <div className="d-flex justify-content-between align-center mb-5 mt-3 p-3">
      <h2>Vendor Operations</h2>
      <button className="btn btn-primary">Email all Vendors</button>
    </div>

    <div className="row m-2 ">
      {/* KPI Cards */}
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title medium">Total Vendors</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">2,420</h2>
              <i
                className="bi bi-people-fill"
                style={{ fontSize: "2rem", color: "blue" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card  shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Active Vendors </h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">1,890</h2>
              <i
                className="bi bi-person-check-fill"
                style={{ fontSize: "2rem", color: "green" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card  shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Inactive Vendors</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">530</h2>
              <i
                className="bi bi-person-fill-slash"
                style={{ fontSize: "2rem", color: "red" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Average Session</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">24m</h2>
              <i
                className="bi bi-clock-history"
                style={{ fontSize: "2rem", color: "#555" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <List>
      <Datagrid>
        <TextField source="id" />
        {/* <ReferenceField source="userId" reference="users" /> */}
        <TextField source="agencyTitle" />
        <EmailField source="email" />
        <TextField source="contactNumber" />
        <ReferenceField source="createdBy" reference="user" label="Vendor Name">
          <TextField source="firstName" />
        </ReferenceField>
        {/* <ReferenceField source="updatedBy" reference="user">
        <TextField source="email" />
        </ReferenceField> */}
        {/* <CustomBooleanField source="enabled" /> */}
        <EditButton variant="bootstrap" color="primary" />
        <DeleteWithConfirmButton variant="bootstrap" color="danger" />
      </Datagrid>
    </List>
  </>
);
