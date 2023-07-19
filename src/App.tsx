import { Admin, Resource } from 'react-admin';
import { RestProvider as Dataprovider } from './DataProvider';
import LocationEdit from './Components/Locations/LocationDetails';
import WorkersComponent from './Components/Workers/WorkersList';
import { QueryClient } from 'react-query';
import Doors from './Components/Doors/DoorsList';
import WorkerDetails from './Components/Workers/WorkerDetails';

import DoorsDetails from './Components/Doors/DoorsDetails';
import LocationList from './Components/Locations/LocationList';
import Appbar from './Appbar';
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
        <Admin layout={Appbar} dataProvider={Dataprovider} queryClient={queryClient}>
            <Resource name="locations" edit={LocationEdit} list={LocationList} />
            <Resource options={{ label: 'Workers' }} name="users" edit={WorkerDetails} list={WorkersComponent} />
            <Resource name="view-user-gates" options={{ label: 'Doors' }} edit={DoorsDetails} list={Doors} />
        </Admin>
    );
};

export default App;
