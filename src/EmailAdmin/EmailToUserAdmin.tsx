import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import * as React from "react";
import {
  AutocompleteArrayInput,
  ReferenceArrayInput,
  SaveButton,
  Form,
  TextInput,
  Toolbar,
  required,
  useCreate,
  useGetList,
  useNotify,
  useRedirect,
  useTranslate,
} from "react-admin";

// Custom Toolbar
const CustomToolbar = (props: any) => {
  const translate = useTranslate();
  return (
    <Toolbar
      {...props}
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        borderTop: "1px solid #e0e0e0",
        mt: 3,
        pt: 2,
      }}
    >
      <SaveButton
        label={translate("ra.action.send", { _: "Send Email" })}
        sx={{
          borderRadius: 2,
          minWidth: 100,
          background: "#2563eb",
          "&:hover": { background: "#1746a2" },
          textTransform: "none",
        }}
      />
    </Toolbar>
  );
};

interface EmailToUserAdminProps {
  isAdmin?: boolean;
}

const EmailToUserAdmin: React.FC<EmailToUserAdminProps> = ({
  isAdmin = false,
}) => {
  const notify = useNotify();
  const translate = useTranslate();
  const [create] = useCreate();
  const redirect = useRedirect();

  const filter = isAdmin
    ? {}
    : { vendorId: localStorage.getItem("selectedVendor") };

  const { data: templates, isLoading: templatesLoading } = useGetList(
    "cannedMail",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "ASC" },
    }
  );

  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(
    null
  );
  const [templateData, setTemplateData] = React.useState<{
    subject?: string;
    body?: string;
  }>({});

  // Update template data when template changes
  React.useEffect(() => {
    if (selectedTemplate && templates) {
      const tmpl = templates.find((t: any) => t.id === selectedTemplate);
      if (tmpl) setTemplateData({ subject: tmpl.subject, body: tmpl.body });
    } else {
      setTemplateData({ subject: "", body: "" });
    }
  }, [selectedTemplate, templates]);

  if (templatesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>
          {translate("ra.loading", { _: "Loading..." })}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 2,
        margin: { xs: 1, sm: 2, md: 4 },
        boxShadow: 1,
        background: "#fff",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: { xs: 2, sm: 3 },
          borderBottom: "1px solid #e0e0e0",
          mb: 3,
        }}
      >
        {translate("email.users.title", { _: "Email to Users" })}
      </Typography>

      <Form
        onSubmit={(values: any) => {
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
                notify(
                  translate("email.users.success_message", {
                    _: "Email sent successfully!",
                  }),
                  { type: "success" }
                );

                setTemplateData({ subject: "", body: "" });
                setSelectedTemplate(null);
              },
              onError: (error: any) => {
                notify(
                  translate("email.users.error_message", {
                    _: `Error sending email: ${error.message}`,
                  }),
                  { type: "error" }
                );
              },
            }
          );
        }}
        defaultValues={{
          subject: templateData.subject,
          body: templateData.body,
        }}
      >
        <Grid container spacing={3} sx={{ padding: { xs: 2, sm: 3 } }}>
          {/* Template Selection */}
          <Grid item xs={12}>
            <Select
              fullWidth
              value={selectedTemplate || ""}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select a Template
              </MenuItem>
              {templates?.map((t: any) => (
                <MenuItem key={t.id} value={t.id}>
                  {`${t.category} - ${t.subject}`}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          {/* Customer Selection */}
          <Grid item xs={12}>
            <ReferenceArrayInput
              source="customer"
              reference="user"
              filter={filter}
              perPage={50}
              sort={{ field: "firstName", order: "ASC" }}
              label={translate("resources.users.select_recipients", {
                _: "Select Recipients",
              })}
              validate={required()}
              defaultValue={[]}
            >
              <AutocompleteArrayInput
                optionText={(choice: any) =>
                  `${choice.firstName} ${choice.lastName} (${choice.email})`
                }
                fullWidth
                filterToQuery={(searchText: string) => ({ q: searchText })}
              />
            </ReferenceArrayInput>
          </Grid>

          {/* Subject */}
          <Grid item xs={12}>
            <TextInput
              source="subject"
              label={translate("email.users.subject", { _: "Subject" })}
              fullWidth
              validate={required()}
              defaultValue={templateData.subject}
            />
          </Grid>

          {/* Email Body */}
          <Grid item xs={12}>
            <RichTextInput
              source="body"
              label={translate("email.users.body", { _: "Email Body" })}
              toolbar={
                <RichTextInputToolbar>
                  <FormatButtons size="small" />
                  <ListButtons size="small" />
                  <LinkButtons size="small" />
                  <ClearButtons size="small" />
                </RichTextInputToolbar>
              }
              fullWidth
              validate={required()}
              defaultValue={templateData.body}
            />
          </Grid>

          {/* Toolbar */}
          <Grid item xs={12}>
            <CustomToolbar />
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

export default EmailToUserAdmin;
