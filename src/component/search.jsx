import { Input } from "antd";

import Search from "../assets/search.png"

import imgCat1 from "../assets/img/category1.png"
import imgCat2 from "../assets/img/category2.png"
import imgCat3 from "../assets/img/category3.png"
import imgCat4 from "../assets/img/category4.png"





function SearchPage() {

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
    return (
        <div className="search-page">
            <div className="search-component">
                <Input type="text" placeholder="Search item" className="search-input"/>
                <img className="icon" src={Search} alt="" />
            </div>
            {/* Riwayat Pencarian */}
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

            {/* Kategori Pilihan */}
            <section className="category-section">
                <h2>Kategori Pilihan</h2>

                <div className="category-list">
                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="category-item"
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
    );
}

export default SearchPage