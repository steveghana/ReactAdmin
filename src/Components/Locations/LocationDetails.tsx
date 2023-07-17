import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';
import LocationList from './LocationList';
import Details from '../ReusableDetails';
import axios from 'axios';
import { Apiurl } from '../../DataProvider';
import NestedList from './LocationGateCategories';
const ItemEdit = () => {
    const { id } = useParams();
    const { data } = useGetOne('locations', { id });
    const [nestedList, setNestedList] = useState<any[]>([]);
    let detailsData = {
        City: data?.addressCity,
        Street: data?.addressStreet,
    };
    React.useEffect(() => {
        // const ids = [...data.floors]; // Array of IDs
        // const fetchFloors = async () => {
        //     const response = await axios.get(`${Apiurl}/view-user-gates?filter={"where":{"gateFloor":{"inq": ${JSON.stringify(ids)}}}}`);
        //     //@ts-ignore
        //     const nestedListData = response.data.map(({ id, data }) => ({
        //         id: id,
        //         data: data.map((gate: any) => ({
        //             id: gate.id,
        //             gateName: gate.gateName,
        //             // Add other fields as needed for the nested resources
        //         })),
        //     }));
        //     console.log('nested:', nestedListData);
        //     setNestedList(nestedListData);
        // };
        // fetchFloors();
    }, []);
    const postData = {
        title: 'Post Title',
        comments: [
            { body: 'Comment 1' },
            { body: 'Comment 2' },
            // Additional comments...
        ],
        tags: [
            { name: 'Tag 1' },
            { name: 'Tag 2' },
            // Additional tags...
        ],
    };
    return (
        <>
            <Details intro={detailsData} name={data?.name} />
            <NestedList />
            {/* <LocationList nointro={true} data={data as Record<string, string>[]} /> */}
        </>
    );
};

export default ItemEdit;
