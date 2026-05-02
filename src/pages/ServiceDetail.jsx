import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchServiceBySlug } from "../lib/api"
import { urlFor } from "../lib/sanityClient"
import { PortableText } from "@portabletext/react"

const ServiceDetail = () => {
  const { slug } = useParams()

  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH SERVICE
  // =========================
  useEffect(() => {
    const loadService = async () => {
      try {
        const data = await fetchServiceBySlug(slug)
        setService(data || null)
      } catch (error) {
        console.error("Service load error:", error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) loadService()
  }, [slug])

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading service...
      </div>
    )
  }

  // =========================
  // NOT FOUND
  // =========================
  if (!service) {
    return (
      <div className="text-center py-20 text-red-500">
        Service not found
      </div>
    )
  }

  let imageUrl = null
  try {
    imageUrl = service.image
      ? urlFor(service.image).width(1200).url()
      : null
  } catch {}

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">

      {/* BACK */}
      <Link
        to="/services"
        className="text-sm text-gray-500 hover:text-yellow-500"
      >
        ← Back to Services
      </Link>

      {/* IMAGE */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={service.title}
          className="w-full h-[400px] object-cover rounded-xl mt-6 mb-8"
        />
      )}

      {/* HEADER */}
      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <span className="text-3xl">
            {service.icon || "🌱"}
          </span>

          <h1 className="text-3xl font-bold">
            {service.title}
          </h1>
        </div>

        <p className="text-gray-700 text-lg">
          {service.description}
        </p>

      </div>

      {/* CONTENT */}
      <div className="mt-8 prose max-w-none text-gray-700">

        {service.content ? (
          <PortableText value={service.content} />
        ) : (
          <p>No detailed content available.</p>
        )}

      </div>

    </div>
  )
}

export default ServiceDetail