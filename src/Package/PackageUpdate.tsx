import { Card, CardHeader } from "@mui/material";

import {
  SimpleForm,
  TextInput,
  required,
  useGetIdentity,
  Title,
  ImageInput,
  ImageField,
  useUnique,
  ReferenceInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  number,
  EditBase,
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

type itineraryType = {
  title: string;
  description: string;
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
  itinerary: itineraryType[];
  inclusion: string;
  exclusion: string;
  otherInfo: string;
};

export const PackageUpdate = () => {
  const { data: user } = useGetIdentity();
  const unique = useUnique();

  return (
    <EditBase
      redirect={"list"}
      transform={(data: PackageParams) => {
        return {
          ...data,
          vendorId: user?.vendorId,
          price: parseInt(data.price),
          durationDays: parseInt(data.durationDays),
          availableSlots: parseInt(data.availableSlots),
        };
      }}
    >
      <div className="my-5">
        <Title title="Edit Package" />
        <div className="row">
          <div className="col-md-12 col-lg-3"></div>
          <div className="col-md-12 col-lg-6">
            <Card>
              <CardHeader title="Edit Package" />
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
                      validate={[required(), number()]}
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="durationDays"
                      validate={[required(), number()]}
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
                      validate={[required(), number()]}
                    />
                  </div>
                  <div className="col-md-12">
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
                  </div>
                  <div className="col-md-12">
                    <ImageInput
                      sx={{
                        "& .RaFileInput-dropZone": {
                          border: "1px dotted #000",
                        },
                      }}
                      accept={{ "image/*": [".png", ".jpg"] }}
                      multiple={true}
                      source="images"
                      label="Package Images"
                    >
                      <ImageField source="src" title="title" />
                    </ImageInput>
                  </div>
                  <div className="col-md-12">
                    <TextInput
                      fullWidth
                      source="quickItinerary"
                      validate={[]}
                    />
                  </div>
                  <div className="col-md-12">
                    <hr />
                    <ArrayInput source="itinerary">
                      <SimpleFormIterator
                        disableReordering
                        getItemLabel={(index) => `#${index + 1}`}
                        fullWidth
                      >
                        <div className="m-2">
                          <TextInput
                            fullWidth
                            source="title"
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
                            validate={[required()]}
                          />
                        </div>
                      </SimpleFormIterator>
                    </ArrayInput>
                  </div>
                  <div className="col-md-12">
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
                    />
                  </div>
                  <div className="col-md-12">
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
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="vendor_discount"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="pickup_location"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="start_point"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="end_point"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextInput
                      fullWidth
                      source="mode_of_travel"
                    />
                  </div>
                  <div className="col-md-6">
                    <DateInput
                      fullWidth
                      source="package_valid_to"
                    />
                  </div>
                  <div className="col-md-12">
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
                    />
                  </div>
                </div>
              </SimpleForm>
            </Card>
          </div>
          <div className="col-md-12 col-lg-3"></div>
        </div>
      </div>
    </EditBase>
  );
};