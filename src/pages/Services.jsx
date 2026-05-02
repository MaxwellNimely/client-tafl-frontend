import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchServices } from "../lib/api"
import { urlFor } from "../lib/sanityClient"

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH SERVICES
  // =========================
  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await fetchServices()
        setServices(data || [])
      } catch (error) {
        console.error("Failed to load services:", error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading services...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold mb-3">
          Our Agricultural Services
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Integrated farming systems designed to improve productivity,
          sustainability, and rural livelihoods across Liberia.
        </p>
      </div>

      {/* SERVICES LIST (STRUCTURED) */}
      <div className="space-y-10">

        {services.map((service, index) => {

          let imageUrl = null
          try {
            imageUrl = service.image
              ? urlFor(service.image).width(900).url()
              : null
          } catch {}

          return (
            <div
              key={service._id}
              className={`flex flex-col md:flex-row gap-6 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* IMAGE */}
              <div className="w-full md:w-1/2">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={service.title}
                    className="rounded-xl w-full h-64 object-cover shadow-md"
                  />
                ) : (
                  <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="w-full md:w-1/2 space-y-3">

                <div className="text-3xl">
                  {service.icon || "🌱"}
                </div>

                <h2 className="text-2xl font-semibold">
                  {service.title}
                </h2>

                <p className="text-gray-600">
                  {service.description}
                </p>

                <Link
                  to={`/services/${service.slug}`}
                  className="inline-block mt-2 text-yellow-600 font-medium hover:underline"
                >
                  Explore Service →
                </Link>

              </div>

            </div>
          )
        })}

      </div>
    </div>
  )
}

export default Services