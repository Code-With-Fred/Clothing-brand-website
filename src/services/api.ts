import axios from 'axios';
import { Product } from '@/types/product';

const API_BASE_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productAPI = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/products/categories');
    return response.data;
  },
};