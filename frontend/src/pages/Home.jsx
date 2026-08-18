import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import Hero from "../components/Hero";

function Home() {
  const { addToWishlist } = useWishlist();
  const { updateCart, setIsCartOpen } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        );
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (e, product) => {
    e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const productExists = cartItems.find((item) => item._id === product._id);
    let updatedCart;
    if (productExists) {
      updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    updateCart();
    setIsCartOpen(true);
    toast.success("Added To Cart");
  };

  return (
    <div className="bg-surface-container-lowest min-h-screen">
      <Hero />

      {/* Featured Cuisines (Products) */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-24 flex flex-col gap-16">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-surface-container-highest pb-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest">[ 01 ]</span>
            <h2 className="text-3xl md:text-5xl font-bold text-on-surface uppercase tracking-tighter">Curated Selections</h2>
          </div>
          <Link to="/products" className="text-sm font-bold text-on-surface flex items-center gap-2 hover:opacity-70 transition-opacity uppercase group">
            View all categories
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group relative flex flex-col bg-surface-container-lowest hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="aspect-[3/4] relative overflow-hidden bg-surface-container-high border border-outline-variant">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover  transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToWishlist(product);
                  }}
                  className="absolute top-4 right-4 z-10 text-2xl opacity-0 group-hover:opacity-100 transition-opacity hover:scale-125"
                >
                  ❤️
                </button>
              </div>
              <div className="py-6 flex flex-col gap-2">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">{product.category}</span>
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-on-surface uppercase group-hover:text-luxury-gold transition-colors">{product.name}</h3>
                  <p className="text-lg font-bold text-on-surface">₹{product.price}</p>
                </div>
                <p className="text-sm text-outline-variant line-clamp-1">{product.description}</p>
                
                <div className="w-full h-[1px] bg-outline-variant mt-4 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(e, product);
                  }}
                  className="mt-4 text-xs font-bold uppercase tracking-widest text-primary bg-luxury-gold px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity text-center hover:bg-surface-container-highest hover:text-on-surface"
                >
                  Add To Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Value Prop */}
      <section className="w-full bg-primary text-on-primary py-24 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-2 border-b border-on-primary/20 pb-8">
            <span className="text-sm font-semibold text-on-primary/60 uppercase tracking-widest">[ 02 ]</span>
            <h2 className="text-3xl md:text-5xl font-bold text-on-primary uppercase tracking-tighter">The Standard</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            <div className="flex flex-col gap-6">
              <span className="text-5xl font-light text-luxury-gold">🍽️</span>
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-bold uppercase">Local Selection</h4>
                <p className="text-on-primary/70">We partner exclusively with independent, top-tier local restaurants. No chains. Just exceptional culinary craftsmanship.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-5xl font-light text-luxury-gold">⚡</span>
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-bold uppercase">Swift Delivery</h4>
                <p className="text-on-primary/70">Optimized routing and dedicated couriers ensure your meal arrives precisely when intended, maintaining optimal temperature.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <span className="text-5xl font-light text-luxury-gold">🧾</span>
              <div className="flex flex-col gap-4">
                <h4 className="text-xl font-bold uppercase">Zero Fees</h4>
                <p className="text-on-primary/70">Transparent pricing. What you see on the menu is what you pay. We've eliminated hidden service and delivery fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[1200px] mx-auto px-6 md:px-10 py-32 flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
          <span className="text-[20vw] font-bold uppercase leading-none select-none">CRAVING</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-on-surface uppercase relative z-10 max-w-2xl tracking-tighter">
          Ready to elevate your dining?
        </h2>
        <Link to="/products" className="bg-luxury-gold text-primary font-bold uppercase px-12 py-5 rounded-full hover:opacity-90 transition-opacity relative z-10 group flex items-center gap-4 mt-8 tracking-widest">
          Explore Menus
          <span className="group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </section>

    </div>
  );
}

export default Home;


