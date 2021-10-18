import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    expiry: { type: Date, default: "1970-01-01" }
});

const userModel = mongoose.model("User", userSchema);

export default userModel;