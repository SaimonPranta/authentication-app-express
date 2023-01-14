const express = require('express');
const router = express.Router();
const { product, addProduct, deleteProduct, getOneProduct, editProduct} = require("../../controller/product/product");


router.get("/", product)
router.get("/:id", getOneProduct)
router.post("/addProduct", addProduct)
router.post("/:id", editProduct)
router.delete("/:id", deleteProduct)




module.exports = router;