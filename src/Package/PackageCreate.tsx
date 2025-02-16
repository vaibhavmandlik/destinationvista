import { Card, CardHeader, CardContent, Grid, Button } from "@mui/material";
import * as React from "react";
import {
  Create,
  TextInput,
  required,
  useGetIdentity,
  Title,
  ImageInput,
  ImageField,
  useNotify,
  useRedirect,
  useDataProvider,
  SimpleForm,
} from "react-admin";

type PackageParams = {
  id: string;
  title: string;
  price: string;
  durationDays: string;
  destination: string;
  availableSlots: string;
  description: string;
  images: any;
};

export const PackageCreate = () => {
  const { data: user } = useGetIdentity();
  const notify = useNotify();
  const redirect = useRedirect();
  const dataProvider = useDataProvider();

  const handleSubmit = async (values: PackageParams) => {
    try {
      await dataProvider.create("packages", {
        data: {
          ...values,
          vendorId: user?.vendorId,
          price: parseInt(values.price),
          durationDays: parseInt(values.durationDays),
          availableSlots: parseInt(values.availableSlots),
        },
      });
      notify("Package created successfully!", { type: "success" });
      redirect("/packages");
    } catch (error) {
      notify("Error creating package. Try again!", { type: "error" });
    }
  };

  return (
    <Create transform={handleSubmit}>
      <Title title="Create New Travel Package" />
      <Grid container justifyContent="center" sx={{ mt: 5 }}>
        <Grid item xs={12} md={8} lg={6}>

          {/* title */}
          <Card sx={{ borderRadius: 3, boxShadow: 6, p: 3, background: "#f9f9ff" }}>
            <CardHeader
              title="Add a New Travel Package"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#333",
                pb: 2,
              }}
            />
            <CardContent>
              <SimpleForm onSubmit={handleSubmit} toolbar={false}>
                <Grid container spacing={2}>

                  {/* Title */}
                  <Grid item xs={12}>
                    <TextInput
                      fullWidth
                      source="title"
                      label="Package Title"
                      validate={[required()]}
                      sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    />
                  </Grid>

                  {/* Price */}
                  <Grid item xs={6}>
                    <TextInput
                      fullWidth
                      source="price"
                      label="Price"
                      validate={[required()]}
                      sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    />
                  </Grid>

                  {/* Duration  */}
                  <Grid item xs={6}>
                    <TextInput
                      fullWidth
                      source="durationDays"
                      label="Duration (Days)"
                      validate={[required()]}
                      sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    />
                  </Grid>

                  {/* Destination*/}
                  <Grid item xs={6}>
                    <TextInput
                      fullWidth
                      source="destination"
                      label="Destination"
                      validate={[required()]}
                      sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    />
                  </Grid>

                  {/* Available Slots  */}
                  <Grid item xs={6}>
                    <TextInput
                      fullWidth
                      source="availableSlots"
                      label="Available Slots"
                      validate={[required()]}
                      sx={{ backgroundColor: "#fff", borderRadius: "8px" }}
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextInput
                      multiline
                      fullWidth
                      source="description"
                      label="Package Description"
                      validate={[required()]}
                      sx={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        "& .MuiInputBase-root": { height: 100 },
                      }}
                    />
                  </Grid>

                  {/* Image Upload */}
                  <Grid item xs={12}>
                    <ImageInput
                      sx={{
                        "& .RaFileInput-dropZone": {
                          border: "2px dashed #635DFF",
                          borderRadius: "10px",
                          padding: "15px",
                          textAlign: "center",
                          backgroundColor: "#f4f4ff",
                          "&:hover": { backgroundColor: "#e0e0ff" },
                        },
                      }}
                      accept={{ "image/*": [".png", ".jpg"] }}
                      multiple
                      source="images"
                      label="Upload Package Images"
                    >
                      <ImageField source="src" title="title" />
                    </ImageInput>
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12} textAlign="center">
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        px: 4,
                        py: 1.5,
                        fontSize: "16px",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "10px",
                        "&:hover": { backgroundColor: "#388E3C" },
                      }}
                    >
                      Create Package
                    </Button>
                  </Grid>
                </Grid>
              </SimpleForm>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Create>
  );
};
