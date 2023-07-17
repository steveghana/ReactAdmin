import { Box } from '@mui/material';
import React from 'react';
import { TextField as Field } from '@mui/material';
import { AddRounded, DeleteRounded } from '@mui/icons-material';
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Field
                variant="outlined"
                name="password"
                autoComplete="off"
                type="text"
                placeholder="Enter name"
                label={props.label}
                value={props.searchTerm}
                onChange={e => props.handleSearch(e.target.value)}
            />
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
