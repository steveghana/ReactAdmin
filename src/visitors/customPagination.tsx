import { useListContext } from "react-admin";
import { Button, Toolbar } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const PostPagination = () => {
  const { page, hasPreviousPage, hasNextPage, setPage } = useListContext();
  if (!hasPreviousPage && !hasNextPage) return null;
  return <div></div>;
};
export default PostPagination;
