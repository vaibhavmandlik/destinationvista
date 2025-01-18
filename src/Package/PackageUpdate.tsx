import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceInput,
  NumberInput,
} from "react-admin";
import { SelectInput } from "react-admin";

export const PackageUpdate = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="vendorId" reference="vendor">
        <SelectInput optionText="agencyTitle" />
      </ReferenceInput>
      <TextInput source="title" validate={[required()]} />
      <TextInput source="description" validate={[required()]} />
      <NumberInput source="price" validate={[required()]} />
      <NumberInput source="durationDays" validate={[required()]} />
      <TextInput source="destination" validate={[required()]} />
      <NumberInput source="availableSlots" validate={[required()]} />
      <NumberInput source="approvedBy" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
