import { Box, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import { TextField as Field } from '@mui/material';
import { AddRounded, DeleteRounded, FilterListRounded, Search } from '@mui/icons-material';
import { ICustomDeleteCreate } from '../../types';

const CustomCreateDelete: React.FC<ICustomDeleteCreate> = props => {
    let styles = {
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        border: '2px solid #01A2FD',
        width: '34px',
        height: '34px',
        alignItems: 'center',

        flexShrink: '0',
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
            <div>{props.label}</div>
            <FilterListRounded color="primary" />
            <Paper component="form" sx={{ p: '2px', display: 'flex', alignItems: 'center', minWidth: 300 }}>
                <InputBase
                    name="password"
                    autoComplete="off"
                    value={props.searchTerm}
                    onChange={e => props.handleSearch(e.target.value)}
                    type="text"
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={`Enter ${props.label}`}
                    inputProps={{ 'aria-label': props.label }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <Search />
                </IconButton>
            </Paper>
            {/* <Field
                variant="outlined"
                name="password"
                autoComplete="off"
                type="text"
                placeholder="Enter name"
                label={props.label}
                
            /> */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!props.withCreate && (
                    <div style={styles}>
                        <AddRounded color={'primary'} />
                    </div>
                )}
                <div style={styles}>
                    <DeleteRounded color={'primary'} />
                </div>
            </div>
        </Box>
    );
};

export default CustomCreateDelete;
