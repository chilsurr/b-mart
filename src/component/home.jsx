import { Input, Carousel, Card, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

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

function Home() {
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

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 52); // threshold bebas (misal 80px)
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div className="container">
                <div className={`navbar ${isSticky ? "sticky" : ""}`}>
                    {!isSticky ? (
                        <div className="brand">B-mart</div>
                    ) : (
                        <Input
                            type="text"
                            placeholder="Search item"
                            className="search-navbar"
                        />
                    )}

                    <div className="nav-icon">
                        <img className="icon" src={Message} alt="" onClick={chat} />
                        {/* <img className="icon" src={Order} alt="" onClick={order} /> */}
                        <img className="icon" src={Cart} alt="" onClick={cart} />
                        <img className="icon" src={Profile} alt="" onClick={profile} />
                    </div>
                </div>
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
                <div className="category">
                    <h3>Kategory</h3>
                    <div className="card-category">
                        <Card
                            hoverable
                            style={{ width: 85,height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                            style={{ width: 85, height:135, marginBottom: 15 }}
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
                                onClick={detail}
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

                                    <button className="btn-add-cart">Add Cart</button>
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

                                    <button className="btn-add-cart">Add Cart</button>
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

                                    <button className="btn-add-cart">Add Cart</button>
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

                                    <button className="btn-add-cart">Add Cart</button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home