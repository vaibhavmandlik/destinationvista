import React from "react";
import { Create, SimpleForm, TextInput, ImageInput, ImageField } from "react-admin";

const CategoryCreate = (props) => (
  <Create title="Create a Cateogry" {...props}>
    <h1 style={{ padding:"10px" }}>Create a Cateogry</h1>
    <p style={{ padding:"10px" }}>Fill in the details below to create a new Cateogry.</p>
    <SimpleForm>
      <TextInput source="name" label="Title" fullWidth />
      <TextInput source="description" fullWidth label="Description" multiline  rows={6} />
      <ImageInput source="imagePath" label="Upload Image" accept="image/*">
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);

export default CategoryCreate;
