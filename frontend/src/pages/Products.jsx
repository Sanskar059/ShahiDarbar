import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function Products() {

  const { addToWishlist } = useWishlist()

  const {
    updateCart,
    setIsCartOpen,
  } = useCart()

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All")

  /* FETCH PRODUCTS */

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products`
        )
        console.log("API DATA:", data)

        setProducts(
          Array.isArray(data) ? data : []
        )
        console.log("Products Loaded")

      } catch (error) {

        console.log(error)

        setProducts([])

      }

    }

    fetchProducts()

  }, [])

  /* ADD TO CART */

  const addToCart = (e, product) => {

    e.stopPropagation()

    const cartItems =
      JSON.parse(localStorage.getItem("cartItems")) || []

    const productExists = cartItems.find(
      (item) => item._id === product._id
    )

    let updatedCart

    if (productExists) {

      updatedCart = cartItems.map((item) =>

        item._id === product._id

          ? {
            ...item,
            quantity: item.quantity + 1,
          }

          : item

      )

    } else {

      updatedCart = [

        ...cartItems,

        {
          ...product,
          quantity: 1,
        },

      ]

    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(updatedCart)
    )
    updateCart()

    setIsCartOpen(true)

    toast.success("Added To Cart")

  }

  /* FILTERS */

  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory

      return matchesSearch && matchesCategory

    }
  )

  /* CATEGORIES */

  const categories = [

    "All",

    ...new Set(
      products.map((product) => product.category)
    ),

  ]

  return (

    <div className="bg-surface-container-lowest min-h-screen px-6 py-24">

      {/* HEADER */}

      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest"></span>
        <h1 className="text-5xl font-bold text-on-surface uppercase tracking-tighter mt-2">
          Explore Menus
        </h1>

        <p className="text-xl text-on-surface-variant mt-4">
          Curated selection of premium culinary experiences.
        </p>

      </div>

      {/* SEARCH */}

      <div className="max-w-[800px] mx-auto mb-16 relative">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-outline-variant">🔍</span>
        <input
          type="text"
          placeholder="SEARCH PRODUCTS..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-5 pl-14 rounded-full border border-outline-variant bg-surface-container-low text-on-surface uppercase font-bold outline-none focus:border-luxury-gold focus:ring-4 focus:ring-surface-container transition-all"
        />

      </div>

      {/* CATEGORY FILTER */}

      <div className="flex flex-wrap justify-center gap-4 mb-16">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category)
            }
            className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all border ${selectedCategory === category
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container-lowest text-on-surface border-outline-variant hover:border-on-surface"
              }`}
          >

            {category}

          </button>

        ))}

      </div>

      {/* PRODUCTS GRID */}

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {filteredProducts.map((product) => (

          <div
            key={product._id}
            className="group relative flex flex-col bg-surface-container-lowest hover:-translate-y-2 transition-transform duration-500"
          >

            {/* IMAGE */}

            <Link to={`/product/${product._id}`} className="aspect-[3/4] relative overflow-hidden bg-surface-container-high border border-outline-variant">

              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover  transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <button
                onClick={(e) => {
                  e.preventDefault()
                  addToWishlist(product)
                }}
                className="absolute top-4 right-4 z-10 text-2xl opacity-0 group-hover:opacity-100 transition-opacity hover:scale-125"
              >
                ❤️
              </button>

            </Link>

            {/* CONTENT */}

            <div className="py-6 flex flex-col gap-2">

              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                {product.category}
              </span>

              <div className="flex justify-between items-start gap-4">

                <h2 className="text-lg font-bold text-on-surface uppercase group-hover:text-luxury-gold transition-colors">
                  {product.name}
                </h2>

                <p className="text-lg font-bold text-on-surface">
                  ₹{product.price}
                </p>

              </div>

              <p className="text-sm text-outline-variant line-clamp-1">
                {product.description}
              </p>

              <div className="w-full h-[1px] bg-outline-variant mt-4 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></div>

              <button
                onClick={(e) =>
                  addToCart(e, product)
                }
                className="mt-4 text-xs font-bold uppercase tracking-widest text-primary bg-luxury-gold px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity text-center hover:bg-surface-container-highest hover:text-on-surface"
              >
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Products



