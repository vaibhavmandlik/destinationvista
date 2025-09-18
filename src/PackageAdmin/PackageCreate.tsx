import { Box, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
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
  Create,
  DateInput,
  ImageField,
  ImageInput,
  ReferenceArrayInput,
  ReferenceInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  number,
  required,
  useGetIdentity,
  useUnique
} from "react-admin";

type itineraryType = {
  title: string;
  description: string;
};

type PackageParams = {
  title: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: string;
  vendorId: string;
  description: string;
  images: { rawFile: File; src?: string; title?: string }[];
  quickItinerary: string;
  itinerary: itineraryType[];
  inclusion: string;
  exclusion: string;
  otherInfo: string;
  vendorDiscount?: string;
  pickupLocation?: string;
  startPoint?: string;
  endPoint?: string;
  modeOfTravel?: string;
  startDate?: Date;
  endDate?: Date;
  categories?: { categoryId: number; name: string }[];
};

export const PackageAdminCreate = () => {
  const { data: user } = useGetIdentity();
  const unique = useUnique();

  return (
    <Create
      redirect="list"
      transform={(data: PackageParams) => ({
        ...data,
        vendorId: data?.vendorId,
        price: data.price ? parseInt(data.price) : undefined,
        durationDays: data.durationDays
          ? parseInt(data.durationDays)
          : undefined,
        availableSlots: data.availableSlots
          ? parseInt(data.availableSlots)
          : undefined,
        vendorDiscount: data.vendorDiscount,
        pickupLocation: data.pickupLocation || null,
        startPoint: data.startPoint || null,
        endPoint: data.endPoint || null,
        modeOfTravel: data.modeOfTravel || null,
      })}
    >
      <Box sx={{ flexGrow: 1, mt: 3, mb: 3 }}>
        <Paper
          elevation={3}
          sx={{ p: { xs: 2, md: 4 }, mx: { xs: 1, md: "auto" }, maxWidth: 900 }}
        >
          <SimpleForm mode="onChange" reValidateMode="onChange">
            <Grid container spacing={3}>
              {/* Package Details */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Package Details
                </Typography>
              </Grid>

             <Grid item xs={12} sm={12}>
                <ReferenceInput source="vendorId" reference="vendor">
                  <SelectInput
                    fullWidth
                    optionText="agencytitle"
                    optionValue="id"
                    validate={[required()]}
                    label="Select vendor to create package"
                    helperText="Of which vendor this package is for?"
                  />
                </ReferenceInput>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="title"
                  label="Package Title"
                  validate={[
                    required(),
                    unique({ filter: { vendorId: user?.vendorId } }),
                  ]}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <ReferenceInput source="destination" reference="destination">
                  <SelectInput
                    fullWidth
                    optionText="title"
                    optionValue="id"
                    validate={[required()]}
                  />
                </ReferenceInput>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextInput
                  fullWidth
                  source="price"
                  label="Price (INR)"
                  validate={[required(), number()]}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextInput
                  fullWidth
                  source="durationDays"
                  label="Duration (Days)"
                  validate={[required(), number()]}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextInput
                  fullWidth
                  source="availableSlots"
                  label="Available Slots"
                  validate={[required(), number()]}
                  type="number"
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <RichTextInput
                  fullWidth
                  source="description"
                  label="Package Description"
                  validate={[required()]}
                  toolbar={
                    <RichTextInputToolbar>
                      <FormatButtons size="small" />
                      <ListButtons size="small" />
                      <LinkButtons size="small" />
                      <ClearButtons size="small" />
                    </RichTextInputToolbar>
                  }
                />
              </Grid>

              {/* Images */}
              <Grid item xs={12}>
                <ImageInput
                  accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                  multiple
                  source="images"
                  label="Package Images"
                  sx={{
                    "& .RaFileInput-dropZone": {
                      border: "1px dotted #000",
                      borderRadius: 1,
                      p: 2,
                      textAlign: "center",
                      minHeight: 100,
                    },
                  }}
                >
                  <ImageField source="src" title="title" />
                </ImageInput>
              </Grid>

              {/* Itinerary */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Itinerary
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  source="quickItinerary"
                  label="Quick Itinerary Summary"
                  helperText="e.g., 3D/4N"
                />
              </Grid>
              <Grid item xs={12}>
                <ArrayInput source="itinerary">
                  <SimpleFormIterator
                    getItemLabel={(index) => `Day #${index + 1}`}
                    disableReordering
                  >
                    <TextInput
                      fullWidth
                      source="title"
                      label="Day Title"
                      validate={[required()]}
                    />
                    <RichTextInput
                      fullWidth
                      source="description"
                      label="Day Description"
                      validate={[required()]}
                      toolbar={
                        <RichTextInputToolbar>
                          <FormatButtons size="small" />
                          <ListButtons size="small" />
                          <LinkButtons size="small" />
                          <ClearButtons size="small" />
                        </RichTextInputToolbar>
                      }
                    />
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>

              {/* Additional Details */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <RichTextInput
                  fullWidth
                  source="inclusion"
                  label="Inclusions"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RichTextInput
                  fullWidth
                  source="exclusion"
                  label="Exclusions"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextInput
                  type="number"
                  fullWidth
                  source="vendorDiscount"
                  label="Vendor Discount"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="pickupLocation"
                  label="Pickup Location"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput fullWidth source="startPoint" label="Start Point" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput fullWidth source="endPoint" label="End Point" />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  source="modeOfTravel"
                  label="Mode of Travel"
                  helperText="e.g., Flight, Train"
                />
              </Grid>

              {/* Dates */}
              <Grid item xs={12} sm={6}>
                <DateInput
                  fullWidth
                  source="startDate"
                  label="Start Date"
                  inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateInput
                  fullWidth
                  source="endDate"
                  label="End Date"
                  inputProps={{ min: dayjs().format("YYYY-MM-DD") }}
                />
              </Grid>

              {/* Other Info */}
              <Grid item xs={12}>
                <RichTextInput
                  fullWidth
                  source="otherInfo"
                  label="Other Important Information"
                />
              </Grid>

              {/* Categories */}
              <Grid item xs={12}>
                <ReferenceArrayInput
                  source="categories"
                  reference="category"
                  validate={[required()]}
                  format={(categories?: { categoryId: number }[]) =>
                    categories ? categories.map((c) => c.categoryId) : []
                  }
                  parse={(ids: number[]) =>
                    ids ? ids.map((id) => ({ categoryId: id })) : []
                  }
                >
                  <SelectArrayInput fullWidth optionText="name" />
                </ReferenceArrayInput>
              </Grid>
            </Grid>
          </SimpleForm>
        </Paper>
      </Box>
    </Create>
  );
};
