import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Play } from "lucide-react";

function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center">
            {/* Background Image with Zoom Effect */}
            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img 
                    src="/assets/Hero/bg4.jpg" 
                    alt="Hero Background" 
                    className="w-full h-full object-cover opacity-60" 
                />
            </motion.div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-1"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent z-1"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/20 text-red-500 text-xs font-bold tracking-widest uppercase mb-6">
                            Premium Fitness Excellence
                        </span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-white"
                    >
                        Elevate Your <br />
                        <span className="gradient-text">Fitness Journey</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl"
                    >
                        Everything you need to master your body. From premium supplements to professional programs, 
                        Imperial Fit is your partner in achieving the impossible.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            to="/shop"
                            className="btn-gradient flex items-center gap-2 group !py-4 !px-8"
                        >
                            <ShoppingBag size={20} />
                            Start Shopping
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        
                        <Link
                            to="/programs"
                            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center gap-2"
                        >
                            <Play size={18} className="fill-white" />
                            Our Programs
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
            >
                <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent"></div>
            </motion.div>
        </section>
    );
}

export default Hero;