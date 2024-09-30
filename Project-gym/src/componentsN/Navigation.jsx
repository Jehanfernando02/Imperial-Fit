import { Dumbbell, ShoppingCart } from 'lucide-react';
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navigation() {
    const { cart } = useContext(CartContext);
    const { user } = useUser();


  console.log(user?.publicMetadata?.role);

    // Calculate the total number of items in the cart
    const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-black via-red-600 to-black shadow-lg py-4 px-6 z-50 transition duration-300 ease-in-out hover:shadow-2xl">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Logo and Brand Name */}
                <div className="flex items-center gap-x-4">
                    <Dumbbell className="text-yellow-400 text-4xl" />
                    <Link className="text-4xl font-bold text-white transition duration-300" to="/">
                        Imperial Fit
                    </Link>
                </div>
                {/* Navigation Links */}
                <div className="flex items-center gap-x-6 font-semibold text-lg text-gray-200">
                    <Link className="hover:text-yellow-500 transition duration-300" to="/shop">Shop</Link>
                    <Link className="hover:text-yellow-500 transition duration-300" to="/programs">Programs</Link>
                    <Link className="hover:text-yellow-500 transition duration-300" to="/blog">Blog</Link>
                    {/* Cart */}
                    <div className="flex items-center gap-x-2">
                        <ShoppingCart className="text-gray-200" />
                        <Link to="/cart" className="flex items-center gap-x-2 relative">
                            <p className="text-lg">
                                {totalItems > 0 && totalItems} 
                            </p>
                            Cart
                        </Link>
                    </div>
                    {/* User Sign In/Out and Greeting */}
                    <SignedIn>
                        <div className="flex items-center gap-x-4">
                            Hi, {user?.firstName}
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-x-4">
                            <Link to="/sign-in" className="hover:text-yellow-500 transition duration-300">Sign In</Link>
                            <Link to="/sign-up" className="hover:text-yellow-500 transition duration-300">Sign Up</Link>
                        </div>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
