import { useState, useEffect } from "react";

interface Item {
  [key: string]: any;
}

const useSearchFilter = <T extends Item>(initialData: T[]) => {
  const [data, setData] = useState<T[]>(initialData);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredData = initialData?.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  }, [initialData, searchTerm]);

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
  };

  return [data, searchTerm, handleSearch] as const;
};

export default useSearchFilter;
