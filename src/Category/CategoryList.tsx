import { Datagrid, DeleteWithConfirmButton, EditButton, ImageField, List, TextField, useGetIdentity } from "react-admin";

export const CategoryList = () => {
  const { data: user } = useGetIdentity();
  return (
    <List filter={{ vendorId: user?.vendorId }}>
    <Datagrid rowClick={false} bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="description" />
      <ImageField source="imagePath" />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
)};
