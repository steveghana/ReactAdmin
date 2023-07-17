import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOne } from 'react-admin';
import LocationList from './LocationList';
import Details from '../ReusableDetails';
import axios from 'axios';
import { Apiurl } from '../../DataProvider';
const ItemEdit = () => {
    const { id } = useParams();
    const { data } = useGetOne('locations', { id });
    let detailsData = {
        City: data?.addressCity,
        Street: data?.addressStreet,
    };
    React.useEffect(() => {
        const ids = [...data.floors]; // Array of IDs
        const fetchFloors = async () => {
            const response = await axios.get(`${Apiurl}/view-user-gates?filter={"where":{"gateFloor":{"inq": ${JSON.stringify(ids)}}}}`);
            console.log('floors:', data.floors, 'Gates with location:', response?.data);
        };
        fetchFloors();
    }, []);
    return (
        <>
            <Details intro={detailsData} name={data?.name} />
            <LocationList nointro={true} data={data as Record<string, string>[]} />
        </>
    );
};

export default ItemEdit;
