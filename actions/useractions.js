"use server"
import Razorpay from "razorpay"
import Payment from "@/Models/Payment"
import connectDB from "@/db/mongooseconnect"
import User from "@/Models/User"
import Username from "@/app/[username]/page"


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
      //check the razorpay sercret on the database
        let user = await User.findOne({username:to_username})
        const secret = user.razorpaysecret
        const id = user.razorpayid
   var instance = new Razorpay({
    
    key_id: id,
    key_secret: secret

})

    instance.orders.create({
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
            key1: "value3",
            key2: "value2"
        }
    })
    
    let options ={
        amount : Number.parseInt(amount),
        currency: "INR"
    }

    let x = await instance.orders.create(options)

    await Payment.create ({
        oid:x.id,
        amount : amount,
        to_user : to_username,
        name: paymentform.name,
        message: paymentform.message
    })
    return x
}

export const fetchuser = async (username) => {
  await connectDB();
  const user = await User.findOne({ username }).lean();
  return JSON.parse(JSON.stringify(user));
};

export const fetchpayments = async (username) => {
  await connectDB();
  const payments = await Payment.find({ to_user: username, done: true }).sort({ createdAt: -1 }).limit(10).lean();
  return JSON.parse(JSON.stringify(payments));
};

export const updateProfile = async(data, oldusername)=>{
    await connectDB()
    let ndata = Object.fromEntries(data)
    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username})
        if(u){
            return {error:"Username already exists."}
        }
        await User.updateOne({email:ndata.email},ndata)
        // move all old payments to new username
        await Payment.updateMany({to_user: oldusername},{to_user: ndata.username})
    } else{
        await User.updateOne({email:ndata.email},ndata)
    }
}

