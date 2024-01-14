const Order = require("../models/order.model.js");

// Create and Save a new Order
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Order
    const order = new Order({
        id: req.body.id,
        nama_produk: req.body.nama_produk,
        harga: req.body.harga
    });

    // Save Order in the database
    Order.create(order, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Order.findAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving orders."
            });
        else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Order.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Order with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Order.updateById(
        req.params.id,
        new Order(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Order with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Order with id " + req.params.id
                    });
                }
            } else res.send(data);
        }
    );
}


exports.delete = (req, res) => {
    Order.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Order with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Order with id " + req.params.id
                });
            }
        } else res.send({ message: `Order was deleted successfully!` });
    });
}