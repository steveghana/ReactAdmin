import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { barColors, chartData } from '../../types';
import { Box, Paper, Typography } from '@mui/material';

const WorkerChart = () => {
    const borderRadius = 8;

    return (
        <Paper sx={{ height: 'auto', padding: ' 2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} elevation={2}>
            <div>
                <Typography color={'#708099'} variant="h6" fontFamily={'sans-serif'} fontWeight={'700'}>
                    Weekly Traffic
                </Typography>
                <Box sx={{ display: 'flex', gap: '.4rem', alignItems: 'center' }}>
                    <Typography variant="h4" color={'#01A2FD'}>
                        130
                    </Typography>
                    <Typography color={'#708099'} variant="body2">
                        Entrances
                    </Typography>
                </Box>
            </div>
            <ResponsiveContainer width="100%" height="100%" aspect={16 / 8}>
                <BarChart
                    width={100}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={30}
                >
                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="pv" background={{ fill: '#eee' }} radius={borderRadius}>
                        {chartData.map((_, index) => (
                            <Cell key={index} fill={barColors[index]} radius={borderRadius} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
};
export default WorkerChart;
