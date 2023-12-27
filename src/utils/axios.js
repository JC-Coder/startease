import axios from "axios";

export const axiosInstance = (baseURL) => {
  return axios.create({
    baseURL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
