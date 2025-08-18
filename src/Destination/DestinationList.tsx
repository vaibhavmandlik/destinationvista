import { Datagrid, DeleteWithConfirmButton, EditButton, ImageField, List, TextField, useGetIdentity } from "react-admin";

export const DestinationList = () => {
  const { data: user } = useGetIdentity();
  return (
    <List filter={{ vendorId: user?.vendorId }}>
    <Datagrid rowClick={false} bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <ImageField source="imagePath" />
      <EditButton variant="bootstrap" color="primary" />
      <DeleteWithConfirmButton variant="bootstrap" color="danger" />
    </Datagrid>
  </List>
)};
