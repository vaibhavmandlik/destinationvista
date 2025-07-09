import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
  useGetIdentity,
} from "react-admin";
import ImageField from "../components/CustomFields/ImageField";
import {
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
} from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  IconButton,
  Chip,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import {
  useNotify,
  useDataProvider,
  useRefresh,
  FunctionField,
} from "react-admin";
import { Button} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SearchInput } from 'react-admin';
const postFilters = [
    <SearchInput source="q" alwaysOn />
];
export const VendorListAdmin = () => {

  return (
    <>
      <div>
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            startIcon={<HomeIcon />}
          >
            My Agency
          </Link>
          <Typography color="textPrimary">Agency List</Typography>
        </Breadcrumbs>
      </div>
      <List filters={postFilters} title="Agency List">
        <Datagrid rowClick={false} bulkActionButtons={false}>

          <TextField source="id" />
          <ImageField source="images" />
          <TextField source="agencytitle" />
          <EmailField source="email" />
          <TextField source="contactNumber" />
          <FunctionField
            label="Actions"
            render={(record: any) => {
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
                const statusValue={
                  approved:"1",
                  rejected:"0",
                }
                
                try {
                  await dataProvider.update(`vendor` , {
                    id: record.id,
                    data: {...record, isApproved: statusValue[status] },
                    previousData: record,
                  });
                  notify(`Status updated to ${status}`, { type: "success" });
                  refresh();
                } catch (err) {
                  notify("Error updating status", { type: "error" });
                } finally {
                  handleClose();
                }
              };

              const statusColors: Record<string, string> = {
                approved: "#4caf50",    // green
                rejected: "#f44336",    // red
                cancelled: "#f44336",   // red (same as rejected)
                pending: "#ff9800",     // orange
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
                    endIcon={<ArrowDropDownIcon />}
                    sx={{
                      color,
                      borderColor: color,
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      '&:hover': {
                        backgroundColor: `${color}20`, // light background on hover
                        borderColor: color,
                      }
                    }}
                  >
                    Pending
                  </Button>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem disabled dense>Change Status</MenuItem>
                    <MenuItem onClick={() => handleStatusChange("approved")}>Approve</MenuItem>
                    <MenuItem onClick={() => handleStatusChange("rejected")}>Reject</MenuItem>
                  </Menu>
                </>
              );
            }}
          />

          <EditButton variant="text" color="primary" />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" />
        </Datagrid>
      </List>
    </>
  );
};
