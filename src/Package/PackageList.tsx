import {
  Datagrid,
  DateField,
  DeleteWithConfirmButton,
  EditButton,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";

export const PackageList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <ReferenceField source="vendorId" reference="vendor">
        <TextField source="agencyTitle" />
      </ReferenceField>
      <TextField source="title" />
      <TextField source="description" />
      <CurrencyField locale="en-IN" currency="INR" source="price" />
      <NumberField source="durationDays" />
      <TextField source="destination" />
      <NumberField source="availableSlots" />
      {/* <NumberField source="approvedBy" /> */}
      <DateField source="approvedOn" />
      {/* <NumberField source="createdBy" />
            <DateField source="createdOn" />
            <NumberField source="updatedBy" />
            <DateField source="updatedOn" />
            <TextField source="enabled" /> */}
      <EditButton variant="bootstrap" color="primary" />
      <DeleteWithConfirmButton variant="bootstrap" color="danger" />
    </Datagrid>
  </List>
);
