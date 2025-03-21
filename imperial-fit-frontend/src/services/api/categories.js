// const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const getAllCategories = async () => {
    // await sleep(1000);
  const res = await fetch("http://localhost:8000/api/categories", {
    method: "GET",
  });
  
  const categories = await res.json();
//   console.log('Fetched categories:', categories); 
  return categories;
};

