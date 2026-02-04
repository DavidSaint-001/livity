import { motion } from "framer-motion";
import image from "../assets/images/img 3.png";

const Story = () => {
    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 mt-10 font-sans overflow-x-hidden">
            {/* HERO SECTION */}
            <div className="max-w-4xl mx-auto text-center mb-24">
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400"
                >
                    The Livity Ethos
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-5xl font-light tracking-tight mt-6 mb-8"
                >
                    Honest Materials. <br /> Intentional design.
                </motion.h1>
            </div>

            {/* NARRATIVE SECTION 1 */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="aspect-[4/5] bg-gray-100 overflow-hidden"
                >
                    <img
                        src={image}
                        alt="crafting-process"
                        // Added h-full here to fix the "half-loaded" look
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </motion.div>
                <div className="space-y-6 max-w-md">
                    <h2 className="text-xl font-light uppercase tracking-widest text-gray-400">01. The Beginning</h2>
                    <p className="text-gray-600 font-light leading-relaxed">
                        Livity was founded on a singular premise: that the objects we carry every day should be built to last a lifetime. In an era of disposable fashion, we chose a different path.
                    </p>
                </div>
            </div>

            {/* NARRATIVE SECTION 2 */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                <div className="space-y-6 max-w-md md:order-1 order-2 md:ml-auto md:text-right">
                    <h2 className="text-xl font-light uppercase tracking-widest text-gray-400"> 02. Sustainability </h2>
                    <p className="text-gray-600 font-light leading-relaxed">
                        We believe that sustainability is synonymous with longevity. By creating products that don't need to be replaced, we reduce our collective footprint on the world.
                    </p>
                    <p className="text-gray-600 font-light leading-relaxed">
                        Our supply chain is transparent, working exclusively with small-scale artisans who share our commitment to ethical production and fair living wages.
                    </p>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="aspect-[4/5] bg-gray-100 overflow-hidden md:order-2 order-1"
                >
                    <img
                        src={image}
                        alt="our Studio"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                </motion.div>
            </div>

            {/* QUOTE SECTION */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center py-20 border-t border-gray-100"
            >
                <p className="text-2xl font-light italic text-gray-400 max-w-2xl mx-auto px-4">
                    "Simplicity is the ultimate sophistication. We design for the person who values substance over trends."
                </p>
            </motion.div>
        </div>
    );
};

export default Story;