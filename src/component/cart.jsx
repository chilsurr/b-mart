import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Arrow from "../assets/arrow.png"
import "../style/cart.css"

import { getCart, updateCart,deleteCart } from "../utils/api"

import dataItems from "../utils/dataproduct"
import dataCart from "../utils/datacart"

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"

import { Checkbox, Button, Modal } from 'antd';
import { useEffect } from "react"
const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;



function Cart() {

    useEffect(() => {
        getCart().then((result) => {
            console.log(result.data)
            setCart(result.data)
        })

    },[])


    const [cart, setCart] = useState([]);


    const navigate = useNavigate()
    function back() {
        navigate("/")
    }


    const tambah = async (id) => {
        const cartItem = cart.find((item) => item.id === id);
        if (!cartItem) return;
        const newQuantity = cartItem.quantity + 1;

        try {
            const updatedItem = await updateCart(id, newQuantity);

            setCart((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? updatedItem.data
                        : item
                )
            );
        } catch (error) {
            console.error("Gagal menambah quantity:", error);
        }
    };


    const kurang = async (id) => {
        const cartItem = cart.find((item) => item.id === id);

        if (!cartItem) return;

        // quantity > 1 => kurangi
        if (cartItem.quantity > 1) {
            const newQuantity = cartItem.quantity - 1;

            try {
                const updatedItem = await updateCart(id, newQuantity);

                setCart((prev) =>
                    prev.map((item) =>
                        item.id === id
                            ? updatedItem.data
                            : item
                    )
                );
            } catch (error) {
                console.error("Gagal mengurangi quantity:", error);
            }

            return;
        }

        // quantity = 1 => konfirmasi hapus
        confirm({
            title: "Hapus Produk",
            content: "Apakah Anda ingin menghapus item ini dari keranjang?",
            okText: "Ya, Hapus",
            cancelText: "Batal",
            centered: true,

            okButtonProps: {
                className: "cart-delete-btn",
            },

            cancelButtonProps: {
                className: "cart-cancel-btn",
            },

            onOk: async () => {
                try {
                    await deleteCart(id);

                    setCart((prev) =>
                        prev.filter((item) => item.id !== id)
                    );
                } catch (error) {
                    console.error("Gagal menghapus cart:", error);
                }
            },
        });
    };


    const [checkedList, setCheckedList] = useState([]);
    const checkAll = cart.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < cart.length;
    function onChange(id) {
        setCheckedList(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }
    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? cart.map(item => item.id) : []);
    };


    const getTotalCart = () => cart.reduce(
        (total, item) => total + item.product.price * item.quantity, 0
    )

    const goPayment = () => navigate("/payment/", { state: { cart } })

    return (
        <>
            <div className="cart-container">
                <div className="head-bar">
                    <img className="icon" src={Arrow} alt="" onClick={back} />
                    <div>keranjang pak</div>
                </div>
                <div className="content-cart">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <Checkbox
                                checked={checkedList.includes(item.id)}
                                onChange={() => onChange(item.id)}
                            />
                            <img src={imgCat1} alt={item.product.name} width={80} />
                            {/* <img src={item.product.img} alt={item.product.name} width={80} /> */}
                            <div className="cart-desc">
                                <h3>{item.product.name}</h3>
                                <p>Rp. {item.product.price}</p>
                            </div>
                            <div className="qty-control">
                                <button className="qty-btn" onClick={() => kurang(item.id)}>
                                    −
                                </button>
                                <span className="qty-value">{item.quantity}</span>
                                <button className="qty-btn" onClick={() => tambah(item.id)}>
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="footer-bar">
                    <div className="checkout-section">
                        <Checkbox className="check-all" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Check all
                        </Checkbox>
                        <div className="total-price">Rp. {getTotalCart().toLocaleString("id-ID")}</div>
                    </div>
                    <Button className="btn-payment" onClick={goPayment}>Payment</Button>
                </div>

            </div>
        </>
    )
}

export default Cart