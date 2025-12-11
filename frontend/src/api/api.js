import axios from 'axios';

// WE ARE HARDCODING THE LINK TO FORCE IT TO WORK
// Make sure this link is your exact Render URL + /api
const API_URL = 'https://retail-pulse-backend.onrender.com/api';

const API = axios.create({ baseURL: API_URL });

export const getDashboard = async () => {
  const res = await API.get('/dashboard');
  return res.data;
};

export const getProducts = async () => {
  const res = await API.get('/products');
  return res.data;
};

export const createSale = async (saleData) => {
  const res = await API.post('/sales', saleData);
  return res.data;
};

export default API;