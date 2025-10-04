import { Grid } from "@mui/material";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import {
  Create,
  Datagrid,
  DeleteWithConfirmButton,
  Edit,
  EditButton,
  FilterForm,
  FilterFormProps,
  List,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
  useNotify,
  useRedirect,
} from "react-admin";

const categoryChoices = [
  { id: "promotional", name: "Promotional" },
  { id: "update", name: "Update" },
  { id: "marketing", name: "Marketing" },
  { id: "system", name: "System" },
  { id: "reminder", name: "Reminder" },
];

const filterInputs = [
  <TextInput
    key="id"
    label="Search by ID"
    source="id"
    alwaysOn
    fullWidth
    sx={{ minWidth: { xs: "100%", sm: 200, md: 250 }, m: 0.5 }}
  />,
  <SelectInput
    key="category"
    alwaysOn
    label="Category"
    source="category"
    choices={categoryChoices}
    fullWidth
    sx={{ minWidth: { xs: "100%", sm: 200, md: 250 }, m: 0.5 }}
  />,
  <TextInput
    key="subject"
    label="Subject"
    source="subject"
    alwaysOn
    fullWidth
    sx={{ minWidth: { xs: "100%", sm: 200, md: 250 }, m: 0.5 }}
  />,
];

export const EmailTemplateList = () => (
  <List filters={filterInputs}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="category" />
      <TextField source="subject" />
      <EditButton />
      <DeleteWithConfirmButton />
    </Datagrid>
  </List>
);

export const EmailTemplateCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Template created successfully", { type: "success" });
    redirect("list", "cannedMail");
  };

  return (
    <Create resource="cannedMail" mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <SelectInput
          source="category"
          label="Category"
          choices={categoryChoices}
          validate={[required()]}
        />
        <TextInput
          source="subject"
          label="Subject"
          fullWidth
          validate={[required()]}
        />
        <RichTextInput
          source="body"
          label="Body"
          toolbar={
            <RichTextInputToolbar>
              <FormatButtons size="small" />
              <ListButtons size="small" />
              <LinkButtons size="small" />
              <ClearButtons size="small" />
            </RichTextInputToolbar>
          }
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export const EmailTemplateEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify("Template updated successfully", { type: "success" });
    redirect("list", "cannedMail");
  };

  return (
    <Edit resource="cannedMail" mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <SelectInput
          source="category"
          label="Category"
          choices={categoryChoices}
          validate={[required()]}
        />
        <TextInput
          source="subject"
          label="Subject"
          fullWidth
          validate={[required()]}
        />
        <RichTextInput
          source="body"
          label="Body"
          toolbar={
            <RichTextInputToolbar>
              <FormatButtons size="small" />
              <ListButtons size="small" />
              <LinkButtons size="small" />
              <ClearButtons size="small" />
            </RichTextInputToolbar>
          }
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};
