import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  List as MuiList,
  MenuItem,
  Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import React, { useState } from "react";
import {
  CreateButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  ExportButton,
  FunctionField,
  List,
  required,
  SaveButton,
  SearchInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  TopToolbar,
  useCreate,
  useDataProvider,
  useGetList,
  useListController,
  useNotify,
  useRefresh
} from "react-admin";

import ImageField from "../components/CustomFields/ImageField";
import { RichTextInput, RichTextInputToolbar, FormatButtons, ListButtons, LinkButtons, ClearButtons } from "ra-input-rich-text";
const postFilters = [
  <SearchInput source="q" alwaysOn />
];


//Notification button component
const NotificationButton = ({ record }: any) => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const dataProvider = useDataProvider();
  const notify = useNotify();

  const handleOpen = async () => {
    setOpen(true);
    setLoading(true);

    try {
      // fetch notifications for this vendor (adjust endpoint as needed)
      const { data } = await dataProvider.getList("notifications", {
        filter: { vendorId: record.id },
        pagination: { page: 1, perPage: 10 },
        sort: { field: "createdAt", order: "DESC" },
      });

      setNotifications(data);
    } catch (err) {
      notify("Error fetching notifications", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  const hasNotifications = notifications.length > 0;

  return (
    <>
      <IconButton onClick={handleOpen} color={hasNotifications ? "primary" : "default"}>
        <Badge badgeContent={notifications.length} color="error">
          {hasNotifications ? <NotificationsActiveIcon /> : <NotificationsIcon />}
        </Badge>
      </IconButton>

      {/* Notifications Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Notifications for {record.agencytitle}</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : notifications.length > 0 ? (
            <MuiList>
              {notifications.map((note: any) => (
                <ListItem key={note.id} divider>
                  <ListItemText
                    primary={note.title}
                    secondary={note.message || note.createdAt}
                  />
                </ListItem>
              ))}
            </MuiList>
          ) : (
            <p>No notifications found.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};


const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <Button
      variant="outlined"
      color="inherit"
      sx={{ borderRadius: 2, minWidth: 100, mr: 2 }}
      type="reset"
    >
      Clear
    </Button>
    <SaveButton
      label="Submit"
      sx={{
        borderRadius: 2,
        minWidth: 100,
        background: "#2563eb",
        "&:hover": { background: "#1746a2" },
      }}
    />
  </Toolbar>
);

const VendorListActions = ({ allVendors, handleOpenPingDialog }) => {
  return (
    <TopToolbar>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenPingDialog(allVendors)}
        sx={{ ml: 2 }}
      >
        Ping Vendor
      </Button>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};
export const VendorListAdmin = () => {
  const [pingDialogOpen, setPingDialogOpen] = useState(false);
  const [userStatusList, setUserStatusList] = useState<any[]>([]);
  const [selectedForEmail, setSelectedForEmail] = useState<any[]>([]);
  const [openMail, setOpenMail] = useState(false);

  const notify = useNotify();
  const [create] = useCreate();

  const { data: allVendors } = useGetList("vendor");
  const handleOpenPingDialog = (users: any[]) => {
    setUserStatusList(users);
    setPingDialogOpen(true);
  };

  const handleSort = (type: "asc" | "desc") => {
    const sorted = [...userStatusList].sort((a, b) =>
      type === "asc" ? a.enabled - b.enabled : b.enabled - a.enabled
    );
    setUserStatusList(sorted);
  };


  //to handle mail sending
  const handleOpenMail = () => {
    const selected = userStatusList.filter(user => user.enabled).map(user => user.id);
    setSelectedForEmail(selected);
    setOpenMail(true);
  };

  const handleCloseEmail = () => {
    setOpenMail(false);

  };

  const handleSubmit = (values: any) => {
    create(
      "vendor/sendMail",
      { data: { customer: selectedForEmail, subject: values.subject, body: values.body } },
      {
        onSuccess: () => { notify("Email sent successfully!", { type: "success" }); handleCloseEmail(); },
        onError: () => { notify("Error sending email", { type: "warning" }); }
      }
    );
  };

  const handleClose = () => {
    setOpenMail(false);
  };

  return (
    <>
      <List title="Agency List"
        actions={<VendorListActions allVendors={allVendors || []} handleOpenPingDialog={handleOpenPingDialog} />}
      >
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
                const statusValue = {
                  approved: "1",
                  rejected: "0",
                }

                try {
                  await dataProvider.update(`vendor`, {
                    id: record.id,
                    data: { ...record, isApproved: statusValue[status] },
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
          <TextField source="enabled" label={"Status"} />

          <FunctionField
            label="Notifications"
            render={(record: any) => <NotificationButton record={record} />}
          />

          <EditButton
            variant="text"
            color="primary"
            label={false}
            icon={<EditIcon />}
          />
          <DeleteWithConfirmButton
            variant="text"
            color="error"
            label={false}
            icon={<DeleteIcon />}
          />
        </Datagrid>
      </List>

      {/* Mail Dialog */}
      <Dialog open={openMail} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Mail To Vendors</DialogTitle>
        <DialogContent>
          <Box sx={{ borderRadius: 2, margin: 4, boxShadow: 1, background: "#fff" }}>
            <SimpleForm onSubmit={handleSubmit} toolbar={<CustomToolbar />} defaultValues={{ body: "<p>Write your message here...</p><br/><br/><br/>" }}>
              <Typography variant="h6" sx={{ padding: 2, borderRadius: 2 }}>
                Email to Users
              </Typography>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <TextInput source="subject" fullWidth placeholder="Enter Subject" />
                </div>
                <div className="col-md-12 col-lg-12">
                  <RichTextInput
                    toolbar={<RichTextInputToolbar><FormatButtons size="small" /><ListButtons size="small" /><LinkButtons size="small" /><ClearButtons size="small" /></RichTextInputToolbar>}
                    fullWidth
                    source="body"
                    validate={[required()]}
                  />
                </div>
              </div>
            </SimpleForm>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEmail} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* user ping dialog box */}
      <Dialog open={pingDialogOpen} onClose={() => setPingDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Ping Vendor</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button onClick={() => handleSort("asc")}>Sort Active First</Button>
            <Button onClick={() => handleSort("desc")}>Sort Inactive First</Button>
          </Box>
          {userStatusList.map(user => (
            <Box key={user.id} display="flex" justifyContent="space-between" alignItems="center" mb={1} p={1} border={1} borderRadius={1}>
              <Typography>{user.agencytitle} ({user.email})</Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPingDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleOpenMail}>
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
