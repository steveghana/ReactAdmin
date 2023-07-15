import React from 'react';
import { useParams } from 'react-router-dom';
import Details from '../ReusableDetails';
import DoorsList from './DoorsList';
import { useGetOne } from 'react-admin';

const DoorsEdit: React.FC<{}> = () => {
    const { id } = useParams();
    const { data } = useGetOne('gates', { id });
    let detailsData = {
        Color: data.color || 'black',
        Floor: data.floor || 'Not Available',
        Street: '--',
    };
    return (
        <>
            <Details withTable={true} intro={detailsData} name={data?.name} />
            <DoorsList data={data as Record<string, string>[]} />
        </>
    );
};

export default DoorsEdit;
