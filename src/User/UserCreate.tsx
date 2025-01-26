import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  PasswordInput,
} from "react-admin";
import { Grid } from '@mui/material';
import { SelectInput } from "react-admin";

export const UserCreate = () => {
  return (
    <Create sx={{ maxWidth: 400, margin: '0 auto', marginTop:2 }}>
      <SimpleForm>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <strong>Category</strong>
            <SelectInput 
              fullWidth
              label=""
              source="category"
              validate={[required()]}
              choices={[
                { id: "0", name: "Super Admin" },
                { id: "1", name: "Subscriber" },
                { id: "2", name: "User" },
              ]}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <strong>First Name</strong>
            <TextInput sx={{padding:'8.5px auto'}} label="" fullWidth source="firstName" variant="outlined" validate={[required()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Last Name</strong>
            <TextInput label="" fullWidth source="lastName" validate={[required()]} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <strong>Email</strong>
            <TextInput label="" fullWidth source="email" validate={[required(), email()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Password</strong>
            <PasswordInput label="" fullWidth source="password" validate={[required()]} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <strong>Refer Code</strong>
            <TextInput label="" fullWidth source="referCode" validate={[required()]} />
          </Grid>
          <Grid item xs={12} md={6}>
            <strong>Created by</strong>
            <TextInput label="" fullWidth source="createdBy" validate={[required()]} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <strong>Updated By</strong>
            <TextInput label="" fullWidth source="updatedBy" validate={[required()]} />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
