const { default: mongoose } = require("mongoose");
const mongose = require("mongoose");
const { Schema } = mongose;

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
    
}, {
    timestamps:true
})

const photo = mongoose.model("Photo", photoSchema);

module.exports = photo;
