import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import BackButton from "../Components/BackButton";
import { supabase } from "../supabaseClient";
import emailjs from '@emailjs/browser';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Initialize EmailJS with your Public Key
  useEffect(() => {
    emailjs.init("f0poUfzQw_6i3mD79");
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 95 ? 0 : 15;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert("Your bag is empty");
    setLoading(true);

    const orderNo = `LIV-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
      // 1. SAVE TO SUPABASE (Orders Table)
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert([{
          order_number: orderNo,
          total_amount: total,
          customer_name: `${formData.firstName} ${formData.lastName}`,
          customer_email: formData.email,
          shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
          status: 'processing'
        }])
        .select().single();

      if (orderErr) throw orderErr;

      // 2. SAVE INDIVIDUAL ITEMS (Order Items Table)
      const { error: itemsErr } = await supabase
        .from('order_items')
        .insert(cartItems.map(item => ({
          order_id: order.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
          product_color: item.selectedColor || 'Standard'
        })));

      if (itemsErr) throw itemsErr;

      // 3. PREPARE EMAIL DATA
      const itemSummary = cartItems.map(item => 
        `- ${item.name} [${item.selectedColor || 'Standard'}] (x${item.quantity}) — £${(item.price * item.quantity).toFixed(2)}`
      ).join('\n');

      const templateParams = {
        order_number: orderNo,
        total_amount: total.toFixed(2),
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        item_summary: itemSummary
      };

      // 4. SEND EMAIL VIA EMAILJS
      await emailjs.send(
        'service_rzaor3s', 
        'livity_order_template', 
        templateParams,
        'f0poUfzQw_6i3mD79'
      );

      // 5. SUCCESS REDIRECT
      clearCart();
      navigate("/success", { state: { orderNo: orderNo } });

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-10 max-w-[1200px] mx-auto font-sans bg-white">
      <BackButton />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mt-8">
        
        {/* LEFT: FORMS */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border-b pb-2">01. Contact</h2>
            <input required name="email" type="email" placeholder="EMAIL ADDRESS" className="w-full border-b border-gray-200 py-3 text-[11px] outline-none focus:border-black transition-colors bg-transparent" onChange={handleInputChange} />
          </section>

          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border-b pb-2">02. Shipping</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <input required name="firstName" placeholder="FIRST NAME" className="border-b border-gray-200 py-3 text-[11px] outline-none focus:border-black bg-transparent" onChange={handleInputChange} />
              <input required name="lastName" placeholder="LAST NAME" className="border-b border-gray-200 py-3 text-[11px] outline-none focus:border-black bg-transparent" onChange={handleInputChange} />
              <input required name="address" placeholder="STREET ADDRESS" className="col-span-2 border-b border-gray-200 py-3 text-[11px] outline-none focus:border-black bg-transparent" onChange={handleInputChange} />
              <input required name="city" placeholder="CITY" className="border-b border-gray-200 py-3 text-[11px] outline-none focus:border-black bg-transparent" onChange={handleInputChange} />
              <input required name="postalCode" placeholder="POSTCODE" className="border-b border-gray-200 py-3 text-[11px] outline-none focus:border-black bg-transparent" onChange={handleInputChange} />
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border-b pb-2">03. Payment</h2>
            <div className="border border-black p-4 flex justify-between items-center bg-gray-50 mb-6">
              <span className="text-[10px] font-bold tracking-widest uppercase">Credit Card (Simulation)</span>
              <Lock size={14} />
            </div>
            <div className="p-4 bg-gray-50 border border-gray-100 space-y-4">
               <input disabled placeholder="Card Number" className="w-full bg-transparent border-b text-[11px] py-2 outline-none" />
               <div className="flex gap-4">
                  <input disabled placeholder="MM/YY" className="w-1/2 bg-transparent border-b text-[11px] py-2 outline-none" />
                  <input disabled placeholder="CVC" className="w-1/2 bg-transparent border-b text-[11px] py-2 outline-none" />
               </div>
            </div>
          </section>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-black text-white py-5 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "PROCESSING..." : `PLACE ORDER — £${total.toFixed(2)}`}
          </button>
        </motion.div>

        {/* RIGHT: SUMMARY */}
        <div className="lg:sticky lg:top-32 bg-[#fdfdfd] p-8 border border-gray-100 shadow-sm">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Summary</h2>
          <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto no-scrollbar">
            {cartItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex gap-4">
                  <div className="w-12 h-16 bg-white border flex-shrink-0">
                    <img src={item.mainImage || item.image} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest">{item.name}</h4>
                    <p className="text-[9px] text-gray-400 uppercase">{item.selectedColor || "Standard"}</p>
                    <p className="text-[9px]">QTY: {item.quantity}</p>
                  </div>
                </div>
                <span className="text-[11px] font-medium">£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between text-[11px] text-gray-500 tracking-wider"><span>SUBTOTAL</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-[11px] text-gray-500 tracking-wider"><span>SHIPPING</span><span>{shipping === 0 ? "FREE" : `£${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between text-[14px] font-bold pt-4 border-t border-black mt-2"><span>TOTAL</span><span>£{total.toFixed(2)}</span></div>
          </div>
        </div>
      </form>
    </div>
  );
}