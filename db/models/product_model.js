const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    title: {
        type: String
    },
    dic: {
        type: String
    },
    price: {
        type: String
    },
    disCout: {
        type: String,
    },
    brand: {
        type: String,
    }
},
    { timestamps: true }
)
const product_collection = new mongoose.model("products_info", userSchema)

module.exports = product_collection;