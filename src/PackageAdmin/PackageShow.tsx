import {
  ArrayField,
  BooleanField,
  Datagrid,
  NumberField,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export const PackageShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="description" />
      <TextField source="price" />
      <NumberField source="durationDays" />
      <TextField source="destination" />
      <NumberField source="availableSlots" />
      <TextField source="imagePaths" />
      <BooleanField source="approved" />
      <TextField source="quickItinerary" />
      <ArrayField source="itinerary">
        <Datagrid>
          <TextField source="title" />
          <RichTextField source="description" />
        </Datagrid>
      </ArrayField>
      <RichTextField source="inclusion" />
      <RichTextField source="exclusion" />
      <RichTextField source="otherInfo" />
    </SimpleShowLayout>
  </Show>
);
