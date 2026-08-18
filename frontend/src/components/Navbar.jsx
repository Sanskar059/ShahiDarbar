import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

function Navbar() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    document.cookie = "userInfo=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  const handleKeyDown = (e) => {
    if (!filteredProducts.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => prev < filteredProducts.length - 1 ? prev + 1 : 0);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => prev > 0 ? prev - 1 : filteredProducts.length - 1);
    }
    if (e.key === "Enter" && selectedIndex >= 0) {
      navigate(`/product/${filteredProducts[selectedIndex]._id}`);
      setSearch("");
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5));
      setSelectedIndex(-1);
    }
  }, [search, products]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border-surface-container-highest"
          : "bg-surface-container-lowest border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-4 flex flex-col">
        <div className="flex items-center justify-between gap-6">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-extrabold text-on-surface uppercase tracking-tighter leading-none">
              Shahi<span className="text-luxury-gold italic font-normal">Darbar</span>
            </h1>
          </Link>

          {/* DESKTOP SEARCH */}
          <SearchBar 
            search={search} 
            setSearch={setSearch} 
            handleKeyDown={handleKeyDown} 
            filteredProducts={filteredProducts} 
            setFilteredProducts={setFilteredProducts} 
            selectedIndex={selectedIndex} 
          />

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-6 text-label-md font-label-md text-on-surface-variant uppercase tracking-widest">
            <Link to="/" className="hover:text-on-surface transition-colors">Home</Link>
            <Link to="/products" className="hover:text-on-surface transition-colors">Menu</Link>
            <Link to="/my-orders" className="hover:text-on-surface transition-colors">Orders</Link>

            <div className="flex items-center gap-4 ml-4">
              <Link to="/wishlist" className="relative hover:text-on-surface transition-colors">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="relative hover:text-on-surface transition-colors">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-luxury-gold text-primary text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {userInfo?.isAdmin && (
              <Link to="/admin" className="px-4 py-2 rounded-full border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-primary transition-colors ml-2">
                Admin
              </Link>
            )}

            {userInfo ? (
              <div className="flex items-center gap-4 ml-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer">
                    <User size={16} className="text-on-primary" />
                  </div>
                </div>
                <button onClick={logoutHandler} className="text-on-surface-variant hover:text-error transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-2">
                <Link to="/login" className="hover:text-on-surface transition-colors">Login</Link>
                <Link to="/register" className="bg-primary text-on-primary px-6 py-2 rounded-full hover:opacity-90 transition-opacity">Register</Link>
              </div>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 rounded-xl hover:bg-surface-container transition">
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenu && (
          <MobileMenu 
            search={search}
            setSearch={setSearch}
            handleKeyDown={handleKeyDown}
            userInfo={userInfo}
            logoutHandler={logoutHandler}
            cartCount={cartCount}
            wishlistCount={wishlistCount}
            setMobileMenu={setMobileMenu}
          />
        )}
      </div>
    </header>
  );
}

export default Navbar;

