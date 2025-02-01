import * as React from "react";
import { Create, SimpleForm, TextInput, required, email } from "react-admin";

export const VendorCreate = () => (
  <Create>
    <SimpleForm>
      {/* <ReferenceInput source="userId" reference="user" >
        <SelectInput optionText="email"  />
      </ReferenceInput> */}
      {/* <TextInput source="userId" validate={[required()]} /> */}
      <TextInput source="agencyTitle" validate={[required()]} />
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="contactNumber" validate={[required()]} />
      <TextInput source="createdBy" validate={[required()]} />
      <TextInput source="updatedBy" validate={[required()]} />
    </SimpleForm>
  </Create>
);
