const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8081;

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to ayampenyet application.' });
});

require('./routes/product.routes.js')(app);
require('./routes/order.routes.js')(app);
require('./routes/user.routes.js')(app);

// set port, listen for requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});