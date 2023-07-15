import * as React from 'react';
import { Paper, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
const IntroCard: React.FC = () => {
    const { data: locations } = useGetList('locations');
    const { data: user } = useGetList('users');
    const { data: doors } = useGetList('gates');

    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
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
                <Typography variant="h4">Locations</Typography>
                <Typography color={'primary'} variant="button">
                    {locations?.length}
                </Typography>
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4">Doors</Typography>
                <Typography color={'primary'} variant="button">
                    {doors?.length}
                </Typography>
            </Paper>
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4">Workers</Typography>
                <Typography color={'primary'} variant="button">
                    {user?.length}
                </Typography>
            </Paper>
        </div>
    );
};

export default IntroCard;

