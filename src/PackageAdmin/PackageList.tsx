import {
  Datagrid,
  DateInput,
  DeleteWithConfirmButton,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  ReferenceManyCount,
  SelectInput,
  TextField,
  TextInput,
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRefresh,
} from "react-admin";

import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";
import CurrencyField from "../components/CustomFields/CurrencyField";

// ---------------- Filter Component ----------------
const PackageFilter = [
  <TextInput label="Search by Package ID" source="id" alwaysOn />,
  <TextInput label="Search by title" source="title" />,
  <TextInput label="Search by vendor ID" source="vendorId" />,
  <DateInput label="Start Date (From)" source="startDate" />,
  <DateInput label="Duration" source="duration" />,
  <SelectInput
    label="Approval Status"
    source="status"
    choices={[
      { id: 0, name: "REJECTED" },
      { id: 1, name: "APPROVED" },
      { id: 2, name: "PENDING" },
    ]}
  />,
];

// ---------------- Approval Status Field ----------------
const ApprovalStatusField = ({ record }: { record: any }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (status: "approved" | "rejected") => {
    if (record.isActive !== "1") {
      notify("Cannot change status of an inactive package", {
        type: "warning",
      });
      return;
    }

    const confirmMessage = `Are you sure you want to mark this as ${status}?`;
    if (!window.confirm(confirmMessage)) return;

    const statusValue = {
      approved: "1",
      rejected: "0",
    };

    try {
      await dataProvider.update("package", {
        id: record.id,
        data: {
          isApproved: statusValue[status],
        },
        previousData: record,
      });
      notify(`Package marked as ${status}`, { type: "success" });
      refresh();
    } catch (err) {
      console.error(err);
      notify("Error updating status", { type: "error" });
    } finally {
      handleClose();
    }
  };

  // Status Colors & Labels
  const statusColors: Record<string, string> = {
    "1": "#4caf50", // Approved
    "0": "#f44336", // Rejected
    undefined: "#ff9800", // Pending
  };

  const statusLabels: Record<string, string> = {
    "1": "Approved",
    "0": "Rejected",
    undefined: "Pending",
  };

  const color = statusColors[record.isApproved];
  const label = statusLabels[record.isApproved];

  // Hide button if inactive
  if (record.isActive !== "1") return <span>{label || "Pending"}</span>;

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        endIcon={<ArrowDropDownCircleOutlined />}
        sx={{
          color,
          borderColor: color,
          textTransform: "capitalize",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: `${color}20`,
            borderColor: color,
          },
        }}
      >
        {label || "Pending"}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem disabled dense>
          Change Status
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("approved")}>
          Approve
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange("rejected")}>
          Reject
        </MenuItem>
      </Menu>
    </>
  );
};

// ---------------- Main List Component ----------------
export const PackageAdminList = () => {
  const { data: user } = useGetIdentity();

  return (
    <List filters={PackageFilter} filter={{ vendorId: user?.vendorId }}>
      <Datagrid rowClick={false} bulkActionButtons={false}>
        <TextField source="id" />
        {/* <ImageField source="imagePaths" /> */}
        <TextField source="title" />
        <CurrencyField locale="en-IN" currency="INR" source="price" />
        <NumberField label="Duration" source="durationDays" />
        <ReferenceManyCount
          label="Booking"
          reference="booking"
          target="packageId"
          link
        />
        <NumberField label="Available" source="availableSlots" />
        <ReferenceField
          label="Vendor"
          source="vendorId"
          reference="vendor"
          link={false}
        >
          <TextField source="agencytitle" />
        </ReferenceField>

        {/* Approval Status */}
        <FunctionField
          label="Approval Status"
          render={(record: any) =>
            record.enabled !== "0" ? (
              <ApprovalStatusField record={record} />
            ) : (
              <span>Inactive</span> // Show placeholder if inactive
            )
          }
        />

        {/* Actions */}
        <FunctionField
          label="Actions"
          render={(record) =>
            record.enabled !== "0" ? (
              <div style={{ display: "flex", gap: "8px" }}>
                <EditButton label="Edit/Show" variant="text" color="primary" />
                <DeleteWithConfirmButton variant="bootstrap" color="danger" />
              </div>
            ) : (
              <span>Inactive</span> // Show placeholder if inactive
            )
          }
        />
      </Datagrid>
    </List>
  );
};
