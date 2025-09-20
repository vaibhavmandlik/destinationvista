import { useEffect, useState } from "react";
import {
  CreateButton,
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  ExportButton,
  FunctionField,
  List,
  ReferenceField,
  required,
  SaveButton,
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
  useRecordContext,
} from "react-admin";

import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

import axios from "axios";
import { MailIcon } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL;

// Role mapping
const RoleField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;

  const roleMap: Record<number, string> = {
    0: "Admin",
    1: "Vendor",
    2: "Customer",
  };

  return <span>{roleMap[record[source]] ?? "Unknown"}</span>;
};

// Custom toolbar for forms
const CustomToolbar = (props: any) => (
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

// Booking details button
const BookingDetailsButton = ({ onOpen }: { onOpen: (user: any) => void }) => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Button variant="outlined" size="small" onClick={() => onOpen(record)}>
      Details
    </Button>
  );
};

// Ping Users Top Toolbar
const UserListActions = ({ allUsers, handleOpenPingDialog }) => {
  return (
    <TopToolbar>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenPingDialog(allUsers)}
        sx={{ ml: 2 }}
      >
        Ping Users
      </Button>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

export const UserList = () => {
  const notify = useNotify();
  const [create] = useCreate();
  const dataProvider = useDataProvider();

  const { data: allUsers } = useListController({ resource: "user" }); // Fetch all users

  const [open, setOpen] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [transactionsDetails, setTransactionsDetails] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>({});
  const [pingDialogOpen, setPingDialogOpen] = useState(false);
  const [userStatusList, setUserStatusList] = useState<any[]>([]);
  const [selectedForEmail, setSelectedForEmail] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateData, setTemplateData] = useState<{
    subject?: string;
    body?: string;
  }>({});

  const { data: templates, isLoading: templatesLoading } = useGetList(
    "cannedMail",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "id", order: "ASC" },
    }
  );

  useEffect(() => {
    if (selectedTemplate && templates) {
      const tmpl = templates.find((t: any) => t.id === selectedTemplate);
      if (tmpl) setTemplateData({ subject: tmpl.subject, body: tmpl.body });
    } else {
      setTemplateData({ subject: "", body: "" });
    }
  }, [selectedTemplate, templates]);

  // Download warning dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  // Handle Ping Users Dialog
  const handleOpenPingDialog = (users: any[]) => {
    setUserStatusList(users);
    setSelectedUsers([]);
    setPingDialogOpen(true);
  };

  const handleSort = (type: "asc" | "desc") => {
    const sorted = [...userStatusList].sort((a, b) =>
      type === "asc" ? a.enabled - b.enabled : b.enabled - a.enabled
    );
    setUserStatusList(sorted);
  };

  // Invoice download
  const handleDownloadClick = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDownload = () => {
    if (selectedBookingId) handleInvoice(selectedBookingId);
    setConfirmDialogOpen(false);
  };

  const handleInvoice = async (bookingId: number) => {
    try {
      const authString = localStorage.getItem("auth");
      const auth = authString ? JSON.parse(authString) : null;
      if (!auth?.data?.accessToken) return alert("No access token found");

      const response = await axios.get(
        `${apiUrl}/booking/invoice/${bookingId}`,
        {
          headers: { Authorization: `Bearer ${auth.data.accessToken}` },
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `invoice-${bookingId}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        alert("Invoice downloaded successfully");
      } else {
        alert("Error generating invoice");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to download invoice");
    }
  };

  // User Bookings
  const handleOpen = async (user: any) => {
    setSelectedUser(user);
    setOpen(true);
    setOpenMail(false);
    setLoading(true);

    try {
      const result = await dataProvider.getList("booking", {
        pagination: { page: 1, perPage: 100 },
        sort: { field: "id", order: "DESC" },
        filter: { userId: user.id },
      });
      setBookings(result.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    setBookings([]);
  };

  const handleOpenMail = (type: string, user: any) => {
    if (type === "single") {
      setUserStatusList([]);
      setSelectedForEmail([selectedUser?.id]);
      setSelectedUsers([user]);
    } else {
      const selected = userStatusList
        .filter((user) => user.enabled)
        .map((user) => user.id);
      setSelectedForEmail(selected);
    }
    setOpen(false);
    setOpenMail(true);
  };

  const handleCloseEmail = () => {
    setOpenMail(false);
  };

  const handleSubmit = (values: any) => {
    create(
      "user/sendMail",
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
        onError: () => {
          notify("Error sending email", { type: "warning" });
        },
      }
    );
  };

  return (
    <>
      <List
        actions={
          <UserListActions
            allUsers={allUsers || []}
            handleOpenPingDialog={handleOpenPingDialog}
          />
        }
      >
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" label="ID" />
          <RoleField source="category" label="Role" />
          <ReferenceField source="id" reference="user" label="First Name">
            <TextField source="firstName" />
          </ReferenceField>
          <TextField source="lastName" label="Last Name" />
          <FunctionField
            label="Email"
            render={(record: any) => (
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton
                  onClick={() => handleOpenMail("single", record)}
                  color="primary"
                  size="small"
                >
                  <MailIcon />
                </IconButton>
                <Typography>{record.email}</Typography>
              </Box>
            )}
          />
          <FunctionField
            label="Details"
            render={() => <BookingDetailsButton onOpen={handleOpen} />}
          />
          <TextField source="referCode" label="Referral Code" />
          <TextField source="enabled" label="Status" />
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

      {/* User Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <Box display="flex" justifyContent="center" py={5}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {selectedUser && (
                <Box mb={3}>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexWrap="wrap"
                    gap={2}
                    mb={2}
                  >
                    {(selectedUser.profileImagePath && (
                      <Box
                        component="img"
                        src={
                          selectedUser.profileImagePath[0] || "/img/user.jpg"
                        }
                        alt="Profile"
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #1976d2",
                        }}
                      />
                    )) || (
                        <Box
                          component="img"
                          src={"/img/user.jpg"}
                          alt="Profile"
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #1976d2",
                          }}
                        />
                      )}
                    <Box width="75%">
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {selectedUser.firstName} {selectedUser.lastName}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EmailIcon />}
                          onClick={() => handleOpenMail("single", selectedUser)}
                        >
                          Email
                        </Button>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Role:{" "}
                        {selectedUser.category === 0
                          ? "Admin"
                          : selectedUser.category === 1
                            ? "Vendor"
                            : "Customer"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {selectedUser.enabled ? "Enabled" : "Disabled"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    display="grid"
                    gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                    gap={1.5}
                  >
                    <Typography variant="body2">
                      <strong>Email:</strong> {selectedUser.email}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Refer Code:</strong>{" "}
                      {selectedUser.referCode || "NA"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>DOB:</strong>{" "}
                      {selectedUser.basic?.dateOfBirth || "NA"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Primary Contact:</strong>{" "}
                      {selectedUser.basic?.primaryContactNumber || "NA"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Secondary Contact:</strong>{" "}
                      {selectedUser.basic?.secondaryContactNumber || "NA"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Address:</strong>{" "}
                      {selectedUser.address
                        ? `${selectedUser.address.addressLine1 || ""}, ${selectedUser.address.addressLine2 || ""
                        }, ${selectedUser.address.city || ""}, ${selectedUser.address.state || ""
                        } - ${selectedUser.address.pincode || ""}`
                        : "NA"}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Landmark:</strong>{" "}
                      {selectedUser.address?.landmark || "NA"}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                </Box>
              )}

              <Typography variant="h6" color="green" gutterBottom>
                Bookings
              </Typography>
              {bookings.length ? (
                <Box display="flex" flexDirection="column" gap={2}>
                  {bookings.map((booking, index) => (
                    <Box
                      key={index}
                      p={2}
                      borderRadius={2}
                      boxShadow={1}
                      bgcolor="background.paper"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setTransactionsDetails(true);
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={1}
                      >
                        <Typography variant="subtitle1" fontWeight="bold">
                          Package:{" "}
                          {booking?.package?.id ? (
                            <Link to={`/admin/package/${booking?.package?.id}`}>
                              {booking.package.title}
                            </Link>
                          ) : (
                            booking.package.title
                          )}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<DownloadIcon />}
                          onClick={() => handleDownloadClick(booking.id)}
                        >
                          Download Invoice
                        </Button>
                      </Box>
                      <Typography variant="body2">
                        Booking Date: {booking.bookingDate}
                      </Typography>
                      <Typography variant="body2">
                        Price: {booking.totalPrice}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography>No bookings found.</Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Transaction Dialog */}
      <Dialog
        open={transactionsDetails}
        onClose={() => setTransactionsDetails(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Transactions Details</DialogTitle>
        <DialogContent>
          {selectedBooking?.transactions?.length ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Total Amount</TableCell>
                  <TableCell>Payment Date</TableCell>
                  <TableCell>Razorpay Order ID</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBooking.transactions.map((txn: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {txn.paymentMethod === "0" ? "Razorpay" : "Other"}
                    </TableCell>
                    <TableCell>{txn.totalAmount}</TableCell>
                    <TableCell>
                      {new Date(txn.paymentDate).toLocaleString()}
                    </TableCell>
                    <TableCell>{txn.razorpayOrderId}</TableCell>
                    <TableCell>
                      {txn.status === "1" ? "SUCCESS" : "FAILED"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No transactions found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setTransactionsDetails(false)}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Warning Dialog for Download */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>⚠️ Warning</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to download this invoice?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDownload}
            color="warning"
            variant="contained"
          >
            Yes, Download
          </Button>
        </DialogActions>
      </Dialog>

      {/* Mail Dialog */}
      <Dialog open={openMail} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {selectedUsers.length > 0 && userStatusList.length == 0
            ? `Email To ${selectedUsers[0]?.firstName} ${selectedUsers[0]?.lastName} (${selectedUsers[0]?.email})`
            : `Email To ${userStatusList.length} users`}
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

              <div className="row">
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
                <div className="col-md-12 col-lg-12">
                  <TextInput
                    source="subject"
                    fullWidth
                    placeholder="Enter Subject"
                    defaultValue={templateData.subject}
                    validate={[required()]}

                  />
                </div>

                <div className="col-md-12 col-lg-12">
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
                </div>
              </div>
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

      {/* user ping dialog box */}
      <Dialog
        open={pingDialogOpen}
        onClose={() => setPingDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Ping Users</DialogTitle>
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
                {user.firstName} {user.lastName} ({user.email})
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPingDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenMail("many", null)}
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
