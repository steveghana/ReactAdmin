import React from 'react';
import { Show, SimpleShowLayout, TextField, ArrayField, Datagrid, DateField } from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from '../../Layout';

const NestedList: React.FC<{ data: any; doorLength: number }> = props => {
    return (
        // <Layout>
        <Paper>
            <Show>
                <SimpleShowLayout>
                    <ArrayField source="Floors" record={props?.data}>
                        <div>
                            {props.data?.Floors?.map((floor: any) => (
                                <Accordion key={floor?.id}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography> {`${floor?.firstName}`}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div>
                                            <ArrayField source="books" record={floor}>
                                                <Datagrid>
                                                    <TextField label="Door Name" source="gateName" />
                                                    <DateField label="Last Unlock" source="gateUpdatedAt" />
                                                    <DateField label="Status" source="" />
                                                </Datagrid>
                                            </ArrayField>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </ArrayField>
                </SimpleShowLayout>
            </Show>
        </Paper>
        // </Layout>
    );
};

export default NestedList;
