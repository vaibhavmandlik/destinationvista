import { Edit, SimpleForm, TextInput, email, required } from "react-admin";

export const VendorUpdate = () => {
  return (
    <Edit>
      <SimpleForm
        sx={{
          "& .RaInput-root": {
            mb: 3, // spacing between all inputs
          },
        }}
      >
        {/* Agency Info */}
        <TextInput
          source="agencyTitle"
          label="Agency Name"
          validate={[required("Agency Name is required")]}
          helperText="Enter the registered name of your agency."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="managerName"
          label="Manager Name"
          validate={[required("Manager Name is required")]}
          helperText="Enter the full name of the manager."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="email"
          label="Email"
          validate={[
            required("Email is required"),
            email("Enter a valid email address"),
          ]}
          helperText="Enter a valid email address for contact."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="contactNumber"
          label="Contact Number"
          validate={[
            required("Contact Number is required"),
            (value: string) =>
              !/^\d{10}$/.test(value)
                ? "Enter a valid 10-digit phone number"
                : undefined,
          ]}
          helperText="Enter a 10-digit phone number without country code."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />

        {/* Identity Verification */}
        <TextInput
          source="gstNumber"
          label="GST Number"
          disabled
          validate={[
            required("GST Number is required"),
            (value: string) =>
              !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
                value
              )
                ? "Enter a valid GST number"
                : undefined,
          ]}
          helperText="GST number of the agency (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="panNumber"
          label="PAN Number"
          disabled
          validate={[
            required("PAN Number is required"),
            (value: string) =>
              !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value)
                ? "Enter a valid PAN number"
                : undefined,
          ]}
          helperText="PAN number of the agency (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="registrationNumber"
          label="Company Registration Number"
          disabled
          validate={[required("Registration Number is required")]}
          helperText="Company registration number (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />

        {/* Bank Info */}
        <TextInput
          source="bank.accountHolderName"
          label="Account Holder Name"
          disabled
          validate={[required("Account holder name is required")]}
          helperText="Name of the bank account holder (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="bank.bankName"
          label="Bank Name"
          disabled
          validate={[required("Bank Name is required")]}
          helperText="Name of your bank (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="bank.accountNumber"
          label="Account Number"
          disabled
          validate={[required("Account Number is required")]}
          helperText="Your bank account number (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="bank.ifscCode"
          label="IFSC Code"
          disabled
          validate={[
            required("IFSC Code is required"),
            (value: string) =>
              !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)
                ? "Enter a valid IFSC code"
                : undefined,
          ]}
          helperText="IFSC code of your bank branch (cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="bank.upiId"
          label="UPI ID (Optional)"
          disabled
          helperText="Your UPI ID (optional, cannot be changed)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />

        {/* Office Location */}
        <TextInput
          source="office.addressLine1"
          label="Address Line 1"
          validate={[required("Address Line 1 is required")]}
          helperText="Street address, P.O. box, company name, c/o."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="office.addressLine2"
          label="Address Line 2"
          helperText="Apartment, suite, unit, building, floor, etc. (optional)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="office.city"
          label="City"
          validate={[required("City is required")]}
          helperText="City of the office location."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="office.state"
          label="State"
          validate={[required("State is required")]}
          helperText="State or province of the office location."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
        <TextInput
          source="office.postalCode"
          label="Postal Code"
          validate={[
            required("Postal Code is required"),
            (value: string) =>
              !/^\d{6}$/.test(value)
                ? "Enter a valid 6-digit postal code"
                : undefined,
          ]}
          helperText="6-digit postal code (PIN code)."
          fullWidth
          sx={{ mb: 1, mt: 1 }}
        />
      </SimpleForm>
    </Edit>
  );
};
