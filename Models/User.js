import mongoose from "mongoose";
const {Schema} = mongoose;


const UserSchema = new Schema({
    email: {type: String, required: true },
    name: {type: String},
    username: {type: String, required: true },
    bio: {type: String, default:"enjoying life with joy." },
    profilepic: {type: String , default:"https://img.magnific.com/free-photo/selective-shot-red-mackerel-tabby-cat-looking-camera-with-green-background_181624-57105.jpg?semt=ais_hybrid&w=740&q=80"},
    razorpayid: { type: String },
    razorpaysecret: { type: String },
    coverpic: {type: String, default:"https://www.anubhavvacations.in/blog/wp-content/uploads/2025/01/kashmir-featured-1200x801.webp"},
    createdAt: {type:Date, default:Date.now},
    updatedAt: {type:Date, default:Date.now},
});

export default mongoose.models.User ||   mongoose.model("User", UserSchema);