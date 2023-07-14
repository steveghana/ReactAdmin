import React, { createContext, useEffect, useState } from "react";
import customDataProvider from "../dataProvider"; // Import your custom data provider
import { ListProps } from "@mui/material";
export interface MyContextProps {
  fetchData?: () => Promise<void>; // Define the fetchData function
  locations: any[];
  doors: any[];
  workers: any[];
  disableChart: boolean;
  setDisableChart: React.Dispatch<React.SetStateAction<boolean>>;
}
interface LocationListProps extends ListProps {
  data: Location[];
}
interface ILogProps {
  gateId: number;
  isOpen: boolean;
  isSuccess: boolean;
  logDescription: string;
  logNotes: string;
  logTimestamp: Date;
  userId: number;
}
export interface MyContextProps {
  fetchData?: () => Promise<void>;
  locations: any[];
  doors: any[];
  workers: any[];
  logs: ILogProps[];
}

export const GlobalContext = createContext<MyContextProps>({
  fetchData: () => Promise.resolve(),
  locations: [],
  doors: [],
  workers: [],
  logs: [],
  disableChart: false,
  setDisableChart: () => false,
});
const fetchEvents = async (resource: string) => {
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
  const [logs, setLogs] = React.useState<ILogProps[]>([]);
  const [disableChart, setDisableChart] = useState(false);
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [locationsData, doorsData, workersData, logs] = await Promise.all(
          [
            fetchLocations("locations"),
            fetchDoors("gates"),
            fetchWorkers("users"),
            fetchEvents("log-event-operations"),
          ]
        );

        setLocations(locationsData);
        setLogs(logs);
        setDoors(doorsData);
        setWorkers(workersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAllData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ locations, doors, workers, logs, setDisableChart, disableChart }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
