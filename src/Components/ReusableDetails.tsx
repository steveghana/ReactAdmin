import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { IEdit } from '../types';

const Edit: React.FC<IEdit> = props => {
    let history = useNavigate();
    const navigateBack = () => {
        history('/');
    };
    return (
        <Paper elevation={2} sx={{ margin: '0rem 0 1.5rem 0', padding: '1rem' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div
                    onClick={navigateBack}
                    style={{
                        display: 'flex',
                        gap: '.2rem',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                >
                    <ChevronLeft color="primary" />
                    <Typography color={'primary'} variant="h5">
                        {props?.name}
                    </Typography>
                </div>
                <Button variant="outlined" sx={{ border: '1px solid blue' }}>
                    Edit Details
                </Button>
            </Box>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.3rem',
                    margin: '1rem 0',
                }}
            >
                {Object.values(props?.intro)?.map((item, i) => (
                    <Typography fontWeight={'700'} key={`${item}${i}`} variant="body2" color="textSecondary">
                        {`${Object.keys(props?.intro)[i]}: ${item}`}
                    </Typography>
                ))}
            </div>
        </Paper>
    );
};

export default Edit;
