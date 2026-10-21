import api from './api.js';

export const placeOrder = async () => {
    const response = await api.post('/orders/place-order');
    return response.data;
}


export const getOrders = async () => {
    const response = await api.get('/orders/get-orders');
    return response.data;
}

export const  cancellOrder = async (id) => {

    const response = await api.patch(`/orders/cancel-order/${id}`);
    return response.data;
}