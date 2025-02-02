import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  NumberInput,
  ReferenceInput,
  useGetIdentity,
} from "react-admin";
import { SelectInput } from "react-admin";

export const PackageCreate = () => {
  const { data: user } = useGetIdentity();

  return (
    <Create redirect={'list'} transform={data=>{return {...data,vendorId:user?.vendorId}}} title="Create a Package">
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <NumberInput source="price" validate={[required()]} />
        <NumberInput source="durationDays" validate={[required()]} />
        <TextInput source="destination" validate={[required()]} />
        <NumberInput source="availableSlots" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
