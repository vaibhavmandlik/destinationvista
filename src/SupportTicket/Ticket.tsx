import { Paper, TableContainer } from '@mui/material';
import { Datagrid, DateField, List, NumberField, TextField } from 'react-admin';

export const TicketList = () => (
    <List>
        <TableContainer component={Paper}>
            <Datagrid bulkActionButtons={false}>
                <TextField source="id" />
                <TextField source="subject" />
                <TextField source="description" />
                <TextField source="category" />
                <TextField source="priority" />
                <TextField source="status" />
                <DateField source="createdOn" />
            </Datagrid>
        </TableContainer>
    </List>
);