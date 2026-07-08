import { useState } from "react"
import emailjs from "@emailjs/browser"
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react"

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // =========================
  // SEND EMAIL (EMAILJS)
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault()

    // prevent double click spam
    if (loading) return

    setLoading(true)
    setSuccess(false)
    setError(false)

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          message: form.message.trim(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      setSuccess(true)

      // reset form
      setForm({
        name: "",
        email: "",
        message: "",
      })

      // auto-hide success message (clean UX)
      setTimeout(() => {
        setSuccess(false)
      }, 4000)

    } catch (err) {
      console.error("EmailJS Error:", err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      {/* HEADER */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">
          Contact Tropical Agro Foods Liberia
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Fresh Agro Products and Professional Services. Reach out for
          orders, wholesale supply, partnerships, and customer support.
        </p>
      </section>

      {/* QUICK CHAT SECTION */}
      <section className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10 shadow-sm">
        <div className="grid md:grid-cols-2 gap-6 items-center">

          <div>
            <h2 className="text-2xl font-bold mb-2">
              Need Fast Response?
            </h2>

            <p className="text-gray-700 mb-4">
              Chat with us directly on WhatsApp for quick inquiries,
              pricing, orders, delivery details, and product availability.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://wa.me/231778663518"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>

              <a
                href="tel:+231778663518"
                className="bg-white border px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="font-semibold mb-3">
              Why Contact Us?
            </h3>

            <ul className="space-y-2 text-gray-700 text-sm">
              <li>✔ Bulk Agro Product Orders</li>
              <li>✔ Honey Supply & Distribution</li>
              <li>✔ Farming Partnerships</li>
              <li>✔ Delivery Information</li>
              <li>✔ Customer Support</li>
            </ul>
          </div>

        </div>
      </section>

      {/* MAIN GRID */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* BUSINESS INFO */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow space-y-4">

          <h2 className="text-2xl font-semibold">
            Business Information
          </h2>

          <div className="space-y-3 text-gray-700">

            <p className="flex gap-2 items-center">
              <MapPin size={18} />
              Kabada, Sinoe County, Liberia
            </p>

            <p className="flex gap-2 items-center">
              <Phone size={18} />
              0778663518 / 0880754316
            </p>

            <p className="flex gap-2 items-center">
              <Mail size={18} />
              alexsweethoney2022@gmail.com
            </p>

            <p>
              <strong>CEO:</strong> Alex Q. Wloh
            </p>

          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-semibold mb-4">
            Send Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg h-32"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg hover:bg-yellow-400 transition disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && (
              <p className="text-green-600 text-sm">
                Message sent successfully!
              </p>
            )}

            {error && (
              <p className="text-red-600 text-sm">
                Failed to send message. Try again.
              </p>
            )}

          </form>
        </div>

      </div>  
    </main>
  )
}

export default Contact
