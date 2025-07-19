import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useGetIdentity,
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";

export const BookingList = () => {
  const { data: user } = useGetIdentity();
  return (
    <List filter={{ vendorId: user?.vendorId }}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" />
        <ReferenceField source="userId" reference="user">
          <TextField source="firstName" />
        </ReferenceField>
        <ReferenceField source="packageId" reference="package" />
        <DateField source="bookingDate" />
        <CurrencyField source="totalPrice" />
        <NumberField source="totalSlots" />
      </Datagrid>
    </List>
  );
};
