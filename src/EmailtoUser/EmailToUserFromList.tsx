import * as React from "react";
import {
  SimpleForm,
  TextInput,
  useNotify,
  SaveButton,
  Toolbar,
  required,
  SelectArrayInput,
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
import { useLocation } from "react-router-dom";

const CustomToolbar = (props) => (
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

const EmailToUserFromList: React.FC = () => {
  const notify = useNotify();
  const [create] = useCreate();
  const location = useLocation();
  // Access state like this:
  const state = location.state;
  const customers = state?.customers || [];
  // const {data:customers} = useGetList("user", {filter});
  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    // You can handle file upload and form submission here
    create(
      "vendor/sendMail",
      {
        data: {
          customer: values.customer,
          subject: values.subject,
          body: values.body,
        },
      },
      {
        onSuccess: () => {
          notify("Email sent successfully!", { type: "success" });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        onError: (error) => {
          notify(`Error sending email`, { type: "warning" });
        },
      }
    );
    // notify("Email sent!", { type: "success" });
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
      <SimpleForm
        onSubmit={handleSubmit}
        toolbar={<CustomToolbar />}
        defaultValues={{
          body: "<p>Write your message here...</p><br/><br/><br/>",
        }}
      >
        <Typography variant="h6" sx={{ padding: 2, borderRadius: 2 }}>
          Email to Users
        </Typography>
        <div className="row">
          <div className="col-md-12 col-lg-12">
            <SelectArrayInput
              source="customer"
              choices={customers}
              validate={[required()]}
              fullWidth
            />
          </div>
          <div className="col-md-12 col-lg-12">
            <TextInput source="subject" fullWidth placeholder="Enter Subject" />
          </div>
          <div className="col-md-12 col-lg-12">
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
              source={"body"}
              validate={[required()]}
            />
          </div>
        </div>
      </SimpleForm>
    </Box>
  );
};

export default EmailToUserFromList;
