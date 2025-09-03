import { useState } from "react";
import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  ImageField,
  List,
  TextField,
  useRecordContext,
  useDataProvider,
  FunctionField,
  ReferenceField,
  required,
  SimpleForm,
  TextInput,
  SaveButton,
  Toolbar,
  useCreate,
  useNotify,
  Link

} from "react-admin";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import DownloadIcon from '@mui/icons-material/Download';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import { RichTextInput, RichTextInputToolbar, FormatButtons, ListButtons, LinkButtons, ClearButtons } from "ra-input-rich-text";

const RoleField = ({ source }: { source: string }) => {
  const record = useRecordContext();
  if (!record) return null;

  const roleMap: Record<number, string> = {
    0: "Admin",
    1: "Vendor",
    2: "Customer",
  };

  const roleLabel = roleMap[record[source]] ?? "Unknown";
  return <span>{roleLabel}</span>;
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

const Transaction: Record<number, string> = {
  0: "PENDING",
  1: "SUCCESS",
  2: "FAILED"
}

const Status: Record<number, string> = {
  0: "Inactive",
  1: "Active",

}

const BookingDetailsButton = ({ onOpen }: { onOpen: (user: any) => void }) => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => onOpen(record)}
    >
      Details
    </Button>
  );
};



export const UserList = () => {

  const notify = useNotify();
  const [create] = useCreate();
  const dataProvider = useDataProvider();
  const [open, setOpen] = useState(false);
  const [openMail, setOpenMail] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


  const handleOpenMail = () => {
    setOpen(false);
    setOpenMail(true);


  }

  const handleCloseEmail = () => {
    setOpenMail(false);
    setOpen(true);
  }

  const handleSubmit = (values: any) => {
    console.log("Form Values:", values);
    // You can handle file upload and form submission here
    create(
      "vendor/sendMail",
      {
        data: {
          customer: [selectedUser?.id],
          subject: values.subject,
          body: values.body,
        },
      },
      {
        onSuccess: () => {
          notify("Email sent successfully!", { type: "success" });
          handleCloseEmail();
        },
        onError: (error) => {
          notify(`Error sending email`, { type: "warning" });
        },
      }
    );
    // notify("Email sent!", { type: "success" });
  };

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


  return (
    <>
      <br />
      <List>
        <Datagrid rowClick={false} bulkActionButtons={false} >
          <TextField source="id" label={'ID'} />
          <ImageField source="profileImagePath" label={"Pic"} />
          <RoleField source="category" label={'Role'} />
          <ReferenceField source="id" reference="user" label={"First Name"}>
            <TextField source="firstName" />
          </ReferenceField>
          <TextField source="lastName" label={"Last Name"} />
          <EmailField source="email" label={"Email"} />
          <FunctionField label={"Details"}
            render={() => <BookingDetailsButton onOpen={handleOpen} />} />
          <TextField source="referCode" label={"Referal Code"} />
          <TextField source="enabled" label={"Status"} />
          <EditButton variant="text" color="primary" label={false} icon={<EditIcon />} />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" label={false} icon={<DeleteIcon />} />
        </Datagrid>
      </List>

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
                  <Box display="flex" alignItems="center" flexWrap="wrap" gap={2} mb={2}>
                    {selectedUser.profileImagePath && (
                      <Box
                        component="img"
                        src={selectedUser.profileImagePath[0] || "/img/user.jpg"}
                        alt="Profile"
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #1976d2",
                        }}
                      />
                    ) || (
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
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {selectedUser.firstName} {selectedUser.lastName}
                        </Typography>
                        <Button variant="contained" color="primary" size="small" startIcon={<EmailIcon />} onClick={handleOpenMail}>
                          Email
                        </Button>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Role: {selectedUser.category === 0 ? "Admin" :
                          selectedUser.category === 1 ? "Vendor" : "Customer"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Status: {selectedUser.enabled ? "Enabled" : "Disabled"}
                      </Typography>
                    </Box>
                  </Box>

                  <Box display="grid" gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }} gap={1.5}>
                    <Typography variant="body2"><strong>Email:</strong> {selectedUser.email}</Typography>
                    <Typography variant="body2"><strong>Refer Code:</strong> {selectedUser.referCode || "NA"}</Typography>
                    <Typography variant="body2"><strong>DOB:</strong> {selectedUser.basic?.dateOfBirth || "NA"}</Typography>
                    <Typography variant="body2"><strong>Primary Contact:</strong> {selectedUser.basic?.primaryContactNumber || "NA"}</Typography>
                    <Typography variant="body2"><strong>Secondary Contact:</strong> {selectedUser.basic?.secondaryContactNumber || "NA"}</Typography>
                    <Typography variant="body2"><strong>Address:</strong> {selectedUser.address
                      ? `${selectedUser.address.addressLine1 || ""}, ${selectedUser.address.addressLine2 || ""}, ${selectedUser.address.city || ""}, ${selectedUser.address.state || ""} - ${selectedUser.address.pincode || ""}`
                      : "NA"}</Typography>
                    <Typography variant="body2"><strong>Landmark:</strong> {selectedUser.address?.landmark || "NA"}</Typography>
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
                    >
                       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
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
                      <Button variant="contained" color="primary" size="small" startIcon={<DownloadIcon />}>
                        Download Invoice
                      </Button>
                      </Box>
                      <Typography variant="body2">Booking Date: {booking.bookingDate}</Typography>
                      <Typography variant="body2">Price: {booking.totalPrice}</Typography>
                      <Typography variant="body2">Status: {Transaction[booking.transactions[0]?.status]}</Typography>
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


      <Dialog open={openMail} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Mail To {selectedUser?.firstName}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              borderRadius: 2,
              margin: 4,
              boxShadow: 1,
              background: "#fff",
            }}
          >
            <SimpleForm
              onSubmit={handleSubmit}
              toolbar={<CustomToolbar />}
              defaultValues={{
                body: "<p>Write your message here...</p><br/><br/><br/>",
              }}
            >
              <Typography variant="h6" sx={{ padding: 2, borderRadius: 2 }}>
                Email to Users
              </Typography>
              <div className="row">
                <div className="col-md-12 col-lg-12">
                  <TextInput source="subject" fullWidth placeholder="Enter Subject" />
                </div>
                <div className="col-md-12 col-lg-12">
                  <RichTextInput
                    toolbar={
                      <RichTextInputToolbar>
                        <FormatButtons size={"small"} />
                        <ListButtons size={"small"} />
                        <LinkButtons size={"small"} />
                        <ClearButtons size={"small"} />
                      </RichTextInputToolbar>
                    }
                    fullWidth
                    source={"body"}
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

    </>
  );
};

function create(arg0: string, arg1: { data: { customer: any; subject: any; body: any; }; }, arg2: { onSuccess: () => void; onError: (error: any) => void; }) {
  throw new Error("Function not implemented.");
}

function notify(arg0: string, arg1: { type: string; }) {
  throw new Error("Function not implemented.");
}

