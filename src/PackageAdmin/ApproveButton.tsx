import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "react-admin";
import CheckIcon from "@mui/icons-material/Check";

const ApproveButton = ({ record }) => {
  const [open, setOpen] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
  const theme = useTheme();
  const dataProvider = useDataProvider();
  const handleApprove = async () => {
    try {
      await dataProvider.approvePackage(record.id);
      notify("Package approved successfully", { type: "success" });
      refresh();
    } catch (error) {
      notify("Error approving package", { type: "error" });
    }
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={handleClickOpen}
        sx={{ backgroundColor: theme.palette.primary.main + "1A" }} // Light background with transparency
      >
        <CheckIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to approve <b>{record.title}</b> package?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleApprove} color="primary" autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApproveButton;
