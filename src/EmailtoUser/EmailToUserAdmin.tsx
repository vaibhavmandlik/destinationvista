import * as React from "react";
import {
  SimpleForm,
  TextInput,
  useNotify,
  useRedirect,
  SaveButton,
  Toolbar,
  required,
  SelectArrayInput,
  useCreate,
  useGetList,
  useTranslate, // Ensure useTranslate is imported for consistent text
} from "react-admin";
import { Box, Button, Typography, CircularProgress, Grid } from "@mui/material";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";

// Custom Toolbar for Save and Clear buttons
const CustomToolbar = (props) => {
  const translate = useTranslate(); // Use translate for button labels
  return (
    <Toolbar
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'flex-end', // Push buttons to the right
        borderTop: '1px solid #e0e0e0', // Subtle separator from form fields
        mt: 3, // Margin top for spacing from last input
        pt: 2, // Padding top for spacing from separator
      }}
    >
      <Button
        variant="outlined"
        color="secondary" // Use a secondary color for reset, or 'error'
        sx={{ borderRadius: 2, minWidth: 100, mr: 2, textTransform: 'none' }} // Ensure consistent button style
        type="reset"
      >
        {translate('ra.action.reset', { _: 'Reset' })}
      </Button>
      <SaveButton
        label={translate('ra.action.send', { _: 'Send Email' })} // More descriptive label for the action
        sx={{
          borderRadius: 2,
          minWidth: 100,
          background: "#2563eb", // Custom blue for primary action
          "&:hover": { background: "#1746a2" },
          textTransform: 'none', // Prevent all caps for consistency
        }}
        // The SaveButton automatically handles onSubmit when within SimpleForm
      />
    </Toolbar>
  );
};

interface EmailToUserAdminProps {
  isAdmin?: boolean;
}

const EmailToUserAdmin: React.FC<EmailToUserAdminProps> = ({ isAdmin = false }) => {
  const notify = useNotify();
  const translate = useTranslate();
  const [create] = useCreate();
  const redirect = useRedirect();

  // Define filter for fetching customers
  const filter = isAdmin ? {} : { vendorId: localStorage.getItem("selectedVendor") };

  // Fetch customer list with loading and error states
  const {
    data: customers,
    isLoading: customersLoading,
    error: customersError,
  } = useGetList("user", {
    filter,
    pagination: { page: 1, perPage: 1000 }, // Adjust perPage for your expected customer count
    sort: { field: 'firstName', order: 'ASC' } // Sort customers alphabetically
  });

  // Prepare choices for SelectArrayInput once data is loaded
  const customerChoices = customers?.map((customer) => ({
    id: customer.id,
    name: `${customer.firstName} ${customer.lastName}`,
  })) || [];

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    create("vendor/sendMail", {
      data: {
        customer: values.customer, // Array of selected customer IDs
        subject: values.subject,
        body: values.body,
      },
    }, {
      onSuccess: () => {
        notify(translate("email.users.success_message", { _: "Email sent successfully!" }), { type: "success" });
        redirect('/admin/email'); // Redirect after successful submission
      },
      onError: (error: any) => {
        notify(
          translate("email.users.error_message", { _: `Error sending email: ${error.message}` }),
          { type: "error" }
        );
      },
    });
  };

  // --- Conditional Rendering for Loading/Error States ---
  if (customersLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>{translate("ra.loading", { _: "Loading customers..." })}</Typography>
      </Box>
    );
  }

  if (customersError) {
    return (
      <Box sx={{ m: 4, p: 3, borderRadius: 2, boxShadow: 1, backgroundColor: 'background.paper', color: 'error.main' }}>
        <Typography variant="h6">{translate("ra.error", { _: "Error" })}</Typography>
        <Typography>{translate("email.users.customer_load_error", { _: `Failed to load customer data: ${customersError.message}` })}</Typography>
      </Box>
    );
  }

  // Optional: Message if no customers are found
  if (!customers || customers.length === 0) {
      return (
          <Box sx={{ m: 4, p: 3, borderRadius: 2, boxShadow: 1, backgroundColor: 'background.paper' }}>
              <Typography>{translate("email.users.no_customers", { _: "No customers found to send emails to." })}</Typography>
          </Box>
      );
  }


  return (
    <Box
      sx={{
        borderRadius: 2,
        margin: { xs: 1, sm: 2, md: 4 }, // Responsive margin around the entire card
        boxShadow: 1,
        background: "#fff", // White background for the card
        overflow: 'hidden', // Ensures border radius is applied correctly with children
      }}
    >
      {/* Card Header/Title */}
      <Typography
        variant="h6"
        sx={{
          padding: { xs: 2, sm: 3 }, // Padding for the heading
          borderBottom: '1px solid #e0e0e0', // Separator below the heading
          mb: 3, // Margin bottom after the heading for spacing before form fields
        }}
      >
        {translate("email.users.title", { _: "Email to Users" })}
      </Typography>

      {/* Main Form Content */}
      <SimpleForm
        onSubmit={handleSubmit}
        toolbar={<CustomToolbar />}
        defaultValues={{
          // Set default values here. Note: RichTextInput's default content is often handled internally
          // or comes from data. Setting a default HTML string is fine.
          // customer: [], // It's good practice to default SelectArrayInput to an empty array
          body: translate("email.users.default_body", { _: "<p>Write your message here...</p><br/><br/><br/>" }),
        }}
        sx={{
          padding: { xs: 2, sm: 3, md: 4 }, // Padding inside the form fields area
          pt: 0, // Remove top padding if the heading already has it and border
        }}
      >
        {/* Use Material-UI Grid for a responsive and structured layout */}
        <Grid container spacing={3}> {/* spacing between grid items (columns & rows) */}
          <Grid item xs={12}> {/* Full width on all screen sizes */}
            <SelectArrayInput
              source="customer"
              label={translate("resources.users.select_recipients", { _: "Select Recipients" })} // Clear label
              choices={customerChoices}
              validate={required()} // Mark as required
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextInput
              source="subject"
              label={translate("email.users.subject", { _: "Subject" })} // Use a label
              fullWidth
              placeholder={translate("email.users.subject_placeholder", { _: "Enter Email Subject" })}
              validate={required()} // Subject is usually required
            />
          </Grid>

          <Grid item xs={12}>
            <RichTextInput
              source={"body"}
              label={translate("email.users.body", { _: "Email Body" })} // Label for the Rich Text Editor
              toolbar={
                <RichTextInputToolbar>
                  <FormatButtons size={"small"} />
                  <ListButtons size={"small"} />
                  <LinkButtons size={"small"} />
                  <ClearButtons size={"small"} />
                </RichTextInputToolbar>
              }
              fullWidth
              validate={required()} // Email body is required
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Box>
  );
};

export default EmailToUserAdmin;