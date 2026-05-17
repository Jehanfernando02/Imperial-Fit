import { Dumbbell, ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { useContext, useState } from "react";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

function Navigation() {
    const { cart } = useContext(CartContext);
    const { user } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

    const navLinks = [
        { to: "/shop", label: "Shop" },
        { to: "/dashboard", label: "Dashboard" },
        { to: "/programs", label: "Programs" },
        { to: "/blog", label: "Blog" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-8 py-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-x-3 group">
                    <div className="relative">
                        <Dumbbell className="text-yellow-400 w-9 h-9 transition-transform duration-300 group-hover:rotate-12" />
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                        Imperial <span className="gradient-text">Fit</span>
                    </span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-x-1 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 group"
                        >
                            {link.label}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-400 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                        </Link>
                    ))}

                    {/* Cart */}
                    <Link
                        to="/cart"
                        className="relative flex items-center gap-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5 ml-2"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Cart</span>
                        {totalItems > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 left-7 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-lg shadow-red-500/30"
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </Link>

                    {/* Auth */}
                    <div className="flex items-center gap-x-3 ml-4 pl-4 border-l border-white/10">
                        <SignedIn>
                            <span className="text-gray-400 text-sm">Hi, <span className="text-yellow-400 font-semibold">{user?.firstName}</span></span>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <Link to="/sign-in" className="text-gray-300 hover:text-white transition-colors duration-300 px-3 py-1.5 rounded-lg hover:bg-white/5">Sign In</Link>
                            <Link to="/sign-up" className="btn-gradient text-sm !py-2 !px-4 !rounded-lg">Sign Up</Link>
                        </SignedOut>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
                    >
                        <div className="flex flex-col items-center py-6 gap-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-4/5 text-center py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-medium"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                to="/cart"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-4/5 flex items-center justify-center gap-x-3 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300 font-medium"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                <span className="relative">
                                    Cart
                                    {totalItems > 0 && (
                                        <span className="absolute -top-2 -right-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                            {totalItems}
                                        </span>
                                    )}
                                </span>
                            </Link>
                            <div className="w-4/5 h-px bg-white/10 my-2" />
                            <SignedIn>
                                <div className="flex items-center gap-x-4 py-2">
                                    <span className="text-gray-400">Hi, <span className="text-yellow-400 font-semibold">{user?.firstName}</span></span>
                                    <UserButton />
                                </div>
                            </SignedIn>
                            <SignedOut>
                                <Link to="/sign-in" onClick={() => setIsMenuOpen(false)} className="w-4/5 text-center py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300">Sign In</Link>
                                <Link to="/sign-up" onClick={() => setIsMenuOpen(false)} className="w-4/5 text-center btn-gradient !rounded-lg py-3">Sign Up</Link>
                            </SignedOut>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

export default Navigation;