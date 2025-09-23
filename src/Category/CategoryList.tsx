import {
  Datagrid,
  DeleteWithConfirmButton,
  ImageField,
  List,
  TextField,
  TextInput
} from "react-admin";

// 🔎 Filters
const categoryFilters = [
  <TextInput label="Search by category ID" source="id" alwaysOn />,
  <TextInput label="Search by name" source="name" alwaysOn />,
];

export const CategoryList = () => {
  return (
    <List filters={categoryFilters}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="description" />
        <ImageField source="imagePath" />
        <DeleteWithConfirmButton />
      </Datagrid>
    </List>
  );
};
