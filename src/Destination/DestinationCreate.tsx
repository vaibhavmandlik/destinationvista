import { Typography } from "@mui/material"; // Import Typography and Box for styling
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import {
  ArrayInput,
  AutocompleteInput,
  Create,
  ImageField,
  ImageInput,
  required,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  useGetList,
  useTranslate,
} from "react-admin";

const DestinationCreate = (props) => {
  const { data: cities = [], isLoading } = useGetList("common/city");
  const translate = useTranslate(); // Initialize the translation hook

  return (
    <Create
      // Use the 'title' prop of the Create component for the main page title
      title={translate("resources.destinations.create", {
        _: "Create New Destination",
      })}
      {...props}
      sx={
        {
          // Optional: Add some padding around the entire Create page content if desired
          // '& .RaCreate-main': {
          //   padding: { xs: 1, sm: 2, md: 3 },
          // },
        }
      }
    >
      <SimpleForm
        sx={{
          // Styling for the SimpleForm container to make it look like a card
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding inside the form
          backgroundColor: "white", // White background for the form area
          borderRadius: 2, // Slightly rounded corners
          boxShadow: 1, // Subtle shadow for a card effect
          mb: 3, // Margin bottom if you plan to add more elements below the form
          mt: 2, // Margin top to separate from default breadcrumbs/title if any
          mx: { xs: 1, sm: "auto" }, // Auto horizontal margin for centering on larger screens
          maxWidth: { xs: "100%", sm: 600, md: 700 }, // Max width for the form itself
        }}
      >
        {/* Main heading for the form content */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 1 }}>
          {translate("destination.form.heading", { _: "Destination Details" })}
        </Typography>

        {/* Description paragraph using Typography */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {translate("destination.form.description", {
            _: "Fill in the details below to create a new destination for your holiday booking website.",
          })}
        </Typography>

        <AutocompleteInput
          source="city_id" // this is the field stored in your record
          choices={cities} // React-Admin expects { id, ... }
          optionText="city_name"
          optionValue="id" // use id, not city_id
          fullWidth
          validate={[required()]}
        />

        {/* Destination Title Input */}
        <TextInput
          source="title" // Source is 'title' as per your original code
          label={translate("resources.destinations.fields.title", {
            _: "Destination Title",
          })}
          fullWidth
          required // Indicate that this field is mandatory
          sx={{ mb: 3 }} // Add margin-bottom for spacing
        />

        {/* Description Input (multiline) */}
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

        {/* Image Upload Input */}
        <ImageInput
          source="imagePath"
          label={translate("resources.destinations.fields.image", {
            _: "Destination Image",
          })}
          accept={"image/*"} // Restrict to image files
          helperText={translate("destination.form.image_helper_text", {
            _: "Drag & drop an image or click to browse. Max size 5MB.",
          })}
          sx={{ mb: 2 }} // Add margin-bottom
        >
          {/* ImageField for previewing the selected image */}
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

        {/* React Admin's SimpleForm automatically adds Save and Cancel buttons here */}
      </SimpleForm>
    </Create>
  );
};

export default DestinationCreate;
