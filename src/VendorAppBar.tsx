
import {
    AppBar,       // Import AppBar from react-admin
    useTranslate, // To translate the website name
} from 'react-admin';
import {  Typography, Box } from '@mui/material'; // Basic Material UI components

const MyAppBar = (props: any) => {
    const translate = useTranslate(); // Hook for internationalization

    return (
        <AppBar  {...props}> {/* Use React Admin's AppBar */}
            <Box component="span" sx={{ flex: 1 }} />
            <Typography variant="h6" sx={{ flex: 1 , textAlign: 'center', fontWeight: 'bold', color: 'white' }}>
                {translate('app.name', { _: 'Destination Vista' })}
            </Typography>
            <Box component="span" sx={{ flex: 1 }} />
        </AppBar>
    );
};

export default MyAppBar;