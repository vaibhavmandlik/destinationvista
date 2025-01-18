import { useRecordContext } from "react-admin";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

interface CustomBooleanFieldProps {
  source: string;
}

const CustomBooleanField = ({ source }: CustomBooleanFieldProps) => {
  const record = useRecordContext();
  return (
    <strong>
      {record && record[source] == 1 ? <CheckIcon /> : <ClearIcon />}
    </strong>
  );
};

export default CustomBooleanField;
