import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"
import { Collapse } from "antd";


import invoice from "../assets/invoice.png"
import Arrow from "../assets/arrow.png"
import down from "../assets/down.png"
import up from "../assets/up.png"

import dataOrders from "../utils/dataorder"
import dataItems from "../utils/dataproduct"



function OrderList() {

    const data = [
        // ON PROCESS (4)
        {
            id: 1,
            invoice: "INV-1001",
            status: "On Process",
            date: "2026-04-25",
            items: [
                {
                    product: {
                        id: 1,
                        name: "Nasi Goreng Spesial",
                        price: 25000,
                        image: "/images/nasgor.jpg",
                    },
                    qty: 1,
                },
            ],
        },
        {
            id: 2,
            invoice: "INV-1002",
            status: "On Process",
            date: "2026-04-25",
            items: [
                {
                    product: {
                        id: 2,
                        name: "Mie Ayam",
                        price: 20000,
                        image: "/images/mieayam.jpg",
                    },
                    qty: 2,
                },
            ],
        },
        {
            id: 3,
            invoice: "INV-1003",
            status: "On Process",
            date: "2026-04-24",
            items: [
                {
                    product: {
                        id: 3,
                        name: "Sate Ayam",
                        price: 30000,
                        image: "/images/sate.jpg",
                    },
                    qty: 1,
                },
            ],
        },
        {
            id: 4,
            invoice: "INV-1004",
            status: "On Process",
            date: "2026-04-24",
            items: [
                {
                    product: {
                        id: 4,
                        name: "Bakso Urat",
                        price: 22000,
                        image: "/images/bakso.jpg",
                    },
                    qty: 3,
                },
            ],
        },

        // NEED PICK-UP (3)
        {
            id: 5,
            invoice: "INV-1005",
            status: "Need Pick-up",
            date: "2026-04-23",
            items: [
                {
                    product: {
                        id: 5,
                        name: "Ayam Geprek",
                        price: 27000,
                        image: "/images/geprek.jpg",
                    },
                    qty: 1,
                },
            ],
        },
        {
            id: 6,
            invoice: "INV-1006",
            status: "Need Pick-up",
            date: "2026-04-23",
            items: [
                {
                    product: {
                        id: 6,
                        name: "Es Teh",
                        price: 5000,
                        image: "/images/esteh.jpg",
                    },
                    qty: 2,
                },
            ],
        },
        {
            id: 7,
            invoice: "INV-1007",
            status: "Need Pick-up",
            date: "2026-04-22",
            items: [
                {
                    product: {
                        id: 7,
                        name: "Nasi Padang",
                        price: 35000,
                        image: "/images/padang.jpg",
                    },
                    qty: 1,
                },
            ],
        },

        // DONE (5)
        {
            id: 8,
            invoice: "INV-1008",
            status: "Done",
            date: "2026-04-22",
            items: [
                {
                    product: {
                        id: 8,
                        name: "Jus Alpukat",
                        price: 12000,
                        image: "/images/alpukat.jpg",
                    },
                    qty: 2,
                },
            ],
        },
        {
            id: 9,
            invoice: "INV-1009",
            status: "Done",
            date: "2026-04-21",
            items: [
                {
                    product: {
                        id: 9,
                        name: "Kopi Susu",
                        price: 18000,
                        image: "/images/kopisusu.jpg",
                    },
                    qty: 1,
                },
            ],
        },
        {
            id: 10,
            invoice: "INV-1010",
            status: "Done",
            date: "2026-04-21",
            items: [
                {
                    product: {
                        id: 10,
                        name: "Burger Beef",
                        price: 40000,
                        image: "/images/burger.jpg",
                    },
                    qty: 1,
                },
            ],
        },
        {
            id: 11,
            invoice: "INV-1011",
            status: "Done",
            date: "2026-04-20",
            items: [
                {
                    product: {
                        id: 11,
                        name: "Pizza Mini",
                        price: 45000,
                        image: "/images/pizza.jpg",
                    },
                    qty: 1,
                },
            ],
        },
        {
            id: 12,
            invoice: "INV-1012",
            status: "Done",
            date: "2026-04-20",
            items: [
                {
                    product: {
                        id: 12,
                        name: "Cappuccino",
                        price: 22000,
                        image: "/images/cappuccino.jpg",
                    },
                    qty: 2,
                },
            ],
        },
    ];


    const [openId, setOpenId] = useState(null);

    const location = useLocation()
    const status = location.state?.status ?? "On Process";
    useEffect(() => (
        filter_order(status)
    ), [status])

    const navigate = useNavigate()
    function back() {
        navigate("/profile/")
    }

    const toggleDropdown = (id) => {
        setOpenId(openId === id ? null : id);
    };


    const dataOrderFix = dataOrders.map((item) => ({
        ...item, items: item.items.map((item) => ({
            ...dataItems.find((data) => data.id === item.id),
            quantity: item.quantity
        }))
    }))
    console.log(dataOrderFix)

    const [dataFilter, setDataFilter] = useState([])

    function filter_order(param) {
        console.log(param)
        const data_order = dataOrderFix.filter((item) => {
            return item.status === param
        })
        setDataFilter(data_order)
        console.log(data_order)
    }

    const items = dataFilter.map((order) => ({
        key: order.id,

        label: (
            <div className="order-header">
                <div className="icon-box">📄</div>
                <div className="order-info">
                    <div className="status">{order.status}</div>
                    <div className="invoice">No Bon {order.invoice}</div>
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

    const [tabActive, setTabActive] = useState(status)

    const tabs = [
        { value: "On Process" },
        { value: "Need Pick-up" },
        { value: "Done" },
    ];



    return (
        <div className="order-container">

            <div className="container">
                <div className="profile-header">
                    <img className="icon" src={Arrow} alt="" onClick={back} />
                    <h3>My Order</h3>
                </div>

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
                            {tab.value}
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