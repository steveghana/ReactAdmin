//@ts-ignore
import rest from 'react-admin-lb4';
export const Apiurl = import.meta.env.VITE_URL;
console.log(Apiurl);
export const RestProvider = rest(Apiurl);

