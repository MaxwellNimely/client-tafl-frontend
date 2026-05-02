import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fetchTeam } from "../lib/api"
import { urlFor } from "../lib/sanityClient"

import production from "../assets/production.jpg"

const About = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // SAFE IMAGE HELPER
  // =========================
  const getImageUrl = (img, fallback = production, width = 800) => {
    try {
      if (!img) return fallback
      return urlFor(img)?.width(width).url() || fallback
    } catch {
      return fallback
    }
  }

  // =========================
  // FETCH TEAM
  // =========================
  useEffect(() => {
    const loadTeam = async () => {
      try {
        const data = await fetchTeam()
        setTeam(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Team fetch error:", error)
        setTeam([])
      } finally {
        setLoading(false)
      }
    }

    loadTeam()
  }, [])

  const ceo = team.find((m) => m?.isCEO)
  const members = team.filter((m) => !m?.isCEO)

  return (
    <div className="w-full">

      {/* ========================= HERO ========================= */}
      <section className="bg-yellow-500 text-white py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          About Our Agricultural Enterprise
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Integrated farming systems including beekeeping, crop production,
          and agro-processing for sustainable development.
        </p>
      </section>

      {/* ========================= OVERVIEW ========================= */}
      <section className="py-16 px-6 grid md:grid-cols-2 gap-10 items-center">

        <motion.img
          src={production}
          alt="Agriculture production"
          whileHover={{ scale: 1.03 }}
          className="h-80 w-full object-cover rounded-xl shadow-md"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4">
            Company Overview
          </h2>

          <p className="text-gray-700 mb-4">
            We are an agricultural enterprise focused on diversified farming,
            value addition, and rural economic empowerment.
          </p>

          <h3 className="font-semibold text-xl mt-6">Mission</h3>
          <p className="text-gray-600">
            To deliver sustainable agricultural production and empower rural communities.
          </p>

          <h3 className="font-semibold text-xl mt-4">Vision</h3>
          <p className="text-gray-600">
            To become a leading agro-enterprise in Liberia and West Africa.
          </p>
        </div>
      </section>

      {/* ========================= CEO ========================= */}
      {ceo && (
        <section className="py-16 px-6 text-center">

          <h2 className="text-3xl font-bold mb-10">
            Leadership
          </h2>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md overflow-hidden max-w-md mx-auto"
          >

            {/* FIXED IMAGE BEHAVIOR */}
            <div className="h-72 w-full overflow-hidden bg-gray-100">
              <img
                src={getImageUrl(ceo.image)}
                alt={ceo.name || "CEO"}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl">
                {ceo.name || "CEO"}
              </h3>

              <p className="text-yellow-600">
                {ceo.role || "Chief Executive Officer"}
              </p>

              <p className="text-gray-600 mt-2">
                {ceo.description || ""}
              </p>
            </div>

          </motion.div>
        </section>
      )}

      {/* ========================= TEAM ========================= */}
      <section className="py-16 px-6 bg-gray-50">

        <h2 className="text-3xl font-bold text-center mb-10">
          Management Team
        </h2>

        {loading && (
          <p className="text-center text-gray-500">
            Loading team...
          </p>
        )}

        {!loading && members.length === 0 && (
          <p className="text-center text-gray-500">
            No team members found
          </p>
        )}

        {!loading && members.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">

            {members.map((member) => (
              <motion.div
                key={member._id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-md overflow-hidden text-center"
              >

                {/* FIXED IMAGE LAYOUT (THIS FIXES YOUR ISSUE) */}
                <div className="h-64 w-full overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name || "Team member"}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-bold">
                    {member.name || "Unnamed"}
                  </h3>

                  <p className="text-yellow-600 text-sm">
                    {member.role || "Team Member"}
                  </p>

                  <p className="text-gray-600 text-sm mt-2">
                    {member.description || ""}
                  </p>
                </div>

              </motion.div>
            ))}

          </div>
        )}
      </section>

      {/* ========================= CTA ========================= */}
      <section className="py-16 px-6 text-center">

        <h2 className="text-3xl font-bold mb-6">
          Become a Partner
        </h2>

        <p className="max-w-2xl mx-auto text-gray-700 mb-6">
          Join us in building a sustainable agricultural future.
        </p>

        <a
          href="/contact"
          className="inline-block bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
        >
          Contact Us
        </a>

      </section>

    </div>
  )
}

export default About