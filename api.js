const express = require("express");
const bodyParser = require("body-parser");
const orderRoute = require("./routes/orderRoute");

const app = express();

app.use(bodyParser.json());

app.use("/api/orders", orderRoute);

var port = process.env.port || 8877;
app.listen(port);
console.log("listen to port : " + port);
