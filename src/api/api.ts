import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'https://api.sos-rs.com',
});

export { api };
