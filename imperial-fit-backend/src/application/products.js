import mongoose from "mongoose";
import Product from "../infrastructure/schemas/Product.js";
import { createProductDto } from "./dto/products.js";
import { ValidationError } from "../domain/errors/validation-error.js";
import { NotFoundError } from "../domain/errors/not-found-error.js";

export const getProducts = async (req, res) => {
  try {
    const { categoryId } = req.query;
    let filter = {};

    if (categoryId && categoryId !== "ALL") {
      if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ error: "Invalid categoryId format" });
      }
      filter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }

    const products = await Product.find(filter);
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res, next) => {
  try {
    //! We need to make sure that the data is always in the correct format
    const product = createProductDto.safeParse(req.body);

    if (!product.success) {
      throw new ValidationError(product.error.message);
    }

    await Product.create({
      categoryId: product.data.categoryId,
      image: product.data.image,
      name: product.data.name,
      price: product.data.price,
      description: product.data.description,
    });
    return res.status(201).send();
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    const product = await Product.findById(id).populate("categoryId");
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
