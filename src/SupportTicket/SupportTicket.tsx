// SupportTicket.tsx
import React, { useState } from "react";
import { Container, Typography, Grid, Snackbar, Alert } from "@mui/material";
import CreateTicket from "./CreateTicket";
import TicketList from "./TicketList";


interface Ticket {
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
}

export default function SupportTicket() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const addTicket = (ticket: Omit<Ticket, 'status'>) => {
    setTickets([...tickets, { ...ticket, status: "Open" }]);
    setSnackbarOpen(true);
  };

  const updateTicketStatus = (index: number, newStatus: string) => {
    const updated = [...tickets];
    updated[index].status = newStatus;
    setTickets(updated);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Support Ticket System
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <CreateTicket onAddTicket={addTicket} />
        </Grid>
        <Grid item xs={12}>
          <TicketList tickets={tickets} onStatusChange={updateTicketStatus} />
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success">Ticket submitted successfully!</Alert>
      </Snackbar>
    </Container>
  );
}
