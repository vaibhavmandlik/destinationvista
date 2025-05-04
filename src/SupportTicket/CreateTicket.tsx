// CreateTicket.tsx
import React, { useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  Box,
} from "@mui/material";
import { Create, required, SimpleForm, TextInput } from "react-admin";

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
    <Create>
      <SimpleForm>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  label="Subject"
                  source="subject"
                  validate={[required()]}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  source="description"
                  validate={[required()]}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  select
                  fullWidth
                  label="Category"
                  source="category"
                  validate={[required()]}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextInput>
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  select
                  fullWidth
                  label="Priority"
                  source="priority"
                  validate={[required()]}
                >
                  {priorities.map((p) => (
                    <MenuItem key={p} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </TextInput>
              </Grid>

            </Grid>
          </Box>
        </Paper>
      </SimpleForm>
    </Create>
  );
}
