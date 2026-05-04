import { useEffect, useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import farmBg from "../assets/farm.jpg"

import { fetchFeaturedProducts, fetchServices } from "../lib/api"
import { urlFor } from "../lib/sanityClient"
import { useCart } from "../context/CartContext"

const Home = () => {
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const { addToCart } = useCart()

  // =========================
  // SAFE DATA LOADER
  // =========================
  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        const [p, s] = await Promise.all([
          fetchFeaturedProducts(),
          fetchServices(),
        ])

        if (!isMounted) return

        setProducts(Array.isArray(p) ? p : [])
        setServices(Array.isArray(s) ? s : [])
      } catch (err) {
        console.error("Home fetch error:", err)
        setProducts([])
        setServices([])
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [])

  // =========================
  // SAFE IMAGE BUILDER
  // =========================
  const buildImage = (img, width = 500) => {
    try {
      if (!img?.asset?._ref) return null
      return urlFor(img).width(width).fit("crop").auto("format").url()
    } catch {
      return null
    }
  }

  // =========================
  // NAV HANDLERS
  // =========================
  const goTo = (path) => navigate(path)

  // =========================
  // MEMOIZED SAFE DATA
  // =========================
  const safeServices = useMemo(() => Array.isArray(services) ? services : [], [services])
  const safeProducts = useMemo(() => Array.isArray(products) ? products : [], [products])

  return (
    <div className="w-full">

      {/* ========================= HERO ========================= */}
      <section
        className="relative h-[80vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${farmBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-3xl px-4">

          <h1 className="text-4xl md:text-5xl font-bold">
            Sustainable Agriculture & Agro-Production in Liberia
          </h1>

          <p className="mt-4 text-gray-200">
            Integrated farming solutions for food security and rural development.
          </p>

          <div className="mt-6 flex gap-4 justify-center flex-wrap">

            <button
              onClick={() => goTo("/contact")}
              className="bg-yellow-500 px-6 py-3 rounded-full font-semibold"
            >
              Work With Us
            </button>

            <button
              onClick={() => goTo("/products")}
              className="bg-white text-black px-6 py-3 rounded-full font-semibold"
            >
              View Products
            </button>

          </div>

        </div>
      </section>

      {/* ========================= SERVICES ========================= */}
      <section className="py-16 px-6 bg-white">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading services...</p>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {safeServices.map((service) => {
            const slug = service?.slug?.current
            const image = buildImage(service?.image, 600)

            return (
              <Link
                key={service?._id}
                to={slug ? `/services/${slug}` : "#"}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition block"
              >
                {image ? (
                  <img
                    src={image}
                    alt={service?.title || "Service"}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="p-5">

                  <div className="text-2xl mb-2">
                    {service?.icon || "🌱"}
                  </div>

                  <h3 className="font-semibold text-lg mb-2">
                    {service?.title || "Untitled"}
                  </h3>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {service?.description || ""}
                  </p>

                  <p className="mt-3 text-sm text-yellow-600 font-medium">
                    Learn more →
                  </p>

                </div>
              </Link>
            )
          })}

        </div>
      </section>

      {/* ========================= PRODUCTS ========================= */}
      <section className="py-16 px-6 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {safeProducts.map((item) => {
            const slug = item?.slug?.current
            const image = buildImage(item?.image, 500)

            return (
              <div
                key={item?._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                {image ? (
                  <img
                    src={image}
                    alt={item?.title || "Product"}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}

                <div className="p-4 text-center">

                  <h3 className="font-semibold">
                    {item?.title || "Untitled"}
                  </h3>

                  <p className="text-yellow-600 font-bold">
                    ${Number(item?.price || 0).toLocaleString()}
                  </p>

                  <div className="flex justify-center gap-2 mt-3">

                    <Link
                      to={slug ? `/product/${slug}` : "#"}
                      className="text-sm px-3 py-1 border rounded"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => addToCart(item)}
                      className="text-sm bg-black text-white px-3 py-1 rounded"
                    >
                      Add
                    </button>

                  </div>

                </div>
              </div>
            )
          })}

        </div>
      </section>

    </div>
  )
}

export default Home


// import { useEffect, useState, useCallback } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import farmBg from "../assets/farm.jpg"

// import { fetchFeaturedProducts, fetchServices } from "../lib/api"
// import { urlFor } from "../lib/sanityClient"
// import { useCart } from "../context/CartContext"

// const Home = () => {
//   const [products, setProducts] = useState([])
//   const [services, setServices] = useState([])

//   const [loadingProducts, setLoadingProducts] = useState(true)
//   const [loadingServices, setLoadingServices] = useState(true)

//   const navigate = useNavigate()
//   const { addToCart } = useCart()

//   // =========================
//   // DATA FETCH (STABLE + SAFE)
//   // =========================
//   useEffect(() => {
//     let mounted = true

//     const loadData = async () => {
//       try {
//         const [productData, serviceData] = await Promise.all([
//           fetchFeaturedProducts(),
//           fetchServices(),
//         ])

//         if (!mounted) return

