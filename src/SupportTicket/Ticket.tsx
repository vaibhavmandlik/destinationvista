import { Paper, TableContainer } from "@mui/material";
import {
  Datagrid,
  DateField,
  List,
  SelectInput,
  TextField,
  TextInput,
} from "react-admin";

// 🔎 Filters
const ticketFilters = [
  <TextInput label="Search by ticket ID" source="id" alwaysOn />,
  <TextInput label="Search by subject" source="subject" />,
  <SelectInput
    label="Category"
    source="category"
    choices={[
      { id: "Billing", name: "Billing" },
      { id: "Technical", name: "Technical" },
      { id: "General", name: "General" },
    ]}
  />,
  <SelectInput
    label="Priority"
    source="priority"
    choices={[
      { id: "Low", name: "Low" },
      { id: "Medium", name: "Medium" },
      { id: "High", name: "High" },
    ]}
  />,
  <SelectInput
    label="Status"
    source="status"
    choices={[
      { id: "Open", name: "Open" },
      { id: "In Progress", name: "In Progress" },
      { id: "Resolved", name: "Resolved" },
    ]}
  />,
];

export const TicketList = () => (
  <List filters={ticketFilters}>
    <TableContainer component={Paper}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="subject" />
        <TextField source="description" />
        <TextField source="category" />
        <TextField source="priority" />
        <TextField source="status" />
        <DateField source="createdOn" />
      </Datagrid>
    </TableContainer>
  </List>
);
