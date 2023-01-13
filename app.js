const express = require('express');
const cors = require('cors');
// require("./db/connection");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const root = require("./routes/root")
require('./db/connection')
const app = express();

const port = process.env.PORT || 8000


// ====== Middleware ======
app.use(cors())
app.use(express.json())



// ====== Root Route ======
app.get('/', root);

// ====== Routes ======
app.use("/", require('./routes/user/user'))
app.use("/product", require('./routes/product/product'))



// ====== Error Handling Middleware ======
app.use((error, req, res, next) => {
    if (error.message) {
        res.status(500).send({ error: error.message })
    } else if (error) {
        res.status(500).send({ error: "Something is wrong, please try out letter" })
    }
});

app.listen(port, () => {
    console.log(`listening to port ${port}`)
})
