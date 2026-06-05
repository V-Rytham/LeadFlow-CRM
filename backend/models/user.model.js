import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin","viewer"],
        default: "admin",
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})
const User = mongoose.model("User", UserSchema);
export default User;