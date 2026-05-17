import express from "express";
import {
    createOrder,
    getOrderById,
    getOrdersByUser
} from "../application/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(createOrder);
ordersRouter.route("/user/:userId").get(getOrdersByUser);
ordersRouter.route("/:id").get(getOrderById);

export default ordersRouter;
