import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export const getCategories = async (lang: string = 'fr') => {
    const response = await api.get(`/categories?lang=${lang}`);
    return response.data.data;
};

export const getProducts = async (params: { category_id?: number; lang?: string } = {}) => {
    const { lang = 'fr', ...rest } = params;
    const response = await api.get('/products', {
        params: { ...rest, lang },
    });
    return response.data;
};

export const getProduct = async (id: string | number, lang: string = 'fr') => {
    const response = await api.get(`/products/${id}?lang=${lang}`);
    return response.data.data;
};

export default api;
