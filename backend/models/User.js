const mongose = require("mongoose");
const { Schema } = mongose;
const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
}, {
    timestamps: true
});

const User = mongose.model("User", userSchema);
module.exports = User;