import * as React from "react";
import {
  SimpleForm,
  TextInput,
  useNotify,
  SaveButton,
  Toolbar,
  required,
  useCreate,
} from "react-admin";
import { Box, Button, Typography } from "@mui/material";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";

const CustomToolbar = (props: any) => (
  <Toolbar {...props}>
    <Button
      variant="outlined"
      color="inherit"
      sx={{ borderRadius: 2, minWidth: 100, mr: 2 }}
      type="reset"
    >
      Clear
    </Button>
    <SaveButton
      label="Submit"
      sx={{
        borderRadius: 2,
        minWidth: 100,
        background: "#2563eb",
        "&:hover": { background: "#1746a2" },
      }}
    />
  </Toolbar>
);

const EmailToAdmin: React.FC = () => {
  const notify = useNotify();
  const [create] = useCreate();

  // Set admin email statically
  const adminEmail = "contact@destinationvista.in";

  const handleSubmit = (values: any) => {
    create(
      "vendor/sendMail",
      {
        data: {
          customer: [adminEmail], // send to admin
          subject: values.subject,
          body: values.body,
        },
      },
      {
        onSuccess: () => {
          notify("Email sent to admin!", { type: "success" });
        },
        onError: (error: any) => {
          notify(`Error sending email: ${error.message}`, { type: "error" });
        },
      }
    );
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        margin: 4,
        boxShadow: 1,
        background: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{ padding: 2, borderBottom: "1px solid #e0e0e0", mb: 3 }}
      >
        Email to Admin (contact@destinationvista.in)
      </Typography>

      <SimpleForm
        onSubmit={handleSubmit}
        toolbar={<CustomToolbar />}
        defaultValues={{
          body: "",
          customer: [adminEmail],
        }}
      >
        <TextInput
          source="subject"
          fullWidth
          placeholder="Enter Subject"
          validate={[required()]}
        />

        <RichTextInput
          toolbar={
            <RichTextInputToolbar>
              <FormatButtons size={"small"} />
              <ListButtons size={"small"} />
              <LinkButtons size={"small"} />
              <ClearButtons size={"small"} />
            </RichTextInputToolbar>
          }
          fullWidth
          source="body"
          validate={[required()]}
        />
      </SimpleForm>
    </Box>
  );
};

export default EmailToAdmin;
