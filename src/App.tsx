// import * as React from "react";
import { render } from "react-dom";
import { Route } from "react-router-dom";
import { Admin, CustomRoutes, Resource } from "react-admin";
import Locations from "./components";
import dataprovider from "./dataProvider";
import CommentEdit from "./components/LocationDetails";
import WorkersComponent from "./components/Workers";
import { QueryClient } from "react-query";
import Doors from "./components/Doors";
import WorkerDetails from "./components/WorkerDetails";
import { GlobalContextProvider } from "./customHook/context";
import DoorsEdit from "./components/DoorsDetail";
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });
  return (
    <GlobalContextProvider>
      <Admin
        // title=""
        dataProvider={dataprovider}
        queryClient={queryClient}
      >
        <Resource name="locations" edit={CommentEdit} list={Locations} />
        <Resource name="users" edit={WorkerDetails} list={WorkersComponent} />
        <Resource name="gates-users" edit={DoorsEdit} list={Doors} />
      </Admin>
    </GlobalContextProvider>
  );
};

export default App;
