import Product from "../infrastructure/schemas/Product.js";
import { createProductDto } from "./dto/products.js";
import { ValidationError } from "../domain/errors/validation-error.js";
import { NotFoundError } from "../domain/errors/not-found-error.js";
import mongoose from "mongoose"; 

export const getProducts = async (req, res) => {
  try {
    const { categoryId, sort } = req.query; 

    
    let filter = {};
    if (categoryId && categoryId !== "ALL") {

      if (mongoose.Types.ObjectId.isValid(categoryId)) {
        filter.categoryId = categoryId; 
      } else {
        return res.status(400).json({ error: "Invalid categoryId" }); 
      }
    }

    // Fetch products from the database using the filter
    const products = await Product.find(filter);

    // Sort products based on price if a sort option is provided
    if (sort === 'low-to-high') {
      //Ascending
      products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sort === 'high-to-low') {
      // Descending 
      products.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return res.status(200).json(products); // Send the sorted products back to the client
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: error.message }); 
  }
};

// Create a new product
export const createProduct = async (req, res, next) => {
  try {
    const product = createProductDto.safeParse(req.body); // Validate the incoming product data

    if (!product.success) {
      throw new ValidationError(product.error.message); 
    }

    // Create a new product in the database
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

// Get a product by its ID
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id; // Get the product ID from the request parameters
    const product = await Product.findById(id).populate("categoryId"); // Fetch the product by ID and populate category details

    if (!product) {
      throw new NotFoundError("Product not found"); 
    }

    return res.status(200).json(product); 
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};
