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
  ReferenceField
} from "react-admin";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  CircularProgress
} from "@mui/material";

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

const Transaction : Record<number , string> ={
  0:"PENDING",
  1:"SUCCESS",
  2:"FAILED"
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

   const dataProvider = useDataProvider();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleOpen = async (user: any) => {
    setSelectedUser(user);
    setOpen(true);
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
    <br/>
      <List>
        <Datagrid rowClick={false} bulkActionButtons={false} >
          <TextField source="id" />
          <ImageField source="profileImagePath" label={"Pic"} />
          <RoleField source="category" label={'Role'} />
          <ReferenceField source="id" reference="user" label="First Name">
          <TextField source="firstName" />
          </ReferenceField>
          <TextField source="lastName" />
          <EmailField source="email" />
          <FunctionField label={"Booking Details"}
          render={()=> <BookingDetailsButton onOpen={handleOpen} />}/>
          <TextField source="referCode" />
          <EditButton variant="text" color="primary" />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" />
        </Datagrid>
      </List>

       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Bookings of {selectedUser?.firstName}</DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <CircularProgress />
          ) : bookings.length ? (
            bookings.map((booking, index) => (
              <Box key={index} mb={2}>
                <Typography variant="subtitle1">
                  Package: {booking?.package?.title}
                </Typography>
                <Typography variant="body2">
                  Booking Date: {booking.bookingDate}
                </Typography>
                <Typography variant="body2">
                  Price : {booking.totalPrice}
                </Typography>
                <Typography variant="body2">
                  Status: {Transaction[booking.transactions[0]?.status]}
                </Typography>
                <Divider sx={{ my: 1 }} />
              </Box>
            ))
          ) : (
            <Typography>No bookings found.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

