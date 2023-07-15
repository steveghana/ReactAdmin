import { useParams } from "react-router-dom";
import { useGetOne } from "react-admin";
import LocationList from "./LocationList";
import Details from "../ReusableDetails";
const ItemEdit = () => {
  const { id } = useParams();
  const { data } = useGetOne("locations", { id });
  let detailsData = {
    City: data?.addressCity,
    Street: data?.addressStreet,
  };
  return (
    <>
      <Details intro={detailsData} name={data?.name} />
      <LocationList nointro={true} data={data as Record<string, string>[]} />
    </>
  );
};

export default ItemEdit;
