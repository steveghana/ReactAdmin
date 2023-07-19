import React from 'react';
import { List, Datagrid, TextField, useGetList, DateField } from 'react-admin';
import { Box, Pagination, Paper, Typography } from '@mui/material';
import useSearchFilter from '../../CustomHook';
import Layout from '../../Layout';
import { IWorkers } from '../../types';
import IntroCard from '../IntroCards/IntroCards';
import CustomCreateDelete from '../CustomCreateDelete';
import CustomLoader from '../Loader';

const WorkersComponent: React.FC<IWorkers> = props => {
    const { data, isLoading } = useGetList('users');

    const OptionalLayout = () => {
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
            <>
                {!props.noIntro && <IntroCard />}

                <Paper sx={{ padding: '1rem 1rem 0 1rem' }}>
                    <CustomCreateDelete handleSearch={handleSearch} label="Name" searchTerm={searchTerm} />

                    <List exporter={false} pagination={false}>
                        <Datagrid data={item?.length < currentItems?.length ? item : currentItems} rowClick={!props.withLayout && 'edit'}>
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
            </>
        );
    };
    if (!props.withLayout) {
        return (
            <Layout>
                <OptionalLayout />
            </Layout>
        );
    }

    return <OptionalLayout />;
};

export default WorkersComponent;
