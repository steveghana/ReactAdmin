import React from 'react';
import { Show, SimpleShowLayout, TextField, ArrayField, Datagrid } from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NestedList: React.FC = () => {
    const postData = {
        id: 1,
        title: 'Post Title',
        authors: [
            {
                id: '1',
                firstName: 'Lisa',
                lastName: 'Noha',
                books: [
                    { id: '2', title: 'Book 1 by Lisa' },
                    { id: '3', title: 'Book 2 by Lisa' },
                ],
            },
            {
                id: '2',
                firstName: 'John',
                lastName: 'Doe',
                books: [
                    { id: '4', title: 'Book 1 by John' },
                    { id: '5', title: 'Book 2 by John' },
                ],
            },
        ],
    };

    return (
        <Show>
            <SimpleShowLayout>
                {/* <TextField source="title" record={postData} /> */}

                <ArrayField source="authors" record={postData}>
                    <div>
                        {postData.authors.map((author: any) => (
                            <Accordion key={author.id}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography>{`${author.firstName} ${author.lastName}`}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <TextField source="firstName" record={author} />
                                        <TextField source="lastName" record={author} />

                                        <ArrayField source="books" record={author}>
                                            <Datagrid>
                                                <TextField source="title" />
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
    );
};

export default NestedList;
