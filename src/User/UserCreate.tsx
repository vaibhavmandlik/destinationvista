import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  PasswordInput,
} from "react-admin";
import { SelectInput } from "react-admin";

export const UserCreate = () => {
  return (
    <Create sx={{ maxWidth: 400, margin: '0 auto', marginTop:2 }}>
      <SimpleForm>
        <SelectInput fullWidth
          source="category"
          validate={[required()]}
          choices={[
            { id: "0", name: "Super Admin" },
            { id: "1", name: "Subscriber" },
            { id: "2", name: "User" },
          ]}
        />
        <TextInput fullWidth source="firstName" validate={[required()]} />
        <TextInput fullWidth source="lastName" validate={[required()]} />
        <TextInput fullWidth source="email" validate={[required(), email()]} />
        <PasswordInput fullWidth source="password" validate={[required()]} />
        <TextInput fullWidth source="referCode" validate={[required()]} />
        <TextInput fullWidth source="createdBy" validate={[required()]} />
        <TextInput fullWidth source="updatedBy" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
