import Category from "../infrastructure/schemas/Category.js";
import { createCategoryDto } from "./dto/categories.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error fetching categories" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = createCategoryDto.safeParse(req.body);

    if (!category.success) {
      return res.status(400).json({ message: "Invalid data" }).send();
    }

    await Category.create({ id: category.data.id, name: category.data.name });
    return res.status(201).send();
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error creating category" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" }).send();
    }

    return res.status(200).json(category);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Error fetching category" });
  }
};
