import * as React from 'react';
import { Box, TextField as Field, Pagination, Paper, Typography } from '@mui/material';
import { Datagrid, List, TextField, useGetList } from 'react-admin';
import useSearchFilter from '../../CustomHook';
import IntroCard from '../IntroCards/IntroCards';
import Layout from '../../Layout';
import { LocationListProps } from '../../types';
import { AddRounded, DeleteRounded } from '@mui/icons-material';
import CustomCreateDelete from '../CustomCreateDelete';

const LocationList: React.FC<LocationListProps> = ({ nointro }) => {
    const { data, isLoading } = useGetList('locations');
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const handlePageChange = (_: any, newPage: number) => {
        setCurrentPage(newPage);
    };
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
    const [item, searchTerm, handleSearch] = useSearchFilter(data as any);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];
    return (
        <Layout>
            {!nointro && <IntroCard />}
            <Paper sx={{ marginTop: '2rem', padding: '1rem 1rem 0 1rem' }}>
                <CustomCreateDelete handleSearch={handleSearch} label="Location" searchTerm={searchTerm} />
                <List exporter={false} pagination={false}>
                    <Datagrid data={item?.length < currentItems?.length ? item : currentItems} rowClick="edit">
                        <TextField source="name" sortable={true} label="Location Name" />
                        <TextField source="addressCity" sortable={true} label="City" />
                        <TextField source="addressStreet" sortable={true} label="Street" />
                        <TextField source="address" sortable={true} label="Full Address" />
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

export default LocationList;
