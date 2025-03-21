import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/home/home.page.jsx";
import ShopPage from "./pages/shop/shop.page.jsx";
import CartPage from "./pages/cart/cart.page.jsx";
import ProgramsPage from "./pages/programs/programs.page.jsx";
import BlogPage from "./pages/blog/blog.page.jsx";

import ProductDetailPage from "./pages/product/productDetail.page.jsx";

import CheckoutPage from "./pages/checkout/checkout.page.jsx";
import PaymentPage from "./pages/payment/payment.page.jsx";
import ConfirmationPage from "./pages/confirmation/confirmation.page.jsx"; // Import the ConfirmationPage
import RootLayout from "./layouts/root.layout.jsx";
import { Toaster } from 'sonner';

import SignInPage from "./pages/auth/sign-in/sign-in.page.jsx";
import SignUpPage from "./pages/auth/sign-up/sign-up.page.jsx";

import CashOnDeliveryPage from "./pages/payment/cod/cash-on-delivery.page";
import CreditCardPaymentPage from "./pages/payment/credit/credit-card.page";

import OrdersPage from "./pages/past-orders/order.page";

import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/product/:id", // Dynamic route for product details
        element: <ProductDetailPage />,
      },
      {
        path: "/programs",
        element: <ProgramsPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/payment/cash-on-delivery", // Updated path for Cash on Delivery
        element: <CashOnDeliveryPage />,
      },
      {
        path: "/payment/credit-card", // Updated path for Credit Card Payment
        element: <CreditCardPaymentPage />,
      },
      {
        path: "/confirmation", // Add the ConfirmationPage route
        element: <ConfirmationPage />,
      },
      {
        path: "/order", // Add the ConfirmationPage route
        element: <OrdersPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster richColors />
    </ClerkProvider>
  </React.StrictMode>
);
