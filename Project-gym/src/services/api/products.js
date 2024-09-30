const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const getProductById = async (id) => {
  try {
    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error('Failed to fetch product');
    }

    const product = await res.json();
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching product details');
  }
};

export const getAllProducts = async ({ categoryId = "ALL", sort = "low-to-high" }) => {
  await sleep(500); 

  try {
   
    const queryParams = new URLSearchParams({
      categoryId,
      sort
    }).toString();


    const res = await fetch(`http://localhost:8000/api/products?${queryParams}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const products = await res.json();
    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching products');
  }
};
