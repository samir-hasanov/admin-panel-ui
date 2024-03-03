import axios from "axios";

const baseURL = "http://37.27.23.25:8090/api/v1/restaurant";

const api = axios.create({
  baseURL,
});

export const fetchPosts = async (url) => {
  const response = await api.get(url);
  return response.data;
};
