import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';
import Details from '../ReusableDetails';
import axios from 'axios';
import { Apiurl } from '../../DataProvider';
import NestedList from './LocationGateCategories';
import Layout from '../../Layout';
const ItemEdit = () => {
    const { id } = useParams();
    // const { data } = useGetOne('locations', { id });
    const { data } = useGetOne('view-company-locations', { id });
    const [nestedList, setNestedList] = useState<any>([]);
    const [doorlength, setDoorLength] = useState(0);
    console.log('id data:', data);
    let detailsData = {
        City: data?.loctAddressCity,
        Street: data?.loctAddressStreet,
    };
    React.useEffect(() => {
        const ids = [...JSON.parse(data.loctFloors)]; // Array of IDs
        const limit = 20; // Set the desired limit
        const fetchFloors = async () => {
            const response = await axios.get(
                `${Apiurl}/view-user-gates?filter={"where":{"gateFloor":{"inq": ${JSON.stringify(ids)}}},"limit":${limit}}`
            );
            setDoorLength(response?.data?.length);
            // Transform the API response into the desired data structure
            const transformedData = ids.map(item => {
                const items = {
                    id: item,
                    firstName: `Floor ${item}`,
                    books: response.data.filter((el: any) => el.gateFloor === item),
                };
                return items;
            });

            const postData = {
                id: 1,
                title: 'Floor',
                Floors: transformedData,
            };

            setNestedList(postData);
        };

        fetchFloors();
    }, []);

    return (
        <Layout>
            <Details intro={detailsData} name={data?.loctName} />
            <NestedList data={nestedList} doorLength={doorlength} />
        </Layout>
    );
};

export default ItemEdit;
