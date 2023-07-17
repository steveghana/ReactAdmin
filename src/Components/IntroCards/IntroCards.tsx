import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { useGetList } from 'react-admin';

const Text: React.FC<{ length: number; type: string; id: string }> = ({ length, type, id }) => {
    const origin = window.location.href;
    const pageName = origin.includes(id);
    const typographyColor = pageName ? '#01A2FD' : '#708099'; // Define the color based on the pageName

    return (
        <Paper
            elevation={0}
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 0',
            }}
        >
            <Typography letterSpacing={'0.072px'} fontWeight={'500'} variant="h6" color={typographyColor}>
                {type}
            </Typography>
            <Typography letterSpacing={'0.072px'} fontWeight={'500'} color={typographyColor} variant="h4">
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
            <Text length={locations?.length as number} type="Locations" id="locations" />
            <Text length={doors?.length as number} type="Doors" id="gates" />
            <Text length={user?.length as number} type="Workers" id="users" />
        </div>
    );
};

export default IntroCard;

