import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
  useGetList,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";

export const DestinationUpdate = () => {
  const { data: cities = [], isLoading } = useGetList("common/city");
  return (
    <Edit>
      <SimpleForm>
        {/* City Dropdown with Search */}
        <AutocompleteInput
          source="city_id" // this is the field stored in your record
          choices={cities} // React-Admin expects { id, ... }
          optionText="city_name"
          optionValue="id" // use id, not city_id
          fullWidth
          validate={[required()]}
        />
        {/* Title */}
        <TextInput
          source="title"
          label="Title"
          validate={required()}
          fullWidth
        />

        {/* Description */}
        <RichTextInput
          toolbar={
            <RichTextInputToolbar>
              <FormatButtons size={"small"} />
              <ListButtons size={"small"} />
              <LinkButtons size={"small"} />
              <ClearButtons size={"small"} />
            </RichTextInputToolbar>
          }
          fullWidth
          source={"description"}
          validate={[required()]}
        />

        {/* Image Upload */}
        <ImageInput source="imagePath" label="Image" accept="image/*">
          <ImageField source="src" title="title" />
        </ImageInput>

        <RichTextInput
          toolbar={
            <RichTextInputToolbar>
              <FormatButtons size={"small"} />
              <ListButtons size={"small"} />
              <LinkButtons size={"small"} />
              <ClearButtons size={"small"} />
            </RichTextInputToolbar>
          }
          fullWidth
          source={"points"}
          validate={[required()]}
        />

        <ArrayInput
          source="links"
          // Ensure each new item starts with { link: "" } instead of undefined
          defaultValue={[]}
        >
          <SimpleFormIterator
            disableReordering
            getItemLabel={(index) => `#${index + 1}`}
            fullWidth
          >
            <TextInput
              fullWidth
              source="link"
              label="Link"
              validate={[required()]}
              // 👇 This ensures no null/undefined goes into the field
              defaultValue=""
            />
          </SimpleFormIterator>
        </ArrayInput>

        <RichTextInput
          toolbar={
            <RichTextInputToolbar>
              <FormatButtons size={"small"} />
              <ListButtons size={"small"} />
              <LinkButtons size={"small"} />
              <ClearButtons size={"small"} />
            </RichTextInputToolbar>
          }
          fullWidth
          source={"moreInfo"}
          validate={[required()]}
        />
      </SimpleForm>
    </Edit>
  );
};
