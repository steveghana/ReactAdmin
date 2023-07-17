import { Card, Container } from '@mui/material';
import React from 'react';
import Events from '../Components/EventCharts/Event';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Card
            style={{
                display: 'flex',
                // flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '2rem',

                minHeight: '96%',
                background: '#F8F8F8',
            }}
        >
            <Container maxWidth="xl" sx={{ mt: '2rem' }}>
                {children}
            </Container>
            <Events />
        </Card>
    );
};
export default Layout;
