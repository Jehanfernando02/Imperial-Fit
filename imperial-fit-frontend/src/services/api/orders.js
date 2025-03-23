export const createOrder = async (data) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch("https://imperial-fit-backend.onrender.com/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

export const getOrderById = async (id) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://imperial-fit-backend.onrender.com/api/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};



// src/services/api/orders.js
export const getOrdersByUser = async (userId) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://imperial-fit-backend.onrender.com/api/orders/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }

  return await res.json();
};
