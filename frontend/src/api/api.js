import axios from 'axios';

// THIS IS YOUR EXACT RENDER URL FROM THE SCREENSHOT
const API_URL = 'https://retail-pulse-q5d0.onrender.com/api';

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