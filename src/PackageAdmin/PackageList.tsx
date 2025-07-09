import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  Filter,
  FunctionField,
  List,
  NumberField,
  ReferenceManyCount,
  SearchInput,
  TextField,
  useGetIdentity,
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
          <NumberField label={"Duration"} source="durationDays" />
          <ReferenceManyCount
            label="Booking"
            reference="booking"
            target="packageId"
            link
          />
          <NumberField label="Available" source="availableSlots" />
          <FunctionField
            source="Actions"
            render={(record) => (
              <div style={{ display: "flex", alignItems: "center", justifyContent:"space-between" }}>
                <ApproveButton record={record} />
                <EditButton label="Edit/Show" variant="text" color="primary" />
                <DeleteWithConfirmButton variant="bootstrap" color="danger" />
              </div>
            )}
          />
        </Datagrid>
      </List>
    </>
  );
};
