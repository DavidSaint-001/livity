import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping typically takes 3–5 business days. International orders may take 7–14 business days depending on the destination."
  },
  {
    q: "Do you offer international shipping?",
    a: "Yes, we ship worldwide. Customs duties and taxes are calculated at checkout for most countries."
  },
  {
    q: "How can I track my order?",
    a: "Once your order ships, you will receive an email with a tracking number and a link to monitor your delivery."
  }
];

export default function FAQ() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-3xl mx-auto font-sans">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Help Center</p>
        <h1 className="text-3xl font-light tracking-tight">Frequently Asked Questions</h1>
      </motion.div>

      <div className="divide-y divide-gray-100">
        {faqs.map((faq, i) => (
          <details key={i} className="group py-6 cursor-pointer">
            <summary className="flex justify-between items-center list-none text-[12px] font-bold uppercase tracking-widest">
              {faq.q}
              <ChevronDown size={14} className="group-open:rotate-180 transition-transform" />
            </summary>
            <p className="mt-4 text-gray-500 text-[14px] leading-relaxed font-light">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}