import { useNavigate, useParams } from "react-router-dom"
import { useRef, useState } from "react"

import Message from "../assets/messenger.png"
import Cart from "../assets/cart.png"
import Arrow from "../assets/arrow.png"

import dataItems from "../utils/dataproduct"
import { animateToCart } from "../utils/addcartanimation"

export default function ProductDetail() {
    const { id } = useParams()
    const dataDetail = dataItems.filter((item) => item.id == id)

    const productImageRef = useRef(null);


    const navigate = useNavigate()
    function back() {
        navigate("/")
    }
    function cart() {
        navigate("/cart/")
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
                    <img className="icon" src={Message} alt="" />
                    <img className="icon" src={Cart} alt="" ref={cartRef} onClick={cart} />
                </div>
            </div>
            {dataDetail.map((item) => (
                <div className="detail-body" key={item.id}>
                    <div className="cover-img">
                        <img className="product-image" src={item.img} alt="" ref={productImageRef} />
                    </div>

                    <div className="product-info">
                        <div>{item.nama}</div>
                        <div>{item.price}</div>
                    </div>

                    <div className="description">
                        <div><b>Deskripsi</b></div>
                        <div>
                            {item.deskripsi}
                        </div>
                    </div>
                </div>

            ))}

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
                >Add Cart</button>
            </div>
        </div>
    );
}