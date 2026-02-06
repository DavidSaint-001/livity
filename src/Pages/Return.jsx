import { motion } from "framer-motion";
import BackButton from "../Components/BackButton";

export default function Returns() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-3xl mx-auto font-sans">
      <BackButton />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Service</p>
        <h1 className="text-3xl font-light tracking-tight">Returns & Exchanges</h1>
      </motion.div>

      <div className="prose prose-sm text-gray-600 space-y-8 font-light leading-relaxed">
        <section>
          <h2 className="text-black font-medium text-lg mb-4">Our Policy</h2>
          <p>We accept returns within 14 days of delivery. Items must be in their original condition, unworn, unwashed, and with all tags attached.</p>
        </section>

        <section>
          <h2 className="text-black font-medium text-lg mb-4">How to Start a Return</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Visit our returns portal with your order number.</li>
            <li>Select the items you wish to return.</li>
            <li>Print the prepaid shipping label provided.</li>
            <li>Drop off the package at any authorized carrier location.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}