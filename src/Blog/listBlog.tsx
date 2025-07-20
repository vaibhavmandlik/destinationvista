import {
  Datagrid,
  EditButton,
  List,
  TextField,
  useGetIdentity,
} from 'react-admin';


export const listBlog = () => {
  const { data: user } = useGetIdentity();
  return (
    <>
      <List filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
           <TextField source="body" />
           <EditButton label='Edit/View' />
        </Datagrid>
      </List>
    </>
  );
};