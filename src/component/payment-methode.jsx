import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Radio, Avatar, Alert, notification } from 'antd';
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "../style/payment.css"

import Arrow from "../assets/arrow.png"
import { useEffect } from "react";

const PaymentPage = () => {
    const [selectedPayment, setSelectedPayment] = useState("");

    const paymentMethods = [
        {
            id: 1,
            name: "BCA Virtual Account",
            icon: "/images/bca.png",
        },
        {
            id: 2,
            name: "QRIS",
            icon: "/images/qris.png",
        },
        {
            id: 3,
            name: "Aladin",
            icon: "/images/aladin.png",
        },
        {
            id: 4,
            name: "DANA",
            icon: "/images/dana.png",
        },
        {
            id: 5,
            name: "GoPay / GoPay Later",
            icon: "/images/gopay.png",
        },
        {
            id: 6,
            name: "OVO",
            icon: "/images/ovo.png",
        },
        {
            id: 7,
            name: "ShopeePay / SPayLater",
            icon: "/images/shopeepay.png",
        },
        {
            id: 8,
            name: "VIRGO",
            icon: "/images/virgo.png",
        },
        {
            id: 9,
            name: "Indodana PayLater",
            icon: "/images/indodana.png",
        },
        {
            id: 10,
            name: "blu by BCA Digital",
            icon: "/images/blu.png",
        },
        {
            id: 11,
            name: "Mandiri Virtual Account",
            icon: "/images/mandiri.png",
        },
        {
            id: 12,
            name: "Transfer Bank Lainnya",
            icon: "/images/bank-transfer.png",
        },
        {
            id: 13,
            name: "Credit Card / Debit Online",
            icon: "/images/card.png",
        },
    ];

    const navigate = useNavigate()
    function back() {
        navigate("/cart/")
    }

    const location = useLocation()

    const cart = location.state?.cart || []
    console.log(cart)
    const [dataCart, setDataCart] = useState([])
    useEffect(() => {
        createInvoice()
        getTotal()
        setDataCart(cart)
    }, [])

    const [isPaymentSucsess, setIsPaymentSucsess] = useState(false)
    const handlePayment = () => {
        notification.success({
            title: "Payment Successful",
            description:
                "Your payment has been successfully processed. We are now preparing your order.",
            placement: "top",
            duration: 3,
            onClose: () => {
                navigate("/order");
            },
        });

    }

    const [total, setTotal] = useState({ subtotal: 0, discount: 0, voucher: 0, total: 0 })

    const getTotal = () => {
        const subtotal = cart.reduce((total, item) => total + item.itemId.price * item.quantity, 0)
        const discount = 10000
        const voucher = 20000
        const total = subtotal - discount - voucher

        setTotal({
            subtotal: subtotal,
            discount: discount,
            voucher: voucher,
            total: total
        })
    }


    const [invoice,setInvoice] = useState("")
    console.log(invoice)
    const createInvoice = (date = new Date()) => {
        const datePart = dayjs(date).format("DDMMYYYY");

        const randomPart = Math.random()
            .toString(36)
            .toUpperCase()
            .replace(/[^A-Z0-9]/g, "")
            .slice(2, 6);

        setInvoice(`INVO-${datePart}-${randomPart}`)
    };



    return (
        <div className="payment-page">
            {/* Header */}
            <header className="payment-header">
                <img className="icon" src={Arrow} alt="" onClick={back} />
                <div>Payment</div>
            </header>

            {/* Summary */}
            <section className="summary">
                <div className="no-invoice">
                    <span>Invoice : {invoice} </span>
                </div>
                <h3>Ringkasan</h3>
                <div className="summary-items">
                    {dataCart.map((item) => (
                        <div className="summary-item" key={item.id}>
                            <span>{item.itemId.nama}</span>
                            <span>{item.quantity}x</span>
                            <span>Rp. {item.itemId.price}</span>
                            <span>Rp. {(item.quantity * item.itemId.price)}</span>
                        </div>
                    ))}
                </div>
                <div className="summary-row">
                    <span>Pembayaran menggunakan</span>
                    <span>
                        {selectedPayment || "-"}
                    </span>
                </div>

                <div className="summary-row">
                    <span>Subtotal Belanja</span>
                    <span>{(total.subtotal).toLocaleString("id-ID")}</span>
                </div>

                <div className="summary-row discount">
                    <span>Discount</span>
                    <span>{(- total.discount).toLocaleString("id-ID")}</span>
                </div>

                <div className="summary-row">
                    <span>Voucher</span>
                    <span>{(total.voucher).toLocaleString("id-ID")}</span>
                </div>

                <div className="summary-row">
                    <span>Biaya Layanan</span>
                    <span>0</span>
                </div>

                <div className="summary-row boldd">
                    <span>Total Pembayaran</span>
                    <span>{(total.total).toLocaleString("id-ID")}</span>
                </div>

                <hr />

            </section>

            {/* Payment Methods */}
            <section className="payment-methods">
                <ConfigProvider
                    theme={{
                        components: {
                            Radio: {
                                colorPrimary: "#2E7D32",
                                colorPrimaryHover: "#2E7D32",
                            },
                        },
                    }}
                >
                    <Radio.Group
                        value={selectedPayment}
                        onChange={(e) =>
                            setSelectedPayment(e.target.value)
                        }
                        style={{ width: "100%" }}
                    >
                        {paymentMethods.map((method) => (
                            <div
                                key={method.id}
                                className="payment-item"
                            >
                                <div className="payment-left">
                                    <Avatar
                                        src={method.icon}
                                        size={40}
                                        shape="circle"
                                    />

                                    <div className="payment-info">
                                        <div className="payment-name">
                                            {method.name}
                                        </div>
                                    </div>
                                </div>

                                <Radio value={method.name} className="payment-radio" />
                            </div>
                        ))}
                    </Radio.Group>
                </ConfigProvider>
            </section>

            {/* Footer */}
            <footer className="payment-footer">
                <div className="total-payment">
                    <h4>Total Pembayaran</h4>
                    <span>Rp {(total.total).toLocaleString("id-ID")}</span>
                </div>
                <button
                    className="pay-button"
                    disabled={!selectedPayment}
                    onClick={handlePayment}
                >
                    PAYMENT
                </button>
            </footer>
        </div >
    );
};

export default PaymentPage;