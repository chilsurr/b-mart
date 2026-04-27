import { useState } from "react";
import { Collapse } from "antd";


import invoice from "../assets/invoice.png"
import down from "../assets/down.png"
import up from "../assets/up.png"

const orders = [
    {
        id: 1,
        status: "On Process",
        invoice: "203-0303UHB2",
        date: "03-03-2026 14:23",
        items: ["Item A", "Item B"], // > 1 → dropdown
    },
    {
        id: 2,
        status: "Need Pick-up",
        invoice: "203-0303UHB3",
        date: "03-03-2026 14:23",
        items: ["Item A"], // 1 → no dropdown
    },
];

function OrderList() {
    const [openId, setOpenId] = useState(null);

    const toggleDropdown = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const orders = [
        {
            id: 1,
            invoice: "INV-1001",
            status: "Completed",
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
                {
                    product: {
                        id: 2,
                        name: "Es Teh Manis",
                        price: 5000,
                        image: "/images/esteh.jpg",
                    },
                    qty: 2,
                },
            ],
        },
        {
            id: 2,
            invoice: "INV-1002",
            status: "Processing",
            date: "2026-04-24",
            items: [
                {
                    product: {
                        id: 3,
                        name: "Mie Ayam Bakso",
                        price: 20000,
                        image: "/images/mieayam.jpg",
                    },
                    qty: 1,
                },
                {
                    product: {
                        id: 4,
                        name: "Air Mineral",
                        price: 3000,
                        image: "/images/air.jpg",
                    },
                    qty: 3,
                },
            ],
        },
        {
            id: 3,
            invoice: "INV-1003",
            status: "Pending",
            date: "2026-04-23",
            items: [
                {
                    product: {
                        id: 5,
                        name: "Ayam Bakar",
                        price: 30000,
                        image: "/images/ayambakar.jpg",
                    },
                    qty: 1,
                },
                {
                    product: {
                        id: 6,
                        name: "Jus Jeruk",
                        price: 10000,
                        image: "/images/jusjeruk.jpg",
                    },
                    qty: 2,
                },
            ],
        },
    ];

    const items = orders.map((order) => ({
        key: order.id,

        label: (
            <div className="order-header">
                <div className="icon-box">📄</div>
                <div className="order-info">
                    <div className="status">{order.status}</div>
                    <div className="invoice">No Bon {order.invoice}</div>
                    <div className="date">{order.date}</div>
                </div>

            </div>
        ),

        children: (
            <div className="order-body">
                {order.items.map((item) => (
                    <div key={item.product.id} className="item-row">
                        {item.product.name}
                    </div>
                ))}
            </div>
        ),
    }));

    return (
        <div className="order-container">

            <div className="container">

                {/* TAB (UI only) */}
                <div className="tabs">
                    <div className="tab active">On Process</div>
                    <div className="tab">Need Pick-up</div>
                    <div className="tab">Done</div>
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