import { Edit, SimpleForm } from "react-admin";
import { BlogEditor } from "./BlogEditor";

interface BlogData {
  title: string;
  body: string;
}

export const UpdateBlog = ({ record }: { record: BlogData }) => {
  return (
    <Edit record={record} redirect="list">
      <SimpleForm>
        <BlogEditor
          initialTitle={record?.title || ""}
          initialBody={record?.body || ""}
        />
      </SimpleForm>
    </Edit>
  );
};
