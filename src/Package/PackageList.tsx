import {
  BooleanField,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceManyCount,
  TextField,
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRefresh,
} from "react-admin";
import { Switch } from "@mui/material";
import CurrencyField from "../components/CustomFields/CurrencyField";

import ImageField from "../components/CustomFields/ImageField";
export const PackageList = () => {
  const { data: user } = useGetIdentity();

  return (
    <>
      <List filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <ImageField source="imagePaths" />
          <TextField source="title" />
          <CurrencyField locale="en-IN" currency="INR" source="price" />
          <NumberField label={"duration"} source="durationDays" />

          <ReferenceField source="destination" reference="destination">
            <TextField source="title" />
          </ReferenceField>

          <ReferenceManyCount
            label="Booking"
            reference="booking"
            target="packageId"
            link
          />
          <NumberField label="available" source="availableSlots" />
          <BooleanField source="approved" />
          <FunctionField
            label="Status"
            render={(record) => {
              const dataProvider = useDataProvider();
              const notify = useNotify();
              const refresh = useRefresh();

              const handleToggle = async () => {
                try {
                  await dataProvider.update("package", {
                    id: record.id,
                    data: { active: !record.active },
                    previousData: record,
                  });
                  notify(`Package ${record.active ? "deactivated" : "activated"} successfully`, { type: "success" });
                  refresh();
                } catch (error) {
                  notify("Error toggling status", { type: "error" });
                }
              };

              return (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Switch
                    checked={record.active}
                    onChange={handleToggle}
                    color="primary"
                  />
                  <span>{record.active ? "Active" : "Inactive"}</span>
                </div>
              );
            }}
          />
          <FunctionField
            source=""
            render={(record) => (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                <EditButton variant="text" color="primary" />
              </div>
            )}
          />
        </Datagrid>
      </List>
    </>
  );
};
