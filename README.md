Imperial Fit 🏋️‍♂️ - Fitness E-Commerce Platform



Imperial Fit is a dynamic, full-stack e-commerce platform crafted for fitness enthusiasts to discover and purchase premium fitness gear. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and powered by Clerk for secure user authentication, this project delivers a seamless shopping experience with a sleek, fitness-inspired design. As a CS undergraduate, I developed this project to showcase my expertise in full-stack development, API integration, and modern UI/UX design, making it a centerpiece of my internship portfolio.



✨ Features





Product Browsing: Browse fitness gear with category-based filtering and price sorting (low-to-high, high-to-low).



Cart Management: Add, remove, or adjust product quantities in a persistent cart, stored in localStorage.



Checkout Process: Secure checkout with a form for shipping details, requiring user authentication.



Payment Options: Supports Cash on Delivery and Credit Card payments (mock implementation for demonstration).



Order History: View past orders with details including products, total amount, and shipping information.



Fitness Programs: Explore curated fitness programs with expandable details for weight training, HIIT, and more.



Blog Section: Read engaging fitness articles with interactive, expandable content.



User Authentication: Secure sign-in and sign-up via Clerk with JWT-based API protection.



Responsive Design: Mobile-first interface with Tailwind CSS, featuring gradients, blur effects, and fitness-themed visuals.



Toast Notifications: Instant feedback for actions like adding to cart using Sonner.



🛠️ Tech Stack







Component



Technology





Frontend



React, Tailwind CSS, React Router





Backend



Node.js, Express.js





Database



MongoDB (Atlas)





Authentication



Clerk





Validation



Zod (frontend & backend)





Notifications



Sonner





Icons



Lucide-React





Deployment



Vercel (frontend), Render (backend)



🚀 Getting Started

Follow these steps to set up and run Imperial Fit locally.

Prerequisites





Node.js (v16 or higher)



MongoDB Atlas account



Clerk account for authentication



Git and a code editor (e.g., VS Code)

Installation





Clone the Repository

git clone https://github.com/your-username/imperial-fit.git
cd imperial-fit



Set Up Backend

cd backend
npm install





Create a .env file in the backend directory:

MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/imperial-fit
PORT=5000
CLERK_SECRET_KEY=your-clerk-secret-key



Start the backend:

npm start



Set Up Frontend

cd ../frontend
npm install





Create a .env file in the frontend directory:

VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key



Start the frontend:

npm start



Access the App



Open your browser and navigate to http://localhost:3000.



Sign in or sign up using Clerk to access features like checkout and order history.



🌐 Live Demo

Try Imperial Fit live at: https://imperial-fit.vercel.app

Backend API: https://imperial-fit-backend.onrender.com



🧑‍💻 Project Highlights





Full-Stack Development: Designed and implemented RESTful APIs with Express.js, integrated with a React frontend for a cohesive user experience.



Secure Authentication: Utilized Clerk for user management, securing API endpoints with JWT tokens.



Modern UI/UX: Created a responsive, fitness-themed interface with Tailwind CSS, featuring dynamic gradients and smooth transitions.



Robust Validation: Employed Zod for input validation on both frontend and backend, ensuring data integrity.



Scalable Database: Leveraged MongoDB with Mongoose for efficient data modeling and querying of products, orders, and categories.



🔧 Challenges & Solutions





Challenge: Maintaining cart state across page refreshes.





Solution: Implemented a CartContext with localStorage to persist cart data seamlessly.



Challenge: Ensuring secure access to checkout and order history.





Solution: Integrated Clerk’s authentication, requiring JWT tokens for protected API routes.



Challenge: Optimizing product filtering and sorting for performance.




Solution: Used MongoDB queries with dynamic filtering and sorting, reducing response times.




Author: Jehan Fernando


⭐ Star this repository if you find it inspiring! Built with 💪 and ☕ to empower fitness enthusiasts and showcase my passion for building impactful full-stack applications.