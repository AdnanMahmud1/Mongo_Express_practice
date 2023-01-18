import mongoose from "mongoose";

// schema
const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        createdAt: {type: Date, require: true},
    }
)

// referrence

const User = mongoose.model("user", userSchema);

export default User;