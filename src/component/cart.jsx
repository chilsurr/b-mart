import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Arrow from "../assets/arrow.png"

import dataItems from "../utils/dataproduct"
import dataCart from "../utils/datacart"

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"

import { Checkbox, Button, Modal } from 'antd';
const { confirm } = Modal;
const CheckboxGroup = Checkbox.Group;



function Cart() {

    const idCart = 2
    const dataCartdumy = dataCart.filter((items) => items.userId === idCart)
    console.log(dataCartdumy)

    const dataCartFix = dataCartdumy.map((item) => ({
        ...item, itemId: dataItems.find((product) => product.id === item.itemId)
    }))

    console.log(dataCartFix)

    // const peww = dataCartdumy.map((item)=> dataItems.find((product) => product.id === item.itemId))
    // console.log(peww)

    const [cart, setCart] = useState(dataCartFix);


    const navigate = useNavigate()
    function back() {
        navigate("/")
    }


    const tambah = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };


    const kurang = (id) => {
        const cartItem = cart.find((item) => item.id === id);

        if (!cartItem) return;

        // quantity > 1 => kurangi
        if (cartItem.quantity > 1) {
            setCart((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );

            return;
        }

        // quantity = 1 => tampilkan konfirmasi
        confirm({
            title: "Hapus Produk",
            content: "Apakah Anda ingin menghapus item ini dari keranjang?",
            okText: "Ya, Hapus",
            cancelText: "Batal",
            centered: true,
            width: "90vw",

            okButtonProps: {
                className: "cart-delete-btn",
            },

            cancelButtonProps: {
                className: "cart-cancel-btn",
            },

            onOk: () => {
                setCart((prev) =>
                    prev.filter((item) => item.id !== id)
                );
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


    const getTotalCart =  () => cart.reduce(
        (total, item) => total + item.itemId.price * item.quantity, 0
    )

    const goPayment = () => navigate("/payment/")

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
                            <img src={item.itemId.img} alt={item.itemId.name} width={80} />
                            <div className="cart-desc">
                                <h3>{item.itemId.nama}</h3>
                                <p>Rp. {item.itemId.price}</p>
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
                    <Checkbox className="check-all" indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                        Check all
                    </Checkbox>
                    <div className="total-price">Rp. {getTotalCart().toLocaleString("id-ID")}</div>
                    <Button className="btn-payment" onClick={goPayment}>Payment</Button>
                </div>

            </div>
        </>
    )
}

export default Cart