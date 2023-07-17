import { Admin, Resource, Layout } from 'react-admin';
import { RestProvider } from './DataProvider';
import LocationEdit from './Components/Locations/LocationDetails';
import WorkersComponent from './Components/Workers/WorkersList';
import { QueryClient } from 'react-query';
import Doors from './Components/Doors/DoorsList';
import WorkerDetails from './Components/Workers/WorkerDetails';

import DoorsDetails from './Components/Doors/DoorsDetails';
import WorkerCreate from './Components/Workers/WorkerCreate';
import DoorCreate from './Components/Doors/DoorCreate';
import LocationList from './Components/Locations/LocationList';
import MyLayout from './Appbar';

// export const MyLayout = (props:any) => <Layout {...props} appBar={MyAppBar} />;
const App = () => {
    //This will cache responses in memory for smooth experience
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000, // 5 minutes
            },
        },
    });
    return (
        <Admin layout={MyLayout} title="Access Key" dataProvider={RestProvider} queryClient={queryClient}>
            <Resource name="locations" edit={LocationEdit} list={LocationList} />
            <Resource name="view-user-companies" /* create={WorkerCreate} */ edit={WorkerDetails} list={WorkersComponent} />
            <Resource name="view-user-gates" /* create={DoorCreate} */ edit={DoorsDetails} list={Doors} />
        </Admin>
    );
};

export default App;
