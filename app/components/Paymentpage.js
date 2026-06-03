"use client"
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { initiate, fetchuser, fetchpayments } from '../../actions/useractions'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'

const Paymentpage = ({ username }) => {
    const { data: session } = useSession()

    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" })
    const [currentuser, setcurrentuser] = useState({})
    const [Payments, setPayments] = useState([])
    const [razorLoaded, setRazorLoaded] = useState(false)

    const SearchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const getData = async () => {
        let u = await fetchuser(username)
        if (u) setcurrentuser(u)

        let dbpayments = await fetchpayments(username)
        if (dbpayments) setPayments(dbpayments)
    }

    useEffect(() => {
        if (SearchParams.get("paymentdone") == "true" && session) {
            toast.success('Payment has been made.');
            router.push(`/${username}`)
        }
    }, [session])

    const pay = async (amount) => {

        if (!razorLoaded || !window.Razorpay) {
            alert("Razorpay not loaded");
            return;
        }

        let a = await initiate(amount, username, paymentform)

        if (!a?.id) {
            alert("Order creation failed");
            return;
        }

        var options = {
            key: currentuser?.razorpayid,
            amount: amount,
            currency: "INR",
            name: "Get me a Mongo",
            description: "Test Transaction",
            image: "https://i.pinimg.com/originals/8e/cb/5b/8ecb5bda69e29eb348a04ad66077fac6.gif",
            order_id: a.id,
            callback_url: "https://get-me-a-mango.vercel.app/api/razorpay",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "+919876543210"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#3399cc"
            },
            method: {
                upi: true,
                card: true,
                netbanking: true
            }
        }

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="dark"
                transition={Bounce}
            />

            <Script
                src="https://checkout.razorpay.com/v1/checkout.js"
                strategy="afterInteractive"
                onLoad={() => setRazorLoaded(true)}
            />

            <div className='cover  relative'>
                <img className=' w-full lg:h-[25vw] sm:h-[40vw] h-[60vw]  object-cover' src={currentuser?.coverpic} />
                <div className="cover-pic absolute bottom-[-80px] left-1/2 -translate-x-1/2">
                    <img
                        className={`h-44 w-44 object-cover rounded-full border-2 border-blue-950`}
                        src={currentuser?.profilepic}
                        alt=""
                    />
                </div>
            </div>

            <div className="info flex justify-center flex-col items-center my-20 gap-1.5">
                <div className="flex items-center">
                    <h2 className='font-bold text-2xl'>@{username}</h2>
                    {username?.trim().toLowerCase() === "arisepawan" && (<svg className='flex mt-1 ml-1 ' aria-label="Verified" fill="rgb(0, 149, 246)" height="18" role="img" viewBox="0 0 40 40" width="18"><title>Verified</title><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path></svg>)}
                </div>

                <p className='text-slate-400'>{currentuser?.bio}</p>

                <p className='text-slate-400'>
                    {Payments.length}
                    {Payments.length > 9 ? "+" : ""}
                    {Payments.length > 1 ? "Funds" : "Fund"} • ₹
                    {(Payments || []).reduce((a, b) => a + (b.amount || 0), 0) / 100}
                    {" "}raised
                </p>

                <div className="payments flex flex-col xl:flex-row gap-5  w-[80%] mt-6 ">

                    <div className="supporters xl:w-1/2 w-full flex flex-col items-center bg-slate-900 px-5 py-8 rounded-lg ">
                        <h2 className='text-white font-bold text-xl text-center mb-3 '>Supporters (Latest 10)</h2>

                        <ul>
                            {Payments.length == 0 && <li>No Payments yet.</li>}

                            {Payments.map((p) => (
                                <li key={p._id} className="text-gray-200 mb-4 flex">
                                    <img className="h-6 w-6 mx-1 invert" src="/profile.png" />
                                    {p.name} donated ₹{p.amount / 100} "{p.message}"
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="supporters bg-slate-900 px-5 py-8 rounded-lg xl:w-1/2 w-full">
                        <h2 className='text-white font-bold text-xl text-center mb-3'>Make a Payment</h2>

                        <div className="pay flex flex-col gap-4 text-white mb-4">

                            <input onChange={handleChange} name='name' className='w-full bg-slate-800 p-3 rounded-lg' placeholder='Enter Your Name' />
                            <input onChange={handleChange} name='message' className='w-full bg-slate-800 p-3 rounded-lg' placeholder='Enter Your Message' />
                            <input onChange={handleChange} name='amount' type="number" className='w-full bg-slate-800 p-3 rounded-lg' placeholder='Enter Amount' />

                            <button
                                onClick={() => pay(Number(paymentform.amount) * 100)}
                                disabled={paymentform.name?.length < 3 || paymentform.message?.length < 3 || paymentform.amount <= 0}
                                className='bg-green-500 p-3 rounded-lg text-black font-bold'
                            >
                                Pay
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Paymentpage
