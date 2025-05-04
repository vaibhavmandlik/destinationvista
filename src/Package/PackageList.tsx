import React, { useState } from 'react';
import {
  BooleanField,
  Datagrid,
  EditButton,
  FunctionField,
  List,
  NumberField,
  ReferenceManyCount,
  ShowButton,
  TextField,
  useDataProvider,
  useGetIdentity,
  useNotify,
  useRefresh,
  SimpleForm,
  TextInput,
  NumberInput,
  required,
  Toolbar,
  SaveButton,
} from 'react-admin';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Switch,
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CurrencyField from '../components/CustomFields/CurrencyField';
import RatingStars from './RatingStarts';

export const PackageList = () => {
  const { data: user } = useGetIdentity();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  const handleOpen = (record: any) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  const handleSubmit = async (values: any) => {
    try {
      await dataProvider.create('withdrawalRequest', {
        data: {
          packageId: selectedRecord.id,
          vendorId: user.vendorId,
          amount: values.amount,
          notes: values.notes,
        },
      });
      notify('Withdrawal request submitted', { type: 'success' });
      handleClose();
      refresh();
    } catch (error) {
      notify('Error submitting request', { type: 'error' });
    }
  };

  return (
    <>
      <List filter={{ vendorId: user?.vendorId }}>
        <Datagrid rowClick={false} bulkActionButtons={false}>
          <TextField source="id" />
          <TextField source="title" />
          <FunctionField render={record => (<RatingStars rating={record.rating} />)} />
          <CurrencyField locale="en-IN" currency="INR" source="price" />
          <FunctionField
            label="Wallet"
            render={(record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <strong>₹{record.walletAmount?.toLocaleString('en-IN')}</strong>
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
          <NumberField label="duration" source="durationDays" />
          <ReferenceManyCount label="Booking" reference="booking" target="packageId" link />
          <NumberField label="available" source="availableSlots" />
          <BooleanField source="approved" />
          <FunctionField
            label="Status"
            render={(record) => (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Switch
                  checked={record.active}
                  onChange={() => {
                    dataProvider.update('package', {
                      id: record.id,
                      data: { active: !record.active },
                      previousData: record,
                    })
                      .then(() => {
                        notify(`Package ${record.active ? 'deactivated' : 'activated'} successfully`, { type: 'success' });
                        refresh();
                      })
                      .catch(() => notify('Error toggling status', { type: 'error' }));
                  }}
                  color="primary"
                />
                <span>{record.active ? 'Active' : 'Inactive'}</span>
              </div>
            )}
          />
          <FunctionField
            render={() => (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <EditButton variant="text" color="primary" />
                <ShowButton variant="text" />
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
            <SimpleForm onSubmit={handleSubmit} toolbar={
              <Toolbar>
                <SaveButton label="Submit" />
                <Button onClick={handleClose} style={{ marginLeft: '1rem' }}>
                  Cancel
                </Button>
              </Toolbar>
            } record={selectedRecord}>
              <NumberInput
                source="amount"
                label="Amount"
                validate={[required(), value =>
                  value > selectedRecord.walletAmount
                    ? 'Cannot request more than wallet amount'
                    : undefined
                ]}
              />
              <TextInput source="notes" label="Notes" />
            </SimpleForm>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};