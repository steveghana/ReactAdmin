import { DataProvider } from "react-admin";
import axios from "axios";
// import RestProvider from "ra-data-simple-rest";
const apiUrl = "https://access-key-dev.herokuapp.com"; // Replace with your API URL

const customDataProvider: DataProvider = {
  getList: async (resource, params) => {
    const url = `${apiUrl}/${resource}`;

    try {
      console.log("start");
      const response = await axios.get(url);
      //   const response = await axios.get(url);
      const data = response.data;
      console.log("fend");

      // Handle the response structure
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
    // Implement deleteMany logic
    return {};
  },
  getMany: async () => {
    // Implement getMany logic
    return { data: [] };
  },
  getManyReference: async () => {
    // Implement getManyReference logic
    return { data: [], total: 0 };
  },

  updateMany: async () => {
    // Implement updateMany logic
    return {};
  },
  // @ts-ignore
  create: () => Promise.resolve({ data: { id: 0 } }),
  // @ts-ignore
  delete: () => Promise.resolve({ data: {} }),

  // @ts-ignore
  getOne: async (resource, params) => {
    const url = `${apiUrl}/${resource}/${params.id}`;

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
