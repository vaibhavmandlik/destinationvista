import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
  useGetIdentity,
  FunctionField,
  EditButton,
  DeleteWithConfirmButton,
  useRecordContext,
} from "react-admin";
const apiUrl = import.meta.env.VITE_API_URL;
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  useRadioGroup,
} from "@mui/material";

import * as React from "react";
import CurrencyField from "../components/CustomFields/CurrencyField";
import { useState } from "react";
import axios from "axios";

const PaymentMethod: Record<number, string> = {
  0: "Razorpay",
  1: "Debit Card",
  2: "UPI",
  3: "Net Banking",
  4: "Credit Card",
}

const Transaction: Record<number, string> = {
  0: "PENDING",
  1: "SUCCESS",
  2: "FAILED"
}

export const BookingList = () => {
  const { data: user } = useGetIdentity();
  const [open, setOpen] = React.useState(false);
  const [selectedBooking, setSelectedBooking] = React.useState<any>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(null);
  

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
  
        const response = await axios.get(`${apiUrl}/booking/invoice/${bookingId}`, {
          headers: { Authorization: `Bearer ${auth.data.accessToken}` },
          responseType: "blob",
        });
  
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
      <List filter={{ vendorId: user?.vendorId }}>
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
                onClick={()=>handleDownloadClick(record.id)}
              >
                Download
              </Button>
            )}
          />

          <NumberField source="totalSlots"/>
          {/* <FunctionField
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
                  /> */}
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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent dividers>
          {selectedBooking && (
            <>
              <Typography variant="body1">
                <strong>Booking ID:</strong> {selectedBooking.id}
              </Typography>
              <Typography variant="body1">
                <strong>User ID:</strong> {selectedBooking.userId}
              </Typography>
              <Typography variant="body1">
                <strong>Package Name:</strong> {selectedBooking.package.title}
              </Typography>
              <Typography variant="body1">
                <strong>Package Price:</strong> {selectedBooking.package.price}
              </Typography>
              <Typography variant="body1">
                <strong>Package Destination:</strong> {selectedBooking.package.destination}
              </Typography>
              <Typography variant="body1">
                <strong>Booking Date:</strong> {selectedBooking.bookingDate}
              </Typography>
              <Typography variant="body1">
                <strong>Total Slots:</strong> {selectedBooking.totalSlots}
              </Typography>
              <Typography variant="body1">
                <strong>Total Price:</strong> ₹{selectedBooking.totalPrice}
              </Typography>
              <strong>Payment Method :</strong> {PaymentMethod[selectedBooking?.transactions[0]?.paymentMethod]}
              <Typography variant="body1">
                <strong>Total Amount Paid:</strong> ₹{selectedBooking.transactions[0]?.totalAmount}
              </Typography>
              <Typography variant="body1">
                <strong>Payment Date:</strong>{selectedBooking.transactions[0]?.paymentDate}
              </Typography>
              <Typography variant="body1">
                <strong>Razorpay OrderId:</strong>{selectedBooking.transactions[0]?.razorpayOrderId}
              </Typography>
              <Typography variant="body1">
                <strong>Transaction Status:</strong> {Transaction[selectedBooking.transactions[0]?.status]}
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

      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>⚠️ Warning</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to download this invoice?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirmDownload} color="warning" variant="contained">
            Yes, Download
          </Button>
        </DialogActions>
      </Dialog>


    </>
  );
};
