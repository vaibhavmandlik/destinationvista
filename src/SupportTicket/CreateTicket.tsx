// CreateTicket.tsx
import { Grid, Paper } from "@mui/material";
import {
  Create,
  FileField,
  FileInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar
} from "react-admin";

const categories = [
  { id: "Billing", name: "Billing" },
  { id: "Technical", name: "Technical" },
  { id: "General", name: "General" },
];

const priorities = [
  { id: "Low", name: "Low" },
  { id: "Medium", name: "Medium" },
  { id: "High", name: "High" },
];

const CustomToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton
      label="Submit Ticket"
      sx={{
        borderRadius: 2,
        minWidth: 150,
        background: "#2563eb",
        "&:hover": { background: "#1746a2" },
      }}
    />
  </Toolbar>
);

export default function CreateTicket() {
  return (
    <Create resource="ticket" redirect="list">
      <SimpleForm toolbar={<CustomToolbar />}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            {/* Subject */}
            <Grid item xs={12}>
              <TextInput
                fullWidth
                label="Subject"
                source="subject"
                validate={[required()]}
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <TextInput
                fullWidth
                label="Description"
                multiline
                rows={5}
                source="description"
                validate={[required()]}
              />
            </Grid>

            {/* Category */}
            <Grid item xs={12} sm={6}>
              <SelectInput
                fullWidth
                label="Category"
                source="category"
                choices={categories}
                validate={[required()]}
              />
            </Grid>

            {/* Priority */}
            <Grid item xs={12} sm={6}>
              <SelectInput
                fullWidth
                label="Priority"
                source="priority"
                choices={priorities}
                validate={[required()]}
              />
            </Grid>

            {/* Image Upload */}
            <Grid item xs={12}>
              <FileInput
                source="images"
                label="Upload Screenshots"
                accept="image/*"
                multiple
              >
                <FileField source="src" title="title" />
              </FileInput>
            </Grid>
          </Grid>
        </Paper>
      </SimpleForm>
    </Create>
  );
}
