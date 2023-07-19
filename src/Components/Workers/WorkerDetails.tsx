import React, { useState } from 'react';
import Details from '../ReusableDetails';
import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';
import { IDetailsProps } from '../../types';
import { Apiurl } from '../../DataProvider';
import axios from 'axios';
import Doors from '../Doors/DoorsList';
import Layout from '../../Layout';

const WorkerDetails: React.FC<IDetailsProps> = () => {
    const { id } = useParams();
    const { data } = useGetOne('users', { id });
    const [workersinDoors, setWorkerinDoors] = useState([]);
    let EditData = {
        LatestunlockAt: new Date(data?.updatedAt)?.toLocaleTimeString() || 'Not available',
        Email: data?.email || 'Not Available',
        ['Phone number']: data?.phoneNumber || 'Not available',
    };
    React.useEffect(() => {
        const limit = 55;

        const fetchFloors = async () => {
            const response = await axios.get(`${Apiurl}/view-user-gates?filter={"where":{"usrId": ${JSON.stringify(id)}}, "limit": ${limit}}`);
            console.log('workers with gates:', response?.data);
            setWorkerinDoors(response.data);
            // Transform the API response into the desired data structure
        };

        fetchFloors();
    }, []);
    return (
        <Layout>
            <Details intro={EditData} name={data?.name} />
            <Doors withLayout idata={workersinDoors} noIntro />
        </Layout>
    );
};

export default WorkerDetails;
