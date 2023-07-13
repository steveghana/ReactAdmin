import React, { createContext, useEffect, useState } from "react";
import customDataProvider from "../dataProvider"; // Import your custom data provider
import { ListProps } from "@mui/material";
export interface MyContextProps {
  fetchData?: () => Promise<void>; // Define the fetchData function
  locations: any[];
  doors: any[];
  workers: any[];
}
interface LocationListProps extends ListProps {
  data: Location[];
}
export interface MyContextProps {
  fetchData?: () => Promise<void>;
  locations: any[];
  doors: any[];
  workers: any[];
}

export const GlobalContext = createContext<MyContextProps>({
  fetchData: () => Promise.resolve(),
  locations: [],
  doors: [],
  workers: [],
});

const fetchLocations = async (resource: string) => {
  const params = {
    pagination: { page: 0, perPage: 0 },
    sort: { field: "location", order: "ASC" },
    filter: {},
  };
  try {
    const response = await customDataProvider.getList(resource, params);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const fetchDoors = async (resource: string) => {
  const params = {
    pagination: { page: 0, perPage: 0 },
    sort: { field: "location", order: "ASC" },
    filter: {},
  };

  try {
    const response = await customDataProvider.getList(resource, params);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const fetchWorkers = async (resource: string) => {
  const params = {
    pagination: { page: 0, perPage: 0 },
    sort: { field: "name", order: "ASC" },
    filter: {},
  };

  try {
    const response = await customDataProvider.getList(resource, params);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [doors, setDoors] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [locationsData, doorsData, workersData] = await Promise.all([
          fetchLocations("locations"),
          fetchDoors("gates-users"),
          fetchWorkers("users"),
        ]);

        setLocations(locationsData);
        setDoors(doorsData);
        setWorkers(workersData);
      } catch (error) {
        console.error(error);
        // Handle the error here
      }
    };

    fetchAllData();
  }, []);

  return (
    <GlobalContext.Provider value={{ locations, doors, workers }}>
      {children}
    </GlobalContext.Provider>
  );
};
// const Context = React.createContext(null)
