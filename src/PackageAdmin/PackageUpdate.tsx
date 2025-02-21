import { Card, CardHeader } from "@mui/material";
import * as React from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceInput,
  NumberInput,
  EditBase,
  ImageField,
  ImageInput,
  Title,
} from "react-admin";
import { SelectInput } from "react-admin";

export const PackageUpdate = () => (
  <EditBase>
    <div className="my-5">
        <Title title="Package update" />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Card>
              <CardHeader title="Update Package" />
              <hr />
              <SimpleForm className="w-100">
                <div className="row w-100">
                  <div className="col-md-12">
                    <TextInput
                      fullWidth
                      source="title"
                      validate={[required()]}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="price"
                      validate={[required()]}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="durationDays"
                      validate={[required()]}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="destination"
                      validate={[required()]}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="availableSlots"
                      validate={[required()]}
                    />
                  </div>
                  <div className="col-md-12">
                    <TextInput
                      multiline={true}
                      fullWidth
                      source="description"
                      validate={[required()]}
                    />
                  </div>
                  <div className="col-md-12">
                    <ImageInput
                    sx={{'& .RaFileInput-dropZone':{border:'1px dotted #000'}}}
                      accept={{ "image/*": [".png", ".jpg"] }}
                      multiple={true}
                      source="images"
                      label="Package Images"
                    >
                      <ImageField source="src" title="title" />
                    </ImageInput>
                  </div>
                </div>
              </SimpleForm>
            </Card>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
  </EditBase>
);
