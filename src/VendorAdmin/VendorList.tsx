import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  List as MuiList,
  Select,
  Typography,
} from "@mui/material";
import {
  ClearButtons,
  FormatButtons,
  LinkButtons,
  ListButtons,
  RichTextInput,
  RichTextInputToolbar,
} from "ra-input-rich-text";
import React, { useState } from "react";
import {
  CreateButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  ExportButton,
  FunctionField,
  List,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  ToolbarProps,
  TopToolbar,
  useCreate,
  useDataProvider,
  useGetList,
  useNotify,
  useRefresh,
} from "react-admin";
import ImageField from "../components/CustomFields/ImageField";

// ------------------ Notification Button ------------------
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
      const { data } = await dataProvider.getList("notifications", {
        filter: { vendorId: record.id },
        pagination: { page: 1, perPage: 10 },
        sort: { field: "createdAt", order: "DESC" },
      });
      setNotifications(data);
    } catch {
      notify("Error fetching notifications", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        color={notifications.length > 0 ? "primary" : "default"}
      >
        <Badge badgeContent={notifications.length} color="error">
          {notifications.length > 0 ? (
            <NotificationsActiveIcon />
          ) : (
            <NotificationsIcon />
          )}
        </Badge>
      </IconButton>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
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
            <Typography>No notifications found.</Typography>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

// ------------------ Actions Field (Approve/Reject + Edit/Delete) ------------------
const ActionsField = ({ record }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const handleClick = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleStatusChange = async (status: "approved" | "rejected") => {
    if (record.enabled !== "1") {
      notify("Cannot change status of an inactive vendor", { type: "warning" });
      return;
    }

    if (
      !window.confirm(`Are you sure you want to mark this vendor as ${status}?`)
    )
      return;

    const statusValue = { approved: "1", rejected: "0" };
    try {
      await dataProvider.update("vendor", {
        id: record.id,
        data: { ...record, isApproved: statusValue[status] },
        previousData: record,
      });
      notify(`Vendor marked as ${status}`, { type: "success" });
      refresh();
    } catch (err) {
      console.error(err);
      notify("Error updating status", { type: "error" });
    } finally {
      handleClose();
    }
  };

  const statusColors: Record<string, string> = {
    "1": "#4caf50",
    "0": "#f44336",
    undefined: "#ff9800",
  };
  const statusLabels: Record<string, string> = {
    "1": "Approved",
    "0": "Rejected",
    undefined: "Pending",
  };

  const color = statusColors[record.isApproved];
  const label = statusLabels[record.isApproved];

  if (record.enabled !== "1") return <span>Inactive</span>;

  return (
    <Box display="flex" gap={1} alignItems="center">
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
          "&:hover": { backgroundColor: `${color}20`, borderColor: color },
        }}
      >
        {label ? label : "Pending"}
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
    </Box>
  );
};

