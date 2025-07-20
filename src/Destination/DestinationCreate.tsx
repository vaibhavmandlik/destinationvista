import React from "react";
import { Create, SimpleForm, TextInput, ImageInput, ImageField } from "react-admin";

const DestinationCreate = (props) => (
  <Create title="Create a Destination" {...props}>
    <h1 style={{ padding:"10px" }}>Create a Destination</h1>
    <p style={{ padding:"10px" }}>Fill in the details below to create a new destination.</p>
    <SimpleForm>
      <TextInput source="title" label="Title" fullWidth />
      <TextInput source="description" fullWidth label="Description" multiline  rows={6} />
      <ImageInput source="imagePath" label="Upload Image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export default DestinationCreate;
