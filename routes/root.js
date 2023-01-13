const user_collection = require("../db/models/user_model");

const root = async (req, res) => {
    try {
        const user = await user_collection.find()
        // res.send(`Server are running proferly.`)
        res.json({
            data: user
        })
    } catch (error) {
        res.send(`Something are wrong!`)
    }
}

module.exports = root;