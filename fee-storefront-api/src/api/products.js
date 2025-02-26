// routes/products.js

import express from "express";
import { getProducts, createProduct, getProductById } from "../application/products.js";

const productsRouter = express.Router();

productsRouter.route("/")
  .get(getProducts)
  .post(createProduct);

productsRouter.route("/:id")
  .get(getProductById);

export default productsRouter;
