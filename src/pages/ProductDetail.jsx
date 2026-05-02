import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchProductBySlug } from "../lib/api"
import { urlFor } from "../lib/sanityClient"
import { useCart } from "../context/CartContext"

const ProductDetail = () => {
  const { slug } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        if (!slug) return

        const data = await fetchProductBySlug(slug)
        setProduct(data || null)
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [slug])

  useEffect(() => {
    setActiveImage(0)
  }, [product])

  if (loading) {
    return <div className="text-center py-20">Loading product...</div>
  }

  if (!product) {
    return <div className="text-center py-20 text-red-500">Product not found</div>
  }

  // ✅ SAFE IMAGE HANDLING
  const images = product?.images || []
  const hasImages = Array.isArray(images) && images.length > 0

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          {hasImages ? (
            <img
              src={urlFor(images[activeImage]).width(900).url()}
              alt={product.title}
              className="w-full rounded-lg shadow-md object-cover"
            />
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
              No Image Available
            </div>
          )}

          {/* THUMBNAILS */}
          {hasImages && images.length > 1 && (
            <div className="flex gap-2 mt-4">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={urlFor(img).width(120).url()}
                  alt="thumb"
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 object-cover rounded cursor-pointer border ${
                    activeImage === index
                      ? "border-yellow-500"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-5">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <p className="text-yellow-600 text-2xl font-semibold">
            ${Number(product.price || 0).toLocaleString()}
          </p>

          <p className="text-gray-600">
            {product.description || "No description available"}
          </p>

          <p className="text-sm text-gray-500">
            Category: <span className="font-medium">{product.category || "N/A"}</span>
          </p>

          <p className={product.inStock ? "text-green-600" : "text-red-600"}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className={`px-6 py-3 rounded-full font-semibold ${
              product.inStock
                ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail