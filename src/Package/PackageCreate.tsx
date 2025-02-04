import { Card, CardHeader } from "@mui/material";
import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  NumberInput,
  FileInput,
  useGetIdentity,
  CreateBase,
  Title,
  ImageInput,
  ImageField,
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


  return (
    <CreateBase
      redirect={"list"}
      transform={(data:PackageParams) => {
        return { ...data, vendorId: user?.vendorId, price: parseInt(data.price), durationDays: parseInt(data.durationDays), availableSlots: parseInt(data.availableSlots) };
      }}
    >
      <div className="my-5">
        <Title title="Book Creation" />
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <Card>
              <CardHeader title="Add Package" />
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
    </CreateBase>
  );
};
