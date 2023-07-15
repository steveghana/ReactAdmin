//@ts-ignore
import rest from "react-admin-lb4";
export const Apiurl = import.meta.env.VITE_API_URL;
export const RestProvider = rest(Apiurl);
