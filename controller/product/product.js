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
            const documents = await new product_collection(req.body)
            const product = await documents.save()
            res.json({ data: product })
        } else {
            res.json({ failed: "something is wrong, please try again." })
        }

    } catch (error) {
        res.json({ failed: "something is wrong, please try again." })
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = await req.params
        const response = await product_collection.deleteOne({ _id: id })
        if (response.deletedCount > 0) {
            res.json({ sucess: "Sucessfully deleted product." })
        } else {
            res.json({ failed: "something is wrong, please try again." })
        }


    } catch (error) {
        res.json({ failed: "something is wrong, please try again." })
    }
}
exports.getOneProduct = async (req, res) => {
    try {
        const { id } = await req.params
        const data = await product_collection.findOne({ _id: id })

        if (data._id) {
            res.json({ data: data })
        } else {
            res.json({ failed: "something is wrong, please try again." })
        }


    } catch (error) {
        res.json({ failed: "something is wrong, please try again." })
    }
}

exports.editProduct = async (req, res) => {
    try {
        const { title, dic, price, disCout, brand } = await req.body
        const { id } = await req.params

        if (id && title && dic && price && disCout && brand) {
            const data = await product_collection.findOneAndUpdate(
                { _id: id },
                {
                    ...req.body
                }
            )
            if (data._id) {
                res.json({ data: data })
            }
        } else {
            res.json({ failed: "something is wrong, please try again." })
        }

    } catch (error) {
        res.json({ failed: "something is wrong, please try again." })
    }
}