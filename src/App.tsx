import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { ListGuesser } from "react-admin";

const dataProvider = jsonServerProvider("https://jsonplaceholder.typicode.com");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="posts" list={ListGuesser} />
  </Admin>
);

export default App;
