import React from "react"

export default function Footer() {
  const currentYear = new Date().getUTCFullYear()

  return (
    <footer className="bg-blue-950 text-white py-12 px-4 mt-auto border-t border-blue-900">

      <div className="max-w-7xl mx-auto">

        {/* =========================
            GRID SECTION
        ========================= */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 text-sm">

          {/* =========================
              BRAND
          ========================= */}
          <div>
            <h4 className="font-semibold mb-3 text-yellow-400">
              Tropical Agro Foods Liberia
            </h4>

            <p className="text-blue-100 leading-relaxed">
              A diversified agricultural enterprise focused on sustainable
              farming, beekeeping, crop production, and rural empowerment
              across Liberia.
            </p>
          </div>

          {/* =========================
              SERVICES (UPDATED)
          ========================= */}
          <div>
            <h4 className="font-semibold mb-3 text-yellow-400">
              Our Services
            </h4>

            <ul className="space-y-2 text-blue-100">
              <li>Beekeeping & Honey Production</li>
              <li>Plantain & Vegetable Farming</li>
              <li>Pineapple Production</li>
              <li>Cassava Farming & Processing</li>
              <li>Cocoa Plantation</li>
            </ul>
          </div>

          {/* =========================
              QUICK LINKS
          ========================= */}
          <div>
            <h4 className="font-semibold mb-3 text-yellow-400">
              Quick Links
            </h4>

            <ul className="space-y-2 text-blue-100">
              <li><a href="/" className="hover:text-yellow-300">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-300">About</a></li>
              <li><a href="/services" className="hover:text-yellow-300">Services</a></li>
              <li><a href="/products" className="hover:text-yellow-300">Products</a></li>
              <li><a href="/training" className="hover:text-yellow-300">Training</a></li>
              <li><a href="/blog" className="hover:text-yellow-300">Blog</a></li>
              <li><a href="/contact" className="hover:text-yellow-300">Contact</a></li>
            </ul>
          </div>

          {/* =========================
              CONTACT
          ========================= */}
          <div>
            <h4 className="font-semibold mb-3 text-yellow-400">
              Contact
            </h4>

            <ul className="space-y-2 text-blue-100">
              <li>
                Kabada, Kpanyan District <br />
                Sinoe County, Liberia
              </li>

              <li>
                <a href="tel:+231778663518" className="hover:text-yellow-300">
                  0778 663 518
                </a>{" "}
                /{" "}
                <a href="tel:+231880754316" className="hover:text-yellow-300">
                  0880 754 316
                </a>
              </li>

              <li>
                <a
                  href="mailto:alexsweethoney2022@gmail.com"
                  className="hover:text-yellow-300"
                >
                  alexsweethoney2022@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================
            DIVIDER
        ========================= */}
        <div className="border-t border-blue-900 mt-10 pt-6 text-center">

          <p className="text-blue-200 text-xs">
            © {currentYear} Tropical Agro Food Liberia. All rights reserved.
          </p>

          <p className="text-blue-300 text-[11px] mt-1">
            Sustainable Agriculture • Food Security • Rural Development
          </p>

        </div>

      </div>
    </footer>
  )
}