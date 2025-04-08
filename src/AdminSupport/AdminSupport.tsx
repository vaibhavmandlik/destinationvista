// AdminSupport.tsx
import React, { useState } from "react";
import { Container, Snackbar, Alert } from "@mui/material";
import AdminTicketList from "./AdminTicketList";

interface Ticket {
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
}

export default function AdminSupport() {
    const [tickets, setTickets] = useState<Ticket[]>([    
        {
          subject: "Login Issue",
          description: "Unable to log in with vendor account",
          category: "Technical",
          priority: "High",
          status: "Open",
        },
        {
          subject: "Invoice not generated",
          description: "Invoice is missing after transaction",
          category: "Billing",
          priority: "Medium",
          status: "In Progress",
        },
        {
          subject: "Need account reset",
          description: "Forgot password and security answer",
          category: "Technical",
          priority: "High",
          status: "Resolved",
        },
        {
          subject: "Change billing cycle",
          description: "Requesting change of billing cycle from monthly to quarterly",
          category: "Billing",
          priority: "Low",
          status: "Open",
        },
        {
          subject: "Feedback submission",
          description: "How to submit platform feedback?",
          category: "General",
          priority: "Low",
          status: "Open",
        },
      ]);
    
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const updateTicketStatus = (index: number, newStatus: string) => {
    const updated = [...tickets];
    updated[index].status = newStatus;
    setTickets(updated);
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <AdminTicketList tickets={tickets} onStatusChange={updateTicketStatus} />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="info">Ticket status updated</Alert>
      </Snackbar>
    </Container>
  );
}
