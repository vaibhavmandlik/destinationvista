// TicketList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

interface Ticket {
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
}

interface TicketListProps {
  tickets: Ticket[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "success"; // green
    case "In Progress":
      return "warning"; // amber
    case "Resolved":
      return "primary"; // blue
    default:
      return "default";
  }
};

export default function TicketList({ tickets }: TicketListProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>
                <Chip
                  label={ticket.status}
                  color={getStatusColor(ticket.status)}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
