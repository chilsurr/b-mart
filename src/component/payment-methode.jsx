import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, Avatar, Alert, notification } from 'antd';
import { ConfigProvider } from "antd";

import Arrow from "../assets/arrow.png"

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
                    <span>Invoice : O-120626-BMIKHJ </span>
                </div>
                <h3>Ringkasan</h3>
                <div className="summary-row">
                    <span>Pembayaran menggunakan</span>
                    <span>
                        {selectedPayment || "-"}
                    </span>
                </div>

                <div className="summary-row">
                    <span>Subtotal Belanja</span>
                    <span>Rp 41.400</span>
                </div>

                <div className="summary-row discount">
                    <span>Diskon</span>
                    <span>-Rp 13.800</span>
                </div>

                <div className="summary-row">
                    <span>Voucher</span>
                    <span>Rp 0</span>
                </div>

                <div className="summary-row">
                    <span>Biaya Layanan</span>
                    <span>Rp 0</span>
                </div>

                <div className="summary-row boldd">
                    <span>Total Pembayaran</span>
                    <span>Rp 21.666</span>
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
                    <span>Rp 21.666</span>
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