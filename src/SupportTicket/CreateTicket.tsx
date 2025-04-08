// CreateTicket.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";

interface CreateTicketProps {
  onAddTicket: (ticket: {
    subject: string;
    description: string;
    category: string;
    priority: string;
  }) => void;
}

const categories = ["Billing", "Technical", "General"];
const priorities = ["Low", "Medium", "High"];

export default function CreateTicket({ onAddTicket }: CreateTicketProps) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !description || !category || !priority) return;

    onAddTicket({ subject, description, category, priority });

    // Reset form
    setSubject("");
    setDescription("");
    setCategory("");
    setPriority("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              {priorities.map((p) => (
                <MenuItem key={p} value={p}>
                  {p}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Submit Ticket
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
