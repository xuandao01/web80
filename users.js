import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: Boolean,
    username: String,
    password: String,
    otp: String,
    createdOtp: Date
})

const userModel = mongoose.model('users', userSchema);

export default userModel;