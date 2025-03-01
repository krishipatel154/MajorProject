const express = require("express");
const {
  handlePlaceOrder,
  handleGetOrderHistory,
  handleGetAllOrders,
  handleUpdateStatus,
} = require("../controllers/order");
const { handleAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/place-order", handleAuthentication, handlePlaceOrder);
router.get("/get-order-history", handleAuthentication, handleGetOrderHistory);
router.get("/get-all-orders", handleAuthentication, handleGetAllOrders);
router.put("/update-status/:id", handleAuthentication, handleUpdateStatus);

module.exports = router;
