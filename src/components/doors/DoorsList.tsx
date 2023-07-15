import { Box, Pagination, Typography } from '@mui/material';
import React from 'react';
import { Datagrid, List, TextField, useGetList } from 'react-admin';
import { TextField as Field } from '@mui/material';
import useSearchFilter from '../../CustomHook';
import Layout from '../../Layout';
import { IDoors } from '../../types';

const Doors: React.FC<IDoors> = props => {
    const { data, isLoading } = useGetList('gates');

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
    console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Layout>
            <Field
                variant="outlined"
                name="password"
                autoComplete="off"
                type="text"
                placeholder="Enter Door"
                label="Door"
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
            />
            <List {...props} pagination={false}>
                <Datagrid data={item.length < currentItems.length ? item : currentItems} rowClick="edit">
                    <TextField source="name" sortable={true} label="Door Name" />
                    <TextField source="locationId" sortable={true} label="Location" />
                    <TextField source="floor" sortable={true} label="Floor" />
                    <TextField source="address" sortable={true} label="Status" />
                </Datagrid>
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" variant="outlined" />
                </Box>
                <Typography variant="caption" color="textSecondary" align="center" marginTop={2}>
                    Page {currentPage} of {totalPages}
                </Typography>
            </List>
        </Layout>
    );
};

export default Doors;
