import {Admin, Resource} from "react-admin";
import Locations from "./components";
import LocationEdit from "./components/locations/LocationDetails";
import WorkersComponent from "./components/workers/Workers";
import {QueryClient} from "react-query";
import Doors from "./components/doors/Doors";
import WorkerDetails from "./components/workers/WorkerDetails";
import {GlobalContextProvider} from "./customHook/context";
import DoorsEdit from "./components/doors/DoorsDetail";
import UserCreate from "./components/workers/CreateWorker";
import DoorCreate from "./components/doors/DoorCreate";
import {dataProvider} from "./dataProvider.ts";

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
                dataProvider={dataProvider}
                queryClient={queryClient}
            >
                <Resource name="locations" edit={LocationEdit} list={Locations}/>
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
