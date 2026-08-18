import { Link } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../context/CartContext"

function ProductCard({ id, name, price, image }) {

  const { addToCart } = useContext(CartContext)


  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h3 className="text-2xl font-semibold text-gray-800">
          {name}
        </h3>

        <p className="text-luxury-gold text-xl font-bold mt-2">
          ₹{price}
        </p>

        <div className="flex gap-3 mt-5">

          <button
            onClick={() =>
              addToCart({
                id,
                name,
                price,
                image,
              })
            }
            className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary/90"
          >
            Add To Cart
          </button>

          <Link to={`/product/${id}`} className="flex-1">
            <button className="w-full border border-orange-600 text-luxury-gold py-3 rounded-lg hover:bg-surface-container-low">
              View
            </button>
          </Link>

        </div>

      </div>
    </div>
  )
}

export default ProductCard


