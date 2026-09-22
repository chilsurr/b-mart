import axiosInstance from "./axios-instance"


export const postRegist = async (data) => {
    const regist = await axiosInstance.post('/register/', data,)
    return regist
}

export const postCart = async (data) => {
    const cart = await axiosInstance.post('/cart/', data,)
    return cart
}

export const getProduct = async () => {
    const items = await axiosInstance.get("/products/",);
    return items.data
}
