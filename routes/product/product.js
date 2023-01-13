const express = require('express');
const router = express.Router();
const { product, addProduct } = require("../../controller/product/product");


router.get("/", product)
router.post("/addProduct", addProduct)

module.exports = router;