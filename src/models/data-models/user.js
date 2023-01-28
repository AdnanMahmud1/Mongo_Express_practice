import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator"

// schema
const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true, required: true},
        createdAt: {type: Date, require: true},
    }
)

// referrence
userSchema.plugin(uniqueValidator);
const User = mongoose.model("user", userSchema);

export default User;