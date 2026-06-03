import React from 'react'
import Paymentpage from '../components/Paymentpage'
import { notFound } from "next/navigation"
import connectDB from '@/db/mongooseconnect'
import User from '@/Models/User'

const Username = async ({ params }) => {
    await connectDB();
    const p = await params
    let u = await User.findOne({username: p.username})
    if(!u){
        return notFound()
    } else{

        return (<>
        <Paymentpage username={p.username} />
        </>
        )
    }
}

export default Username


export async function generateMetadata({ params }) {
    const p = await params
  return {
    title: `${p.username} - Get me a Mango`,
  }
}
 