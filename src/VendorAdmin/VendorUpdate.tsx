import * as React from "react";
import { SimpleForm, TextInput, required, email, Edit } from "react-admin";

export const VendorUpdate = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="agencytitle" validate={[required()]} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="contactNumber" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
