import React from "react";
import { useParams } from "react-router-dom";
import Edit from "../Edit";
import customDataProvider from "../../dataProvider";
import Doors from "./Doors";
const DoorsEdit = () => {
  const { id } = useParams();

  const [item, setItem] = React.useState<any>({});

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

  React.useEffect(() => {
    fetchItemById();
  }, []);
  return (
    <div>
      <Edit
        data={item}
        withTable={true}
        intro={{ color: "#FFB448", location: "--", street: "--" }}
        name={item?.name}
      />
      <Doors />
    </div>
  );
};

export default DoorsEdit;
