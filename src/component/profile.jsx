import { Badge } from 'antd';

import { useNavigate } from "react-router-dom"
import Arrow from "../assets/arrow.png"
import ProfDetail from "../assets/prof-detail.png"

import waiting from "../assets/waiting-box.png"
import pickUp from "../assets/package.png"
import done from "../assets/received.png"

function Profile() {



    const navigate = useNavigate()
    function back() {
        navigate("/")
    }

    function order() {
        navigate("/order/")
    }

    const Switch = ({ checked, onChange }) => (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span />
        </label>
    );
    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <img className="icon" src={Arrow} alt="" onClick={back} />
                    <h3>Akun Saya</h3>
                </div>
                <div className="tracking-order">
                    <div className="status-order" onClick={order}>
                        <Badge count={5}>
                            <img src={waiting} alt="" />
                        </Badge>
                        <div>On Process</div>
                    </div>
                    <div className="status-order">
                        <Badge count={5}>
                            <img src={pickUp} alt="" />
                        </Badge>
                        <div>Need Pick-up</div>
                    </div>
                    <div className="status-order">
                        <Badge count={5}>
                            <img src={done} alt="" />
                        </Badge>
                        <div>Done</div>
                    </div>
                </div>
                <div className="profile-body">
                    <div className="profile-card">
                        <div className="profile-left">
                            <div className="avatar"></div>
                            <div>
                                <div>Skupnuu</div>
                                <div>08123654789543</div>
                            </div>
                        </div>
                        <img className="icon" src={ProfDetail} alt="" />
                    </div>

                    <div className="menu">
                        <div className="menu-item">
                            <span>Ubah Profil</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>

                        <div className="menu-item">
                            <span>Ubah Kata Sandi</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>

                        <div className="menu-item">
                            <span>Login dengan Biometri</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>

                        <div className="menu-item">
                            <span>Daftar Alamat</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>

                        <div className="menu-item">
                            <span>Dark mode</span>
                            <Switch />
                        </div>

                        <div className="logout">
                            <button>Logout</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile