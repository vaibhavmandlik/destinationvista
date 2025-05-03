import {
  BooleanField,
  Datagrid,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceManyCount,
  ShowButton,
  TextField,
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRefresh,
} from "react-admin";
import { Switch } from "@mui/material";
import CurrencyField from "../components/CustomFields/CurrencyField";
import RatingStars from "./RatingStarts";
export const PackageList = () => {
  const { data: user } = useGetIdentity();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleToggle = async (record: any) => {
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
    <List filter={{ vendorId: user?.vendorId }}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="title" />
        <FunctionField render={record => (<RatingStars rating={record.rating} />)} />
        <CurrencyField locale="en-IN" currency="INR" source="price" />
        <NumberField label={"duration"} source="durationDays" />
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
          render={(record) => (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Switch
                checked={record.active}
                onChange={() => handleToggle(record)}
                color="primary"
              />
              <span>{record.active ? "Active" : "Inactive"}</span>
            </div>
          )}
        />
        <FunctionField
          render={() => (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <EditButton variant="text" color="primary" />
              <ShowButton variant="text" />
            </div>
          )}
        />
      </Datagrid>
    </List>
  );
};

