import { Card } from "antd";
import { useRef } from "react";
import imgCat1 from "../assets/img/category1.png";
import { postCart } from "./api";

const MyCard = ({
    item,
    cartRef,
    imageRefs,
    animateToCart,
    detail,
    onAddToCart
}) => {
    const localImgRef = useRef(null);

    const handleAddCart = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const imgEl = localImgRef.current || (imageRefs?.current && imageRefs.current[item.id]);

        if (onAddToCart) {
            onAddToCart(item, imgEl);
            return;
        }

        // Fallback jika MyCard digunakan tanpa prop onAddToCart
        const cartEl = cartRef?.current;
        if (animateToCart && imgEl && cartEl) {
            animateToCart({
                imageElement: imgEl,
                cartElement: cartEl,
                onComplete: () => {
                    postCart({
                        product_id: item.id,
                        quantity: 1
                    }).catch((error) => console.error("Gagal menambahkan ke keranjang:", error));
                }
            });
        } else {
            postCart({
                product_id: item.id,
                quantity: 1
            }).catch((error) => console.error("Gagal menambahkan ke keranjang:", error));
        }
    };

    return (
        <Card
            hoverable
            style={{ flexShrink: 0 }}
            className="product-card"
            cover={
                <img
                    className="product-card-img"
                    draggable={false}
                    alt={item.name}
                    src={imgCat1}
                    ref={(el) => {
                        localImgRef.current = el;
                        if (imageRefs?.current && item?.id) {
                            imageRefs.current[item.id] = el;
                        }
                    }}
                />
            }
            onClick={(e) => {
                // Cegah navigasi ke detail jika yang diklik adalah tombol Add Cart
                if (e.target.closest(".btn-add-cart")) {
                    return;
                }
                detail?.(item.id);
            }}
        >
            <div className="card-body">
                <div className="product-title">
                    <span>{item.name}</span>
                </div>

                <div className="price">
                    Rp {item.price?.toLocaleString("id-ID")}
                </div>

                <button
                    type="button"
                    className="btn-add-cart"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleAddCart(e);
                    }}
                >
                    Add Cart
                </button>
            </div>
        </Card>
    );
};

export default MyCard;