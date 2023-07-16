import { Card, Container } from '@mui/material';
import React from 'react';
import Events from '../Components/EventCharts/Event';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Card
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '2rem',
                minHeight: '90%',
            }}
        >
            <Container maxWidth="md" sx={{ mt: '2rem' }}>
                {children}
            </Container>
            <Events />
        </Card>
    );
};
export default Layout;
