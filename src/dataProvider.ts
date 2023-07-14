// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import lb4Provider from 'react-admin-lb4';
import {DataProvider} from "react-admin";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export const dataProvider: DataProvider = lb4Provider(
    import.meta.env.VITE_SIMPLE_REST_URL
);
