import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom"
import { Collapse } from "antd";
import dayjs from "dayjs";
import "../style/order.css"

import invoice from "../assets/invoice.png"
import Arrow from "../assets/arrow.png"
import down from "../assets/down.png"
import up from "../assets/up.png"

import { getOrders, getCurrentUser } from "../utils/api";

function OrderList({ status: propStatus, isEmbedded = false }) {
    const { t } = useTranslation();

    const getStatusLabel = (s) => {
        switch (s) {
            case "On Process": return t("order.onProcess");
            case "Need Pick-up": return t("order.needPickup");
            case "Done": return t("order.done");
            default: return s;
        }
    };

    const [openId, setOpenId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allOrders, setAllOrders] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);

    const location = useLocation();
    const status = propStatus ?? location.state?.status ?? "On Process";
    const [tabActive, setTabActive] = useState(status);

    useEffect(() => {
        setTabActive(status);
        filter_order(status, allOrders);
    }, [status]);

    const navigate = useNavigate()
    function back() {
        navigate("/profile/")
    }

    const toggleDropdown = (id) => {
        setOpenId(openId === id ? null : id);
    };

    // Ambil pesanan online dari API yang sesuai dengan ID user yang sedang login
    const fetchUserOrders = async () => {
        setLoading(true);
        try {
            const user = await getCurrentUser();
            const userId = user?.id || localStorage.getItem("user_id");

            if (!userId) {
                setAllOrders([]);
                setDataFilter([]);
                return;
            }

            const response = await getOrders({
                order_type: "online",
                customer: userId,
                customer_id: userId
            });
            const data = response?.data || [];

            const formatted = data.map((order) => {
                const dateObj = dayjs(order.created_at);
                const tanggal = dateObj.isValid() ? dateObj.format("YYYY-MM-DD") : (order.created_at || "-");
                const jam = dateObj.isValid() ? dateObj.format("HH:mm:ss") : "00:00:00";

                const mappedItems = Array.isArray(order.items) && order.items.length > 0
                    ? order.items.map((it) => ({
                        id: it.id || it.product?.id,
                        nama: it.product?.name || `Produk #${it.id}`,
                        price: it.product?.price || (it.price && it.quantity ? it.price / it.quantity : it.price) || 0,
                        category: it.product?.category || "Umum",
                        img: it.product?.image || null,
                        quantity: it.quantity || 1,
                    }))
                    : [];

                const total = order.total || mappedItems.reduce((acc, it) => acc + it.price * it.quantity, 0);

                return {
                    id: order.id,
                    invoice: order.invoice,
                    status: order.status || "On Process",
                    tanggal: tanggal,
                    jam: jam,
                    total: total,
                    items: mappedItems,
                };
            });

            setAllOrders(formatted);
            localStorage.setItem("online_orders", JSON.stringify(formatted));
            filter_order(tabActive, formatted);
        } catch (error) {
            console.error("Gagal mengambil data order dari API:", error);
            const saved = localStorage.getItem("online_orders");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setAllOrders(parsed);
                    filter_order(tabActive, parsed);
                } catch (e) {
                    console.error("Gagal parse cache orders:", e);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserOrders();

        const handleStorage = (e) => {
            if (e.key === "online_orders" && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    setAllOrders(parsed);
                    filter_order(tabActive, parsed);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        const handleCustomUpdate = () => {
            fetchUserOrders();
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("online_orders_updated", handleCustomUpdate);
        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("online_orders_updated", handleCustomUpdate);
        };
    }, []);

    function filter_order(param, sourceOrders = allOrders) {
        const data_order = sourceOrders.filter((item) => item.status === param);
        setDataFilter(data_order);
    }

    useEffect(() => {
        filter_order(tabActive, allOrders);
    }, [allOrders, tabActive]);

    const items = dataFilter.map((order) => ({
        key: order.id,

        label: (
            <div className="order-header">
                <div className="icon-box">📄</div>
                <div className="order-info">
                    <div className="status">{getStatusLabel(order.status)}</div>
                    <div className="invoice">{t("order.invoiceNo")} {order.invoice}</div>
                    <div className="date">{order.tanggal} {order.jam}</div>
                </div>

            </div>
        ),

        children: (
            <div className="order-body">
                {order.items.map((item) => (
                    <div key={item.id} className="item-row">
                        <div>{item.nama}</div>
                        <div>{item.quantity}</div>
                    </div>
                ))}
            </div>
        ),
    }));

    // Hitung jumlah pesanan per status
    const countOnProcess = allOrders.filter((o) => o.status === "On Process").length;
    const countNeedPickup = allOrders.filter((o) => o.status === "Need Pick-up").length;
    const countDone = allOrders.filter((o) => o.status === "Done").length;

    const tabs = [
        { value: "On Process", label: t("order.onProcess"), count: countOnProcess },
        { value: "Need Pick-up", label: t("order.needPickup"), count: countNeedPickup },
        { value: "Done", label: t("order.done"), count: countDone },
    ];

    return (
        <div className={`order-container ${isEmbedded ? "order-embedded" : ""}`}>

            <div className="container">
                {!isEmbedded && (
                    <div className="profile-header">
                        <img className="icon" src={Arrow} alt="" onClick={back} />
                        <h3>{t("order.title")}</h3>
                    </div>
                )}

                {/* TAB (UI only) */}
                <div className="tabs">
                    {tabs.map((tab) => (
                        <div
                            key={tab.value}
                            className={`tab ${tabActive === tab.value ? "active" : ""}`}
                            onClick={() => {
                                filter_order(tab.value);
                                setTabActive(tab.value);
                            }}
                        >
                            <span>{tab.label}</span>
                            <span className="tab-badge">{tab.count}</span>
                        </div>
                    ))}
                </div>

                {/* COLLAPSE */}
                <Collapse
                    items={items}
                    accordion
                    ghost
                    expandIconPlacement="end"
                    expandIcon={({ isActive }) => (

                        <img
                            src={isActive ? up : down}
                            alt="toggle"
                            style={{
                                width: "25px",
                                height: "25px",
                                objectFit: "contain",
                            }}
                        />
                    )}
                />

            </div>
        </div>
    );
}

export default OrderList
