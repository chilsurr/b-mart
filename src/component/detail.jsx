import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRef, useState, useEffect } from "react"
import "../style/detail.css"

import Message from "../assets/messenger.png"
import Cart from "../assets/cart.png"
import Arrow from "../assets/arrow.png"
import { getProduct } from "../utils/api"

import dataItems from "../utils/dataproduct"
import { animateToCart } from "../utils/addcartanimation"

import imgCat1 from "../assets/img/category1.png"

export default function ProductDetail() {
    const { t } = useTranslation();


    const [items, setItems] = useState([])

    const { id } = useParams()
    const dataDetail = items.filter((item) => item.id == id)
    useEffect(() => {
        getProduct().then((result) => {
            setItems(result)
        })
    },[])

    const productImageRef = useRef(null);


    const navigate = useNavigate()
    function back() {
        navigate("/")
    }
    function cart() {
        navigate("/cart/")
    }
    function chat() {
        navigate("/chat/")
    }

    const imageRefs = useRef({});
    const cartRef = useRef(null);

    const [flyingItem, setFlyingItem] = useState(null);
    // const [cartCount, setCartCount] = useState(0);

    return (
        <div className="detail-container">
            <div className="detail-header">
                <img className="icon" src={Arrow} onClick={back} />
                <div>
                    <img className="icon" src={Message} alt="" onClick={chat} />
                    <img className="icon" src={Cart} alt="" ref={cartRef} onClick={cart} />
                </div>
            </div>
            <div className="detail-content">
                {dataDetail.map((item) => (
                    <div className="detail-body" key={item.id}>
                        <div className="detail-image">
                            <div className="cover-img">
                                <img className="product-image" src={imgCat1} alt="" ref={productImageRef} />
                            </div>
                        </div>
                        <div className="detail-product">
                            <div className="product-info">
                                <div>{item.name}</div>
                                <div>Rp. {item.price}</div>
                            </div>

                            <div className="description">
                                <div><b>{t("product.description")}</b></div>
                                <div>
                                    {item.deskripsi}
                                </div>
                            </div>

                            <div className="footer-detail">
                                <button className="add-cart-detail-btn"
                                    onClick={() =>
                                        animateToCart({
                                            imageElement: productImageRef.current,
                                            cartElement: cartRef.current,
                                            // onComplete: () =>
                                            //     setCartCount((prev) => prev + 1),
                                        }, console.log(productImageRef))
                                    }
                                >{t("product.addCart")}</button>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    );
}