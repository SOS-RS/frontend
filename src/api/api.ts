import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
});

export { api };
