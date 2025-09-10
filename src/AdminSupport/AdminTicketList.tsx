// AdminTicketList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

interface Ticket {
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
}

interface AdminTicketListProps {
  tickets: Ticket[];
  onStatusChange: (index: number, newStatus: string) => void;
}

const statusOptions = ["Open", "In Progress", "Resolved"];

export default function AdminTicketList({
  tickets,
  onStatusChange,
}: AdminTicketListProps) {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ px: 2, py: 2 }}>
        All Submitted Tickets
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow key={index}>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>{ticket.description}</TableCell>
              <TableCell>{ticket.category}</TableCell>
              <TableCell>{ticket.priority}</TableCell>
              <TableCell>
                <Select
                  value={ticket.status}
                  onChange={(e) => onStatusChange(index, e.target.value)}
                  size="small"
                  fullWidth
                  variant="standard"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
