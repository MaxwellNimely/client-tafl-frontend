import { createContext, useContext, useEffect, useState, useMemo } from "react"

// =========================
// CREATE CONTEXT
// =========================
const CartContext = createContext()

// =========================
// PROVIDER
// =========================
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  // =========================
  // LOAD CART (ONCE)
  // =========================
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart")
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    } catch (err) {
      console.error("Failed to parse cart:", err)
      setCart([])
    }
  }, [])

  // =========================
  // SAVE CART
  // =========================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // =========================
  // ACTIONS (STABLE FUNCTIONS)
  // =========================
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id)

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id))
  }

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item

        const newQty = (item.quantity || 1) + amount

        return {
          ...item,
          quantity: newQty < 1 ? 1 : newQty,
        }
      })
    )
  }

  const clearCart = () => setCart([])

  // =========================
  // TOTAL (MEMOIZED)
  // =========================
  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price || 0)
      const qty = Number(item.quantity || 1)
      return sum + price * qty
    }, 0)
  }, [cart])

  // =========================
  // MEMOIZED CONTEXT VALUE (IMPORTANT FIX)
  // =========================
  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
    }),
    [cart, total]
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// =========================
// HOOK
// =========================
export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return context
}



// import { createContext, useContext, useEffect, useState } from "react"

// // =========================
// // CREATE CONTEXT
// // =========================
// const CartContext = createContext()

// // =========================
// // PROVIDER
// // =========================
// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([])

//   // =========================
//   // LOAD CART FROM LOCALSTORAGE (SAFE)
//   // =========================
//   useEffect(() => {
//     try {
//       const storedCart = localStorage.getItem("cart")
//       if (storedCart) {
//         setCart(JSON.parse(storedCart))
//       }
//     } catch (err) {
//       console.error("Failed to parse cart:", err)
//       setCart([])
//     }
//   }, [])

//   // =========================
//   // SAVE CART TO LOCALSTORAGE
//   // =========================
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart))
//   }, [cart])

//   // =========================
//   // ADD TO CART
//   // =========================
//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item._id === product._id)

//       if (existing) {
//         return prev.map((item) =>
//           item._id === product._id
//             ? {
//                 ...item,
//                 quantity: (item.quantity || 1) + 1,
//               }
//             : item
//         )
//       }

//       return [
//         ...prev,
//         {
//           ...product,
//           quantity: 1,
//         },
//       ]
//     })
//   }

//   // =========================
//   // REMOVE ITEM
//   // =========================
//   const removeFromCart = (id) => {
//     setCart((prev) => prev.filter((item) => item._id !== id))
//   }

//   // =========================
//   // UPDATE QUANTITY (SAFE)
//   // =========================
//   const updateQuantity = (id, amount) => {
//     setCart((prev) =>
//       prev.map((item) => {
//         if (item._id !== id) return item

//         const newQty = (item.quantity || 1) + amount

//         return {
//           ...item,
//           quantity: newQty < 1 ? 1 : newQty,
//         }
//       })
//     )
//   }

//   // =========================
//   // CLEAR CART
//   // =========================
//   const clearCart = () => setCart([])

//   // =========================
//   // TOTAL PRICE (SAFE)
//   // =========================
//   const total = cart.reduce((sum, item) => {
//     const price = Number(item.price || 0)
//     const qty = Number(item.quantity || 1)
//     return sum + price * qty
//   }, 0)

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//         total,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   )
// }

// // =========================
// // CUSTOM HOOK
// // =========================
// export const useCart = () => {
//   const context = useContext(CartContext)

//   if (!context) {
//     throw new Error("useCart must be used inside CartProvider")
//   }

//   return context
// }