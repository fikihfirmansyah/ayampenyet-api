module.exports = app => {
    var router = require("express").Router();
    const products = require("../controllers/product.controller.js");

    router.post("/", products.create);
    router.get("/", products.findAll);
    router.get("/:id", products.findOne);
    router.put("/:id", products.update);
    router.delete("/:id", products.delete);

    app.use("/api/products", router);
}