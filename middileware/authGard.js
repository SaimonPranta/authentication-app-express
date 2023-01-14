const jwt = require("jsonwebtoken");


const authGard = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded && decoded.email) {
            req.email = decoded.email
            req.id = decoded.id
            console.log("sdfsdlf")

            next()

        } else {
            res.status(401).json({ error: "Unauthorized  attempt, please try out latter." })
        }
    } catch (error) {
        res.status(401).json({ error: "Unauthorized  attempt, please try out latter." })
    }
}

module.exports = authGard;