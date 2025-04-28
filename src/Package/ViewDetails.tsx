import { Card, CardHeader, CardContent, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import {
  ShowBase,
  SimpleShowLayout,
  TextField,
  NumberField,
  useRecordContext,
  RichTextField,
  Title,
  ArrayField,
  DateField,
} from "react-admin";
import { JSONTree } from "react-json-tree";
const apiUrl = import.meta.env.VITE_API_URL;

export const ViewDetails = () => {
  const record = useRecordContext();
  return <JSONTree data={record} />;
  return (
    <ShowBase>
      <div className="my-5">
        <Title title="Package Details" />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <CardHeader title="Package Information" />
              <CardContent>
                <SimpleShowLayout>
                  <Stack spacing={3}>
                    {/* Top Info */}
                    <Stack direction="row" spacing={2}>
                      <TextField source="title" label="Title" />
                      <NumberField source="price" label="Price (₹)" />
                      <NumberField source="durationDays" label="Duration (Days)" />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      <TextField source="destination" label="Destination" />
                      <NumberField source="availableSlots" label="Available Slots" />
                    </Stack>

                    {/* Description */}
                    <div>
                      <Typography variant="h6">Description</Typography>
                      <RichTextField source="description" label="Description" />
                    </div>

                    {/* Images without library */}
                    <div>
                      <Typography variant="h6" sx={{ mb: 1 }}>Package Images</Typography>
                      <Grid container spacing={2}>
                        
                        <JSONTree data={record} />
                        {record?.imagePaths?.map((img: any, index: number) => (
                          <Grid item xs={6} md={4} key={index}>
                            <img
                             src={img? apiUrl + img : 'https://i.pravatar.cc/150'}
                              alt={img.title || `Image ${index + 1}`}
                              style={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 8,
                                border: '1px solid #ccc',
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>

                    {/* Quick Itinerary */}
                    <TextField source="quickItinerary" label="Quick Itinerary Summary" />

                    {/* Detailed Itinerary */}
                    <div>
                      <Typography variant="h6">Detailed Itinerary</Typography>
                      <ArrayField source="itinerary" label="Day-wise Itinerary">
                        <Grid container spacing={2}>
                          {record?.itinerary?.map((item: any, index: number) => (
                            <Grid item xs={12} key={index}>
                              <Card variant="outlined" sx={{ p: 2 }}>
                                <Typography variant="subtitle1">Day {index + 1}: {item.title}</Typography>
                                <RichTextField source="discription" record={item} label="Description" />
                              </Card>
                            </Grid>
                          ))}
                      </Grid>
                    </ArrayField>
                    </div>

                    {/* Inclusion */}
                    <div>
                      <Typography variant="h6">Inclusions</Typography>
                      <RichTextField source="inclusion" label="Inclusions" />
                    </div>

                    {/* Exclusion */}
                    <div>
                      <Typography variant="h6">Exclusions</Typography>
                      <RichTextField source="exclusion" label="Exclusions" />
                    </div>

                    {/* Other Important Fields */}
                    <Stack direction="row" spacing={2}>
                      <TextField source="vendor_discount" label="Vendor Discount (%)" />
                      <TextField source="pickup_location" label="Pickup Location" />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      <TextField source="start_point" label="Starting Point" />
                      <TextField source="end_point" label="Ending Point" />
                    </Stack>

                    <Stack direction="row" spacing={2}>
                      <TextField source="mode_of_travel" label="Mode of Travel" />
                      <DateField source="package_valid_to" label="Valid Until" />
                    </Stack>

                    {/* Other Info */}
                    <div>
                      <Typography variant="h6">Other Information</Typography>
                      <RichTextField source="otherInfo" label="Other Info" />
                    </div>
                  </Stack>
                </SimpleShowLayout>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </ShowBase>
  );
};
