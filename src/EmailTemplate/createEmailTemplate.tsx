import {
  List,
  Datagrid,
  TextField,
  EditButton,
  DeleteWithConfirmButton,
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  required,
  Edit,
  useNotify,
  useRedirect,
} from "react-admin";
import {
  RichTextInput,
  RichTextInputToolbar,
  FormatButtons,
  ListButtons,
  LinkButtons,
  ClearButtons,
} from "ra-input-rich-text";

const categoryChoices = [
  { id: "promotional", name: "Promotional" },
  { id: "update", name: "Update" },
  { id: "marketing", name: "Marketing" },
  { id: "system", name: "System" },
  { id: "reminder", name: "Reminder" },
];

export const EmailTemplateList = () => (
  <List
    filters={[
      <TextInput label="Search by ID" source="id" alwaysOn />,
      <SelectInput alwaysOn
        label="Category"
        source="category"
        choices={categoryChoices}
      />,
      <TextInput label="Subject" source="subject" alwaysOn />,
    ]}
  >
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