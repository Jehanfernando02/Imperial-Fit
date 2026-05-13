// src/services/api/programs.js
const API_BASE_URL = "https://imperial-fit.onrender.com/api"; // Replace with your actual Render URL

export const getPrograms = async () => {
  const response = await fetch(`${API_BASE_URL}/programs`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to fetch programs");
  return response.json();
};

export const enrollInProgram = async (userId, programId) => {
  const response = await fetch(`${API_BASE_URL}/enroll`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, programId }),
  });
  if (!response.ok) throw new Error("Failed to enroll");
  return response.json();
};