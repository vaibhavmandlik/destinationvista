import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  FunctionField,
  ImageField,
  List,
  TextField,
  TextInput,
} from "react-admin";

// ---------------- Filter Inputs ----------------
const destinationFilters = [
  <TextInput key="id" label="Search by Destination ID" source="id" alwaysOn />,
  <TextInput key="title" label="Search by Title" source="title" alwaysOn />,
];

export const DestinationList = () => {
  return (
    <List filters={destinationFilters}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="title" />
        {/* Render HTML safely */}
        <FunctionField
          label="Description"
          render={(record: any) => (
            <div
              style={{ whiteSpace: "normal", maxWidth: "400px" }}
              dangerouslySetInnerHTML={{ __html: record.description || "" }}
            />
          )}
        />
        <ImageField source="imagePath" />
        <EditButton variant="bootstrap" color="primary" />
        <DeleteWithConfirmButton variant="bootstrap" color="danger" />
      </Datagrid>
    </List>
  );
};