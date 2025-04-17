// src/tickets/TicketCreate.js
import * as React from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    required,
    useNotify,
    useRedirect,
    useGetIdentity // Optional: If you need vendor info explicitly
} from 'react-admin';

// Basic validation - ensures fields are not empty
const validateRequired = required();

// Optional: Define choices for priority or category
const priorityChoices = [
    { id: 'low', name: 'Low' },
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
];

const categoryChoices = [
    { id: 'billing', name: 'Billing Issue' },
    { id: 'technical', name: 'Technical Support' },
    { id: 'product', name: 'Product Query' },
    { id: 'general', name: 'General Inquiry' },
];


export const TicketCreate = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();
    // Optional: Get vendor identity if needed for the form (backend should ideally handle this)
    // const { identity, isLoading, error } = useGetIdentity();

    const onSuccess = (data) => {
        notify('Ticket submitted successfully!', { type: 'info', undoable: false });
        // Redirect to a dashboard or a confirmation page after creation
        // Replace '/' with the desired path, maybe the vendor's dashboard home
        redirect('/');
    };

    // Optional: If you need to pass vendor ID explicitly and backend doesn't get it from auth
    // if (isLoading) return null; // Wait for identity to load
    // const defaultValues = { vendorId: identity?.id }; // Adjust 'id' based on your identity structure

    return (
        <Create
            {...props}
            title="Raise a New Support Ticket"
            onSuccess={onSuccess}
            // Optional: If passing vendorId explicitly
            // transform={data => ({ ...data, vendorId: identity?.id })} // Alternative way to add vendorId
        >
            <SimpleForm
                // Optional: Provide default values if needed
                // defaultValues={defaultValues} // Use this if vendorId needs to be in the form data
            >
                <TextInput
                    source="subject"
                    validate={validateRequired}
                    fullWidth
                />
                <SelectInput
                    source="category"
                    choices={categoryChoices}
                    validate={validateRequired}
                />
                <SelectInput
                    source="priority"
                    choices={priorityChoices}
                    validate={validateRequired}
                    defaultValue="medium" // Sensible default
                />
                <TextInput
                    source="description"
                    multiline={true}
                    validate={validateRequired}
                    label="Describe your issue"
                    fullWidth
                />
                {/*
                  IMPORTANT NOTE ON VENDOR IDENTIFICATION:
                  Ideally, your backend API endpoint for creating tickets (/api/tickets)
                  should automatically associate the ticket with the currently authenticated vendor
                  based on their login token/session. You shouldn't need to send vendorId from the form.
                  If you MUST send it, use useGetIdentity and uncomment the related lines above,
                  ensuring your dataProvider and backend expect a 'vendorId' field.
                */}
            </SimpleForm>
        </Create>
    );
};