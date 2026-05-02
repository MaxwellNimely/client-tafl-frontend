import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart()

  // =========================
  // EMPTY CART
  // =========================
  if (!cart.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty 🧺</h2>
        <Link
          to="/products"
          className="bg-yellow-500 px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
        >
          Go Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8">
        Your Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* =========================
            CART ITEMS
        ========================= */}
        <div className="md:col-span-2 space-y-6">

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 items-center border rounded-lg p-4 bg-white shadow-sm"
            >

              {/* IMAGE */}
              <img
                src={item.images?.[0]
                  ? item.images[0].asset?.url || ""
                  : ""
                }
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />

              {/* INFO */}
              <div className="flex-1">

                <h2 className="font-semibold text-lg">
                  {item.title}
                </h2>

                <p className="text-yellow-600 font-bold">
                  ${item.price}
                </p>

                {/* QUANTITY CONTROLS */}
                <div className="flex items-center gap-3 mt-2">

                  <button
                    onClick={() => updateQuantity(item._id, -1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => updateQuantity(item._id, 1)}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 font-semibold hover:underline"
              >
                Remove
              </button>

            </div>
          ))}

        </div>

        {/* =========================
            SUMMARY
        ========================= */}
        <div className="border rounded-lg p-6 h-fit bg-gray-50">

          <h2 className="text-xl font-bold mb-4">
            Order Summary
          </h2>

          {/* TOTAL */}
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-bold text-lg">
              ${total.toLocaleString()}
            </span>
          </div>

          {/* CHECKOUT */}
          <button className="w-full bg-yellow-500 text-black py-3 rounded-full font-semibold hover:bg-yellow-400 transition">
            Checkout
          </button>

          <Link
            to="/products"
            className="block text-center mt-4 text-sm text-gray-500 hover:text-black"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  )
}

export default Cart