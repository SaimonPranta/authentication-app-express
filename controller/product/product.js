const product_collection = require("../../db/models/product_model")

exports.product = async (req, res) => {
    try {
        const products = await product_collection.find();
        res.json({ data: products })
    } catch (error) {
        res.json({ failed: "failed to load data" })
    }
}

exports.addProduct = async (req, res) => {
    try {
        const { title, dic, price, disCout, brand } = req.body
        if (title && dic && price && disCout && brand) {
            const documents = await new product_collection(res.body)
            const product = await documents.save()
            res.json({data: product})
        } else {
            console.log(req.body)
            res.json({ failed: "something is wrong, please try again." })
        }

    } catch (error) {
        console.log(error)
        res.json({ failed: "something is wrong, please try again." })
    }
}