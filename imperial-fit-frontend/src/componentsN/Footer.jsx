import { Dumbbell, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="relative bg-neutral-950 border-t border-white/5">
            {/* Gradient top line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-x-3 mb-4">
                            <Dumbbell className="text-yellow-400 w-8 h-8" />
                            <span className="text-2xl font-bold text-white">
                                Imperial <span className="gradient-text">Fit</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Premium fitness gear and programs to elevate your journey. Built for champions.
                        </p>
                        <div className="flex items-center gap-3">
                            {[Instagram, Twitter, Youtube].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { to: "/shop", label: "Shop" },
                                { to: "/programs", label: "Programs" },
                                { to: "/blog", label: "Blog" },
                                { to: "/cart", label: "Cart" },
                                { to: "/order", label: "Past Orders" },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-3">
                            {["FAQ", "Shipping Policy", "Return Policy", "Privacy Policy", "Terms of Service"].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors duration-300 text-sm">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="text-red-400 mt-0.5 shrink-0" />
                                <span className="text-gray-500 text-sm">Colombo, Sri Lanka</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="text-red-400 shrink-0" />
                                <span className="text-gray-500 text-sm">+94 77 123 4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-red-400 shrink-0" />
                                <span className="text-gray-500 text-sm">hello@imperialfit.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} Imperial Fit. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs">
                        Designed & Built by <span className="text-yellow-400/80 font-medium">Jehan Fernando</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
