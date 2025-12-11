import axios from 'axios';

// We are hardcoding the URL to ensure it connects to your backend
const API = axios.create({ 
  baseURL: 'http://localhost:5001/api' 
});

export const getDashboard = async () => {
  const res = await API.get('/dashboard');
  return res.data;
};

export const getProducts = async () => {
  const res = await API.get('/products');
  return res.data;
};

export const getSales = async (params) => {
  const res = await API.get('/sales', { params });
  return res.data;
};
export const createSale = async (saleData) => {
    const res = await API.post('/sales', saleData);
    return res.data;
  };
  
export default API;