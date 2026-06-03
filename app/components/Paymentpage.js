"use client"
import React, { useState, useEffect } from "react"
import Script from "next/script"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { initiate, fetchuser, fetchpayments } from "../../actions/useractions"

const Paymentpage = ({ username }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()

    const [paymentform, setpaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    })

    const [currentuser, setcurrentuser] = useState(null)
    const [Payments, setPayments] = useState([])
    const [razorLoaded, setRazorLoaded] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                const u = await fetchuser(username)
                const p = await fetchpayments(username)

                setcurrentuser(u || null)
                setPayments(p || [])
            } catch (err) {
                console.log(err)
            }
        }

        getData()
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast.success("Payment successful!")
            router.push(`/${username}`)
        }
    }, [session])

    const handleChange = (e) => {
        setpaymentform({
            ...paymentform,
            [e.target.name]: e.target.value
        })
    }

    const pay = async () => {
        try {
            const amt = Number(paymentform.amount) * 100

            if (!amt || amt <= 0) {
                alert("Invalid amount")
                return
            }

            if (!razorLoaded || !window.Razorpay) {
                alert("Razorpay not loaded")
                return
            }

            const order = await initiate(amt, username, paymentform)

            if (!order?.id) {
                alert("Order creation failed")
                return
            }

            const options = {
                key: currentuser?.razorpayid,
                amount: amt,
                currency: "INR",
                name: "Get Me A Mango",
                description: "Payment",
                order_id: order.id,
                callback_url: "https://get-me-a-mango.vercel.app/api/razorpay"
            }

            const rzp = new window.Razorpay(options)
            rzp.open()

        } catch (err) {
            console.log(err)
            alert("Payment failed")
        }
    }

    return (
        <>
            <ToastContainer />

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
                onLoad={() => setRazorLoaded(true)}
            />

            <div className="payments">

                <h2 className="text-xl font-bold">@{username}</h2>

                <p className="text-gray-400">
                    Total Payments: {Payments.length}
                </p>

                <p className="text-gray-400">
                    ₹{(Payments || []).reduce((a, b) => a + (b.amount || 0), 0) / 100} raised
                </p>

                <div className="form flex flex-col gap-3 mt-5">

                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="p-2 border"
                    />

                    <input
                        name="message"
                        placeholder="Message"
                        onChange={handleChange}
                        className="p-2 border"
                    />

                    <input
                        name="amount"
                        type="number"
                        placeholder="Amount"
                        onChange={handleChange}
                        className="p-2 border"
                    />

                    <button
                        onClick={pay}
                        disabled={
                            !paymentform.name ||
                            !paymentform.message ||
                            !paymentform.amount
                        }
                        className="bg-green-500 p-2 text-white"
                    >
                        Pay
                    </button>

                </div>
            </div>
        </>
    )
}

export default Paymentpage
