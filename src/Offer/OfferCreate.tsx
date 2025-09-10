import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  ImageInput,
  ImageField,
  useTranslate, // Import useTranslate for internationalization (optional but good practice)
} from "react-admin";
import { Typography, Box, InputAdornment } from "@mui/material"; // Import Typography and Box for styling

const OfferCreate = (props: any) => {
  const translate = useTranslate(); // Initialize the translation hook

  return (
    <Create
      // Use the 'title' prop of the Create component for the main page title
      title={translate("resources.offers.create", { _: "Create New Offer" })}
      {...props}
      sx={
        {
          // Optional: Add some padding around the entire Create page content if desired
          // '& .RaCreate-main': {
          //   padding: { xs: 1, sm: 2, md: 3 },
          // },
        }
      }
    >
      <SimpleForm
        sx={{
          // Styling for the SimpleForm container to make it look like a card
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding inside the form
          backgroundColor: "white", // White background for the form area
          borderRadius: 2, // Slightly rounded corners
          boxShadow: 1, // Subtle shadow for a card effect
          mb: 3, // Margin bottom if you plan to add more elements below the form
          mt: 2, // Margin top to separate from default breadcrumbs/title if any
          mx: { xs: 1, sm: "auto" }, // Auto horizontal margin for centering on larger screens
          maxWidth: { xs: "100%", sm: 600, md: 700 }, // Max width for the form itself
        }}
      >
        {/* Main heading for the form content */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 1 }}>
          {translate("offer.form.heading", { _: "Offer Details" })}
        </Typography>

        {/* Description paragraph using Typography */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {translate("offer.form.description", {
            _: "Fill in the details below to create a new offer for your holiday booking website.",
          })}
        </Typography>

        {/* Category Title Input */}
        <TextInput
          source="title"
          label={translate("resources.offers.fields.title", {
            _: "Offer title",
          })}
          fullWidth
          required // Indicate that this field is mandatory
          sx={{ mb: 3 }} // Add margin-bottom for spacing
        />

        {/* Inline Inputs: Offer For + Offer Percentage */}
        <Box
          sx={{
            display: "flex",
            gap: 2, // spacing between the two inputs
            mb: 3,
            flexWrap: "wrap", // ensures responsiveness on small screens
          }}
        >
          <TextInput
            source="for"
            label={translate("resources.offers.fields.for", { _: "Offer for" })}
            fullWidth
            required
            sx={{ flex: 1 }} // takes equal space
          />
          <TextInput
            source="discountPercent"
            label={translate("resources.offers.fields.discountPercent", {
              _: "Discount (%)",
            })}
            type="number"
            fullWidth
            required
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            inputProps={{ min: 1 }}
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Description Input (multiline) */}
        <TextInput
          source="description"
          label={translate("resources.offers.fields.description", {
            _: "Description",
          })}
          fullWidth
          multiline
          rows={4} // Set a reasonable number of rows for multiline input
          sx={{ mb: 4 }} // Add margin-bottom
        />

        {/* React Admin's SimpleForm automatically adds Save and Cancel buttons here */}
      </SimpleForm>
    </Create>
  );
};

export default OfferCreate;
