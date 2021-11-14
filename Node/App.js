const express = require("express");
const server = express();
const usersController = require("./controllers/users-controller");
const productsController = require("./controllers/products-controller");
const cartsController = require("./controllers/carts-controller");
const categoriesController = require("./controllers/categories-controller");
const ordersController = require("./controllers/orders-controller");

const errorHendler = require("./errors/error-handler");

const cors = require("cors");
// server.use(cors({ origin: "http://localhost:3000" }));
// server.use(cors({ origin: "http://localhost:4200" }));
server.use(cors({ origin: "*" }));


const loginFilter = require('./login-filter');

// Middlewares init
server.use(loginFilter());

server.use(express.json());
server.use("/users", usersController);
server.use("/products", productsController);
server.use("/carts", cartsController);
server.use("/categories", categoriesController);
server.use("/orders", ordersController);

server.use(errorHendler);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));
