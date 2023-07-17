import React from 'react';
import Details from '../ReusableDetails';
import { useParams } from 'react-router-dom';
import WorkersComponent from './WorkersList';
import { useGetOne } from 'react-admin';
import { IDetailsProps } from '../../types';

const WorkerDetails: React.FC<IDetailsProps> = () => {
    const { id } = useParams();
    const { data } = useGetOne('view-user-companies', { id });
    let EditData = {
        LatestunlockAt: new Date(data?.usrUpdatedAt)?.toLocaleTimeString(),
        Email: data?.usrEmail,
        ['Phone number']: data?.usrPhoneNumber,
    };
    return (
        <>
            <Details intro={EditData} name={data?.usrName} />
            <WorkersComponent noIntro workers={data as Record<string, string>[]} />
        </>
    );
};

export default WorkerDetails;
