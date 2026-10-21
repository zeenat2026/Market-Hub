import api from "./api";


export const getCart = async () => {
    const response = await api.get('/carts/get-Cart');
     return response.data
}

export const postCart= async (cartData) => {
    const response = await api.post('/carts/addToCart',cartData);
     return response.data  
}

export const removeTheCartItem = async (id) => {
    const response = await api.delete(`/carts/remove-CartItem/${id}`);
     return response.data  
}

export const editTheCartItem = async ({productId, quantity}) => {
    
    const response = await api.put(`/carts/update-CartItem/${productId}`, { quantity });
     return response.data  
}