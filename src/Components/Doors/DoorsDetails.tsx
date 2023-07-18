import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Details from '../ReusableDetails';
import { useGetOne } from 'react-admin';
import WorkersComponent from '../Workers/WorkersList';
import axios from 'axios';
import { Apiurl } from '../../DataProvider';
import Layout from '../../Layout';
const DoorsEdit: React.FC<{}> = () => {
    const { id } = useParams();
    const { data: dataById } = useGetOne('view-user-gates', { id });
    const [dataByuser, setDataByuser] = useState([]);
    let detailsData = {
        Color: dataById?.gateColor || 'Not Available',
        Floor: dataById?.gateFloor || 'Not Available',
        Street: '--',
    };
    // console.log(dataByuser, 'byuser');
    React.useEffect(() => {
        //Fetch manually as its not a resource but a component of a resource
        const fetchLogs = async () => {
            try {
                const response = await axios.get(`${Apiurl}/view-user-gates?filter[where][gateId]=${dataById?.gateId}&filter[limit]=20`);
                setDataByuser(response.data);
            } catch (error) {
                console.error(error);
                // setIsLoading(false);
            }
        };

        fetchLogs();
    }, []);
    return (
        <Layout>
            <Details withTable={true} intro={detailsData} name={dataById?.gateName} />
            <WorkersComponent withLayout noIntro workers={dataByuser} />
            {/* <DoorsList noIntro idata={data as Record<string, string>[]} /> */}
        </Layout>
    );
};

export default DoorsEdit;
