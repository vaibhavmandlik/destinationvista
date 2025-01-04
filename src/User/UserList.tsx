import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
} from "react-admin";

export const UserList = () => (
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
);
