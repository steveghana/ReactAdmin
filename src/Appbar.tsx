import { AppBar, Layout } from 'react-admin';
import { Avatar, Box, SvgIcon, Typography } from '@mui/material';
import { Comment, LogoSvg } from './assets/logo';
import { ExpandMore } from '@mui/icons-material';

const MyAppBar = () => {
    return (
        <AppBar
            sx={{
                color: 'black',
                background: 'white',
                '& .RaAppBar-toolbar': { padding: 1 },
                display: 'flex',
                gap: '1rem',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <SvgIcon component={LogoSvg} viewBox="0 0 400 400" />
            <Box sx={{ marginLeft: '2rem' }}>
                <Comment />
            </Box>
            <Box sx={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar />
                <Typography variant="caption">Yan levi</Typography>
                <ExpandMore color="primary" />
            </Box>
        </AppBar>
    );
};

export default (props: any) => (
    <>
        <Layout {...props} appBar={MyAppBar} />
    </>
);
