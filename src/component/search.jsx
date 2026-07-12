import { Input, Empty } from "antd";
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import "../style/search.css"

import Arrow from "../assets/arrow.png"
import Cart from "../assets/cart.png"

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"
import { useState, useEffect, useRef } from "react";
import dataItems from "../utils/dataproduct";
import MyCard from "../utils/mycard";
import { animateToCart } from "../utils/addcartanimation";





function Search() {

    const searchHistory = [
        "magnum",
        "sania",
        "bimoli minyak",
        "beras",
        "unglu",
        "sirup",
        "bimoli minyak goreng",
        "pepsodent",
        "my roti",
        "makaroni",
    ];

    const categories = [
        {
            name: "Makanan",
            image: imgCat1,
        },
        {
            name: "Minuman",
            image: imgCat2,
        },
        {
            name: "Perawatan Rumah",
            image: imgCat3,
        },
        {
            name: "Kecantikan",
            image: imgCat4,
        },
    ];

    const imageRefs = useRef({});
    const cartRef = useRef(null);

    const [flyingItem, setFlyingItem] = useState(null);
    const [cartCount, setCartCount] = useState(0);

    const location = useLocation();
    const searchCategory = location.state?.param || "";

    useEffect(() => (
        setCategory(searchCategory),
        setDataProducts(dataItems)
    ),[])

    const navigate = useNavigate()
    function back() {
        navigate("/")
    }

    function detail(id) {
        navigate(`/detail/${id}`)
    }

    function cart() {
        navigate("/cart/")
    }

    const [dataProducts, setDataProducts] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [category, setCategory] = useState("")
    const [search, setSearch] = useState("")

    const filteredData =
        search.length >= 3 ? dataProducts.filter((data) => data.nama.toLowerCase().includes(search.toLowerCase()))
            : category ? dataProducts.filter((data) => data.category.toLowerCase() === category.toLowerCase())
                : [];

    const searchComponent = () => search.length >= 3 || category.length > 0 ? "body" : search.length < 1 ? "main" : "choice"
    const handleSearch = (e) => {
        setSearch(e.target.value)
        setCategory("")
    }
    const searchChoice = (param) => {
        setCategory(param)
        setSearch("")
    }




    // console.log(filteredData)

    return (
        <div className="search-page">
            <div className="search-component">
                <img className="icon" src={Arrow} alt="" onClick={back} />
                <Input type="text" placeholder="Search item" className="search-input" value={search} onChange={(e) => handleSearch(e)} />
                {/* <img className="icon" src={Search} alt="" /> */}
                <img className="icon" src={Cart} ref={cartRef} alt="" onClick={cart} />
            </div>

            {searchComponent() === "main" &&
                <div className="search-main">
                    <section className="history-section">
                        <div className="section-header">
                            <h2>Riwayat Pencarian</h2>
                            <button className="clear-btn">
                                Hapus Riwayat
                            </button>
                        </div>

                        <div className="history-tags">
                            {searchHistory.map((item) => (
                                <button
                                    key={item}
                                    className="history-tag"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="category-section">
                        <h2>Kategori Pilihan</h2>

                        <div className="category-list">
                            {categories.map((category) => (
                                <div
                                    key={category.name}
                                    className="category-item"
                                    onClick={() => searchChoice(category.name)}
                                >
                                    <div className="category-image">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                        />
                                    </div>

                                    <span>{category.name}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            }

            {searchComponent() === "choice" &&
                <div className="search-choice">
                    <div className="search-not-valid">
                        <h3>Ketik Minimal 3 Karakter</h3>
                        <p>Untuk bisa mendapatkan hasil pencarian</p>
                    </div>
                </div>
            }

            {searchComponent() === "body" && (
                <div className="result-body">
                    {filteredData.length === 0 ? (
                        <div className="empty-wrapper">
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description="Item Not Found"
                            />
                        </div>
                    ) : (
                        <div className="result-card">
                            {filteredData.map((item) => (
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
                    )}
                </div>
            )}

            {/* {searchComponent() === "body" &&
                <div className="result-body">
                    <div className="result-card">
                        {filteredData.length < 1 ? (<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />) : (filteredData.map((item) => (
                            <MyCard
                                key={item.id}
                                item={item}
                                cartRef={cartRef}
                                imageRefs={imageRefs}
                                animateToCart={animateToCart}
                                detail={detail}
                            />
                        )))}

                    </div>

                </div>
            } */}

        </div>
    );
}

export default Search