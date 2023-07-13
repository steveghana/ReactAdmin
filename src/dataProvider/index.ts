import { DataProvider } from "react-admin";
import axios from "axios";
// import RestProvider from "ra-data-simple-rest";
const apiUrl = "https://access-key-dev.herokuapp.com"; // Replace with your API URL

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      // Handling the response structure
      if (Array.isArray(data)) {
        return {
          data,
          total: data.length,
        };
      } else if (data && Array.isArray(data.data)) {
        const totalCount = response.headers["x-total-count"];
        return {
          data: [],
          total: totalCount ? parseInt(totalCount, 10) : data.data.length,
        };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  },

  deleteMany: async () => {
    return {};
  },
  getMany: async () => {
    return { data: [] };
  },
  getManyReference: async () => {
    return { data: [], total: 0 };
  },
  updateMany: async () => {
    return {};
  },
  // @ts-ignore
  create: () => Promise.resolve({}),
  // @ts-ignore
  delete: () => Promise.resolve({}),

  // @ts-ignore
  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      return {
        data,
      };
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  },
  // @ts-ignore
  update: () => Promise.resolve({ data: {} }),
};

export default customDataProvider;
