import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
} from "react-admin";

export const VendorList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      {/* <ReferenceField source="userId" reference="users" /> */}
      <TextField source="agencyTitle" />
      <EmailField source="email" />
      <TextField source="contactNumber" />
      {/* <ReferenceField source="createdBy" reference="user">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="updatedBy" reference="user">
        <TextField source="email" />
      </ReferenceField> */}
      {/* <CustomBooleanField source="enabled" /> */}
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);
