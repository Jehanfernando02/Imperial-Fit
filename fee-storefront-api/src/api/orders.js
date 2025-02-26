import express from "express";
import {
    createOrder,
    getOrderById
} from "../application/orders.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(createOrder);
ordersRouter.route("/:id").get(getOrderById);

export default ordersRouter;
