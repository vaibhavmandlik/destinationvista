import React from "react";
import { Create, SimpleForm, TextInput, ImageInput, ImageField } from "react-admin";

const DestinationCreate = (props) => (
  <Create title="Create a Destination" {...props}>
    <SimpleForm>
      <TextInput source="title" label="Title" />
      <TextInput source="description" label="Description" multiline />
      <ImageInput source="image" label="Upload Image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export default DestinationCreate;
