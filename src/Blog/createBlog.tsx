import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import { Create, SimpleForm, TextInput } from "react-admin";

type PackageParams = {
  title: string;
  body: string;
};
export const createBlog = () => {
  return (
    <Create
      redirect={"list"}
      transform={(data: PackageParams) => {
        return {
          ...data,
        };
      }}
    >
      <h4 style={{ padding: "10px" }}>Blog</h4>
      <p style={{ padding: "10px" }}>
        {" "}
        Fill in the details below to create a new blog.{" "}
      </p>
      <SimpleForm className="w-100">
        <div className="row w-100">
          <div className="col-md-12">
            <TextInput fullWidth source="title" />
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
    </Create>
  );
};
