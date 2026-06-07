import { Input, Carousel, Card, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";

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

import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);


function Home() {
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
    function detail() {
        navigate("detail/")
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
    // console.log(isSticky)
    // console.log(opacity)

    useEffect(() => {
        console.log("cartRef", cartRef.current);
        console.log(Card?.outerHTML);
    }, []);




    const handleAddCart = (e) => {

        e.preventDefault();
        e.stopPropagation();


        const card = e.currentTarget.closest(".ant-card");
        console.log("card =", card);

        const img = card.querySelector("img");
        console.log("img =", img);

        const imgRect = img.getBoundingClientRect();
        console.log("cartRef =", cartRef.current);


        const cartRect = cartRef.current.getBoundingClientRect();
        console.log(cartRect)

        const startX = imgRect.left + imgRect.width / 2;
        const startY = imgRect.top + imgRect.height / 2;

        // const endX = cartRect.left + cartRect.width / 2;
        // const endY = cartRect.top + cartRect.height / 2;


        const clone = img.cloneNode(true);

        clone.style.position = "fixed";
        clone.style.left = `${startX}px`;
        clone.style.top = `${startY}px`;
        // clone.style.transform = "translate(-50%, -50%)";
        clone.style.left = `${imgRect.left}px`;
        clone.style.top = `${imgRect.top}px`;
        clone.style.width = `${imgRect.width}px`;
        clone.style.height = `${imgRect.height}px`;
        clone.style.zIndex = "9999";
        clone.style.pointerEvents = "none";
        clone.style.borderRadius = "12px";

        document.body.appendChild(clone);

        const endX =
            cartRect.left +
            cartRect.width / 2 -
            imgRect.width / 2;

        const endY =
            cartRect.top +
            cartRect.height / 2 -
            imgRect.height / 2;


        // const endX =
        //     cartRect.left +
        //     cartRect.width / 2;

        // const endY =
        //     cartRect.top +
        //     cartRect.height / 2;

        // const endX =
        //     cartRect.left +
        //     cartRect.width / 2 -
        //     imgRect.width / 4;

        // const endY =
        //     cartRect.top +
        //     cartRect.height / 2 -
        //     imgRect.height / 4;

        const midX =
            imgRect.left +
            (endX - imgRect.left) / 2;

        const midY =
            imgRect.top - 150;

        console.log({
            endX,
            endY
        });

        const marker = document.createElement("div");

        marker.style.position = "fixed";
        marker.style.left = `${endX}px`;
        marker.style.top = `${endY}px`;
        marker.style.width = "8px";
        marker.style.height = "8px";
        marker.style.background = "red";
        marker.style.borderRadius = "50%";
        marker.style.zIndex = "999999";
        marker.style.transform = "translate(-50%, -50%)";

        document.body.appendChild(marker);

        const endMarker = document.createElement("div");

        endMarker.style.position = "fixed";
        endMarker.style.left = `${endX}px`;
        endMarker.style.top = `${endY}px`;
        endMarker.style.width = "12px";
        endMarker.style.height = "12px";
        endMarker.style.background = "blue";
        endMarker.style.borderRadius = "50%";
        endMarker.style.zIndex = "999999";

        document.body.appendChild(endMarker);

        gsap.to(clone, {
            duration: 0.8,
            ease: "power2.out",
            motionPath: {
                path: [
                    { x: 0, y: 0 },
                    {
                        x: midX - imgRect.left,
                        y: midY - imgRect.top,
                    },
                    {
                        x: endX - imgRect.left,
                        y: endY - imgRect.top,
                    },
                ],
                // path: [
                //     { x: 0, y: 0 },
                //     {
                //         x: (endX - startX) / 2,
                //         y: -200,
                //     },
                //     {
                //         x: endX - startX,
                //         y: endY - startY,
                //     },
                // ],
                curviness: 1.5,
            },
            scale: 0.25,
            onComplete: () => {
                document.body.removeChild(clone);

                gsap.fromTo(
                    cartRef.current,
                    {
                        scale: 1,
                    },
                    {
                        scale: 1.3,
                        duration: 0.15,
                        yoyo: true,
                        repeat: 1,
                    }
                );

                // update cart
                // setCartCount(prev => prev + 1);
            },
        });
        console.log("cartRect", {
            left: cartRect.left,
            top: cartRect.top,
            width: cartRect.width,
            height: cartRect.height,
        });

        console.log("imgRect", {
            left: imgRect.left,
            top: imgRect.top,
            width: imgRect.width,
            height: imgRect.height,
        });
    };






    return (
        <>
            <div className="container">
                <div className="">
                    <div className={`navbar ${isSticky ? "sticky" : ""}`}
                        style={{
                            backgroundColor: `rgba(46, 125, 50, ${opacity})`,
                            height: 45,
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
                        <Input type="text" placeholder="Search item" className="search-input" />
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
                        {Array.from({ length: 15 }).map((_, index) => (
                            <Card
                                // onClick={detail}
                                key={index}
                                hoverable
                                style={{ width: 120, flexShrink: 0 }}
                                cover={
                                    <img
                                        style={{ height: 120 }}
                                        draggable={false}
                                        alt="example"
                                        src={imgCat1}
                                    />
                                }
                            >
                                <div className="card-body">
                                    <div className="product-title">
                                        <span>Wall's Populaire Es Krim Cokelat Vanila</span>
                                    </div>
                                    <div className="price">Rp 5.800</div>

                                    <button
                                        className="btn-add-cart" onClick={handleAddCart}
                                    >
                                        Add Cart
                                    </button>
                                </div>
                            </Card>
                        ))}

                    </div>
                </div>

                <div className="minuman grouping">
                    <h3>Minuman</h3>
                    <div className="card">
                        {Array.from({ length: 15 }).map((_, index) => (
                            <Card
                                onClick={detail}
                                key={index}
                                hoverable
                                style={{ width: 120, flexShrink: 0 }}
                                cover={
                                    <img
                                        style={{ height: 120 }}
                                        draggable={false}
                                        alt="example"
                                        src={imgCat2}
                                    />
                                }
                            >
                                <div className="card-body">
                                    <div className="product-title">
                                        <span>Fruit Tea Minuman Teh Freeze 350 ml</span>
                                    </div>
                                    <div className="price">Rp 5.800</div>

                                    <button className="btn-add-cart" onClick={handleAddCart}>Add Cart</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="kebutuhan-rumah grouping">
                    <h3>Kebutuhan Rumah</h3>
                    <div className="card">
                        {Array.from({ length: 15 }).map((_, index) => (
                            <Card
                                onClick={detail}
                                key={index}
                                hoverable
                                style={{ width: 120, flexShrink: 0 }}
                                cover={
                                    <img
                                        style={{ height: 120 }}
                                        draggable={false}
                                        alt="example"
                                        src={imgCat3}
                                    />
                                }
                            >
                                <div className="card-body">
                                    <div className="product-title">
                                        <span>SoKlin Deterjen Cair Eau de Parfum Bleu Petale 700 g</span>
                                    </div>
                                    <div className="price">Rp 5.800</div>

                                    <button className="btn-add-cart" onClick={handleAddCart}>Add Cart</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
                <div className="kecantikan grouping">
                    <h3>Kecantikan</h3>
                    <div className="card">
                        {Array.from({ length: 15 }).map((_, index) => (
                            <Card
                                onClick={detail}
                                key={index}
                                hoverable
                                style={{ width: 120, flexShrink: 0 }}
                                cover={
                                    <img
                                        style={{ height: 120 }}
                                        draggable={false}
                                        alt="example"
                                        src={imgCat4}
                                    />
                                }
                            >
                                <div className="card-body">
                                    <div className="product-title">
                                        <span>SoKlin Deterjen Cair Eau de Parfum Bleu Petale 700 g</span>
                                    </div>
                                    <div className="price">Rp 5.800</div>

                                    <button className="btn-add-cart" onClick={handleAddCart}>Add Cart</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>


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