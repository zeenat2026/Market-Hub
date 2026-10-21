import api from "./api"

 export const fetchProducts = async ()=>{
    const response = await api.get('/products');
    return response.data;
}

export const fetchSingleProduct = async (productId)=>{
    const response = await api.get(`/products/${productId}`);
    return response.data;
}

