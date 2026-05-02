import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchTrainingBySlug } from "../lib/api"
import { urlFor } from "../lib/sanityClient"
import { PortableText } from "@portabletext/react"

const TrainingDetail = () => {
  const { slug } = useParams()

  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH TRAINING PROGRAM
  // =========================
  useEffect(() => {
    const loadProgram = async () => {
      try {
        if (!slug) return

        const data = await fetchTrainingBySlug(slug)
        setProgram(data || null)
      } catch (error) {
        console.error("Failed to load training program:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProgram()
  }, [slug])

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading training program...
      </div>
    )
  }

  // =========================
  // NOT FOUND STATE
  // =========================
  if (!program) {
    return (
      <div className="text-center py-20 text-red-500">
        Training program not found
      </div>
    )
  }

  const imageUrl = program.image
    ? urlFor(program.image)?.width(1200).url()
    : null

  const formattedDate = program.date
    ? new Date(program.date).toLocaleDateString()
    : null

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* BACK LINK */}
      <Link
        to="/training"
        className="text-sm text-gray-500 hover:text-yellow-500 transition"
      >
        ← Back to Training
      </Link>

      {/* IMAGE */}
      {imageUrl && (
        <div className="mt-6 mb-6">
          <img
            src={imageUrl}
            alt={program.title || "Training program"}
            className="w-full rounded-xl shadow-md object-cover"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="space-y-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold">
          {program.title}
        </h1>

        {/* META */}
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">

          {program.location && <span>📍 {program.location}</span>}

          {formattedDate && <span>📅 {formattedDate}</span>}

          {program.duration && <span>⏱️ {program.duration}</span>}

        </div>

        {/* DESCRIPTION */}
        {program.description && (
          <p className="text-gray-600 text-lg leading-relaxed">
            {program.description}
          </p>
        )}

        {/* STATUS */}
        <div>
          <span
            className={`inline-block px-3 py-1 rounded font-semibold text-sm ${
              program.isAvailable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {program.isAvailable ? "Open for Registration" : "Closed"}
          </span>
        </div>

        {/* PORTABLE TEXT CONTENT */}
        <div className="mt-8 prose max-w-none text-gray-700 leading-relaxed">
          {program.content ? (
            <PortableText value={program.content} />
          ) : (
            <p>No additional details available.</p>
          )}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button
            disabled={!program.isAvailable}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              program.isAvailable
                ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Register Now
          </button>
        </div>

      </div>
    </div>
  )
}

export default TrainingDetail