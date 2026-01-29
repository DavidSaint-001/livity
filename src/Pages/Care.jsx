import { motion } from "framer-motion";
import { ShieldCheck, Droplets, Wind, Sun } from "lucide-react";
import image from "../assets/images/img 1.png";

const Care = () => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 mt-10 font-sans">
      <header className="max-w-3xl mb-20">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Preservation</span>
        <h1 className="text-4xl font-light tracking-tight mt-4 mb-6">Product Care Guide</h1>
        <p className="text-gray-500 font-light leading-relaxed">
          Livity items are crafted from natural materials that evolve over time. 
          Proper care ensures your pieces develop a unique character while lasting for decades.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <CareStep 
          icon={<Droplets size={24} strokeWidth={1} />}
          title="Moisture"
          desc="If leather becomes wet, allow it to dry naturally at room temperature. Avoid direct heat sources."
        />
        <CareStep 
          icon={<Sun size={24} strokeWidth={1} />}
          title="Light"
          desc="Prolonged exposure to direct sunlight may cause natural dyes to fade. Store in a cool, dark place."
        />
        <CareStep 
          icon={<Wind size={24} strokeWidth={1} />}
          title="Storage"
          desc="Use the provided dust bag when not in use. Do not store in plastic, as leather needs to breathe."
        />
        <CareStep 
          icon={<ShieldCheck size={24} strokeWidth={1} />}
          title="Cleaning"
          desc="Use a soft, dry cloth for daily cleaning. For deep stains, consult a professional leather specialist."
        />
      </div>

      <div className="mt-32 p-12 bg-gray-50 rounded-sm flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <h2 className="text-2xl font-light mb-4">The Aging Process</h2>
          <p className="text-gray-600 font-light leading-relaxed">
            Our vegetable-tanned leather will darken and develop a 'patina' over time. This is not a defect, 
            but a sign of quality and a life well-lived. Embrace the journey of your Livity piece.
          </p>
        </div>
        <div className="flex-1 aspect-square max-h-[300px] overflow-hidden">
           <img 
            src={image} 
            alt="Leather Patina" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
      </div>
    </div>
  );
};

const CareStep = ({ icon, title, desc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="space-y-4"
  >
    <div className="text-black mb-6">{icon}</div>
    <h3 className="text-[12px] font-bold uppercase tracking-widest">{title}</h3>
    <p className="text-gray-500 text-[14px] font-light leading-relaxed">{desc}</p>
  </motion.div>
);

export default Care;