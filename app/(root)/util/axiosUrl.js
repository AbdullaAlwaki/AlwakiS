import axios from "axios";

const axiosUrl = axios.create();

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://api-alwaki.onrender.com/api";
axiosUrl.defaults.baseURL = url;
axiosUrl.defaults.withCredentials = true;

export default axiosUrl;
