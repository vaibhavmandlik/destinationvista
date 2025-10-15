import { Box, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { RichTextInput } from "ra-input-rich-text";
import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
  DateInput,
  ImageField,
  ImageInput,
  ReferenceArrayInput,
  ReferenceInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  number,
  required,
} from "react-admin";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

export const PackageForm = () => {
  return (
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
              <ReferenceInput
                source="vendorId"
                reference="vendor"
                filter={{ status: 1 }}
              >
                <AutocompleteInput
                  fullWidth
                  optionText="agencytitle"
                  optionValue="id"
                  validate={[required()]}
                  filterToQuery={(searchText) => ({ q: searchText, status: 1 })}
                />
              </ReferenceInput>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextInput
                fullWidth
                source="title"
                label="Package Title"
                validate={[required()]}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <ReferenceInput source="destination" reference="common/city">
                <AutocompleteInput
                  fullWidth
                  optionText="name"
                  optionValue="id"
                  validate={[required()]}
                  filterToQuery={(searchText) => ({ q: searchText })}
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
                inputProps={{
                  onWheel: (e: React.WheelEvent<HTMLInputElement>) =>
                    e.currentTarget.blur(),
                  min: 1,
                }}
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
              <RichTextInput fullWidth source="inclusion" label="Inclusions" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RichTextInput fullWidth source="exclusion" label="Exclusions" />
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

            {/* Start & End Dates */}
            <Grid item xs={12} sm={6}>
              <StartEndDateInputs />
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
                <AutocompleteArrayInput
                  fullWidth
                  optionText="name"
                  filterToQuery={(searchText) => ({ q: searchText })}
                />
              </ReferenceArrayInput>
            </Grid>
          </Grid>
        </SimpleForm>
      </Paper>
    </Box>
  );
};

// Start & End Dates Component
const StartEndDateInputs = () => {
  const { setValue } = useFormContext();
  const startDate = useWatch({ name: "startDate" });
  const durationRaw = useWatch({ name: "durationDays" });

  const duration = parseInt(durationRaw, 10) || 0;

  useEffect(() => {
    if (startDate && duration > 0) {
      const end = dayjs(startDate)
        .add(duration - 1, "day")
        .format("YYYY-MM-DD");
      setValue("endDate", end);
    }
  }, [startDate, duration, setValue]);

  return (
    <Grid container spacing={3}>
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
          disabled // auto-calculated
        />
      </Grid>
    </Grid>
  );
};
