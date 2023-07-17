import React from 'react';
import { List, Datagrid, TextField, useGetList, DateField } from 'react-admin';
import { Box, Pagination, Paper, Typography } from '@mui/material';
import { TextField as Field } from '@mui/material';
import useSearchFilter from '../../CustomHook';
import Layout from '../../Layout';
import { IWorkers } from '../../types';
import IntroCard from '../IntroCards/IntroCards';
import { AddRounded, DeleteRounded } from '@mui/icons-material';

const WorkersComponent: React.FC<IWorkers> = ({ noIntro }) => {
    const { data, isLoading } = useGetList('users');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const handlePageChange = (_: any, newPage: number) => {
        setCurrentPage(newPage);
    };
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.length ? data.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
    const [item, searchTerm, handleSearch] = useSearchFilter(data?.length ? data : []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Layout>
            {!noIntro && <IntroCard />}
            <Paper sx={{ marginTop: '2rem', padding: '0rem 1rem 0 1rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Field
                        variant="outlined"
                        name="password"
                        autoComplete="off"
                        type="text"
                        placeholder="Enter name"
                        label="Name"
                        value={searchTerm}
                        onChange={e => handleSearch(e.target.value)}
                    />
                    <AddRounded sx={{ marginLeft: 'auto' }} color={'primary'} />
                    <DeleteRounded color={'primary'} />
                </Box>

                <List exporter={false} pagination={false}>
                    <Datagrid data={item.length < currentItems.length ? item : currentItems} rowClick="edit">
                        <TextField source="name" sortable={true} label="Worker" />
                        <TextField source="email" sortable={true} label="Email" />
                        <TextField source="phoneNumber" sortable={true} label="Phone" />
                        <DateField source="updatedAt" sortable={true} label="Last unlock" />
                    </Datagrid>
                    <Box display="flex" justifyContent="center" marginTop={2}>
                        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" variant="outlined" />
                    </Box>
                    <Typography variant="caption" color="textSecondary" align="center" marginTop={2}>
                        Page {currentPage} of {totalPages}
                    </Typography>
                </List>
            </Paper>
        </Layout>
    );
};

export default WorkersComponent;
