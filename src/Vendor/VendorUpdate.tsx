import * as React from "react";
import { SimpleForm, TextInput, required, email, Edit, FileInput, FileField } from "react-admin";

export const VendorUpdate = () => (
  <Edit>
   <SimpleForm>
             <TextInput source="agencyTitle" label="Agency Name" validate={[required()]} fullWidth />
             <TextInput source="managerName" label="Manager Name" validate={[required()]} fullWidth />
             <TextInput source="email" validate={[required(), email()]} fullWidth />
             <TextInput source="contactNumber" label="Contact Number" validate={[required()]} fullWidth />
   
             {/* Identity Verification Inputs */}
             <TextInput source="gstNumber" label="GST Number" disabled validate={[required()]} fullWidth />
             <TextInput source="panNumber" label="PAN Number" disabled validate={[required()]} fullWidth />
             <TextInput source="registrationNumber" label="Company Registration Number" disabled validate={[required()]} fullWidth />
   
   
             {/* Bank Info */}
             <TextInput source="bank.accountHolderName" disabled label="Account Holder Name" validate={[required()]} fullWidth />
             <TextInput source="bank.bankName" label="Bank Name" disabled validate={[required()]} fullWidth />
             <TextInput source="bank.accountNumber" label="Account Number" disabled validate={[required()]} fullWidth />
             <TextInput source="bank.ifscCode" label="IFSC Code" disabled validate={[required()]} fullWidth />
             <TextInput source="bank.upiId" label="UPI ID (Optional)" disabled fullWidth />
   
             {/* Single Office Location */}
             <TextInput source="office.addressLine1" label="Address Line 1" validate={[required()]} fullWidth />
             <TextInput source="office.addressLine2" label="Address Line 2" fullWidth />
             <TextInput source="office.city" label="City" validate={[required()]} fullWidth />
             <TextInput source="office.state" label="State" validate={[required()]} fullWidth />
             <TextInput source="office.postalCode" label="Postal Code" validate={[required()]} fullWidth />
           </SimpleForm>
  </Edit>
);
