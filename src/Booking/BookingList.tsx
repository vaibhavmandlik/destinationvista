import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useState } from "react";
import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  ReferenceField,
  SelectInput,
  TextField,
  TextInput,
  useGetIdentity
} from "react-admin";
import CurrencyField from "../components/CustomFields/CurrencyField";

const apiUrl = import.meta.env.VITE_API_URL;

const PaymentMethod: Record<number, string> = {
  0: "Razorpay",
  1: "Debit Card",
  2: "UPI",
  3: "Net Banking",
  4: "Credit Card",
};

const Transaction: Record<number, string> = {
  0: "PENDING",
  1: "SUCCESS",
  2: "FAILED",
};

// 🔎 Filters
const bookingFilters = [
  <TextInput label="Search by Booking ID" source="id" alwaysOn />,
  <TextInput label="Search by User ID" source="userId" />,
  <SelectInput
    label="Transaction Status"
    source="status"
    choices={[
      { id: 0, name: "PENDING" },
      { id: 1, name: "SUCCESS" },
      { id: 2, name: "FAILED" },
    ]}
  />,
];

export const BookingList = () => {
  const { data: user } = useGetIdentity();
  const [open, setOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<any>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null
  );

  const handleOpen = (record: any) => {
    setSelectedBooking(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const handleConfirmDownload = () => {
    if (selectedBookingId) handleInvoice(selectedBookingId);
    setConfirmDialogOpen(false);
  };

  const handleDownloadClick = (bookingId: number) => {
    setSelectedBookingId(bookingId);
    setConfirmDialogOpen(true);
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

  return (
    <>
      <List filter={{ vendorId: user?.vendorId }} filters={bookingFilters}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <ReferenceField source="userId" reference="user">
            <TextField source="firstName" />
          </ReferenceField>
          <ReferenceField source="packageId" reference="package" />
          <DateField source="bookingDate" />
          <CurrencyField source="totalPrice" />
          <FunctionField
            label={"Invoice"}
            render={(record) => (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleDownloadClick(record.id)}
              >
                Download
              </Button>
            )}
          />
          <NumberField source="totalSlots" />
          <FunctionField
            label="Details"
            render={(record) => (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOpen(record)}
              >
                Details
              </Button>
            )}
          />
        </Datagrid>
      </List>

      {/* Details Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          {selectedBooking && (
            <>
              <Typography>
                <strong>Booking ID:</strong> {selectedBooking.id}
              </Typography>
              <Typography>
                <strong>User ID:</strong> {selectedBooking.userId}
              </Typography>
              <Typography>
                <strong>Package Name:</strong> {selectedBooking.package.title}
              </Typography>
              <Typography>
                <strong>Package Price:</strong> {selectedBooking.package.price}
              </Typography>
              <Typography>
                <strong>Package Destination:</strong>{" "}
                {selectedBooking.package.destination}
              </Typography>
              <Typography>
                <strong>Booking Date:</strong> {selectedBooking.bookingDate}
              </Typography>
              <Typography>
                <strong>Total Slots:</strong> {selectedBooking.totalSlots}
              </Typography>
              <Typography>
                <strong>Total Price:</strong> ₹{selectedBooking.totalPrice}
              </Typography>
              <Typography>
                <strong>Payment Method :</strong>{" "}
                {PaymentMethod[selectedBooking?.transactions[0]?.paymentMethod]}
              </Typography>
              <Typography>
                <strong>Total Amount Paid:</strong> ₹
                {selectedBooking.transactions[0]?.totalAmount}
              </Typography>
              <Typography>
                <strong>Payment Date:</strong>
                {selectedBooking.transactions[0]?.paymentDate}
              </Typography>
              <Typography>
                <strong>Razorpay OrderId:</strong>
                {selectedBooking.transactions[0]?.razorpayOrderId}
              </Typography>
              <Typography>
                <strong>Transaction Status:</strong>{" "}
                {Transaction[selectedBooking.transactions[0]?.status]}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm Download Dialog */}
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
    </>
  );
};
