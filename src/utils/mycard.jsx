import { Card } from "antd";
import imgCat1 from "../assets/img/category1.png"

import { postCart } from "./api";

import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const MyCard = ({
    item,
    cartRef,
    imageRefs,
    animateToCart,
    detail
}) => {
    return (
        <Card
            hoverable
            style={{ flexShrink: 0 }}
            className="product-card"
            // style={{ width: 120, flexShrink: 0 }}
            cover={
                <img
                    // style={{ height: 120 }}
                    className="product-card-img"
                    draggable={false}
                    alt={item.name}
                    src={imgCat1}
                    ref={(el) => (imageRefs.current[item.id] = el)}
                />
            }
            onClick={() => detail(item.id)}
        >
            <div className="card-body" >
                <div className="product-title">
                    <span>{item.name}</span>
                </div>

                <div className="price">
                    Rp {item.price?.toLocaleString("id-ID")}
                </div>

                <button
                    className="btn-add-cart"
                    onClick={(e) => {
                        e.stopPropagation();
                        animateToCart({
                            imageElement: imageRefs.current[item.id],
                            cartElement: cartRef.current,
                        })
                        postCart({
                            "product_id": item.id,
                            "quantity": 1
                        })
                    }}
                >
                    Add Cart
                </button>
            </div>
        </Card>
    );
};

export default MyCard