const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    telephone: String,
    password: String,
    prof_pic_path: String,
    prof_pic_name: String,
    tasks: [String]
}, {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

const User = mongoose.model("User", userSchema);

module.exports = User;