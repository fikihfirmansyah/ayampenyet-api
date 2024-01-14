const sql = require("./db.js");
const now = new Date();

// constructor
const Order = function(order) {
    this.id = order.id;
    this.product_id = order.product_id;
    this.user_id = order.user_id;
    this.total_harga = order.total_harga;
    this.created_at = now
};

Order.create = (newOrder, result) => {
    sql.query("INSERT INTO orders SET ?", newOrder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created order: ", { id: res.insertId, ...newOrder });
        result(null, { id: res.insertId, ...newOrder });
    });
};

Order.findAll = result => {
    sql.query("SELECT * FROM orders", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("orders: ", res);
        result(null, res);
    });
};

Order.findById = (id, result) => {
    sql.query(`SELECT * FROM orders WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found order: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Order with the id
        result({ kind: "not_found" }, null);
    });
};


module.exports = Order;