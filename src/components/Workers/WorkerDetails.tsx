import React, { useEffect } from "react";
import customDataProvider from "../../dataProvider";
import { useParams } from "react-router-dom";
import Edit from "../Edit";
import WorkersComponent from "./Workers";
interface ItemProps {
  floor: string;
  name: string;
  updatedAt: string;
  addressCity: string;
  addressStreet: string;
}
const WorkerDetails = () => {
  const { id } = useParams();

  const [item, setItem] = React.useState<any>();

  const fetchItemById = async () => {
    let location = window.location.hash.split("/")[1];
    const resource = location;
    const params = {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "name", order: "ASC" },
      filter: { id },
    };

    try {
      //@ts-ignore
      const response = await customDataProvider.getOne(resource, id);
      const itemData = response.data;
      setItem(itemData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchItemById();
  }, []);
  let EditData = {
    latestunlockAt: new Date(item?.updatedAt)?.toLocaleTimeString(),
    email: item?.email,
    ["phone number"]: item?.phoneNumber,
  };
  return (
    <>
      <Edit data={item} intro={EditData} name={item?.name} />
      <WorkersComponent />
    </>
  );
};

export default WorkerDetails;
