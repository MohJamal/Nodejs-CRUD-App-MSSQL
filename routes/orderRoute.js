const express = require("express");
const router = express.Router();
const orderCon = require("../controllers/orderCon");

router.get("/", orderCon.getOrders);
router.get("/:id", orderCon.getOrderById);
router.post("/", orderCon.addOrder);
router.delete("/:id", orderCon.deleteOrderById);
router.put("/", orderCon.updateOrder);

module.exports = router;
