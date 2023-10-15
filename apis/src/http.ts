import axios, { AxiosInstance } from "axios";

const http:AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export default http