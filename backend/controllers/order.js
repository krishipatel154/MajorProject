const User = require("../models/user");
const Book = require("../models/books");
const Order = require("../models/order");

const handlePlaceOrder = async (req, res) => {
  try {
    const { id } = req.headers;
    const { order } = req.body;
    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });
      const orderDataFromDB = await newOrder.save();
      // saving order data in user model
      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromDB._id },
      });
      // clearing cart
      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }
    return res.status(200).json({ message: "Order Placed Successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetOrderHistory = async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "course" },
    });
    const orderData = userData.orders.reverse();
    return res.status(200).json({ data: orderData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};
const handleGetAllOrders = async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({ data: userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleUpdateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You don't have admin priviliges!!" });
    }
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    return res.status(200).json({ message: "Status Updated Successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = {
  handlePlaceOrder,
  handleGetOrderHistory,
  handleGetAllOrders,
  handleUpdateStatus,
};
