import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchTraining } from "../lib/api"
import { urlFor } from "../lib/sanityClient"

const Training = () => {
  const [programs, setPrograms] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH TRAINING PROGRAMS
  // =========================
  useEffect(() => {
    const loadTraining = async () => {
      try {
        const data = await fetchTraining()
        setPrograms(data || [])
      } catch (error) {
        console.error("Failed to load training:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTraining()
  }, [])

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading training programs...
      </div>
    )
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!programs.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No training programs available
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-10 text-center">
        Training Programs
      </h1>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

        {programs.map((program) => {
          const slug =
            typeof program.slug === "object"
              ? program.slug?.current
              : program.slug

          return (
            <Link
              key={program._id}
              to={`/training/${slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group"
            >

              {/* IMAGE */}
              <div className="h-52 bg-gray-100 overflow-hidden">
                {program.image ? (
                  <img
                    src={urlFor(program.image)?.width(600).url()}
                    alt={program.title || "Training program"}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                {/* TITLE */}
                <h2 className="text-lg font-semibold line-clamp-2">
                  {program.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500">
                  {program.description
                    ? program.description.slice(0, 80) + "..."
                    : "No description available"}
                </p>

                {/* META */}
                <div className="text-xs text-gray-400 space-y-1">

                  {program.location && (
                    <p>📍 {program.location}</p>
                  )}

                  {program.date && (
                    <p>
                      📅 {new Date(program.date).toLocaleDateString()}
                    </p>
                  )}

                  {program.duration && (
                    <p>⏱️ {program.duration}</p>
                  )}

                </div>

                {/* STATUS */}
                <div>
                  {program.isAvailable ? (
                    <span className="text-green-600 text-sm font-semibold">
                      Open for Registration
                    </span>
                  ) : (
                    <span className="text-red-500 text-sm font-semibold">
                      Closed
                    </span>
                  )}
                </div>

              </div>
            </Link>
          )
        })}

      </div>
    </div>
  )
}

export default Training