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
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";
import ApproveButton from "./ApproveButton";
import ImageField from "../components/CustomFields/ImageField";
import { Button, Chip, Menu, MenuItem } from "@mui/material";
import { ArrowDropDownCircleOutlined } from "@mui/icons-material";
import React from "react";
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
          {/* <ImageField source="imagePaths" /> */}
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
            label="Approval Status"
            render={(record: any) => {
              const [anchorEl, setAnchorEl] =
                React.useState<null | HTMLElement>(null);
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

              const handleStatusChange = async (
                status: "approved" | "rejected"
              ) => {
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
                  notify("Package approved successfully", { type: "success" });
                  refresh();
                } catch (err) {
                  notify("Error updating status", { type: "error" });
                } finally {
                  handleClose();
                }
              };

              const statusColors: Record<string, string> = {
                approved: "#4caf50", // green
                rejected: "#f44336", // red
                cancelled: "#f44336", // red (same as rejected)
                pending: "#ff9800", // orange
              };

              const color = statusColors[record.approvalStatus] || "#000";
              // if already approved show only the status
              if (record.isApproved === "1") {
                return (
                  <Chip
                    label={"Approved"}
                    style={{ backgroundColor: "#4caf50", color: "#fff" }}
                    size="small"
                  />
                );
              }
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
                        backgroundColor: `${color}20`, // light background on hover
                        borderColor: color,
                      },
                    }}
                  >
                    Pending
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
            }}
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
    </>
  );
};
