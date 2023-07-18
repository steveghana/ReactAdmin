import { Button } from '@mui/material';
import React from 'react';
import { Create, SimpleForm, TextInput, Toolbar, SaveButton, useCreate, useNotify, useRedirect } from 'react-admin';
interface FormData {
    name: string;
    floor: number;
    identifier: string;
    // Add more fields as needed
}
export const MyToolbar = () => (
    <Toolbar style={{ bottom: '0' }}>
        <SaveButton fullWidth variant="contained">
            Add new worker
        </SaveButton>
    </Toolbar>
);
const DoorCreate = () => {
    const [formData, setFormData] = React.useState<FormData>({ name: '', floor: 0, identifier: '' });
    const [create] = useCreate('gates'); // Replace 'resourceName' with your actual resource name
    const notify = useNotify();
    const redirect = useRedirect();
    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleFormSubmit = () => {
        // e.preventDefault();
        console.log('submit entered');
        create(
            'gates',
            { data: formData },
            {
                onSuccess: res => {
                    notify('ra.notification.created', {
                        type: 'success',

                        messageArgs: { smart_count: 1 },
                    });
                    redirect('/');
                    // Handle success response
                    console.log('Success:', res);
                },
                onError: err => {
                    console.error(err);
                },
            }
        );
    };
    return (
        <div style={{ position: 'relative' }}>
            <Create sx={{ height: '100%' }}>
                <SimpleForm onSubmit={handleFormSubmit} onChange={handleFormChange} toolbar={<MyToolbar />}>
                    <TextInput fullWidth label="Door Name" source="name" />
                    <TextInput fullWidth type="number" label="Floor Number" source="floor" />
                    <TextInput fullWidth label="Serial Number" source="identifier" />
                </SimpleForm>
            </Create>
        </div>
    );
};

export default DoorCreate;
