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
  useUnique,
  ReferenceInput,
  SelectInput,
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
import { Height } from "@mui/icons-material";
type itineraryType = {
  title: string;
  discription: string;
};
type PackageParams = {
  id: string;
  title: string;
  body: string;
};
export const createBlog = () => {
  const { data: user } = useGetIdentity();

  const unique = useUnique();
  return (
    <CreateBase
      redirect={"list"}
      transform={(data: PackageParams) => {
        return {
          ...data,
        };
      }}
    >
      <div className="my-5">
        <Title title="Book Creation" />
        <div className="row">
          <div className="col-md-12 col-lg-3"></div>
          <div className="col-md-12 col-lg-6">
            <Card>
              <CardHeader title="Add Blog" />
              <hr />
              <SimpleForm className="w-100">
                <div className="row w-100">
                  <div className="col-md-12">
                    <TextInput
                      fullWidth
                      source="title"
                      validate={[
                        required(),
                        unique({ filter: { vendorId: user?.vendorId } }),
                      ]}
                    />
                  </div>

                  <div className="col-md-12">
                    <RichTextInput
                      source="body"
                      toolbar={
                        <RichTextInputToolbar>
                          <FormatButtons size="small" />
                          <ListButtons size="small" />
                          <LinkButtons size="small" />
                          <ClearButtons size="small" />
                        </RichTextInputToolbar>
                      }
                      fullWidth
                      sx={{      
                        ".ProseMirror": {
                          minHeight: "300px", 
                          maxHeight: "350px", 
                          overflowY: "auto",
                        },
                      }}
                    />
                  </div>
                </div>
              </SimpleForm>
            </Card>
          </div>
          <div className="col-md-12 col-lg-3"></div>
        </div>
      </div>
    </CreateBase>
  );
};
