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
    const [nestedList, setNestedList] = useState<any>([]);
    let detailsData = {
        City: data?.addressCity,
        Street: data?.addressStreet,
    };
    React.useEffect(() => {
        const ids = [...data.floors]; // Array of IDs
        const limit = 20; // Set the desired limit

        const fetchFloors = async () => {
            const response = await axios.get(
                `${Apiurl}/view-user-gates?filter={"where":{"gateFloor":{"inq": ${JSON.stringify(ids)}}},"limit":${limit}}`
            );
            console.log('Gates with location:', response?.data);

            // Transform the API response into the desired data structure
            const transformedData = ids.map(item => {
                const items = {
                    id: item,
                    firstName: `Floor ${item}`,
                    books: response.data.filter((el: any) => el.gateFloor === item),
                };
                return items;
            });
            // const transformedData = response.data.map((gate: any) => {
            //     const author = {
            //         id: gate.gateId,
            //         firstName: gate.gateName,
            //         lastName: gate.gateLocation,
            //         books: [],
            //     };

            //     return author;
            // });
            const postData = {
                id: 1,
                title: 'Post Title',
                Floors: transformedData,
            };

            console.log(postData);
            setNestedList(postData);
        };

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
        fetchFloors();
    }, []);

    return (
        <>
            <Details intro={detailsData} name={data?.name} />
            <NestedList data={nestedList} />
            {/* <LocationList nointro={true} data={data as Record<string, string>[]} /> */}
        </>
    );
};

export default ItemEdit;
