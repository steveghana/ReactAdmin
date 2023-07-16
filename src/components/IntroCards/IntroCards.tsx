import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { useGetList } from 'react-admin';

const Text: React.FC<{ length: number; type: string }> = ({ length, type }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Typography variant="h4">{type}</Typography>
            <Typography color={'primary'} variant="h4">
                {length}
            </Typography>
        </Paper>
    );
};
const IntroCard: React.FC = () => {
    const { data: locations } = useGetList('locations');
    const { data: user } = useGetList('users');
    const { data: doors } = useGetList('gates');

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Text length={locations?.length as number} type="Locations" />
            <Text length={doors?.length as number} type="Doors" />
            <Text length={user?.length as number} type="Workers" />
        </div>
    );
};

export default IntroCard;

