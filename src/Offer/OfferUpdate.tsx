import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  useTranslate,
} from "react-admin";
import { Typography } from "@mui/material";

const OfferUpdate = (props: any) => {
  const translate = useTranslate();

  return (
    <Edit
      title={translate("resources.offers.edit", { _: "Edit Offer" })}
      {...props}
      sx={{
        // Optional global padding for the page
        // '& .RaEdit-main': {
        //   padding: { xs: 1, sm: 2, md: 3 },
        // },
      }}
    >
      <SimpleForm
        sx={{
          padding: { xs: 2, sm: 3, md: 4 },
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 1,
          mb: 3,
          mt: 2,
          mx: { xs: 1, sm: "auto" },
          maxWidth: { xs: "100%", sm: 600, md: 700 },
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 1 }}>
          {translate("offer.form.heading", { _: "Edit Offer Details" })}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {translate("offer.form.description", {
            _: "Update the offer details below for your holiday booking website.",
          })}
        </Typography>

        <TextInput
          source="title"
          label={translate("resources.offers.fields.title", { _: "Offer title" })}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <TextInput
          source="for"
          label={translate("resources.offers.fields.for", { _: "Offer for" })}
          fullWidth
          required
          sx={{ mb: 3 }}
        />

        <TextInput
          source="description"
          label={translate("resources.offers.fields.description", { _: "Description" })}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 4 }}
        />

        {/* Save and Cancel buttons are automatically added by react-admin */}
      </SimpleForm>
    </Edit>
  );
};

export default OfferUpdate;
