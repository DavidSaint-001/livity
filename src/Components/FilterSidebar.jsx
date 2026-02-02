import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";


const filterColors =[
    { name: "Oatmeal", hex: "#E3DCCB" },
    { name: "Black", hex: "#1A1A1A" },
    { name: "Slate", hex: "#707880" },
    { name: "Camel", hex: "#C19A6B" },
    { name: "Stone", hex: "#A8A29E"}
];


const FilterSidebar = ({ isOpen, onClose, selectedColors, onColorChange, selectedPrices, onPriceChange }) => {
    const [tempSelectedColors, setTempSelectedColors] = useState(selectedColors);
    const [tempSelectedPrices, setTempSelectedPrices] = useState(selectedPrices);

    return (
        <>
        {isOpen && (
            <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-[20] backdrop-blur-[2px]"
        />
        )}

        <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{type: "tween", duration: 0.4, ease: [0.22, 1, 0.26,1]}}
        className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[101] shadow-xl p-8 overflow-y-auto"
        >
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-[14px] font-bold uppercase tracking-[0.2em] ">filter</h2>
                <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
                    <X size={24} strokeWidth={1} />  
                </button>
            </div>

            {/* COLOR FILTERS */}

            <div className="mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Color</h3>
                <div className="grid grid-cols-2 gap-4">
                    {filterColors.map((color) => (
                        <label key={color.name} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" checked={tempSelectedColors.includes(color.name)} onChange={(e) => { if (e.target.checked) setTempSelectedColors([...tempSelectedColors, color.name]); else setTempSelectedColors(tempSelectedColors.filter(c => c !== color.name)); }} className="hidden peer" />
                            <div className="w-5 h-5 rounded-full  border border-gray-200 peer-checked:border-black p-0.5 transition-all">
                             <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color.hex}} />
                            </div>
                            <span className="text-[13px] text-gray-600 group-hover:text-black transition-colours">{color.name}</span>
                        </label>
                    ))}
                </div>
            </div>


            {/* PRICE FILTERS */}
            <div className="mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Price</h3>
                <div className="space-y-4">
                    {["under $100", "$100 - $250", "$250 - $500", "over $500"].map((range) => (
                        <label key={range} className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={tempSelectedPrices.includes(range)} onChange={(e) => { if (e.target.checked) setTempSelectedPrices([...tempSelectedPrices, range]); else setTempSelectedPrices(tempSelectedPrices.filter(p => p !== range)); }} className="w-4 h-4 border-gray-300 accent-black" />
                            <span className="text-[13px] text-gray-600">{range}</span>
                        </label>
                    ))} 
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-auto pt-10 grid grid-cols-2 gap-4 border-t border-gray-100">
            <button onClick={() => { setTempSelectedColors([]); setTempSelectedPrices([]); }} className="py-4 text-[11px] font-bold uppercase tracking-widest border border-black hover:bg-50 transition-colors">Clear All</button>
            <button onClick={() => { onColorChange(tempSelectedColors); onPriceChange(tempSelectedPrices); onClose(); }} className="py-4 text-[11px] font-bold uppercase tracking-widest border border-black hover:bg-800 transition-colors">Apply</button>
            </div>
        </motion.div>
        </>
    );
};

export default FilterSidebar;