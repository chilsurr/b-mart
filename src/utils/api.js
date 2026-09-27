import axiosInstance from "./axios-instance"


export const postRegist = async (data) => {
    const regist = await axiosInstance.post('/register/', data,)
    return regist
}

export const postCart = async (data) => {
    const cart = await axiosInstance.post('/cart/', data,)
    return cart
}
export const updateCart = async (data_id, quantity) => {
    const cart = await axiosInstance.patch(`/cart/${data_id}/`, {quantity: quantity})
    return cart
}


export const deleteCart = async (data_id) => {
    const response = await axiosInstance.delete(
        `/cart/${data_id}/`
    );

    return response.data;
};



export const getProduct = async () => {
    const items = await axiosInstance.get("/products/",);
    return items.data
}

export const getCart = async () => {
    const cart = await axiosInstance.get('/cart/')
    return cart
}
