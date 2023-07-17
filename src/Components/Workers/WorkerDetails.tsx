import React from 'react';
import Details from '../ReusableDetails';
import { useParams } from 'react-router-dom';
import WorkersComponent from './WorkersList';
import { useGetList, useGetOne } from 'react-admin';
import { IDetailsProps } from '../../types';
import { Apiurl } from '../../DataProvider';
import axios from 'axios';

const WorkerDetails: React.FC<IDetailsProps> = () => {
    const { id } = useParams();
    const { data } = useGetOne('view-user-companies', { id });
    // const { data:gates } = useGetList('view-user-gates', { id: 380 });
    let EditData = {
        LatestunlockAt: new Date(data?.usrUpdatedAt)?.toLocaleTimeString() || 'Not available',
        Email: data?.usrEmail || 'Not Available',
        ['Phone number']: data?.usrPhoneNumber || 'Not available',
    };
    React.useEffect(() => {
        const limit = 20; // Set the desired limit

        const fetchFloors = async () => {
            const response = await axios.get(`${Apiurl}/view-user-gates?filter={"where":{"usrId": ${JSON.stringify(id)}}, "limit": ${limit}}`);
            console.log('workers with gates:', response?.data);

            // Transform the API response into the desired data structure
        };

        fetchFloors();
    }, []);
    console.log(data, 'from details');
    return (
        <>
            <Details intro={EditData} name={data?.usrName} />
            {/* <WorkersComponent noIntro workers={data as Record<string, string>[]} /> */}
        </>
    );
};

export default WorkerDetails;
