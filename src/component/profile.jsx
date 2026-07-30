import { Badge, Select, ConfigProvider } from 'antd'; "status-order"

import { useNavigate } from "react-router-dom"
import Arrow from "../assets/arrow.png"
import ProfDetail from "../assets/prof-detail.png"

import waiting from "../assets/waiting-box.png"
import pickUp from "../assets/package.png"
import done from "../assets/received.png"

import "../style/profile.css"

function Profile() {



    const navigate = useNavigate()
    function back() {
        navigate("/")
    }

    function order(status) {
        navigate("/order/", { state: { status } })
    }

    const Switch = ({ checked, onChange }) => (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span />
        </label>
    );

    const tabsProfile = [
        { value: "Profile" },
        { value: "Alamat" },
        { value: "Ubah Kata Sandi" },
        { value: "Language" },
        { value: "Dark Mode" },
    ];

    const tabsOrder = [
        { value: "On Process" },
        { value: "Need Pick-up" },
        { value: "Done" },
    ];
    
    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <img className="icon" src={Arrow} alt="" onClick={back} />
                    <h3>Akun Saya</h3>
                </div>
                <div className="tracking-order">
                    <div className="status-order" onClick={() => order("On Process")}>
                        <Badge count={5}>
                            <img src={waiting} alt="" />
                        </Badge>
                        <div>On Process</div>
                    </div>
                    <div className="status-order" onClick={() => order("Need Pick-up")}>
                        <Badge count={5}>
                            <img src={pickUp} alt="" />
                        </Badge>
                        <div>Need Pick-up</div>
                    </div>
                    <div className="status-order" onClick={() => order("Done")}>
                        <Badge count={5}>
                            <img src={done} alt="" />
                        </Badge>
                        <div>Done</div>
                    </div>
                </div>

                <section className='profile-section-body'>
                    <aside className="sidebar">
                        {/* User Card */}
                        <div className="profile-sidebar-card">
                            <div className="profile-left">
                                <div className="avatar"></div>
                                <div>
                                    <div>Skupnuu</div>
                                    <div>08123654789543</div>
                                </div>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className="menu-sider menu-sider-active">
                            <span>Profile</span>
                        </div>

                        <div className="menu-sider">
                            <span>Order</span>
                        </div>
                    </aside>
                    <main className="content">
                        {/* Tabs */}
                        <nav className="profile-tabs">
                            <button className='tab-active'>Profile</button>
                            <button>Alamat</button>
                            <button>Ubah Kata Sandi</button>
                            <button>Language</button>
                            <button>Darkmode</button>
                        </nav>

                        {/* Card */}
                        <section className="profile-content-card">
                            <div className="photo-section">
                                <div className="border-profile-photo">
                                    <img
                                        src="/avatar-large.png"
                                        alt="Avatar"
                                        className="profile-photo"
                                    />
                                </div>
                                <button>Pilih Foto</button>
                            </div>

                            <div className="info-section">
                                <section>
                                    <div className="info-row">
                                        <label>Nama</label>
                                        <span>Suryadi Gh</span>
                                    </div>

                                    <div className="info-row">
                                        <label>Tanggal Lahir</label>
                                        <span>07 Mei 2003</span>
                                    </div>

                                    <div className="info-row">
                                        <label>Jenis Kelamin</label>
                                        <span>Laki-Laki</span>
                                    </div>
                                    <div className="info-row">
                                        <label>Email</label>
                                        <span> suryaadevs17@gmail.com</span>
                                    </div>

                                    <div className="info-row">
                                        <label>Nomor HP</label>
                                        <span>0812345678910</span>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </main>

                </section>


                <div className="profile-body">
                    <div className="profile-card">
                        <div className="profile-left">
                            <div className="avatar"></div>
                            <div>
                                <div>Skupnuu</div>
                                <div>08123654789543</div>
                            </div>
                        </div>
                        {/* <img className="icon" src={ProfDetail} alt="" /> */}
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
                            <span>Daftar Alamat</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>
                        <div className="menu-item">
                            <span>Language</span>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#2E7D32",
                                    },
                                }}
                            >
                                <Select
                                    defaultValue="ID"
                                    style={{ width: 45, padding: 3, boxSizing: 'border-box' }}
                                    options={[
                                        { value: "ID", label: "ID" },
                                        { value: "EN", label: "EN" }
                                    ]}
                                />
                            </ConfigProvider>
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