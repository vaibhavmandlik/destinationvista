import {
  SimpleForm,
  TextInput,
  required,
  useGetIdentity,
  CreateBase,
  ImageInput,
  ImageField,
  useUnique,
  ArrayInput,
  SimpleFormIterator,
  number,
  DateInput,
} from "react-admin";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import { Grid, Box, Typography, Paper } from "@mui/material"; // Import MUI components

type ItineraryType = {
  title: string;
  description: string; // Corrected typo from 'discription' to 'description'
};

type PackageParams = {
  id: string;
  title: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: string;
  vendorId: string;
  description: string;
  images: {
    rawFile: File;
    src?: string;
    title?: string;
  };
  quickItinerary: string;
  itinerary: ItineraryType[];
  inclusion: string;
  exclusion: string;
  otherInfo: string;
  vendor_discount?: string; // Added optional for fields not in initial transform
  pickup_location?: string;
  start_point?: string;
  end_point?: string;
  mode_of_travel?: string;
  start_date?: Date;
  end_date?: Date;
};

export const PackageCreate = () => {
  const { data: user } = useGetIdentity();
  const unique = useUnique();

  return (
    <CreateBase
      redirect={"list"}
      transform={(data: PackageParams) => {
        return {
          ...data,
          vendorId: user?.vendorId,
          price: data.price ? parseInt(data.price) : undefined, // Handle undefined or null
          durationDays: data.durationDays ? parseInt(data.durationDays) : undefined,
          availableSlots: data.availableSlots ? parseInt(data.availableSlots) : undefined,
        };
      }}
    >
      <Box sx={{ flexGrow: 1, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom align="center">
          Create New Holiday Package
        </Typography>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mx: { xs: 1, md: 'auto' }, maxWidth: 900 }}>
          <SimpleForm>
            <Grid container spacing={3}>
              {/* Package Details Section */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Package Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="title"
                  label="Package Title"
                  validate={[required(), unique({ filter: { vendorId: user?.vendorId } })]}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="destination"
                  label="Destination"
                  validate={[required()]}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextInput
                  fullWidth
                  source="price"
                  label="Price (INR)"
                  validate={[required(), number()]}
                  type="number" // Ensure number input keyboard on mobile
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
                  label="Package Description"
                  validate={[required()]}
                />
              </Grid>

              {/* Images */}
              <Grid item xs={12}>
                <ImageInput
                  sx={{
                    "& .RaFileInput-dropZone": {
                      border: "1px dotted #000",
                      borderRadius: 1,
                      p: 2,
                      textAlign: 'center',
                      minHeight: 100
                    },
                  }}
                  accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                  multiple={true}
                  source="images"
                  label="Package Images"
                >
                  <ImageField source="src" title="title" />
                </ImageInput>
              </Grid>

              {/* Itinerary Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                  Itinerary
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  fullWidth
                  source="quickItinerary"
                  label="Quick Itinerary Summary"
                  helperText="A brief overview of the itinerary (e.g., Day 1: Arrival, Day 2: Sightseeing)"
                />
              </Grid>
              <Grid item xs={12}>
                <ArrayInput source="itinerary" label="Detailed Itinerary">
                  <SimpleFormIterator
                    disableReordering
                    getItemLabel={(index) => `Day #${index + 1}`}
                    fullWidth
                    sx={{
                      "& .RaSimpleFormIterator-form": {
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        p: 2,
                        mb: 2,
                        backgroundColor: '#f9f9f9'
                      }
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <TextInput
                        fullWidth
                        source="title"
                        label="Day Title (e.g., Day 1: Arrival in Goa)"
                        validate={[required()]}
                      />
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
                        label="Day Description"
                        validate={[required()]}
                      />
                    </Box>
                  </SimpleFormIterator>
                </ArrayInput>
              </Grid>

              {/* Inclusions & Exclusions */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }} gutterBottom>
                  Additional Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  source={"inclusion"}
                  label="Inclusions"
                  helperText="What's included in the package (e.g., Flights, Accommodation, Meals)"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                  source={"exclusion"}
                  label="Exclusions"
                  helperText="What's not included in the package (e.g., Personal expenses, Visa fees)"
                />
              </Grid>

              {/* Other Information */}
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="vendor_discount"
                  label="Vendor Discount (%)"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="pickup_location"
                  label="Pickup Location"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="start_point"
                  label="Start Point"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  fullWidth
                  source="end_point"
                  label="End Point"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextInput
                  fullWidth
                  source="mode_of_travel"
                  label="Mode of Travel"
                  helperText="e.g., Flight, Train, Bus, Self-drive"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DateInput
                  fullWidth
                  source="start_date"
                  label="Start Date"
                   sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 1, // Common border-radius for MUI inputs
                      height: '56px', // Default height for MUI TextInputs
                      padding: '10px 14px', // Default padding for MUI TextInputs
                      border: '1px solid rgba(0, 0, 0, 0.23)', // Default border color
                      backgroundColor: '#fff', // Default background color
                      color: 'rgba(0, 0, 0, 0.87)', // Default text color
                    },
                    '& .MuiInputLabel-root': { // Targets the label
                        // This might be needed if your label alignment is off
                        color: 'rgba(0, 0, 0, 0.6)', // Default label color
                        fontSize: '1rem', // Default font size for labels

                    },
                    // If you want to explicitly match the border style:
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.23)', // Default MUI border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.87)', // Hover border color
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main', // Focused border color
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateInput
                  fullWidth
                  source="end_date"
                  label="End Date"
                       sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 1, // Common border-radius for MUI inputs
                      height: '56px', // Default height for MUI TextInputs
                      padding: '10px 14px', // Default padding for MUI TextInputs
                      border: '1px solid rgba(0, 0, 0, 0.23)', // Default border color
                      backgroundColor: '#fff', // Default background color
                      color: 'rgba(0, 0, 0, 0.87)', // Default text color
                    },
                    '& .MuiInputLabel-root': { // Targets the label
                        // This might be needed if your label alignment is off
                        color: 'rgba(0, 0, 0, 0.6)', // Default label color
                        fontSize: '1rem', // Default font size for labels

                    },
                    // If you want to explicitly match the border style:
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.23)', // Default MUI border color
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.87)', // Hover border color
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main', // Focused border color
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  source={"otherInfo"}
                  label="Other Important Information"
                  helperText="Any other relevant details or terms and conditions"
                />
              </Grid>
            </Grid>
          </SimpleForm>
        </Paper>
      </Box>
    </CreateBase>
  );
};