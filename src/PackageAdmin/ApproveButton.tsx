import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button, 
} from "@mui/material";
import { useDataProvider, useNotify, useRefresh } from "react-admin";
import CheckIcon from "@mui/icons-material/Check";
import { Pending } from "@mui/icons-material";
import { Cancel } from "@mui/icons-material";

const ApproveButton = ({ record }) => {
  const [open, setOpen] = useState(false);
  const notify = useNotify();
  const refresh = useRefresh();
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
      <Button
        color={
          record?.isApproved == "1"
            ? "success"
            : record?.isApproved == null
            ? "warning"
            : "error"
        }
        startIcon={
          record?.isApproved == "1" ? (
            <CheckIcon />
          ) : record?.isApproved == null ? (
            <Pending />
          ) : (
            <Cancel />
          )
        }
        onClick={handleClickOpen}
      >
        {record?.isApproved == "1"
          ? "Approved"
          : record?.isApproved == null
          ? "Pending"
          : "Reject"}
      </Button>
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
