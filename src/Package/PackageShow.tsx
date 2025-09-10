import { DateField, NumberField, RichTextField, Show, SimpleShowLayout, TextField } from 'react-admin';

export const PackageShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="title" />
            <RichTextField source="description" />
            <TextField source="price" />
            <NumberField source="durationDays" />
            <TextField source="destination" />
            <NumberField source="availableSlots" />
            <TextField source="imagePaths" />
            <DateField source="startDate" />
            <DateField source="endDate" />
            <TextField source="isApproved" />
            <TextField source="approvedBy" />
            <TextField source="details.quickItinerary" />
            <TextField source="approved" />
            <TextField source="quickItinerary" />
            <TextField source="itinerary" />
            <RichTextField source="inclusion" />
            <RichTextField source="exclusion" />
            <RichTextField source="otherInfo" />
            <TextField source="pickupLocation" />
            <TextField source="startPoint" />
            <TextField source="endPoint" />
            <DateField source="walletAmount" />
            <DateField source="withdrawnAmount" />
            <DateField source="remainingAmount" />
            <DateField source="withdrawalStepCompleted" />
        </SimpleShowLayout>
    </Show>
);