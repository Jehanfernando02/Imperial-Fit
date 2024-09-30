import express from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
} from "../application/categories.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";

const categoriesRouter = express.Router();

categoriesRouter
  .route("/")
  .get(getCategories)
  .post(ClerkExpressRequireAuth({}), AuthorizationMiddleware, createCategory);

categoriesRouter.route("/:id").get(getCategoryById);

export default categoriesRouter;
