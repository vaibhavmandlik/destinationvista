import React, { useState, useCallback } from "react";
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceManyCount,
  TextField,
  useGetIdentity,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  Toolbar,
  SaveButton,
} from "react-admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyField from "../components/CustomFields/CurrencyField";
import RatingStars from "./RatingStarts";
import { Create } from "react-admin";
import { SearchInput } from 'react-admin';

// Define an interface for the Package record
interface PackageRecord {
  id: string | number;
  title: string;
  rating: number;
  price: number;
  walletAmount: number;
  durationDays: number;
  availableSlots: number;
  approved: boolean;
  active: boolean;
  // Add other fields from your package record as needed
}

const postFilters = [
    <SearchInput source="q" alwaysOn />
];
export const PackageList = () => {
  const { data: user } = useGetIdentity();

  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PackageRecord | null>(
    null
  );

  const handleOpen = useCallback((record: PackageRecord) => {
    setSelectedRecord(record);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setSelectedRecord(null);
  }, []);

  const handleSubmitWithdrawal = (data:any)=>{
    console.log(data);
    return;
  }

  return (
    <>
      <List filters={postFilters} filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
          <FunctionField<PackageRecord>
            render={(record) =>
              record && <RatingStars rating={record.rating} />
            }
          />
          <CurrencyField locale="en-IN" currency="INR" source="price" />
          <FunctionField
            label="Wallet"
            render={(record) => (
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <strong>₹{record.walletAmount?.toLocaleString("en-IN")}</strong>
                <Tooltip title="Request Withdrawal">
                  <IconButton
                    onClick={() => handleOpen(record)}
                    // disabled={record.walletAmount <= 0}
                    color="primary"
                    size="small"
                  >
                    <AccountBalanceWalletIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          />
          <ReferenceManyCount
            label="Booking"
            reference="booking"
            target="packageId"
            link
          />
          <NumberField label="available" source="availableSlots" />
          {/* <BooleanField source="approved" /> */}
          <FunctionField label="Admin" render={(record) => {
            if(record.isApproved==="1") {
              return <span style={{ color: "green" }}>Approved</span>;
            } else {
              return <span style={{ color: "red" }}>Not Approved</span>;
            }
          }} />
          <FunctionField
            render={() => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <EditButton label="Edit/Show" variant="text" color="primary" />
                {/* <ShowButton variant="text" /> */}
              </div>
            )}
          />
        </Datagrid>
      </List>

      {/* Withdrawal Request Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Request Withdrawal</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Create>
              <SimpleForm
                onSubmit={handleSubmitWithdrawal}
                toolbar={
                  <Toolbar>
                    <SaveButton label="Submit" />
                    <Button
                      onClick={handleClose}
                      style={{ marginLeft: "1rem" }}
                    >
                      Cancel
                    </Button>
                  </Toolbar>
                }
                record={selectedRecord}
              >
                <NumberInput
                  source="amount"
                  label="Amount"
                  validate={[
                    required(),
                    (value) =>
                      selectedRecord && value > selectedRecord.walletAmount
                        ? "Cannot request more than wallet amount"
                        : undefined,
                  ]}
                />
                <TextInput source="notes" label="Notes" />
              </SimpleForm>
            </Create>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
