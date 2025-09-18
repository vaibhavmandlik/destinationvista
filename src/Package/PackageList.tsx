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
  useDataProvider,
  CreateButton,
  ExportButton,
  TopToolbar,
  useListContext
} from "react-admin";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyField from "../components/CustomFields/CurrencyField";
import RatingStars from "./RatingStarts";
import { Create } from "react-admin";
import { SearchInput } from 'react-admin';
import { useNavigate } from "react-router-dom";
//sent mail icon import 
import MailIcon from "@mui/icons-material/Mail";

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
const CustomListActions = () => {

  const { filterValues, setFilters } = useListContext(); // 👈 from RA
  const [value, setValue] = React.useState(filterValues.status || "All");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selected = event.target.value as string;
    setValue(selected);

    // Apply filter dynamically
    if (selected === "All") {
      setFilters({ ...filterValues, status: undefined }, null);
    } else {
      setFilters({ ...filterValues, status: selected }, null);
    }
  };

  return (
    <TopToolbar>
      {/* Default RA buttons */}

      {/* Your dropdown */}
      <FormControl size="small"
        sx={{ minWidth: 180 }}
        variant="outlined">
        <InputLabel id="dropdown-label">Apply filter</InputLabel>
        <Select
          labelId="dropdown-label"
          value={value}
          onChange={handleChange}   // ✅ directly pass the function
          label="Apply filter"      // 👈 important so MUI shows value with label
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Ongoing">Ongoing</MenuItem>
          <MenuItem value="Expired">Expired</MenuItem>
        </Select>
      </FormControl>
      <CreateButton />
      <ExportButton />
    </TopToolbar>
  );
};

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

  const handleSubmitWithdrawal = (data: any) => {
    console.log(data);
    return;
  }

  const dataProvider = useDataProvider();

  const getEmailsOfBookedUsers = async (packageId: string | number) => {
    // 1. Get bookings for the package
    const bookingsRes = await dataProvider.getList("booking", {
      filter: { packageId },
      pagination: { page: 1, perPage: 1000 },
      sort: { field: "id", order: "ASC" },
    });

    const emailList = bookingsRes.data.map((booking: any) => ({ id: booking.userId, name: booking.firstName + " " + booking.lastName }));

    return emailList;
  };
  const navigate = useNavigate();
  return (
    <>
      <List filters={postFilters} filter={{ vendorId: user?.vendorId }} actions={<CustomListActions />}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
          <FunctionField<PackageRecord>
            render={(record) =>
              record && <RatingStars rating={record.rating} />
            }
          />
          <CurrencyField locale="en-IN" currency="INR" source="price" />
          <ReferenceManyCount
            label="Booking"
            reference="booking"
            target="packageId"
            link
          />
          <NumberField label="available" source="availableSlots" />
          {/* <BooleanField source="approved" /> */}
          <FunctionField label="Admin" render={(record) => {
            if (record.isApproved === "1") {
              return <span style={{ color: "green" }}>Approved</span>;
            } else {
              return <span style={{ color: "red" }}>Not Approved</span>;
            }
          }} />
          <FunctionField label="Email Users" render={(record) => {
            return (
              <div>
                <IconButton
                  onClick={async () => {
                    const emails = await getEmailsOfBookedUsers(record.id);
                    console.log("Emails of users who booked:", emails);
                    navigate("/vendor/EmailToUserFromList", { state: { customers: emails } });
                  }}
                >
                  <MailIcon />
                </IconButton>
                {/* <Button
          variant="text"
          color="primary"
          onClick={async () => {
            const emails = await getEmailsOfBookedUsers(record.id);
            console.log("Emails of users who booked:", emails);
           navigate("/vendor/EmailToUserFromList", { state: { customers: emails } });
          }}
        >
          
        </Button> */}
              </div>
            );
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
