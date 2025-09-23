import { Create, SimpleForm } from "react-admin";
import { BlogEditor } from "./BlogEditor";

export const createBlog = () => {
  return (
    <Create redirect="list">
      <SimpleForm>
        <BlogEditor />
      </SimpleForm>
    </Create>
  );
};
