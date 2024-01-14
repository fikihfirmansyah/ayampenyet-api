module.exports = app => {
    var router = require("express").Router();
    const orders = require("../controllers/order.controller.js");

    router.post("/", orders.create);
    router.get("/", orders.findAll);
    router.get("/:id", orders.findOne);
    router.put("/:id", orders.update);
    router.delete("/:id", orders.delete);

    app.use("/api/orders", router);
}