import { Dumbbell, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { useContext, useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";

function Navigation() {
    const { cart } = useContext(CartContext);
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

    return (
        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-black via-red-600 to-black shadow-lg py-6 px-6 md:px-8 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-x-4">
                    <Dumbbell className="text-yellow-400 w-10 h-10" />
                    <Link className="text-3xl md:text-4xl font-bold text-white" to="/">
                        Imperial Fit
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-x-8 text-gray-200 text-lg font-semibold">
                    <Link className="hover:text-yellow-400 transition duration-300 ease-in-out" to="/shop">Shop</Link>
                    <Link className="hover:text-yellow-400 transition duration-300 ease-in-out" to="/programs">Programs</Link>
                    <Link className="hover:text-yellow-400 transition duration-300 ease-in-out" to="/blog">Blog</Link>
                    <div className="flex items-center gap-x-3">
                        <ShoppingCart className="text-gray-200 w-6 h-6" />
                        <Link to="/cart" className="relative hover:text-yellow-400 transition duration-300 ease-in-out">
                            {totalItems > 0 && (
                                <span className="absolute -top-3 -right-3 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                    {totalItems}
                                </span>
                            )}
                            Cart
                        </Link>
                    </div>
                    <SignedIn>
                        <div className="flex items-center gap-x-4">
                            <span className="text-white">Hi, {user?.firstName}</span>
                            <UserButton />
                        </div>
                    </SignedIn>
                    <SignedOut>
                        <div className="flex items-center gap-x-4">
                            <Link to="/sign-in" className="hover:text-yellow-400 transition duration-300 ease-in-out">Sign In</Link>
                            <Link to="/sign-up" className="hover:text-yellow-400 transition duration-300 ease-in-out">Sign Up</Link>
                        </div>
                    </SignedOut>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute top-20 left-0 w-full bg-black/95 md:hidden flex flex-col items-center py-8 gap-y-6 text-gray-200 text-lg font-semibold shadow-lg">
                        <Link className="hover:text-yellow-400 transition duration-300 ease-in-out" to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                        <Link className="hover:text-yellow-400 transition duration-300 ease-in-out" to="/programs" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                        <Link className="hover:text-yellow-400 transition duration-300 ease-in-out" to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                        <Link to="/cart" className="flex items-center gap-x-3 hover:text-yellow-400 transition duration-300 ease-in-out" onClick={() => setIsMenuOpen(false)}>
                            <ShoppingCart className="w-6 h-6" />
                            <span className="relative">
                                Cart
                                {totalItems > 0 && (
                                    <span className="absolute -top-3 -right-7 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </span>
                        </Link>
                        <SignedIn>
                            <div className="flex flex-col items-center gap-y-4">
                                <span className="text-white">Hi, {user?.firstName}</span>
                                <UserButton />
                            </div>
                        </SignedIn>
                        <SignedOut>
                            <div className="flex flex-col items-center gap-y-4">
                                <Link to="/sign-in" className="hover:text-yellow-400 transition duration-300 ease-in-out" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                                <Link to="/sign-up" className="hover:text-yellow-400 transition duration-300 ease-in-out" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                            </div>
                        </SignedOut>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navigation;