//         setProducts(Array.isArray(productData) ? productData : [])
//         setServices(Array.isArray(serviceData) ? serviceData : [])
//       } catch (err) {
//         console.error("Home data error:", err)
//         setProducts([])
//         setServices([])
//       } finally {
//         if (mounted) {
//           setLoadingProducts(false)
//           setLoadingServices(false)
//         }
//       }
//     }

//     loadData()

//     return () => {
//       mounted = false
//     }
//   }, [])

//   // =========================
//   // IMAGE HELPER (MEMOIZED)
//   // =========================
//   const getImageUrl = useCallback((image, width = 500) => {
//     if (!image?.asset?._ref) return null

//     try {
//       return urlFor(image)
//         .width(width)
//         .fit("crop")
//         .auto("format")
//         .url()
//     } catch (err) {
//       console.warn("Image build error:", err)
//       return null
//     }
//   }, [])

//   // =========================
//   // NAV HANDLERS
//   // =========================
//   const goToContact = () => navigate("/contact")
//   const goToProducts = () => navigate("/products")

//   return (
//     <div className="w-full">

//       {/* ========================= HERO ========================= */}
//       <section
//         className="relative h-[80vh] flex items-center justify-center text-center text-white"
//         style={{
//           backgroundImage: `url(${farmBg})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/60"></div>

//         <div className="relative z-10 max-w-3xl px-4">

//           <h1 className="text-4xl md:text-5xl font-bold">
//             Sustainable Agriculture & Agro-Production in Liberia
//           </h1>

//           <p className="mt-4 text-gray-200">
//             We deliver integrated farming solutions—from beekeeping to crop production.
//           </p>

//           <div className="mt-6 flex gap-4 justify-center flex-wrap">

//             <button
//               onClick={goToContact}
//               className="bg-yellow-500 px-6 py-3 rounded-full font-semibold"
//             >
//               Work With Us
//             </button>

//             <button
//               onClick={goToProducts}
//               className="bg-white text-black px-6 py-3 rounded-full font-semibold"
//             >
//               View Products
//             </button>

//           </div>

//         </div>
//       </section>

//       {/* ========================= SERVICES ========================= */}
//       <section className="py-16 px-6 bg-white">

//         <h2 className="text-3xl font-bold text-center mb-12">
//           Our Products and Services
//         </h2>

//         {loadingServices && (
//           <p className="text-center text-gray-500">
//             Loading services...
//           </p>
//         )}

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

//           {services.map((service) => (
//             <Link
//               key={service._id}
//               to={`/services/${service.slug?.current || service.slug}`}
//               className="border rounded-xl overflow-hidden hover:shadow-lg transition block"
//             >

//               {getImageUrl(service.image, 600) ? (
//                 <img
//                   src={getImageUrl(service.image, 600)}
//                   alt={service.title}
//                   className="h-48 w-full object-cover"
//                 />
//               ) : (
//                 <div className="h-48 bg-gray-200 flex items-center justify-center">
//                   No Image
//                 </div>
//               )}

//               <div className="p-5">

//                 <div className="text-2xl mb-2">
//                   {service.icon || "🌱"}
//                 </div>

//                 <h3 className="font-semibold text-lg mb-2">
//                   {service.title}
//                 </h3>

//                 <p className="text-gray-600 text-sm line-clamp-3">
//                   {service.description}
//                 </p>

//                 <p className="mt-3 text-sm text-yellow-600 font-medium">
//                   Learn more →
//                 </p>

//               </div>

//             </Link>
//           ))}

//         </div>
//       </section>

//       {/* ========================= PRODUCTS ========================= */}
//       <section className="py-16 px-6 bg-gray-50">

//         <h2 className="text-3xl font-bold text-center mb-10">
//           Featured Products
//         </h2>

//         {loadingProducts && (
//           <p className="text-center text-gray-500">
//             Loading products...
//           </p>
//         )}

//         {!loadingProducts && products.length === 0 && (
//           <p className="text-center text-gray-500">
//             No featured products found
//           </p>
//         )}

//         <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

//           {products.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
//             >

//               {getImageUrl(item.image, 500) ? (
//                 <img
//                   src={getImageUrl(item.image, 500)}
//                   alt={item.title}
//                   className="h-48 w-full object-cover"
//                   loading="lazy"
//                 />
//               ) : (
//                 <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
//                   No Image
//                 </div>
//               )}

//               <div className="p-4 text-center">

//                 <h3 className="font-semibold">
//                   {item.title}
//                 </h3>

//                 <p className="text-yellow-600 font-bold">
//                   ${Number(item.price || 0).toLocaleString()}
//                 </p>

//                 <div className="flex justify-center gap-2 mt-3">

//                   <Link
//                     to={`/product/${item.slug?.current || item.slug}`}
//                     className="text-sm px-3 py-1 border rounded"
//                   >
//                     View
//                   </Link>

//                   <button
//                     onClick={() => addToCart(item)}
//                     className="text-sm bg-black text-white px-3 py-1 rounded"
//                   >
//                     Add
//                   </button>

//                 </div>

//               </div>

//             </div>
//           ))}

//         </div>

//       </section>

//     </div>
//   )
// }

// export default Home

