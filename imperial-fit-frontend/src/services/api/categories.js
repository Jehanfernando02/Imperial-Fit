// src/services/api/categories.js
const apiUrl = "https://imperial-fit-backend.onrender.com";  // Deployed backend URL

export const getAllCategories = async () => {
  const res = await fetch(`${apiUrl}/api/categories`, {
    method: "GET",
  });

  const categories = await res.json();
  return categories;
};
