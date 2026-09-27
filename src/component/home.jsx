import { Input, Carousel, Card, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { animateToCart } from "../utils/addcartanimation";
import dataItems from "../utils/dataproduct";
import MyCard from "../utils/mycard";
import "../style/home.css"

import { getProduct, getCart, postCart } from "../utils/api";


import {
    Modal,
    List,
    Avatar,
    Badge,
    Dropdown,
    Empty
} from "antd";


import Send from "../assets/send.png"
// import { useState, useRef, useEffect } from "react"
// import "../style/chat.css"




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


    const imageRefs = useRef({});
    const cartRef = useRef(null);
    const stickyCartRef = useRef(null);

    const [items, setItems] = useState([])
    const [dataCart, setDataCart] = useState([]);

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
    const [isHideInput, setIsHideInput] = useState(false)

    // useEffect(() => {
    //     getCart().then((result) => {
    //         console.log(result.data)
    //         setDataCart(result.data)
    //     })
    // }, [])

    const loadCart = async () => {
        try {
            const result = await getCart();
            const cartItems = result?.data || [];
            setDataCart(cartItems);
            const total = cartItems.reduce(
                (sum, item) => sum + (Number(item.quantity) || 1),
                0
            );
            setCartCount(total);
            return cartItems;
        } catch (error) {
            console.error("Gagal mengambil cart:", error);
        }
    };

    const handleAddToCart = (item, imageElement) => {
        const cartEl =
            (isSticky ? stickyCartRef.current : cartRef.current) ||
            cartRef.current ||
            stickyCartRef.current ||
            document.querySelector(".nav-icon .ant-badge .icon");

        const imgEl =
            imageElement || (imageRefs.current && imageRefs.current[item.id]);

        // 1. Jalankan request ke API secara paralel
        const postPromise = postCart({
            product_id: item.id,
            quantity: 1,
        });

        if (imgEl && cartEl && animateToCart) {
            // 2. Jalankan animasi menuju keranjang
            animateToCart({
                imageElement: imgEl,
                cartElement: cartEl,
                onComplete: async () => {
                    // 3. Ketika animasi selesai, badge bertambah
                    setCartCount((prev) => prev + 1);

                    // 4. Selalu update data terbaru dari API
                    try {
                        await postPromise;
                        await loadCart();
                    } catch (error) {
                        console.error("Gagal memperbarui cart:", error);
                        await loadCart();
                    }
                },
            });
        } else {
            // Fallback jika elemen animasi tidak ditemukan
            postPromise
                .then(() => loadCart())
                .catch((error) => console.error("Gagal memperbarui cart:", error));
        }
    };

    useEffect(() => {
        getProduct().then((result) => {
            setItems(result)
        })

        loadCart()

        const handleScroll = () => {
            setIsSticky(window.scrollY > 40);
            setIsHideInput(window.scrollY > 1)
            const newOpacity = Math.min(scrollY / 40, 1);
            // console.log(newOpacity)
            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    // useEffect(() => {
    //     console.log(JSON.stringify(items, null, 2))
    // })

    const [searchValue, setSearchValue] = useState("")
    const handleSearchFocus = (param) => {
        console.log(param)
        navigate("/search/", { state: { param } })
    }

    const resultCategory = (category) => {
        console.log(category)
        navigate("/result-search", { state: { category } })
    }

    const handleCategory = (param) => {
        console.log(param)
        navigate("/search/", { state: { param } })
    }

    const categories = Object.values(
        items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = item
            }
            return acc
        }, {})
    )


    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true)
        // if (open && chatBodyRef.current) {
        //     chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        // }
        // const chat = chatBodyRef.current;

        // if (chat) {
        //     chat.scrollTop = chat.scrollHeight;
        // }
    }


    const messages = [
        {
            id: 1,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 2,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 3,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 4,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 5,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 6,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 7,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 8,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 9,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 10,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 11,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 12,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 13,
            side: "right",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
        {
            id: 14,
            side: "left",
            text: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.",
        },
    ];

    const inputRef = useRef(null);
    const [text, setText] = useState("")

    const [dataRender, setDataRender] = useState(messages)

    function handleSend() {
        const message = text.trim();

        if (!message) {
            inputRef.current?.focus();
            return;
        }

        const dumy = {
            id: dataRender.length + 1,
            side: "right",
            text: message
        }

        setDataRender([...dataRender, dumy])
        setText("")
        inputRef.current?.focus();
    }



    const chatBodyRef = useRef(null)
    // useEffect(() => {
    //     if (open && chatBodyRef.current) {
    //         chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    //     }
    // }, [open, messages]);
    // useEffect(() => {
    //     const chat = chatBodyRef.current;

    //     if (chat) {
    //         chat.scrollTop = chat.scrollHeight;
    //     }
    // }, [dataRender])

    useEffect(() => {
        const chat = chatBodyRef.current;

        if (chat) {
            chat.scrollTo({
                top: chat.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [dataRender]);




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
                                        <img className="icon message-mobile" src={Message} alt="" onClick={chat} />
                                        <img className="icon message-desktop" src={Message} alt="" onClick={showModal} />
                                        <div>
                                            <Badge
                                                count={cartCount}
                                                overflowCount={99}
                                                className="cart-badge"
                                                offset={[-2, 2]}
                                            >
                                                <img className="icon" src={Cart} ref={cartRef} alt="" onClick={cart} />
                                            </Badge>
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
                                // onFocus={handleSearchFocus}
                                />

                                <div className="nav-icon">
                                    <img className="icon message-mobile" src={Message} alt="" onClick={chat} />
                                    <img className="icon message-desktop" src={Message} alt="" onClick={showModal} />
                                    <div>
                                        <Badge
                                            count={cartCount}
                                            overflowCount={99}
                                            className="cart-badge"
                                            offset={[-2, 2]}
                                        >
                                            <img className="icon" src={Cart} ref={stickyCartRef} alt="" onClick={cart} />
                                        </Badge>
                                    </div>
                                    <img className="icon" src={Profile} alt="" onClick={profile} />
                                </div>

                            </>
                        )}
                    </div>
                    <div className="header-top">
                        <div className="brand">B-mart</div>

                        <div className="search-bar">
                            <Input
                                type="text"
                                placeholder="Search item"
                                className={`search-input ${isHideInput ? 'hide-input' : ""}`}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        console.log("diteken")
                                        handleSearchFocus(searchValue)
                                    }
                                }}
                            />
                            {/* <img className="icon" src={Search} alt="" /> */}
                        </div>

                        {/* <div className="nav-icon">
                            <img className="icon" src={Message} alt="" onClick={chat} />

                            <div ref={cartRef}>
                                <img className="icon" src={Cart} alt="" onClick={cart} />
                            </div>

                            <img className="icon" src={Profile} alt="" onClick={profile} />
                        </div> */}
                    </div>
                    {/* <div className="brand">B-mart</div>
                    <div className="search-bar">
                        <Input type="text" placeholder="Search item" className="search-input" onFocus={handleSearchFocus} />
                        <img className="icon" src={Search} alt="" />
                    </div> */}

                    <div className="carousel" >
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
                <section className="section-body">
                    <div className="category">
                        <h3>Kategory</h3>
                        <div className="card-category">
                            {categories.map((item) => (
                                <Card
                                    key={item.id}
                                    onClick={() => handleCategory(item.category)}
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
                                    <span>{item.category}</span>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div className="makanan grouping">
                        <h3>Makanan</h3>
                        <div className="card">
                            {items
                                .filter((item) => item.category === "Makanan")
                                .map((item) => (
                                    <MyCard
                                        key={item.id}
                                        item={item}
                                        cartRef={cartRef}
                                        imageRefs={imageRefs}
                                        animateToCart={animateToCart}
                                        detail={detail}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}

                        </div>
                    </div>

                    <div className="minuman grouping">
                        <h3>Minuman</h3>
                        <div className="card">
                            {items
                                .filter((item) => item.category === "Minuman")
                                .map((item) => (
                                    <MyCard
                                        key={item.id}
                                        item={item}
                                        cartRef={cartRef}
                                        imageRefs={imageRefs}
                                        animateToCart={animateToCart}
                                        detail={detail}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="kebutuhan-rumah grouping">
                        <h3>Kebutuhan Rumah</h3>
                        <div className="card">
                            {items
                                .filter((item) => item.category === "Kebutuhan rumah")
                                .map((item) => (
                                    <MyCard
                                        key={item.id}
                                        item={item}
                                        cartRef={cartRef}
                                        imageRefs={imageRefs}
                                        animateToCart={animateToCart}
                                        detail={detail}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                        </div>
                    </div>
                    <div className="kecantikan grouping">
                        <h3>Kecantikan</h3>
                        <div className="card">
                            {items
                                .filter((item) => item.category === "Kecantikan")
                                .map((item) => (
                                    <MyCard
                                        key={item.id}
                                        item={item}
                                        cartRef={cartRef}
                                        imageRefs={imageRefs}
                                        animateToCart={animateToCart}
                                        detail={detail}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                        </div>
                    </div>
                </section >
            </div >


            <Modal
                open={open}
                afterOpenChange={(visible) => {
                    if (visible && chatBodyRef.current) {
                        chatBodyRef.current.scrollTop =
                            chatBodyRef.current.scrollHeight;
                    }
                }}
                // setOpen={setOpen}
                footer={null}
                closable={false}
                width={540}
                styles={{
                    body: {
                        overflow: "hidden",
                        padding: 0,
                        height: 450,
                    },
                }}
            >
                <div className="chat-wrapper">

                    {/* Header */}
                    <div className="chat-header-home">
                        <div className="chat-title">
                            Chat <span>(2)</span>
                        </div>

                        <div className="chat-actions">
                            <Button type="text" onClick={() => setOpen(false)}>X</Button>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="chat-body-home">

                        <main className="chat-body" ref={chatBodyRef}>
                            {(dataRender.length > 0 ? dataRender : messages).map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`chat-bubble ${msg.side === "left" ? "left" : "right"}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                        </main>


                    </div>
                    <footer className="chat-footer">
                        <button className="chat-add">＋</button>

                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Tulis Pesan..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSend();
                                }
                            }}
                            className="chat-input"
                        />

                        <button className="chat-send" onClick={handleSend}>
                            <img src={Send} alt="" />
                        </button>
                    </footer>

                </div>
            </Modal>


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