import { motion } from "framer-motion"
import ImpactCard from "../components/ImpactCard"
import { Link } from "react-router-dom"

const Impact = () => {
  return (
    <main className="w-full">

      {/* =========================
          HERO
      ========================= */}
      <section className="bg-yellow-500 text-white py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Our Impact
        </motion.h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg">
          Transforming lives through sustainable beekeeping, job creation,
          and environmental stewardship across Liberia.
        </p>
      </section>

      {/* =========================
          KEY METRICS
      ========================= */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-10">
          Key Achievements
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <ImpactCard
            title="Jobs & Livelihoods"
            value="100+"
            description="Direct and indirect jobs created"
          />

          <ImpactCard
            title="Communities Engaged"
            value="10+"
            description="Rural communities supported"
          />

          <ImpactCard
            title="Youth & Women Trained"
            value="100+"
            description="Empowered through apiculture training"
          />
        </div>
      </section>

      {/* =========================
          IMPACT AREAS
      ========================= */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Impact Areas
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {[
            {
              title: "Community Empowerment",
              text:
                "We create sustainable income opportunities for rural households, helping reduce dependency and unemployment. By supporting local producers and engaging communities, we strengthen Liberia’s economy.",
            },
            {
              title: "Women & Youth Training",
              text:
                "We train and empower young people and women in apiculture, equipping them with practical income-generating skills. Over 100+ individuals have benefited from our programs.",
            },
            {
              title: "Environmental Sustainability",
              text:
                "Our eco-friendly beekeeping practices promote forest conservation and sustainable land use that protects Liberia’s natural resources.",
            },
            {
              title: "Biodiversity & Pollination",
              text:
                "Bees improve crop yields and biodiversity. Our apiary network supports healthier ecosystems and stronger agricultural productivity.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="p-6 bg-white rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold mb-3 text-yellow-600">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* =========================
          VISION
      ========================= */}
      <section className="py-16 px-6 bg-yellow-50 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Our 5–10 Year Vision
        </h2>

        <p className="max-w-3xl mx-auto text-gray-700 mb-6">
          We aim to become one of Liberia’s leading producers of organic honey,
          scaling production, expanding export capacity, and positioning Liberia
          on the global honey map.
        </p>

        <p className="max-w-3xl mx-auto text-gray-700">
          At the same time, we remain committed to creating jobs and empowering
          thousands of young people across rural communities.
        </p>
      </section>

      {/* =========================
          CTA / INVESTMENT
      ========================= */}
      <section className="py-16 px-6 text-center bg-black text-white">
        <h2 className="text-3xl font-bold mb-6">
          Impact + Opportunity
        </h2>

        <p className="max-w-3xl mx-auto text-gray-300 mb-6">
          Alex Sweet Honey offers both financial return and measurable social impact
          through sustainable beekeeping, job creation, and environmental protection.
        </p>

        <p className="max-w-3xl mx-auto text-gray-300 mb-8">
          By partnering with us, you help strengthen rural economies and build a
          sustainable agricultural future in Liberia.
        </p>

        {/* ACTIVE CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">

          <Link
            to="/contact"
            className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Partner With Us
          </Link>

          <Link
            to="/products"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            Explore Products
          </Link>

        </div>
      </section>

    </main>
  )
}

export default Impact