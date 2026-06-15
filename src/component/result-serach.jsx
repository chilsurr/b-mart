import { Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import { animateToCart } from "../utils/addcartanimation";
import dataItems from "../utils/dataproduct";
import MyCard from "../utils/mycard";

import Arrow from "../assets/arrow.png"
import Cart from "../assets/cart.png"


import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

function ResultSearch() {
    const imageRefs = useRef({});
    const cartRef = useRef(null);

    const [flyingItem, setFlyingItem] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const location = useLocation();

    const searchCategory = location.state?.category || [];
    console.log(searchCategory)

    const result = dataItems.filter((item) => item.category === searchCategory)

    const navigate = useNavigate()
    function detail(id) {
        navigate(`/detail/${id}`)
    }
    function back() {
        navigate("/")
    }
    function cart() {
        navigate("/cart/")
    }
    return (
        <div className="result-container">
            <div className="search-component">
                <img className="icon" src={Arrow} alt="" onClick={back} />
                <Input type="text" placeholder="Search item" className="search-input" />
                <img className="icon" src={Cart} ref={cartRef} alt="" onClick={cart} />
            </div>
            <div className="result-body">
                <div className="result-card">
                    {result.map((item) => (
                        <MyCard
                            key={item.id}
                            item={item}
                            cartRef={cartRef}
                            imageRefs={imageRefs}
                            animateToCart={animateToCart}
                            detail={detail}
                        />
                    ))}

                </div>

            </div>
        </div>
    )
}

export default ResultSearch