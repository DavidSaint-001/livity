import { useWishlist } from "../Context/WishlistContext";
import BackButton from "../Components/BackButton";
import ProductCard from "@/Components/ProductCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-20 mt-10">
      <BackButton />
      <h1 className="text-2xl font-light uppercase tracking-widest mb-10">My Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="py-20 text-center border-t border-gray-100">
          <p className="text-gray-400 text-[11px] uppercase tracking-widest">Your wishlist is empty.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;