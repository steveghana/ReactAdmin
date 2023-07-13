import React, { useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import customDataProvider from "../dataProvider";
import { useParams } from "react-router-dom";
import Edit from "./Edit";
interface ItemProps {
  floor: string;
  name: string;
  updatedAt: string;
  addressCity: string;
  addressStreet: string;
}
const WorkerDetails = () => {
  const { id } = useParams();

  const [item, setItem] = React.useState<ItemProps[]>([]);

  const fetchItemById = async () => {
    let location = window.location.hash.split("/")[1];
    const resource = location;
    const params = {
      pagination: { page: 1, perPage: 10 },
      sort: { field: "name", order: "ASC" },
      filter: { id },
    };
    console.log(id);

    try {
      //@ts-ignore
      const response = await customDataProvider.getOne(resource, id);
      console.log(response);
      const itemData = response.data;
      setItem([itemData]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchItemById();
  }, []);
  console.log;
  return (
    <>
      <Edit data={item} intro={{}} name={item[0]?.name} />
    </>
  );
};

export default WorkerDetails;
