import { motion } from "framer-motion";
import { Zap, ShieldCheck, Truck, Headphones, Dumbbell, Award } from "lucide-react";

function HSection() {
  const features = [
    {
      icon: Zap,
      title: "Fast Results",
      desc: "Scientifically proven supplements and programs designed for maximum efficiency.",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10"
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality",
      desc: "We only source 100% authentic, lab-tested products for our community.",
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      icon: Truck,
      title: "Quick Shipping",
      desc: "Fast and reliable delivery to your doorstep across the entire country.",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10"
    },
    {
      icon: Headphones,
      title: "Expert Support",
      desc: "Our team of fitness professionals is here to guide you every step of the way.",
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      icon: Dumbbell,
      title: "Elite Programs",
      desc: "Tailored training regimens built by industry-leading fitness experts.",
      color: "text-purple-400",
      bg: "bg-purple-400/10"
    },
    {
      icon: Award,
      title: "Trusted Brand",
      desc: "Thousands of satisfied athletes trust Imperial Fit for their performance needs.",
      color: "text-orange-400",
      bg: "bg-orange-400/10"
    }
  ];

  return (
    <section className="relative py-24 px-6 md:px-12 lg:px-16 w-full bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            Why Choose <span className="gradient-text">Imperial Fit?</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            We don't just sell products; we provide the foundation for your physical transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 hover-glow group transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HSection;