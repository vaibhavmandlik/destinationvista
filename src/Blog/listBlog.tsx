import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  List,
  TextField,
  TextInput
} from "react-admin";

const BlogFilter = [
  <TextInput label="Search by blog ID" source="id" alwaysOn />,
  <TextInput label="Search by title" source="title" alwaysOn />,
];

export const listBlog = () => {
  return (
    <>
      <List filters={BlogFilter}>
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
