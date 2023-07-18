import { Box, IconButton, InputBase, Paper } from '@mui/material';
import React from 'react';
import { AddRounded, DeleteRounded, FilterListRounded, Search } from '@mui/icons-material';
import { Anchor, ICustomDeleteCreate } from '../../types';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import CreateWorker from '../Workers/WorkerCreate';
import DoorCreate from '../Doors/DoorCreate';

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
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    console.log(props);
    const list = (_: Anchor, type: string) => (
        <Box sx={{ width: 450, height: '100%' }} role="presentation">
            {type === 'Door' ? <DoorCreate /> : <CreateWorker />}
        </Box>
    );
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
            <div></div>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {!props.withCreate && (
                    <div style={styles}>
                        {(['right'] as const).map(anchor => (
                            <React.Fragment key={anchor}>
                                <Button onClick={toggleDrawer(anchor, true)}>
                                    {' '}
                                    <AddRounded color={'primary'} />
                                </Button>
                                <SwipeableDrawer
                                    anchor={anchor}
                                    open={state[anchor]}
                                    onClose={toggleDrawer(anchor, false)}
                                    onOpen={toggleDrawer(anchor, true)}
                                >
                                    {list(anchor, props.label)}
                                </SwipeableDrawer>
                            </React.Fragment>
                        ))}
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
