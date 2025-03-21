import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  ImageField,
  List,
  TextField,
} from "react-admin";

export const UserList = () => {
  return (
    <>
    <br/>
      <List>
        <Datagrid>
          <TextField source="id" />
          <ImageField source="profileImagePath" label={"Pic"} />
          <TextField source="category" label={'Role'} />
          <TextField source="firstName" />
          <TextField source="lastName" />
          <EmailField source="email" />
          <TextField source="referCode" />
          <EditButton variant="text" color="primary" />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" />
        </Datagrid>
      </List>
    </>
  );
};
