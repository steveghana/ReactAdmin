import React from 'react';
import { List, Datagrid, TextField, useGetList, DateField } from 'react-admin';
import { Box, Pagination, Paper, Typography } from '@mui/material';
import useSearchFilter from '../../CustomHook';
import Layout from '../../Layout';
import { IWorkers } from '../../types';
import IntroCard from '../IntroCards/IntroCards';
import CustomCreateDelete from '../CustomCreateDelete';

const WorkersComponent: React.FC<IWorkers> = ({ noIntro, workers }) => {
    const { data, isLoading } = useGetList('view-user-companies');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const handlePageChange = (_: any, newPage: number) => {
        setCurrentPage(newPage);
    };
    let actualData = workers?.length ? workers : data;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = actualData?.length ? actualData.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPages = Math.ceil((actualData?.length || 0) / itemsPerPage);
    const [item, searchTerm, handleSearch] = useSearchFilter(actualData?.length ? actualData : []);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Layout>
            {!noIntro && <IntroCard />}
            <Paper sx={{ marginTop: '2rem', padding: '1rem 1rem 0 1rem' }}>
                <CustomCreateDelete handleSearch={handleSearch} label="Name" searchTerm={searchTerm} />

                <List exporter={false} pagination={false}>
                    <Datagrid data={item.length < currentItems.length ? item : currentItems} rowClick="edit">
                        <TextField source="usrName" sortable={true} label="Worker" />
                        <TextField source="usrEmail" sortable={true} label="Email" />
                        <TextField source="usrPhoneNumber" sortable={true} label="Phone" />
                        <DateField source="usrUpdatedAt" sortable={true} label="Last unlock" />
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
