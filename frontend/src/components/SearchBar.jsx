import { Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchBar({
  search,
  setSearch,
  handleKeyDown,
  filteredProducts,
  setFilteredProducts,
  selectedIndex,
}) {
  return (
    <div className="hidden md:block relative flex-1 max-w-xl">
      <Search
        size={18}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-outline z-10"
      />
      <input
        type="text"
        placeholder="Search meals, desserts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
          w-full py-3 pl-12 pr-5 rounded-full
          bg-surface-container-low border border-outline-variant
          outline-none transition-all
          focus:bg-surface-container-lowest focus:border-luxury-gold focus:ring-4 focus:ring-surface-container
        "
      />

      {filteredProducts.length > 0 && (
        <div className="absolute top-16 left-0 w-full bg-surface-container-lowest rounded-3xl shadow-xl border border-surface-container-highest overflow-hidden z-50">
          {filteredProducts.map((product, index) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              onClick={() => {
                setSearch("");
                setFilteredProducts([]);
              }}
              className={`flex items-center gap-4 p-4 transition-all border-b border-surface-container-highest ${
                selectedIndex === index ? "bg-surface-container-low" : "hover:bg-surface-container"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-14 h-14 rounded-2xl object-cover border border-outline-variant "
              />
              <div>
                <h3 className="font-bold text-on-surface uppercase tracking-wider">{product.name}</h3>
                <p className="text-luxury-gold font-semibold">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}


