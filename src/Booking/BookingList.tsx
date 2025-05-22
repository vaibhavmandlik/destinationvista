import {
  ChipField,
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  ReferenceManyField,
  SingleFieldList,
  TextField,
  useGetIdentity,
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";
import StatusDropdown from "./StatusDropdown";

export const BookingList = () => {
  const { data: user } = useGetIdentity();
  return (
    <List filter={{ vendorId: user?.vendorId }}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" />
        <ReferenceField source="userId" reference="user">
          <TextField source="firstname" />
        </ReferenceField>
        <ReferenceField source="packageId" reference="package" />
        <DateField source="bookingDate" />
        <CurrencyField source="totalPrice" />
        <NumberField source="totalSlots" />
        {/* <EditButton variant="bootstrap" color="primary" />
        <DeleteWithConfirmButton variant="bootstrap" color="danger" /> */}
      </Datagrid>
    </List>
  );
};
