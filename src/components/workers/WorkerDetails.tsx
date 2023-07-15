import React from 'react';
import Details from '../ReusableDetails';
import { useParams } from 'react-router-dom';

import WorkersComponent from './WorkersList';
import { useGetOne } from 'react-admin';
import { IDetailsProps } from '../../types';

const WorkerDetails: React.FC<IDetailsProps> = () => {
    const { id } = useParams();
    const { data } = useGetOne('users', { id });
    let EditData = {
        LatestunlockAt: new Date(data?.updatedAt)?.toLocaleTimeString(),
        Email: data?.email,
        ['Phone number']: data?.phoneNumber,
    };
    return (
        <>
            <Details intro={EditData} name={data?.name} />
            <WorkersComponent workers={data as Record<string, string>[]} />
        </>
    );
};

export default WorkerDetails;
