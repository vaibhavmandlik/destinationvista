import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  FileInput,
  FileField
} from "react-admin";

export const VendorCreate = () => (
  <Create title="Create an Agency">
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "2rem",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "700px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "2rem",
      }}>
        <SimpleForm>
          <TextInput source="agencyTitle" label="Agency Name" validate={[required()]} fullWidth />
          <TextInput source="managerName" label="Manager Name" validate={[required()]} fullWidth />
          <TextInput source="email" validate={[required(), email()]} fullWidth />
          <TextInput source="contactNumber" label="Contact Number" validate={[required()]} fullWidth />

          {/* Identity Verification Inputs */}
          <TextInput source="gstNumber" label="GST Number" validate={[required()]} fullWidth />
          <TextInput source="panNumber" label="PAN Number" validate={[required()]} fullWidth />
          <TextInput source="registrationNumber" label="Company Registration Number" validate={[required()]} fullWidth />

          {/* File Uploads */}
          <FileInput source="panCardFile" label="Upload PAN Card" accept="application/pdf,image/*">
            <FileField source="src" title="title" />
          </FileInput>

          <FileInput source="aadhaarCardFile" label="Upload Aadhaar Card" accept="application/pdf,image/*">
            <FileField source="src" title="title" />
          </FileInput>

          {/* Bank Info */}
          <TextInput source="bank.accountHolderName" label="Account Holder Name" validate={[required()]} fullWidth />
          <TextInput source="bank.bankName" label="Bank Name" validate={[required()]} fullWidth />
          <TextInput source="bank.accountNumber" label="Account Number" validate={[required()]} fullWidth />
          <TextInput source="bank.ifscCode" label="IFSC Code" validate={[required()]} fullWidth />
          <TextInput source="bank.upiId" label="UPI ID (Optional)" fullWidth />

          {/* Single Office Location */}
          <TextInput source="office.addressLine1" label="Address Line 1" validate={[required()]} fullWidth />
          <TextInput source="office.addressLine2" label="Address Line 2" fullWidth />
          <TextInput source="office.city" label="City" validate={[required()]} fullWidth />
          <TextInput source="office.state" label="State" validate={[required()]} fullWidth />
          <TextInput source="office.postalCode" label="Postal Code" validate={[required()]} fullWidth />
        </SimpleForm>
      </div>
    </div>
  </Create>
);
