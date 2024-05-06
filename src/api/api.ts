import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.sos-rs.com',
});

export { api };
