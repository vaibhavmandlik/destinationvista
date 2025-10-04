import {
  Datagrid,
  EditButton,
  List,
  TextField,
  useGetIdentity,
  DeleteWithConfirmButton,
} from "react-admin";

export const listBlog = () => {
  const { data: user } = useGetIdentity();
  return (
    <>
      <List filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
          {/* <TextField source="body" /> */}
          <EditButton label="Edit/Show" variant="text" color="primary" />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" />
        </Datagrid>
      </List>
    </>
  );
};
