import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Input, Carousel, Card, Button, Modal, Badge } from "antd";

import MyCard from "../utils/mycard";
import { animateToCart } from "../utils/addcartanimation";
import { getProduct, getCart, postCart } from "../utils/api";

import Send from "../assets/send.png";
import Message from "../assets/messenger.png";
import Cart from "../assets/cart.png";
import Profile from "../assets/user.png";

import img1 from "../assets/img/baner1.png";
import img2 from "../assets/img/baner2.png";
import img3 from "../assets/img/baner3.png";

import imgCat1 from "../assets/img/category1.png";
import imgCat2 from "../assets/img/category2.png";
import imgCat3 from "../assets/img/category3.png";
import imgCat4 from "../assets/img/category4.png";

import "../style/home.css";

const CATEGORY_IMAGES = {
    "Makanan": imgCat1,
    "Minuman": imgCat2,
    "Kebutuhan rumah": imgCat3,
    "Kecantikan": imgCat4,
};

const BANNERS = [img1, img2, img3, img1];

const INITIAL_MESSAGES = [
    {
        id: 1,
        side: "left",
        text: "Halo, ada yang bisa kami bantu seputar produk atau pesanan Anda?",
    },
    {
        id: 2,
        side: "right",
        text: "Halo! Saya ingin menanyakan ketersediaan produk sembako dan promo hari ini.",
    },
    {
        id: 3,
        side: "left",
        text: "Semua produk yang tampil di etalase ready stock dan siap diantar atau diambil di gerai.",
    },
    {
        id: 4,
        side: "right",
        text: "Baik, terima kasih informasinya!",
    },
];

function Home() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const imageRefs = useRef({});
    const cartRef = useRef(null);
    const inputRef = useRef(null);
    const chatBodyRef = useRef(null);

    const [items, setItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const [isSticky, setIsSticky] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const [isHideInput, setIsHideInput] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Chat modal state
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState(INITIAL_MESSAGES);

    const getCategoryLabel = (cat) => {
        switch (cat) {
            case "Makanan": return t("home.food");
            case "Minuman": return t("home.beverage");
            case "Kebutuhan rumah": return t("home.household");
            case "Kecantikan": return t("home.beauty");
            default: return cat;
        }
    };

    const cart = () => navigate("cart/");
    const profile = () => navigate("profile/");
    const chat = () => navigate("chat/");
    const detail = (id) => navigate(`detail/${id}`);

    const loadCart = async () => {
        try {
            const result = await getCart();
            const cartItems = result?.data || [];
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
            cartRef.current ||
            document.querySelector(".nav-icon .ant-badge .icon");

        const imgEl =
            imageElement || (imageRefs.current && imageRefs.current[item.id]);

        const postPromise = postCart({
            product_id: item.id,
            quantity: 1,
        });

        if (imgEl && cartEl && animateToCart) {
            animateToCart({
                imageElement: imgEl,
                cartElement: cartEl,
                onComplete: async () => {
                    setCartCount((prev) => prev + 1);
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
            postPromise
                .then(() => loadCart())
                .catch((error) => console.error("Gagal memperbarui cart:", error));
        }
    };

    useEffect(() => {
        getProduct()
            .then((result) => setItems(result || []))
            .catch((error) => console.error("Gagal mengambil produk:", error));

        loadCart();

        const handleScroll = () => {
            setIsSticky(window.scrollY > 40);
            setIsHideInput(window.scrollY > 1);
            const newOpacity = Math.min(window.scrollY / 40, 1);
            setOpacity(newOpacity);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearchFocus = (param) => {
        navigate("/search/", { state: { param } });
    };

    const handleCategory = (parCategory) => {
        navigate("/search/", { state: { parCategory } });
    };

    const categories = Object.values(
        items.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = item;
            }
            return acc;
        }, {})
    );

    const groupedItems = items.reduce((groups, item) => {
        if (!groups[item.category]) {
            groups[item.category] = [];
        }
        groups[item.category].push(item);
        return groups;
    }, {});

    const showModal = () => setOpen(true);

    const handleSend = () => {
        const messageText = text.trim();
        if (!messageText) {
            inputRef.current?.focus();
            return;
        }

        const newMsg = {
            id: messages.length + 1,
            side: "right",
            text: messageText,
        };

        setMessages((prev) => [...prev, newMsg]);
        setText("");
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTo({
                top: chatBodyRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <>
            <div className="container">
                <div>
                    {/* Fixed Navbar (Normal & Sticky) */}
                    <div
                        className={`navbar ${isSticky ? "sticky" : ""}`}
                        style={{
                            backgroundColor: `rgba(46, 125, 50, ${opacity})`,
                            height: 50,
                        }}
                    >
                        {isSticky && (
                            <Input
                                type="text"
                                placeholder={t("home.searchPlaceholder")}
                                className="search-navbar show"
                                onFocus={() => {
                                    if (window.innerWidth < 768) {
                                        navigate("/search/");
                                    }
                                }}
                            />
                        )}

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

                    {/* Header Top Brand & Search */}
                    <div className="header-top">
                        <div className="brand">B-mart</div>

                        <div className="search-bar">
                            <Input
                                type="text"
                                placeholder={t("home.searchPlaceholder")}
                                className={`search-input ${isHideInput ? "hide-input" : ""}`}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                onFocus={() => {
                                    if (window.innerWidth < 768) {
                                        navigate("/search/");
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && searchValue.trim()) {
                                        handleSearchFocus(searchValue.trim());
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Carousel Banner */}
                    <div className="carousel">
                        <Carousel autoplay>
                            {BANNERS.map((img, idx) => (
                                <div key={idx}>
                                    <div
                                        className="img-carousel"
                                        style={{ backgroundImage: `url(${img})` }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>

                {/* Categories & Product Groups */}
                <section className="section-body">
                    <div className="category">
                        <h3>{t("home.category")}</h3>
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
                                            alt={item.category}
                                            src={CATEGORY_IMAGES[item.category] || imgCat1}
                                        />
                                    }
                                >
                                    <span>{getCategoryLabel(item.category)}</span>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {Object.entries(groupedItems).map(([category, categoryItems]) => (
                        <div className="grouping" key={category}>
                            <h3>{category}</h3>

                            <div className="card">
                                {categoryItems.map((item) => (
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
                    ))}
                </section>
            </div>

            {/* Desktop Chat Modal */}
            <Modal
                open={open}
                afterOpenChange={(visible) => {
                    if (visible && chatBodyRef.current) {
                        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
                    }
                }}
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
                    <div className="chat-header-home">
                        <div className="chat-title">
                            {t("home.chatTitle")} <span>(2)</span>
                        </div>
                        <div className="chat-actions">
                            <Button type="text" onClick={() => setOpen(false)}>X</Button>
                        </div>
                    </div>

                    <div className="chat-body-home">
                        <main className="chat-body" ref={chatBodyRef}>
                            {messages.map((msg) => (
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
                            placeholder={t("home.chatPlaceholder")}
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
        </>
    );
}

export default Home;
