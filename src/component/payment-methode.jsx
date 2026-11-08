import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Radio, Avatar, Alert, notification } from 'antd';
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "../style/payment.css"

import Arrow from "../assets/arrow.png"
import { postOrder, postOrderDetail, deleteCart, getCurrentUser } from "../utils/api";
import { useEffect } from "react";

const PaymentPage = () => {
    const { t } = useTranslation();
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

    const [isPaymentSucsess, setIsPaymentSucsess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            let currentUserId = localStorage.getItem("user_id");
            if (!currentUserId) {
                const userObj = await getCurrentUser();
                if (userObj?.id) {
                    currentUserId = userObj.id;
                }
            }

            const orderPayload = {
                invoice: invoice,
                total: total.total,
                order_type: "online",
                status: "On Process",
                customer_id: currentUserId ? Number(currentUserId) : null,
                customer: currentUserId ? Number(currentUserId) : null,
            };

            const response = await postOrder(orderPayload);
            const orderId = response?.data?.id;

            // Simpan detail produk pesanan
            if (orderId && Array.isArray(dataCart) && dataCart.length > 0) {
                for (const item of dataCart) {
                    const productId = item.product?.id || item.id;
                    if (productId) {
                        try {
                            await postOrderDetail({
                                order: orderId,
                                product_detail: productId,
                                quantity: item.quantity,
                                price: (item.product?.price || 0) * item.quantity
                            });
                        } catch (err) {
                            console.error("Gagal simpan detail order:", err);
                        }
                    }
                }
            }

            // Hapus item yang dibeli dari keranjang
            for (const item of dataCart) {
                if (item.id) {
                    try {
                        await deleteCart(item.id);
                    } catch (err) {
                        console.error("Gagal hapus cart item:", err);
                    }
                }
            }

            // Simpan ke localStorage untuk sinkronisasi lokal
            const newOnlineOrder = {
                id: orderId || Date.now(),
                invoice: invoice,
                tanggal: dayjs().format("YYYY-MM-DD"),
                jam: dayjs().format("HH:mm:ss"),
                total: total.total,
                order_type: "online",
                status: "On Process",
                items: dataCart.map(item => ({
                    id: item.product?.id || item.id,
                    nama: item.product?.name || item.name,
                    price: item.product?.price || 0,
                    quantity: item.quantity
                }))
            };
            const currentOrders = JSON.parse(localStorage.getItem("online_orders") || "[]");
            const updatedOrders = [newOnlineOrder, ...currentOrders.filter(o => o.invoice !== invoice)];
            localStorage.setItem("online_orders", JSON.stringify(updatedOrders));
            window.dispatchEvent(new Event("online_orders_updated"));

            notification.success({
                title: t("payment.successTitle"),
                description: t("payment.successDesc"),
                placement: "top",
                duration: 3,
                onClose: () => {
                    const isDesktop = window.innerWidth >= 768;

                    if (isDesktop) {
                        navigate("/profile", {
                            state: { activeTab: "Order" },
                        });
                    } else {
                        navigate("/order");
                    }
                },
            });
        } catch (error) {
            console.error("Gagal menyimpan order online:", error);
            notification.error({
                title: "Gagal Memproses Pembayaran",
                description: "Terjadi kesalahan saat memproses pesanan ke server.",
                placement: "top",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    // const handlePayment = () => {
    //     notification.success({
    //         title: t("payment.successTitle"),
    //         description: t("payment.successDesc"),
    //         placement: "top",
    //         duration: 3,
    //         onClose: () => {
    //             navigate("/order");
    //         },
    //     });

    // }

    const [total, setTotal] = useState({ subtotal: 0, discount: 0, voucher: 0, total: 0 })

    const getTotal = () => {
        const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
        const discount = 10000
        const voucher = 0
        const total = subtotal - discount - voucher

        setTotal({
            subtotal: subtotal,
            discount: discount,
            voucher: voucher,
            total: total
        })
    }


    const [invoice, setInvoice] = useState("")
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
                <div>{t("payment.title")}</div>
            </header>

            <div className="payment-body">
                {/* Summary */}
                <section className="summary">
                    <div className="no-invoice">
                        <span>{t("payment.invoice")} : {invoice}</span>
                    </div>
                    <h3>{t("payment.summary")}</h3>
                    <div className="summary-items">
                        {dataCart.map((item) => (
                            <div className="summary-item" key={item.id}>
                                <span>{item.product.name}</span>
                                <span>{item.quantity}x</span>
                                <span>Rp. {item.product.price}</span>
                                <span>Rp. {(item.quantity * item.product.price)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="summary-row">
                        <span>{t("payment.payingWith")}</span>
                        <span>
                            {selectedPayment || "-"}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>{t("payment.subtotal")}</span>
                        <span>{(total.subtotal).toLocaleString("id-ID")}</span>
                    </div>

                    <div className="summary-row discount">
                        <span>{t("payment.discount")}</span>
                        <span>{(- total.discount).toLocaleString("id-ID")}</span>
                    </div>

                    <div className="summary-row">
                        <span>{t("payment.voucher")}</span>
                        <span>{(total.voucher).toLocaleString("id-ID")}</span>
                    </div>

                    <div className="summary-row">
                        <span>{t("payment.serviceFee")}</span>
                        <span>0</span>
                    </div>

                    <hr />

                    {/* Total Pembayaran & Tombol Payment menyatu di bagian paling bawah summary */}
                    <div className="summary-footer">
                        <div className="total-payment">
                            <h4>{t("payment.totalPayment")}</h4>
                            <span>Rp {(total.total).toLocaleString("id-ID")}</span>
                        </div>
                        <button
                            className="pay-button"
                            disabled={!selectedPayment || isProcessing}
                            onClick={handlePayment}
                        >{t("payment.payButton")}</button>
                    </div>

                </section>

                {/* Payment Methods */}
                <section className="payment-methods payment-methode">
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
                                    onClick={() => setSelectedPayment(method.name)}
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
            </div>
        </div >
    );
};

export default PaymentPage;