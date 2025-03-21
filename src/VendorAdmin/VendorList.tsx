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

export const VendorListAdmin = () => {
  const { data: user } = useGetIdentity();
 
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
          {/* <Link component={RouterLink} to="/account" color="inherit" startIcon={<AccountBoxIcon />}>
          Account
        </Link> */}
          <Typography color="textPrimary">Agency List</Typography>
        </Breadcrumbs>
      </div>

      {/* <div className="row m-2 ">
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title medium">Total Vendors</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">2,420</h2>
              <i
                className="bi bi-people-fill"
                style={{ fontSize: "2rem", color: "blue" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card  shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Active Vendors </h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">1,890</h2>
              <i
                className="bi bi-person-check-fill"
                style={{ fontSize: "2rem", color: "green" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card  shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Inactive Vendors</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">530</h2>
              <i
                className="bi bi-person-fill-slash"
                style={{ fontSize: "2rem", color: "red" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Average Session</h5>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">24m</h2>
              <i
                className="bi bi-clock-history"
                style={{ fontSize: "2rem", color: "#555" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div> */}

      <List filter={{ userId: user?.id }} title="Agency List">
        <Datagrid rowClick={false} bulkActionButtons={false}>
          
          <TextField source="id" />
          <ImageField source="images" />
          <TextField source="agencytitle" />
          <EmailField source="email" />
          <TextField source="contactNumber" />
          <EditButton variant="text" color="primary" />
          <DeleteWithConfirmButton variant="bootstrap" color="danger" />
        </Datagrid>
      </List>
    </>
  );
};
