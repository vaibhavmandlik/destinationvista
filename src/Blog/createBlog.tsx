import { Card, CardHeader } from "@mui/material";

import {
  SimpleForm,
  TextInput,
  CreateBase,
  Title,
} from "react-admin";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";

type PackageParams = {
  title: string;
  body: string;
};
export const createBlog = () => {
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
