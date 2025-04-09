import {
  Datagrid,
  DeleteWithConfirmButton,
  EditButton,
  EmailField,
  List,
  TextField,
  ReferenceField,
  useGetIdentity,
  FunctionField,
} from "react-admin";
import AgencyManagement from "./AgencyManagement ";
import useHasVendors from "../hook/useHasvendors";
import ImageField from "../components/CustomFields/ImageField";
import {
  Breadcrumbs,
  Chip,
  IconButton,
  Link,
  Switch,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  AccountBox as AccountBoxIcon,
} from "@mui/icons-material";
import { PiUserSwitchBold } from "react-icons/pi";

export const VendorList = () => {
  const hasVendors = useHasVendors();
  const { data: user } = useGetIdentity();
  if (!hasVendors)
    return (
      <>
        <AgencyManagement />
      </>
    );
  return (
    <>
      <div>
        <br />
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            startIcon={<HomeIcon />}
          >
            My Agency
          </Link>
          <Typography color="textPrimary">Agency List</Typography>
        </Breadcrumbs>
      </div>

      <List filter={{ userId: user?.id }} title="Agency List">
        <Datagrid rowClick={false} bulkActionButtons={false}>

          <TextField source="id" />
          <ImageField source="images" />
          <TextField source="agencytitle" />
          <EmailField source="email" />
          <TextField source="contactNumber" />
          <FunctionField
            label="Approval Status"
            render={(record) => {
              const status = record.approvalStatus;

              const statusMap:any = {
                approved: { label: "Approved", color: "success" },
                rejected: { label: "Rejected", color: "error" },
                pending: { label: "Pending", color: "warning" },
              };

              const { label, color } = statusMap[status] || statusMap["pending"];

              return <Chip label={label} color={color} size="small" />;
            }}
          />
          <FunctionField render={(record) => <IconButton onClick={() => { localStorage.setItem('selectedVendor', record.id); window.location.reload() }} color="primary">
            <PiUserSwitchBold />
          </IconButton>} />

          <EditButton variant="text" color="primary" />
        </Datagrid>
      </List>
    </>
  );
};
