//Git ignore was used to prevent TS from throwing errors as there is no type declaration for react-admin-lb4
//@ts-ignore
import rest from 'react-admin-lb4';
export const Apiurl = 'https://access-key-dev.herokuapp.com';
console.log(Apiurl);
export const RestProvider = rest(Apiurl);

