import { Admin, Resource } from "react-admin";
import { RestProvider } from "./DataProvider";
import LocationEdit from "./Components/Locations/LocationDetails";
import WorkersComponent from "./Components/Workers/WorkersList";
import { QueryClient } from "react-query";
import Doors from "./Components/Doors/DoorsList";
import WorkerDetails from "./Components/Workers/WorkerDetails";

import DoorsDetails from "./Components/Doors/DoorsDetails";
import WorkerCreate from "./Components/Workers/WorkerCreate";
import DoorCreate from "./Components/Doors/DoorCreate";
import LocationList from "./Components/Locations/LocationList";
const App = () => {
  //For caching responses in memory
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  });
  return (
    <Admin
      title="Access Key"
      dataProvider={RestProvider}
      queryClient={queryClient}
    >
      <Resource name="locations" edit={LocationEdit} list={LocationList} />
      <Resource
        name="users"
        create={WorkerCreate}
        edit={WorkerDetails}
        list={WorkersComponent}
      />
      <Resource
        name="gates"
        create={DoorCreate}
        edit={DoorsDetails}
        list={Doors}
      />
    </Admin>
    // </GlobalContextProvider>
  );
};

export default App;
