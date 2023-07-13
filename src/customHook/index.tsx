import { useState, useEffect } from "react";

const useSearchFilter = (initialData: any[]) => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = initialData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  }, [initialData, searchTerm]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  return [data, handleSearch];
};

export default useSearchFilter;
