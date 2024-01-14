module.exports = app => {
    var router = require("express").Router();
    const users = require("../controllers/user.controller.js");

    router.post("/", users.create);
    router.get("/", users.findAll);
    router.get("/:id", users.findOne);
    // router.delete("/:id", users.delete);

    app.use("/api/users", router);
}