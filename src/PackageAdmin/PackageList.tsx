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
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRefresh,
  ReferenceField,
} from "react-admin";

import CurrencyField from "../components/CustomFields/CurrencyField";
import ImageField from "../components/CustomFields/ImageField";
import { Button, Chip, Menu, MenuItem } from "@mui/material";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import React from "react";

// Filter Component
const PackageFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
  </Filter>
);

// Custom Component to Show and Change Approval Status
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
          ...record,
          isApproved: statusValue[status],
          vendorId: record.vendorId,
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

// Main List Component
export const PackageAdminList = () => {
  const { data: user } = useGetIdentity();

  return (
    <List filters={<PackageFilter />} filter={{ vendorId: user?.vendorId }}>
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

        {/* ✅ Use the ApprovalStatusField component */}
        <FunctionField
          label="Approval Status"
          render={(record: any) => <ApprovalStatusField record={record} />}
        />

        <FunctionField
          source="Actions"
          render={(record) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <EditButton label="Edit/Show" variant="text" color="primary" />
              <DeleteWithConfirmButton variant="bootstrap" color="danger" />
            </div>
          )}
        />
      </Datagrid>
    </List>
  );
};
