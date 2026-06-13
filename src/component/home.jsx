import { Input, Carousel, Card, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { animateToCart } from "../utils/addcartanimation";
import dataItems from "../utils/dataproduct";

import Message from "../assets/messenger.png"
import Cart from "../assets/cart.png"
import Search from "../assets/search.png"
import Profile from "../assets/user.png"

import img1 from "../assets/img/baner1.png"
import img2 from "../assets/img/baner2.png"
import img3 from "../assets/img/baner3.png"

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"

// import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);


function Home() {




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

    const imageRefs = useRef({});
    const cartRef = useRef(null);

    const [flyingItem, setFlyingItem] = useState(null);
    const [cartCount, setCartCount] = useState(0);


    const navigate = useNavigate()
    const { Meta } = Card;

    function cart() {
        navigate("cart/")
    }
    function profile() {
        navigate("profile/")
    }
    function chat() {
        navigate("chat/")
    }
    function detail(id) {
        console.log(id)
        navigate(`detail/${id}`)
    }


    const [isSticky, setIsSticky] = useState(false);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 40);
            const newOpacity = Math.min(scrollY / 50, 1);
            console.log(newOpacity)
            setOpacity(newOpacity);
        };
        // console.log(isSticky)

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchFocus = () =>{
        navigate("/search/")
    }


    return (
        <>
            <div className="container">
                <div className="">
                    <div className={`navbar ${isSticky ? "sticky" : ""}`}
                        style={{
                            backgroundColor: `rgba(46, 125, 50, ${opacity})`,
                            height: 50,
                        }}>
                        {!isSticky ? (
                            <>
                                <div className="navbar">
                                    <div className="nav-icon">
                                        <img className="icon" src={Message} alt="" onClick={chat} />
                                        <div ref={cartRef}>
                                            <img className="icon" src={Cart} alt="" onClick={cart} />
                                        </div>
                                        <img className="icon" src={Profile} alt="" onClick={profile} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Input
                                    type="text"
                                    placeholder="Search item"
                                    className={`search-navbar ${isSticky ? "show" : ""}`}
                                    onFocus={handleSearchFocus}
                                />

                                <div className="nav-icon">
                                    <img className="icon" src={Message} alt="" onClick={chat} />
                                    <div >
                                        <img className="icon" src={Cart} ref={cartRef} alt="" onClick={cart} />
                                    </div>
                                    <img className="icon" src={Profile} alt="" onClick={profile} />
                                </div>

                            </>
                        )}
                    </div>
                    <div className="brand">B-mart</div>
                    <div className="search-bar">
                        <Input type="text" placeholder="Search item" className="search-input"  onFocus={handleSearchFocus}/>
                        <img className="icon" src={Search} alt="" />
                    </div>

                    <div className="carousel">
                        <Carousel autoplay>
                            <div >
                                <div className="img-carousel" style={{ backgroundImage: `url(${img1})` }}></div>
                            </div>
                            <div>
                                <div className="img-carousel" style={{ backgroundImage: `url(${img2})` }}></div>
                            </div>
                            <div>
                                <div className="img-carousel" style={{ backgroundImage: `url(${img3})` }}></div>
                            </div>
                            <div>
                                <div className="img-carousel" style={{ backgroundImage: `url(${img1})` }}></div>
                            </div>
                        </Carousel>

                    </div>
                </div>
                <div className="category">
                    <h3>Kategory</h3>
                    <div className="card-category">
                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat1}
                                />
                            }
                        >
                            <span>Makanan</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat2}
                                />
                            }
                        >
                            <span>Minuman</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat3}
                                />
                            }
                        >
                            <span>Perawatan Rumah</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat4}
                                />
                            }
                        >
                            <span>Kecantikan</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat1}
                                />
                            }
                        >
                            <span>Makanan</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat2}
                                />
                            }
                        >
                            <span>Minuman</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat3}
                                />
                            }
                        >
                            <span>Perawatan Rumah</span>
                        </Card>

                        <Card
                            hoverable
                            style={{ width: 85, height: 135, marginBottom: 15 }}
                            cover={
                                <img
                                    style={{ height: 85 }}
                                    draggable={false}
                                    alt="example"
                                    src={imgCat4}
                                />
                            }
                        >
                            <span>Kecantikan</span>
                        </Card>
                    </div>
                </div>
                <div className="makanan grouping">
                    <h3>Makanan</h3>
                    <div className="card">
                        {dataItems
                            .filter((item) => item.category === "Makanan")
                            .map((item) => (
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

                <div className="minuman grouping">
                    <h3>Minuman</h3>
                    <div className="card">
                        {dataItems
                            .filter((item) => item.category === "Minuman")
                            .map((item) => (
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

                <div className="kebutuhan-rumah grouping">
                    <h3>Kebutuhan Rumah</h3>
                    <div className="card">
                        {dataItems
                            .filter((item) => item.category === "Kebutuhan Rumah")
                            .map((item) => (
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
                <div className="kecantikan grouping">
                    <h3>Kecantikan</h3>
                    <div className="card">
                        {dataItems
                            .filter((item) => item.category === "Kecantikan")
                            .map((item) => (
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
            </div >


            {/* <AnimatePresence>
                {flyingItem && (
                    <motion.img
                        src={flyingItem.image}
                        alt=""
                        initial={{
                            position: "fixed",
                            left: flyingItem.startX,
                            top: flyingItem.startY,
                            width: 80,
                            zIndex: 9999,
                        }}
                        animate={{
                            left: flyingItem.endX,
                            top: flyingItem.endY,
                            scale: 0.2,
                            opacity: 0.5,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={() => {
                            setCartCount((v) => v + 1);
                            setFlyingItem(null);
                        }}
                    />
                )}
            </AnimatePresence> */}
        </>


    )
}
export default Home