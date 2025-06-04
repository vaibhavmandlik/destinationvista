import * as React from "react";
import {
  SimpleForm,
  TextInput,
  SelectInput,
  useNotify,
  useRedirect,
  SaveButton,
  Toolbar,
  required,
  SelectArrayInput,
  useCreate,
  useGetList,
} from "react-admin";
import { Box, Button, Typography } from "@mui/material";import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import { JSONTree } from "react-json-tree";
const customers = [
  { id: "Van Henry", name: "Van Henry" },
  { id: "John Doe", name: "John Doe" },
  { id: "Jane Smith", name: "Jane Smith" },
];

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

const EmailToUsers: React.FC = () => {
  const notify = useNotify();
  const [create]=useCreate();
  const {data:customers}= useGetList("user")
  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    // You can handle file upload and form submission here
    create("sendMail", {
      data: {
        customer: values.customer,
        subject: values.subject,
        body: values.body,
      }
    });
    notify("Email sent!", { type: "success" });
    // redirect("/"); // redirect to dashboard or any page
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
          customer: "Van Henry",
          body: "<p>Write your message here...</p><br/><br/><br/>",
        }}
      >
        <Typography
          variant="h6"
          sx={{ padding: 2, borderRadius: 2 }}
        >
          Email to Users
        </Typography>
        <div className="row">
          <div className="col-md-12 col-lg-12">
             <SelectArrayInput
              source="customer"
              choices={customers?.map((customer) => ({
                id: customer.id,
                name: customer.firstName + " " + customer.lastName,
              }))}
              validate={[required()]}
              fullWidth
            />
          </div>
           <div className="col-md-12 col-lg-12">
          <TextInput
            source="subject"
            fullWidth
            placeholder="Enter Subject"
          />
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

export default EmailToUsers;
