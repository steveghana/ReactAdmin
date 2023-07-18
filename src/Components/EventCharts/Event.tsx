import { useEffect, useState } from 'react';
import { Alert, Button, Grid, Paper, Typography } from '@mui/material';
import WorkerChart from './Charts';
import { useParams } from 'react-router-dom';
import { useDataProvider } from 'react-admin';
import axios from 'axios';
import { Apiurl } from '../../DataProvider';
const Events = () => {
    const params = useParams();
    const dataProvider = useDataProvider();
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //Fetch manually as its not a resource but a component of a resource
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`${Apiurl}/log-event-operations?filter[limit]=20`);
                setLogs(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchLogs();
    }, [dataProvider, params.id]);

    let slidedLogs = !params.id ? logs.slice(0, 12) : logs.slice(0, 22);

    return (
        <Grid item xs={12} sm={4} sx={{ height: '100%' }}>
            {isLoading ? (
                <div style={{ width: '100%', textAlign: 'center' }}>Loading...</div>
            ) : (
                <Paper
                    elevation={2}
                    sx={{
                        height: 'auto',
                        padding: '1rem',
                        marginBottom: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.6rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                        }}
                    >
                        <Typography color={'#708099'} variant="button" sx={{ marginRight: 'auto' }}>
                            Events
                        </Typography>
                        <Button variant="contained" style={{ borderRadius: '40px' }} color="primary">
                            All
                        </Button>
                        <Button variant="outlined" style={{ borderRadius: '40px' }} disabled color="primary">
                            Alerts
                        </Button>
                    </div>
                    {slidedLogs
                        .filter(log => log.logDescription !== '')
                        .map((log, i) => (
                            <Alert key={log.userId + i} severity={log.isSuccess ? 'success' : 'error'}>
                                {log.logDescription}
                            </Alert>
                        ))}
                </Paper>
            )}

            {!params.id && (
                // <Box sx={{ maxHeight: '50%' }}>
                <WorkerChart />
                // </Box>
            )}
        </Grid>
    );
};

export default Events;
