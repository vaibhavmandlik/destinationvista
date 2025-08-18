import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
  useGetList,
  AutocompleteInput,
} from "react-admin";

export const DestinationUpdate = () => {
   const { data: cities = [], isLoading } = useGetList("common/city");
  return (
    <Edit>
      <SimpleForm>
        {/* City Dropdown with Search */}
           <AutocompleteInput
          source="city_id"
          choices={cities}
          optionText="city_name"
          optionValue="city_id"
          fullWidth
          validate={[required()]}
          isLoading={isLoading}
        />
        {/* Title */}
        <TextInput
          source="title"
          label="Title"
          validate={required()}
          fullWidth
        />

        {/* Description */}
        <TextInput
          source="description"
          label="Description"
          multiline
          fullWidth
          validate={required()}
        />

        {/* Image Upload */}
        <ImageInput source="imagePath" label="Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};
