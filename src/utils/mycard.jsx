import { Card } from "antd";

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
            style={{ width: 120, flexShrink: 0 }}
            cover={
                <img
                    style={{ height: 120 }}
                    draggable={false}
                    alt={item.nama}
                    src={item.img}
                    ref={(el) => (imageRefs.current[item.id] = el)}
                />
            }
            onClick={() => detail(item.id)}
        >
            <div className="card-body" >
                <div className="product-title">
                    <span>{item.nama}</span>
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
                    }}
                >
                    Add Cart
                </button>
            </div>
        </Card>
    );
};

export default MyCard