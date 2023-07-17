import { Grid } from '@mui/material';
import React from 'react';
import Events from '../Components/EventCharts/Event';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Grid sx={{ display: 'flex', background: '#F8F8F8', alignItems: 'center', marginTop: '1.4rem', flexWrap: 'wrap' }} container spacing={3}>
            <Grid item xs={12} sx={{ height: '100%' }} sm={8}>
                {children}
            </Grid>
            <Events />
        </Grid>
    );
};

export default Layout;
