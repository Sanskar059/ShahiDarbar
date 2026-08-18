import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileMenu({
  search,
  setSearch,
  handleKeyDown,
  userInfo,
  logoutHandler,
  cartCount,
  wishlistCount,
  setMobileMenu,
}) {
  return (
    <div className="md:hidden mt-5 bg-surface-container-lowest rounded-3xl shadow-2xl border border-surface-container-highest p-6 flex flex-col gap-5">
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full py-3 pl-12 pr-4 rounded-full border border-outline-variant bg-surface-container-low outline-none focus:border-luxury-gold focus:ring-4 focus:ring-surface-container"
        />
      </div>

      <div className="flex flex-col gap-3 font-semibold text-on-surface uppercase tracking-widest text-sm">
        <Link to="/" onClick={() => setMobileMenu(false)} className="px-4 py-3 rounded-2xl hover:bg-surface-container-low transition-all">Home</Link>
        <Link to="/products" onClick={() => setMobileMenu(false)} className="px-4 py-3 rounded-2xl hover:bg-surface-container-low transition-all">Products</Link>
        <Link to="/wishlist" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-low">
          <Heart size={18} className="text-luxury-gold" /> Wishlist ({wishlistCount})
        </Link>
        <Link to="/cart" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-low">
          <ShoppingCart size={18} className="text-luxury-gold" /> Cart ({cartCount})
        </Link>
        <Link to="/my-orders" onClick={() => setMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-low">
          📦 My Orders
        </Link>
        {userInfo?.isAdmin && (
          <Link to="/admin" onClick={() => setMobileMenu(false)} className="px-4 py-3 rounded-2xl bg-luxury-gold text-primary">Admin</Link>
        )}
      </div>

      {userInfo ? (
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-full bg-surface-container-low border border-outline-variant">
            <User size={18} className="text-luxury-gold" />
            <span className="text-on-surface font-semibold">Hi, {userInfo.name.split(" ")[0]}</span>
          </div>
          <button onClick={() => { logoutHandler(); setMobileMenu(false); }} className="bg-primary text-on-primary py-3 rounded-2xl shadow-lg hover:opacity-90 font-bold uppercase tracking-widest text-sm">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mt-2">
          <Link to="/login" onClick={() => setMobileMenu(false)} className="text-center px-4 py-3 rounded-2xl border border-outline-variant font-bold uppercase tracking-widest text-sm">Login</Link>
          <Link to="/register" onClick={() => setMobileMenu(false)} className="text-center bg-primary text-on-primary py-3 rounded-2xl shadow-lg font-bold uppercase tracking-widest text-sm">Register</Link>
        </div>
      )}
    </div>
  );
}

