import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  EditButton,
  Filter,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceManyCount,
  SearchInput,
  ShowButton,
  TextField,
  useGetIdentity,
  WrapperField,
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";
import ApproveButton from "./ApproveButton";
import ImageField from "../components/CustomFields/ImageField";
const PackageFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
);

export const PackageAdminList = () => {
  const { data: user } = useGetIdentity();

  return (
    <>
      <List filters={<PackageFilter />} filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <ImageField source="imagePaths" />
          <TextField source="title" />
          <CurrencyField locale="en-IN" currency="INR" source="price" />
          <NumberField label={"duration"} source="durationDays" />
          <TextField source="destination" />
          <ReferenceManyCount
            label="Booking"
            reference="booking"
            target="packageId"
            link
          />
          <NumberField label="available" source="availableSlots" />
          <FunctionField
            source=""
            render={(record) => (
              <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                <ApproveButton record={record} />
                <ShowButton variant="text" label="Details" color="info" />
                <EditButton variant="text" color="primary" />
                <DeleteWithConfirmButton variant="bootstrap" color="danger" />
              </div>
            )}
          />
        </Datagrid>
      </List>
    </>
  );
};
