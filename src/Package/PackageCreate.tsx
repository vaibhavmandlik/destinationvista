import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  NumberInput,
  ReferenceInput,
} from "react-admin";
import { SelectInput } from "react-admin";

export const PackageCreate = () => {
  return (
    <Create>
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
        <NumberInput source="createdBy" validate={[required()]} />
        <NumberInput source="updatedBy" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
