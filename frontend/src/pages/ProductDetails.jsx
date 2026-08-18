import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

function ProductDetails() {

  const { addToWishlist } = useWishlist()

  const {
    updateCart,
    setIsCartOpen,
  } = useCart()

  const { id } = useParams()

  const [product, setProduct] = useState(null)

  const [quantity, setQuantity] = useState(1)

  /* FETCH PRODUCT */

  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        )

        setProduct(data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchProduct()

  }, [id])

  /* ADD TO CART */

  const addToCart = () => {

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
            quantity:
              item.quantity + quantity,
          }

          : item

      )

    } else {

      updatedCart = [

        ...cartItems,

        {
          ...product,
          quantity,
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

  /* LOADING */

  if (!product) {

    return (

      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">

        Loading...

      </div>

    )

  }

  return (

    <div className="bg-surface-container-lowest min-h-screen px-6 py-24">

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

        {/* IMAGE */}

        <div className="aspect-square relative overflow-hidden bg-surface-container-high border border-outline-variant rounded-xl group">

          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover  transition-transform duration-700 group-hover:scale-105"
          />

        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-center">

          <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-widest mb-4">
            [ {product.category} ]
          </span>

          <div className="flex justify-between items-start mb-6">

            <h1 className="text-4xl md:text-6xl font-bold text-on-surface uppercase tracking-tighter">
              {product.name}
            </h1>

            <button
              onClick={() => addToWishlist(product)}
              className="text-4xl opacity-70 hover:opacity-100 hover:scale-125 transition ml-4"
            >
              ❤️
            </button>

          </div>

          <p className="text-on-surface-variant text-lg leading-8 mb-8 max-w-xl">
            {product.description}
          </p>
          
          <div className="w-full h-[1px] bg-outline-variant mb-8"></div>

          <h2 className="text-4xl font-bold text-on-surface mb-8">
            ₹{product.price}
          </h2>

          {/* QUANTITY */}

          <div className="flex items-center gap-5 mb-10">

            <p className="text-sm font-bold uppercase tracking-widest text-on-surface">
              Quantity:
            </p>

            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-outline-variant bg-surface-container-lowest text-on-surface uppercase font-bold px-4 py-3 outline-none focus:border-luxury-gold"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
                <option key={qty} value={qty}>
                  {qty}
                </option>
              ))}
            </select>

          </div>

          {/* BUTTON */}

          <button
            onClick={addToCart}
            className="bg-luxury-gold text-primary py-5 px-12 rounded-full text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-opacity w-fit"
          >
            Add To Cart
          </button>

        </div>

      </div>

    </div>

  )
}

export default ProductDetails



