import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchProducts } from "../lib/api"
import { urlFor } from "../lib/sanityClient"

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // LOAD PRODUCTS (SAFE)
  // =========================
  useEffect(() => {
    let mounted = true

    const loadProducts = async () => {
      try {
        const data = await fetchProducts()

        if (!mounted) return

        setProducts(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Failed to load products:", error)
        setProducts([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadProducts()

    return () => {
      mounted = false
    }
  }, [])

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading products...
      </div>
    )
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!products.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No products available
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {products.map((product) => {
          const slug = product?.slug?.current || product?.slug

          return (
            <Link
              key={product._id}
              to={`/product/${slug}`}
              className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition group"
            >

              <div className="h-52 bg-gray-100 overflow-hidden">

                {product.images?.length > 0 ? (
                  <img
                    src={urlFor(product.images[0]).width(600).url()}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}

              </div>

              <div className="p-4 space-y-2">

                <h2 className="text-lg font-semibold">
                  {product.title}
                </h2>

                <p className="text-yellow-600 font-bold">
                  ${Number(product.price || 0).toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  {product.description
                    ? product.description.slice(0, 70) + "..."
                    : "No description"}
                </p>

              </div>

            </Link>
          )
        })}

      </div>
    </div>
  )
}

export default Products



// import { useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { fetchProducts } from "../lib/api"
// import { urlFor } from "../lib/sanityClient"

// const Products = () => {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)

//   // =========================
//   // LOAD PRODUCTS
//   // =========================
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const data = await fetchProducts()
//         setProducts(data || [])
//       } catch (error) {
//         console.error("Failed to load products:", error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProducts()
//   }, [])

//   // =========================
//   // LOADING STATE
//   // =========================
//   if (loading) {
//     return (
//       <div className="text-center py-20 text-gray-500">
//         Loading products...
//       </div>
//     )
//   }

//   // =========================
//   // EMPTY STATE
//   // =========================
//   if (!products.length) {
//     return (
//       <div className="text-center py-20 text-gray-500">
//         No products available
//       </div>
//     )
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-6 py-12">

//       {/* TITLE */}
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Our Products
//       </h1>

//       {/* GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

//         {products.map((product) => (
//           <Link
//             key={product._id}
//             to={`/product/${product.slug}`}   // ✔ clean (no fallback needed)
//             className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition group"
//           >

//             {/* IMAGE */}
//             <div className="h-52 bg-gray-100 overflow-hidden">

//               {product.images?.length > 0 ? (
//                 <img
//                   src={urlFor(product.images[0]).width(600).url()}
//                   alt={product.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-gray-400">
//                   No Image
//                 </div>
//               )}

//             </div>

//             {/* INFO */}
//             <div className="p-4 space-y-2">

//               <h2 className="text-lg font-semibold">
//                 {product.title}
//               </h2>

//               <p className="text-yellow-600 font-bold">
//                 ${Number(product.price || 0).toLocaleString()}
//               </p>

//               <p className="text-sm text-gray-500">
//                 {product.description
//                   ? product.description.slice(0, 70) + "..."
//                   : "No description"}
//               </p>

//             </div>

//           </Link>
//         ))}

//       </div>
//     </div>
//   )
// }

// export default Products