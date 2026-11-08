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

export const postOrder = async (data) => {
    const order = await axiosInstance.post('/order/', data);
    return order;
}

export const postOrderDetail = async (data) => {
    const orderdetail = await axiosInstance.post('/orderdetail/', data);
    return orderdetail;
}

export const getOrders = async (params) => {
    const order = await axiosInstance.get('/order/', { params });
    return order;
}

export const checkAuth = async () => {
    const res = await axiosInstance.get('/check-auth/');
    return res;
}

export const getCurrentUser = async () => {
    const cachedId = localStorage.getItem("user_id");
    const cachedUsername = localStorage.getItem("username");
    if (cachedId) {
        return { id: Number(cachedId), username: cachedUsername };
    }
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    try {
        const res = await axiosInstance.get('/check-auth/');
        if (res.data?.id) {
            localStorage.setItem("user_id", res.data.id);
            if (res.data.user) {
                localStorage.setItem("username", res.data.user);
            }
            return { id: res.data.id, username: res.data.user };
        }
    } catch (e) {
        console.warn("Gagal mengambil data user:", e);
    }
    return null;
}
