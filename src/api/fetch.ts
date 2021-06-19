import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 31000,
  headers: {
    Accept: "application/json"
  },
});

export default instance;