// ------------------ Custom Toolbar ------------------
const CustomToolbar = (props: ToolbarProps) => (
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

// ------------------ Vendor List Actions ------------------
const VendorListActions = ({ allVendors, handleOpenPingDialog }: any) => (
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

// ------------------ Main Vendor List Component ------------------
export const VendorListAdmin = () => {
  const [pingDialogOpen, setPingDialogOpen] = useState(false);
  const [userStatusList, setUserStatusList] = useState<any[]>([]);
  const [selectedForEmail, setSelectedForEmail] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateData, setTemplateData] = useState<{
    subject?: string;
    body?: string;
  }>({});
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

  const handleOpenMail = () => {
    const selected = userStatusList.filter((u) => u.enabled).map((u) => u.id);
    setSelectedForEmail(selected);
    setSelectedUsers(userStatusList.filter((u) => u.enabled));
    setOpenMail(true);
  };

  const handleOpenMailForUser = (user: any) => {
    setSelectedForEmail([user.id]);
    setSelectedUsers([user]);
    setOpenMail(true);
  };

  const handleCloseEmail = () => setOpenMail(false);

  const handleSubmit = (values: any) => {
    create(
      "vendor/sendMail",
      {
        data: {
          customer: selectedForEmail,
          subject: values.subject,
          body: values.body,
        },
      },
      {
        onSuccess: () => {
          notify("Email sent successfully!", { type: "success" });
          handleCloseEmail();
        },
        onError: () => notify("Error sending email", { type: "warning" }),
      }
    );
  };

  const { data: templates, isLoading: templatesLoading } = useGetList(
    "cannedMail",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "ASC" },
    }
  );

  // Update template data when selection changes
  React.useEffect(() => {
    if (selectedTemplate && templates) {
      const tmpl = templates.find((t: any) => t.id === selectedTemplate);
      if (tmpl) setTemplateData({ subject: tmpl.subject, body: tmpl.body });
    } else {
      setTemplateData({ subject: "", body: "" });
    }
  }, [selectedTemplate, templates]);

  const PackageFilter = [
    <TextInput label="Search by Package ID" source="id" alwaysOn />,
    <TextInput label="Search by vendor ID" source="vendorId" alwaysOn />,
    <SelectInput alwaysOn
      label="Approval Status"
      source="status"
      choices={[
        { id: 0, name: "REJECTED" },
        { id: 1, name: "APPROVED" },
        { id: 2, name: "PENDING" },
      ]}
    />,
  ];

  return (
    <>
      <List
        filters={PackageFilter}
        title="Agency List"
        actions={
          <VendorListActions
            allVendors={allVendors || []}
            handleOpenPingDialog={handleOpenPingDialog}
          />
        }
      >
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <ImageField source="images" />
          <TextField source="agencytitle" />
          <FunctionField
            label="Email"
            render={(record: any) => (
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={() => handleOpenMailForUser(record)}
                  color="primary"
                  size="small"
                >
                  <MailIcon />
                </IconButton>
                <Typography>{record.email}</Typography>
              </Box>
            )}
          />
          <TextField source="contactNumber" />
          <FunctionField
            label="Actions"
            render={(record) => <ActionsField record={record} />}
          />
          <TextField source="enabled" label="Status" />
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
      <Dialog
        open={openMail}
        onClose={handleCloseEmail}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {selectedUsers.length > 1
            ? "Email To Vendors"
            : `Email To ${
                selectedUsers[0]?.agencytitle || selectedUsers[0]?.name || ""
              } (${selectedUsers[0]?.email})`}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              borderRadius: 2,
              boxShadow: 1,
              background: "#fff",
            }}
          >
            <SimpleForm
              onSubmit={handleSubmit}
              toolbar={<CustomToolbar />}
              defaultValues={{
                body: templateData.body,
                subject: templateData.subject,
              }}
            >
              {/* Template Selector */}
              <Box sx={{ mb: 2 }}>
                <Select
                  fullWidth
                  value={selectedTemplate || ""}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select a Template
                  </MenuItem>
                  {templates?.map((t: any) => (
                    <MenuItem key={t.id} value={t.id}>
                      {`${t.category} - ${t.subject}`}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              {/* Subject Input */}
              <TextInput
                source="subject"
                fullWidth
                placeholder="Enter Subject"
                defaultValue={templateData.subject}
                validate={[required()]}
              />

              {/* Rich Text Body */}
              <RichTextInput
                toolbar={
                  <RichTextInputToolbar>
                    <FormatButtons size="small" />
                    <ListButtons size="small" />
                    <LinkButtons size="small" />
                    <ClearButtons size="small" />
                  </RichTextInputToolbar>
                }
                fullWidth
                source="body"
                validate={[required()]}
                defaultValue={templateData.body}
              />
            </SimpleForm>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseEmail}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Ping Dialog */}
      <Dialog
        open={pingDialogOpen}
        onClose={() => setPingDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Ping Vendor</DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Button onClick={() => handleSort("asc")}>Sort Active First</Button>
            <Button onClick={() => handleSort("desc")}>
              Sort Inactive First
            </Button>
          </Box>
          {userStatusList.map((user) => (
            <Box
              key={user.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1}
              p={1}
              border={1}
              borderRadius={1}
            >
              <Typography>
                {user.agencytitle} ({user.email})
              </Typography>
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
