import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
} from "react-admin";

export const UserList = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User Operations</h2>
        <button className="btn btn-primary">Email All Users</button>
      </div>

      <div className="row">
        {/* KPI Cards */}
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <h2>2,420</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <h2>1,890</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Inactive Users</h5>
              <h2>530</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Average Session</h5>
              <h2>24m</h2>
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
          <EditButton />
          <DeleteWithConfirmButton />
        </Datagrid>
      </List>
    </>
  );
};
