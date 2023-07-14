import { Admin, CustomRoutes, Resource } from "react-admin";
import Locations from "./components";
import dataprovider from "./dataProvider";
import LocationEdit from "./components/Locations/LocationDetails";
import WorkersComponent from "./components/Workers/Workers";
import { QueryClient } from "react-query";
import Doors from "./components/Doors/Doors";
import WorkerDetails from "./components/Workers/WorkerDetails";
import { GlobalContextProvider } from "./customHook/context";
import DoorsEdit from "./components/Doors/DoorsDetail";
import UserCreate from "./components/Workers/CreateWorker";
import DoorCreate from "./components/Doors/DoorCreate";
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
        <Resource name="locations" edit={LocationEdit} list={Locations} />
        <Resource
          name="users"
          create={UserCreate}
          edit={WorkerDetails}
          list={WorkersComponent}
        />
        <Resource
          name="gates"
          create={DoorCreate}
          edit={DoorsEdit}
          list={Doors}
        />
      </Admin>
    </GlobalContextProvider>
  );
};

export default App;
