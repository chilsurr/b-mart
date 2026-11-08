import { getCurrentUser, getOrders } from "../utils/api";
import { useState, useEffect } from "react";
import { Badge, Select, ConfigProvider } from 'antd';
import { useTranslation } from "react-i18next";

import { useNavigate, useLocation } from "react-router-dom"
import Arrow from "../assets/arrow.png"
import ProfDetail from "../assets/prof-detail.png"

import waiting from "../assets/waiting-box.png"
import pickUp from "../assets/package.png"
import done from "../assets/received.png"

import OrderList from "./order";
import "../style/profile.css"

function Profile() {
    const { t, i18n } = useTranslation();
    const currentLang = i18n.language?.toLowerCase() === 'en' ? 'EN' : 'ID';

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang.toLowerCase());
    };

    // const [activeMenu, setActiveMenu] = useState("Profile");
    const [desktopTab, setDesktopTab] = useState("Profile");
    const location = useLocation();

    const [activeMenu, setActiveMenu] = useState(
        location.state?.activeTab || "Profile"
    );

    const [currentUser, setCurrentUser] = useState(() => ({
        username: localStorage.getItem("username") || "Skupnuu",
        email: "suryaadevs17@gmail.com"
    }));

    const [orderCounts, setOrderCounts] = useState({
        "On Process": 0,
        "Need Pick-up": 0,
        "Done": 0
    });

    const loadUserData = async () => {
        try {
            const user = await getCurrentUser();
            if (user) {
                setCurrentUser((prev) => ({
                    ...prev,
                    username: user.username || prev.username,
                    email: user.email || prev.email
                }));
            }
            const userId = user?.id || localStorage.getItem("user_id");
            if (userId) {
                const res = await getOrders({ order_type: "online", customer: userId, customer_id: userId });
                const orders = res?.data || [];
                const counts = { "On Process": 0, "Need Pick-up": 0, "Done": 0 };
                orders.forEach((o) => {
                    if (counts[o.status] !== undefined) {
                        counts[o.status] += 1;
                    }
                });
                setOrderCounts(counts);
            }
        } catch (e) {
            console.warn("Gagal memuat profil atau pesanan:", e);
        }
    };

    useEffect(() => {
        loadUserData();
        window.addEventListener("online_orders_updated", loadUserData);
        return () => window.removeEventListener("online_orders_updated", loadUserData);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("role");
        localStorage.removeItem("application");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("online_orders");
        navigate("/login");
    };



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
        { key: "Profile", label: t("profile.menuProfile") },
        { key: "Alamat", label: t("profile.address") },
        { key: "Ubah Kata Sandi", label: t("profile.changePassword") },
        { key: "Language", label: t("profile.language") },
        { key: "Dark Mode", label: t("profile.darkMode") },
    ];

    const tabsOrder = [
        { value: "On Process", label: t("order.onProcess") },
        { value: "Need Pick-up", label: t("order.needPickup") },
        { value: "Done", label: t("order.done") },
    ];

    return (
        <>
            <div className="profile">
                <div className="profile-header">
                    <img className="icon" src={Arrow} alt="" onClick={back} />
                    <h3>{t("profile.myAccount")}</h3>
                </div>
                <div className="tracking-order">
                    <div className="status-order" onClick={() => order("On Process")}>
                        <Badge count={orderCounts["On Process"] ?? 0}>
                            <img src={waiting} alt="" />
                        </Badge>
                        <div>{t("order.onProcess")}</div>
                    </div>
                    <div className="status-order" onClick={() => order("Need Pick-up")}>
                        <Badge count={orderCounts["Need Pick-up"] ?? 0}>
                            <img src={pickUp} alt="" />
                        </Badge>
                        <div>{t("order.needPickup")}</div>
                    </div>
                    <div className="status-order" onClick={() => order("Done")}>
                        <Badge count={orderCounts["Done"] ?? 0}>
                            <img src={done} alt="" />
                        </Badge>
                        <div>{t("order.done")}</div>
                    </div>
                </div>

                <section className='profile-section-body'>
                    <aside className="sidebar">
                        {/* User Card */}
                        <div className="profile-sidebar-card">
                            <div className="profile-left">
                                <div className="avatar"></div>
                                <div>
                                    <div>{currentUser.username}</div>
                                    <div>08123654789543</div>
                                </div>
                            </div>
                        </div>

                        {/* Menu */}
                        <div
                            className={`menu-sider ${activeMenu === "Profile" ? "menu-sider-active" : ""}`}
                            onClick={() => setActiveMenu("Profile")}
                        >
                            <span>{t("profile.menuProfile")}</span>
                        </div>

                        <div
                            className={`menu-sider ${activeMenu === "Order" ? "menu-sider-active" : ""}`}
                            onClick={() => setActiveMenu("Order")}
                        >
                            <span>{t("profile.menuOrder")}</span>
                        </div>
                    </aside>
                    <main className="content">
                        {activeMenu === "Profile" ? (
                            <>
                                {/* Tabs */}
                                <nav className="profile-tabs">
                                    {tabsProfile.map((tab) => (
                                        <button
                                            key={tab.key}
                                            className={desktopTab === tab.key ? 'tab-active' : ''}
                                            onClick={() => setDesktopTab(tab.key)}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </nav>

                                {desktopTab === "Language" ? (
                                    <section className="profile-content-card profile-language-card">
                                        <div className="language-selector-section">
                                            <h4>{t("profile.selectLanguage")}</h4>
                                            <p>{t("profile.currentLanguageDesc")}</p>
                                            <div className="language-options">
                                                <div
                                                    className={`language-option ${currentLang === 'ID' ? 'active' : ''}`}
                                                    onClick={() => handleLanguageChange('ID')}
                                                >
                                                    <span className="lang-code">ID</span>
                                                    <div className="lang-info">
                                                        <span className="lang-name">{t("profile.indonesian")}</span>
                                                        <span className="lang-sub">Bahasa Indonesia</span>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="desktop-lang"
                                                        checked={currentLang === 'ID'}
                                                        onChange={() => handleLanguageChange('ID')}
                                                    />
                                                </div>
                                                <div
                                                    className={`language-option ${currentLang === 'EN' ? 'active' : ''}`}
                                                    onClick={() => handleLanguageChange('EN')}
                                                >
                                                    <span className="lang-code">EN</span>
                                                    <div className="lang-info">
                                                        <span className="lang-name">{t("profile.english")}</span>
                                                        <span className="lang-sub">English</span>
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name="desktop-lang"
                                                        checked={currentLang === 'EN'}
                                                        onChange={() => handleLanguageChange('EN')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                ) : (
                                    /* Card */
                                    <section className="profile-content-card">
                                        <div className="photo-section">
                                            <div className="border-profile-photo">
                                                <img
                                                    src="/avatar-large.png"
                                                    alt="Avatar"
                                                    className="profile-photo"
                                                />
                                            </div>
                                            <button>{t("profile.choosePhoto")}</button>
                                        </div>

                                        <div className="info-section">
                                            <section>
                                                <div className="info-row">
                                                    <label>{t("profile.name")}</label>
                                                    <span>{currentUser.username}</span>
                                                </div>

                                                <div className="info-row">
                                                    <label>{t("profile.birthDate")}</label>
                                                    <span>07 Mei 2003</span>
                                                </div>

                                                <div className="info-row">
                                                    <label>{t("profile.gender")}</label>
                                                    <span>{t("profile.male")}</span>
                                                </div>
                                                <div className="info-row">
                                                    <label>{t("profile.email")}</label>
                                                    <span> suryaadevs17@gmail.com</span>
                                                </div>

                                                <div className="info-row">
                                                    <label>{t("profile.phone")}</label>
                                                    <span>0812345678910</span>
                                                </div>
                                            </section>
                                        </div>
                                    </section>
                                )}
                            </>
                        ) : (
                            <OrderList isEmbedded={true} />
                        )}
                    </main>

                </section>


                <div className="profile-body">
                    <div className="profile-card">
                        <div className="profile-left">
                            <div className="avatar"></div>
                            <div>
                                <div>{currentUser.username}</div>
                                <div>08123654789543</div>
                            </div>
                        </div>
                        {/* <img className="icon" src={ProfDetail} alt="" /> */}
                    </div>

                    <div className="menu">
                        <div className="menu-item">
                            <span>{t("profile.editProfile")}</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>

                        <div className="menu-item">
                            <span>{t("profile.changePassword")}</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>

                        <div className="menu-item">
                            <span>{t("profile.addressList")}</span>
                            <img className="icon" src={ProfDetail} alt="" />
                        </div>
                        <div className="menu-item">
                            <span>{t("profile.language")}</span>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorPrimary: "#2E7D32",
                                    },
                                }}
                            >
                                <Select
                                    value={currentLang}
                                    onChange={(val) => handleLanguageChange(val)}
                                    style={{ width: 68, padding: 3, boxSizing: 'border-box' }}
                                    options={[
                                        { value: "ID", label: "ID" },
                                        { value: "EN", label: "EN" }
                                    ]}
                                />
                            </ConfigProvider>
                        </div>
                        <div className="menu-item">
                            <span>{t("profile.darkMode")}</span>
                            <Switch />
                        </div>

                        <div className="logout">
                            <button onClick={handleLogout}>{t("profile.logout")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile