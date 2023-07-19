import React from 'react';
import { Button } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Create, SimpleForm, TextInput, Toolbar, SaveButton, useCreate, useNotify, useRedirect } from 'react-admin';
import { IToolbar } from '../../types';
interface FormData {
    name: string;
    email: string;
    // Add more fields as needed
}
export const MyToolbar: React.FC<IToolbar> = props => (
    <Toolbar style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem', position: 'fixed', bottom: '3%' }}>
        <SaveButton
            type="submit"
            label=" Add new worker"
            // onSubmit={props.save}
            onClick={() => props.setClicked(false)}
            style={{ width: '420px' }}
            variant="contained"
        />
        {!props.noPermission && (
            <Button onClick={() => props.setClicked(prev => !prev)} fullWidth variant="outlined">
                Add new worker with permissions
            </Button>
        )}
    </Toolbar>
);
const CreateWorker = () => {
    const [clicked, setClicked] = React.useState(false);
    const [formData, setFormData] = React.useState<FormData>({ name: '', email: '' });
    const [create] = useCreate('users'); // Replace 'resourceName' with your actual resource name
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
            'users',
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
        <div style={{ height: '100%' }}>
            <Create sx={{ height: '100%', position: 'relative' }}>
                {!clicked ? (
                    <SimpleForm
                        onSubmit={handleFormSubmit}
                        onChange={handleFormChange}
                        sx={{ height: '100% ' }}
                        toolbar={<MyToolbar save={() => handleFormSubmit()} setClicked={setClicked} />}
                    >
                        <TextInput source="name" fullWidth />
                        <TextInput fullWidth source="email" />
                        <TextInput fullWidth source="phoneNumber" />
                    </SimpleForm>
                ) : (
                    <SimpleForm toolbar={<MyToolbar save={() => handleFormSubmit()} noPermission={true} setClicked={setClicked} />}>
                        <TextInput fullWidth label="Door" source="name" />
                        <TextInput fullWidth label="Role" source="role" />
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Button variant="contained" disabled size="small">
                                Daily
                            </Button>
                            <Button variant="contained" disabled size="small">
                                Weekly
                            </Button>
                            <Button variant="contained" color="primary" size="small">
                                Date Range
                            </Button>
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['StaticDatePicker']}>
                                <DemoItem label="Static variant">
                                    <StaticDatePicker defaultValue={dayjs('2023-04-17')} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </SimpleForm>
                )}
            </Create>
        </div>
    );
};

export default CreateWorker;
