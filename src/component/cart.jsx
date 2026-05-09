import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Arrow from "../assets/arrow.png"

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"

import { Checkbox, Button } from 'antd';
const CheckboxGroup = Checkbox.Group;



function Cart() {
    const navigate = useNavigate()
    function back() {
        navigate("/")
    }
    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Kapal Api 800gr",
            price: 12000,
            quantity: 1,
            img: imgCat1
        },
        {
            id: 2,
            name: "Indomie Goreng",
            price: 3500,
            quantity: 1,
            img: imgCat2
        },
        {
            id: 3,
            name: "Teh Botol Sosro",
            price: 5000,
            quantity: 1,
            img: imgCat3
        },
        {
            id: 4,
            name: "Susu Ultra Milk",
            price: 7000,
            quantity: 1,
            img: imgCat4
        },
        {
            id: 5,
            name: "Teh Botol Sosro",
            price: 5000,
            quantity: 1,
            img: imgCat3
        },
        {
            id: 6,
            name: "Susu Ultra Milk",
            price: 7000,
            quantity: 1,
            img: imgCat4
        },
        {
            id: 7,
            name: "Teh Botol Sosro",
            price: 5000,
            quantity: 1,
            img: imgCat3
        },
        {
            id: 8,
            name: "Susu Ultra Milk",
            price: 7000,
            quantity: 1,
            img: imgCat4
        }
    ]);


    function tambah(id) {
        console.log("tambah pak");
        setProducts(products.map(item =>
            item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity + 1 } : item
        ));
    }
    function kurang(id) {
        console.log("kurang pak");
        setProducts(products.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    }

    const [checkedList, setCheckedList] = useState([]);
    const checkAll = products.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < products.length;
    function onChange(id) {
        setCheckedList(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    }
    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? products.map(item => item.id) : []);
    };

    return (
        <>
            <div className="cart-container">
                <div className="head-bar">
                    <img className="icon" src={Arrow} alt="" onClick={back} />
                    <div>keranjang pak</div>
                </div>
                <div className="content-cart">
                    {products.map(item => (
                        <div key={item.id} className="cart-item">
                            <Checkbox
                                checked={checkedList.includes(item.id)}
                                onChange={() => onChange(item.id)}
                            />
                            <img src={item.img} alt={item.name} width={80} />
                            <div className="cart-desc">
                                <h3>{item.name}</h3>
                                <p>Rp. {item.price}</p>
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
                    <div className="total-price">Rp. 17.000</div>
                    <Button className="btn-payment">Payment</Button>
                </div>

            </div>
        </>
    )
}

export default Cart