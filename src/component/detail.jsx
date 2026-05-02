import { useNavigate } from "react-router-dom"


import Message from "../assets/messenger.png"
import Cart from "../assets/cart.png"
import Arrow from "../assets/arrow.png"
import imgCat1 from "../assets/img/category1.png"

export default function ProductDetail() {
    const navigate = useNavigate()
    function back() {
        navigate("/")
    }
    function cart() {
        navigate("/cart/")
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <img className="icon" src={Arrow} onClick={back} />
                <div>
                    <img className="icon" src={Message} alt="" />
                    <img className="icon" src={Cart} alt="" onClick={cart}/>
                </div>
            </div>
            <div className="cover-img">
                <img className="product-image" src={imgCat1} alt="" />
            </div>

            <div className="product-info">
                <div>Kapal api 800G</div>
                <div>Rp. 12.000</div>
            </div>

            <div className="description">
                <div><b>Deskripsi</b></div>
                <div>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda dicta nulla
                    perferendis reiciendis, dolorum quis quasi quos aperiam modi impedit ipsam, porro,
                    ullam nostrum nobis! Eos corporis ullam, quibusdam perferendis eius expedita omnis inventore
                    reiciendis quidem consectetur debitis labore, doloremque recusandae consequuntur, praesentium
                    fugiat vel suscipit cupiditate eveniet nam! Dolore.

                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum soluta dolores tenetur? Sunt veniam quidem 
                    nam qui nobis nihil vero porro. Esse ut asperiores, libero dolorum voluptates expedita. Delectus commodi 
                    rerum nam corporis sint iure dignissimos error incidunt vel laboriosam nobis in aperiam, 
                    nostrum quod fugit voluptate porro accusantium. Nostrum?
                </div>
            </div>

            <div className="footer-detail">
                <button className="add-cart-detail-btn">Add Cart</button>
            </div>
        </div>
    );
}