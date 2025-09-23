// // AdminSupport.tsx
// import { Container, Snackbar, Alert } from "@mui/material";
// import AdminTicketList from "./AdminTicketList";

// interface Ticket {
//   subject: string;
//   description: string;
//   category: string;
//   priority: string;
//   status: string;
// }

// export default function AdminSupport() {
//     const [tickets, setTickets] = useState<Ticket[]>([
//         {
//           subject: "Login Issue",
//           description: "Unable to log in with vendor account",
//           category: "Technical",
//           priority: "High",
//           status: "Open",
//         },
//         {
//           subject: "Invoice not generated",
//           description: "Invoice is missing after transaction",
//           category: "Billing",
//           priority: "Medium",
//           status: "In Progress",
//         },
//         {
//           subject: "Need account reset",
//           description: "Forgot password and security answer",
//           category: "Technical",
//           priority: "High",
//           status: "Resolved",
//         },
//         {
//           subject: "Change billing cycle",
//           description: "Requesting change of billing cycle from monthly to quarterly",
//           category: "Billing",
//           priority: "Low",
//           status: "Open",
//         },
//         {
//           subject: "Feedback submission",
//           description: "How to submit platform feedback?",
//           category: "General",
//           priority: "Low",
//           status: "Open",
//         },
//       ]);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   const updateTicketStatus = (index: number, newStatus: string) => {
//     const updated = [...tickets];
//     updated[index].status = newStatus;
//     setTickets(updated);
//     setSnackbarOpen(true);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <AdminTicketList tickets={tickets} onStatusChange={updateTicketStatus} />
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert severity="info">Ticket status updated</Alert>
//       </Snackbar>
//     </Container>
//   );
// }

import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SelectField,
  useRecordContext,
  useUpdate,
  ReferenceField,
  SelectInput,
  TextInput,
} from "react-admin";
import { Box, Typography, Select, MenuItem, Chip, colors } from "@mui/material";

const statusChoices = [
  { id: "Open", name: "Open" },
  { id: "In Progress", name: "In Progress" },
  { id: "Resolved", name: "Resolved" },
];

const priorityChoices = [
  { id: "Low", name: "Low" },
  { id: "Medium", name: "Medium" },
  { id: "High", name: "High" },
];

const StatusDropdown = () => {
  const record = useRecordContext();
  const [status, setStatus] = React.useState(record?.status || "");
  const [update] = useUpdate();
  const [color, setColor] = React.useState("");
  const statusColors: Record<string, string> = {
    Open: "#f44336",
    "In Progress": "#ff9800",
    Resolved: "#4caf50",
  };
  if (!record) return null;

  const handleChange = (event: any) => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    update(
      "ticket", // resource name
      { id: record.id, data: { ...record, status: newStatus } },
      { mutationMode: "pessimistic" }
    );

    setColor(statusColors[newStatus]);
  };

  return (
    <>
      {status === "Resolved" ? (
        <Chip
          label={"Resolved"}
          style={{ backgroundColor: "#4caf50", color: "#fff" }}
        />
      ) : (
        <Select
          value={status}
          onChange={handleChange}
          size="small"
          sx={{ minWidth: 120, backgroundColor: `${color}` }}
        >
          {statusChoices.map((choice) => (
            <MenuItem key={choice.id} value={choice.id}>
              {choice.name}
            </MenuItem>
          ))}
        </Select>
      )}
    </>
  );
};

// 🔎 Filters
const ticketFilters = [
  <TextInput label="Search by ticket ID" source="id" alwaysOn />,
  <TextInput label="Search by subject" source="subject" alwaysOn />,
  <SelectInput alwaysOn
    label="Category"
    source="category"
    choices={[
      { id: "Billing", name: "Billing" },
      { id: "Technical", name: "Technical" },
      { id: "General", name: "General" },
    ]}
  />,
  <SelectInput alwaysOn
    label="Priority"
    source="priority"
    choices={[
      { id: "Low", name: "Low" },
      { id: "Medium", name: "Medium" },
      { id: "High", name: "High" },
    ]}
  />,
  <SelectInput alwaysOn
    label="Status"
    source="status"
    choices={[
      { id: "Open", name: "Open" },
      { id: "In Progress", name: "In Progress" },
      { id: "Resolved", name: "Resolved" },
    ]}
  />,
];

export default function AdminSupport() {
  return (
    <Box sx={{ m: 4 }}>
      <Typography variant="h4" gutterBottom>
        Support Tickets
      </Typography>
      <List resource="ticket" filters={ticketFilters}>
        <Datagrid>
          <TextField source="id" label="id" />
          <ReferenceField source="raisedBy" reference="user">
            <TextField source="firstName" label="Raise by" />
          </ReferenceField>
          <TextField source="subject" />
          <TextField source="description" />
          <TextField source="category" />
          <SelectField source="priority" choices={priorityChoices} />
          <StatusDropdown />
        </Datagrid>
      </List>
    </Box>
  );
}
