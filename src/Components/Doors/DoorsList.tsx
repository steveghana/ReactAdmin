import { Box, Pagination, Paper, Typography } from '@mui/material';
import React from 'react';
import { Datagrid, List, TextField, useGetList } from 'react-admin';
import { TextField as Field } from '@mui/material';
import useSearchFilter from '../../CustomHook';
import Layout from '../../Layout';
import { IDoors } from '../../types';
import IntroCard from '../IntroCards/IntroCards';
import { AddRounded, DeleteRounded } from '@mui/icons-material';
import CustomCreateDelete from '../CustomCreateDelete';

const Doors: React.FC<IDoors> = props => {
    const { data, isLoading } = useGetList('view-user-gates');
    // const { data: location } = useGetList('locations');

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const handlePageChange = (_: any, newPage: number) => {
        setCurrentPage(newPage);
    };
    console.log(data, 'gates');
    let actualData = props.idata?.length ? props?.idata : data;
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
            {!props.noIntro && <IntroCard />}

            <Paper sx={{ marginTop: '2rem', padding: '1rem 1rem 0 1rem' }}>
                <CustomCreateDelete handleSearch={handleSearch} label="Door" searchTerm={searchTerm} withCreate={true} />

                <List exporter={false} {...props} pagination={false}>
                    <Datagrid data={item.length < currentItems?.length ? item : currentItems} rowClick="edit">
                        <TextField source="gateName" sortable={true} label="Door Name" />
                        <TextField source="gateLocationId" sortable={true} label="Location" />
                        <TextField source="gateFloor" sortable={true} label="Floor" />
                        <TextField source="address" sortable={true} label="Status" />
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

export default Doors;
