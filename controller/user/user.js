const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user_collection = require("../../db/models/user_model");


exports.login = async (req, res) => {
    try {
        const { email, password } = await req.body

        if (email && password) {
            const userArry = await user_collection.find({ email: email });
         

            if (userArry.length > 0) {
                bcrypt.compare(password, userArry[0].password, async (err, result) => {
                    if (result) {
                        const token = await jwt.sign(
                            {
                                email: userArry[0].email,
                                id: userArry[0]._id
                            },
                            process.env.JWT_SECRET_KEY,
                            { expiresIn: "3d" }
                        );
                        userArry[0].password = null
                        res.status(200).json({
                            data: userArry[0],
                            token: token,
                            sucess: "You are sucessfully login"
                        })
                    } else {
                        res.status(401).json({ failed: "user/password are invalid, please try again." })
                    }
                })

            } else {
                res.status(401).json({ failed: "user/password are invalid, please try again." })
            }
        } else {
            res.status(401).json({ failed: "user/password are invalid, please try again." })
        }

    } catch (err) {
        res.status(404).send({ failed: "Some thing is wrong, please try again." })
    }
}
exports.registration = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = await req.body

        if (firstName && lastName && email && password) {

            const hashingPassword = await bcrypt.hash(password, 10)
            const userInfo = await {
                firstName,
                lastName,
                email,
                password: hashingPassword
            }

            const documents = await new user_collection(userInfo)
            const createdUser = await documents.save()
            if (createdUser.email) {
                const token = await jwt.sign(
                    {
                        email: createdUser.email,
                        id: createdUser._id
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1d" }
                );
                createdUser.password = null

                res.status(201).json({
                    data: createdUser,
                    sucess: "sucessfully created your accout",
                    token: token
                })
            } else {
                res.status(404).send({ failed: "failed to Create your account, please tryout latter" })
            }
        } else {
            res.status(500).send({ failed: "your porvided Reference number & Phone Nmuber must be number" })
        }

    } catch (err) {
        console.log(err)
        res.status(404).send({ failed: "Your Email, Phone Number Must Be Uniqu, please tryout latter" })
    }
}


