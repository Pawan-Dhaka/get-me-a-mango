import mongoose from "mongoose"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@/Models/User"
import Payment from "@/Models/Payment"
import connectDB from "@/db/mongooseconnect"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "google") {
                //connect to the database 
                // const client = await mongoose.connect("mongodb://localhost:27017/mango")
                //check if user already in database
                await connectDB();
                const currentUser = await User.findOne({ email: user.email }).lean()
                if (!currentUser) {
                    // Create a new user
                    const newUser = await User.create({

                        email: user.email,
                        username: user.email.split("@")[0],
                    })
                    
                }
            }
            return true
        },
        async session({ session, token, user }) {
            const dbUser = await User.findOne({email: session.user.email}).lean()
            console.log(dbUser)
            session.user.name = dbUser.username
            return session
        },


    },
})

export { handler as GET, handler as POST }