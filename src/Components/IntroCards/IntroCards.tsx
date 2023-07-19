import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
import { useNavigate } from 'react-router-dom';
const Text: React.FC<{ length: number; type: string; id: string; resource: string }> = ({ length, type, id, resource }) => {
    const origin = window.location.href;
    const pageName = origin.includes(id);
    const typographyColor = pageName ? '#01A2FD' : '#708099';
    const bgColor = pageName ? 'white' : '#f7f7f7';
    const navigate = useNavigate();

    return (
        <Paper
            elevation={1}
            onClick={() => navigate(`/${resource}`)}
            sx={{
                width: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: bgColor,
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
    const { data: locations } = useGetList('view-company-locations', { pagination: { page: 1, perPage: 100000 } });
    const { data: user } = useGetList('users', { pagination: { page: 1, perPage: 100000 } });
    const { data: doors } = useGetList('view-user-gates', { pagination: { page: 1, perPage: 100000 } });
    return (
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <Text resource="view-company-locations" length={locations?.length as number} type="Locations" id="locations" />
            <Text resource="users" length={user?.length as number} type="Workers" id="users" />
            <Text resource="view-user-gates" length={doors?.length as number} type="Doors" id="gates" />
        </div>
    );
};

export default IntroCard;

