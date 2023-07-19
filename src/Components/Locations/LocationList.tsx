import React from 'react';
import { Box, Paper, Pagination, Typography } from '@mui/material';
import {Datagrid, FunctionField, List, RaRecord, TextField, useGetList} from 'react-admin';
import useSearchFilter from '../../CustomHook';
import IntroCard from '../IntroCards/IntroCards';
import Layout from '../../Layout';
import { LocationListProps } from '../../types';
import CustomCreateDelete from '../CustomCreateDelete';
import CustomLoader from '../Loader';
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
        return <CustomLoader />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem) || [];
    return (
        <Layout>
            {!nointro && <IntroCard />}
            <Paper sx={{ marginTop: '2rem', padding: '1rem 1rem 0 1rem' }}>
                <CustomCreateDelete handleSearch={handleSearch} label="Location" searchTerm={searchTerm} withCreate />
                <List exporter={false} pagination={false}>
                    <Datagrid data={item?.length < currentItems?.length ? item : currentItems} rowClick="edit">
                        <TextField source="name" sortable label="Location Name" />
                        <TextField source="addressCountry" sortable label="Country" />
                        <FunctionField
                            label="Full Address"
                            render={(record:RaRecord) => `${record.addressStreet} ${record.addressNumber}, ${record.addressCity}`}
                        />;
                        <TextField source="addressZipCode" sortable label="Zip code" />
                        <TextField source="floors" sortable label="Floors" />
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
