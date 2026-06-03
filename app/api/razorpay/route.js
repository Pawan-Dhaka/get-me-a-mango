import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/Models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/mongooseconnect";
import User from "@/Models/User";

export const POST = async (req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    //check if razorpay id is one server
    let p = await Payment.findOne({ oid: body.razorpay_order_id }).lean();
    if (!p) {
        return NextResponse.error("Order Not found.")
    }

    //check the razorpay sercret on the database
    let user = await User.findOne({username:p.to_user})
    const secret = user.razorpaysecret

    let xx = validatePaymentVerification(
        {
            order_id: body.razorpay_order_id,
            payment_id: body.razorpay_payment_id,
        },
        body.razorpay_signature,
        secret

    );
    if (xx) {
        const updatePayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" }, { new: true }).lean()
        const url = new URL(request.url)

return NextResponse.redirect(
  `${url.origin}/${updatePayment.to_user}?paymentdone=true`
)
    } else {
        return NextResponse.error("Payment verification failed.")
    }
}