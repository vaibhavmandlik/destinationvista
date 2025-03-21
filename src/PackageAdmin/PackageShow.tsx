import { Button, Card, CardContent, Tabs, Tab, Box} from "@mui/material";
import React from "react";
import {
  useShowController,
  BooleanField,
  Datagrid,
  NumberField,
  RichTextField,
  TextField,
  ArrayField,
} from "react-admin";
import Carousel from "./Carousel";
import { CheckCircle, Twitter } from "@mui/icons-material";

const PackageShow = () => {
  const { record } = useShowController();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (!record) return null;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{record.title}</h1>
        <Button>Book Now</Button>
      </div>

      {/* Carousel Section */}
      <Carousel images={record.imagePaths} className="mb-6" />

      {/* Basic Info Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent>
            <p className="font-semibold">Price</p>
            <p>${record.price}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="font-semibold">Duration</p>
            <p>{record.durationDays} days</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p className="font-semibold">Available Slots</p>
            <p>{record.availableSlots}</p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Status */}
      <div className="mb-6 flex items-center gap-2">
        <p className="font-semibold">Approval Status:</p>
        {record.approved ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <Twitter className="text-red-500" />
        )}
      </div>

      {/* Tabs Section */}
      {/* Tabs Section */}
      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="Package Details Tabs">
          <Tab label="Quick Itinerary" />
          <Tab label="Itinerary" />
          <Tab label="Inclusions" />
          <Tab label="Exclusions" />
          <Tab label="Other Info" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {value === 0 && <RichTextField source="quickItinerary" record={record} />}
          {value === 1 && (
            <ArrayField source="itinerary" record={record}>
              <Datagrid>
                <TextField source="title" />
                <RichTextField source="description" />
              </Datagrid>
            </ArrayField>
          )}
          {value === 2 && <RichTextField source="inclusion" record={record} />}
          {value === 3 && <RichTextField source="exclusion" record={record} />}
          {value === 4 && <RichTextField source="otherInfo" record={record} />}
        </Box>
      </Box>
    </div>
  );
};

export default PackageShow; 
