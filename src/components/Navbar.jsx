import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState, useMemo, useCallback } from "react"
import {
  fetchNavigation,
  fetchSiteSettings,
  fetchServices,
} from "../lib/api"

import { urlFor } from "../lib/sanityClient"
import fallbackLogo from "../assets/alex.png"

const Navbar = () => {
  const [navItems, setNavItems] = useState([])
  const [services, setServices] = useState([])
  const [settings, setSettings] = useState(null)

  const [search, setSearch] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  const navigate = useNavigate()

  // =========================
  // LOAD CMS DATA
  // =========================
  useEffect(() => {
    let mounted = true

    const loadData = async () => {
      try {
        const [navData, siteData, serviceData] = await Promise.all([
          fetchNavigation(),
          fetchSiteSettings(),
          fetchServices(),
        ])

        if (!mounted) return

        const cleanNav = Array.isArray(navData)
          ? navData.filter((item) => item?.label && item?.link)
          : []

        setNavItems(cleanNav)
        setSettings(siteData || null)
        setServices(Array.isArray(serviceData) ? serviceData : [])
      } catch (error) {
        console.error("Navbar CMS error:", error)
        setNavItems([])
        setServices([])
      }
    }

    loadData()
    return () => (mounted = false)
  }, [])

  // =========================
  // NAV LINKS (NO SERVICES HERE ❌)
  // =========================
  const fallbackLinks = useMemo(
    () => [
      { label: "Home", link: "/" },
      { label: "About", link: "/about" },
      { label: "Products", link: "/products" },
      { label: "Training", link: "/training" },
      { label: "Blog", link: "/blog" },
      { label: "Contact", link: "/contact" },
      // ❌ Services REMOVED FROM HERE
    ],
    []
  )

  const navLinks = useMemo(() => {
    const base = navItems.length > 0 ? navItems : fallbackLinks
    return [...base].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  }, [navItems, fallbackLinks])

  // =========================
  // LOGO
  // =========================
  const logoSrc = useMemo(() => {
    return settings?.logo
      ? urlFor(settings.logo)?.width(100).url()
      : fallbackLogo
  }, [settings])

  const getServiceSlug = (service) =>
    service?.slug?.current || service?.slug

  const handleSearch = useCallback(() => {
    if (!search.trim()) return
    navigate(`/products?search=${encodeURIComponent(search)}`)
    setSearch("")
    setMenuOpen(false)
  }, [search, navigate])

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Logo"
            className="h-10 w-10 object-contain rounded-full bg-white p-1"
          />
          <span className="font-bold text-lg">
            {settings?.siteName || "Agro Farm"}
          </span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          {navLinks.map((item, index) => (
            <Link
              key={item._id || index}
              to={item.link}
              className="hover:text-yellow-400 transition"
            >
              {item.label}
            </Link>
          ))}

          {/* ONLY ONE SERVICES (DROPDOWN) */}
          {services.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="hover:text-yellow-400 transition">
                Services ▾
              </button>

              {servicesOpen && (
                <div className="absolute top-6 left-0 bg-white text-black rounded shadow-lg w-64 z-50">
                  {services.map((service) => (
                    <Link
                      key={service._id}
                      to={`/services/${getServiceSlug(service)}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center gap-3">

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search..."
            className="px-3 py-1.5 text-black rounded-full"
          />

          <button
            onClick={handleSearch}
            className="bg-yellow-500 px-4 py-1.5 text-black font-semibold rounded-full"
          >
            Search
          </button>

        </div>

        {/* MOBILE MENU */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 pb-4 space-y-3">

          {navLinks.map((item, index) => (
            <Link
              key={item._id || index}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-400"
            >
              {item.label}
            </Link>
          ))}

          <div className="text-yellow-400 mt-3">Services</div>

          {services.map((service) => (
            <Link
              key={service._id}
              to={`/services/${getServiceSlug(service)}`}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-300 ml-3"
            >
              • {service.title}
            </Link>
          ))}

        </div>
      )}
    </nav>
  )
}

export default Navbar


// import { Link, useNavigate } from "react-router-dom"
// import { useEffect, useState, useMemo, useCallback } from "react"
// import {
//   fetchNavigation,
//   fetchSiteSettings,
//   fetchServices,
// } from "../lib/api"

// import { urlFor } from "../lib/sanityClient"
// import fallbackLogo from "../assets/alex.png"

// const Navbar = () => {
//   const [navItems, setNavItems] = useState([])
//   const [services, setServices] = useState([])
//   const [settings, setSettings] = useState(null)

//   const [search, setSearch] = useState("")
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [servicesOpen, setServicesOpen] = useState(false)

//   const navigate = useNavigate()

//   // =========================
//   // LOAD CMS DATA (SAFE)
//   // =========================
//   useEffect(() => {
//     let mounted = true

//     const loadData = async () => {
//       try {
//         const [navData, siteData, serviceData] = await Promise.all([
//           fetchNavigation(),
//           fetchSiteSettings(),
//           fetchServices(),
//         ])

//         if (!mounted) return

//         const cleanNav = Array.isArray(navData)
//           ? navData.filter((item) => item?.label && item?.link)
//           : []

//         setNavItems(cleanNav)
//         setSettings(siteData || null)
//         setServices(Array.isArray(serviceData) ? serviceData : [])
//       } catch (error) {
//         console.error("Navbar CMS error:", error)
//         setNavItems([])
//         setServices([])
//       }
//     }

//     loadData()

//     return () => {
//       mounted = false
//     }
//   }, [])

//   // =========================
//   // FALLBACK NAV LINKS
//   // =========================
//   const fallbackLinks = useMemo(
//     () => [
//       { label: "Home", link: "/" },
//       { label: "About", link: "/about" },
//       { label: "Products", link: "/products" },
//       { label: "Training", link: "/training" },
//       { label: "Blog", link: "/blog" },
//       { label: "Contact", link: "/contact" },
//       { label: "Services", link: "/services" }, // always available
//     ],
//     []
//   )

//   // =========================
//   // NAV LINKS (SORTED)
//   // =========================
//   const navLinks = useMemo(() => {
//     const base = navItems.length > 0 ? navItems : fallbackLinks

//     return [...base].sort(
//       (a, b) => (a.order ?? 0) - (b.order ?? 0)
//     )
//   }, [navItems, fallbackLinks])

//   // =========================
//   // LOGO
//   // =========================
//   const logoSrc = useMemo(() => {
//     return settings?.logo
//       ? urlFor(settings.logo)?.width(100).url()
//       : fallbackLogo
//   }, [settings])

//   // =========================
//   // SEARCH HANDLER
//   // =========================
//   const handleSearch = useCallback(() => {
//     if (!search.trim()) return

//     navigate(`/products?search=${encodeURIComponent(search)}`)
//     setSearch("")
//     setMenuOpen(false)
//   }, [search, navigate])

//   // =========================
//   // SAFE SLUG
//   // =========================
//   const getServiceSlug = (service) =>
//     service?.slug?.current || service?.slug

//   return (
//     <nav className="sticky top-0 z-50 bg-black text-white shadow-md">

//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

//         {/* ========================= LOGO ========================= */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logoSrc}
//             alt="Logo"
//             className="h-10 w-10 object-contain rounded-full bg-white p-1"
//           />
//           <span className="font-bold text-lg">
//             {settings?.siteName || "Agro Farm"}
//           </span>
//         </Link>

//         {/* ========================= DESKTOP NAV ========================= */}
//         <div className="hidden md:flex items-center gap-6 text-sm font-medium">

//           {navLinks.map((item, index) => (
//             <Link
//               key={item._id || index}
//               to={item.link}
//               className="hover:text-yellow-400 transition"
//             >
//               {item.label}
//             </Link>
//           ))}

//           {/* ========================= SERVICES DROPDOWN ========================= */}
//           {services.length > 0 && (
//             <div
//               className="relative"
//               onMouseEnter={() => setServicesOpen(true)}
//               onMouseLeave={() => setServicesOpen(false)}
//             >
//               <button className="hover:text-yellow-400 transition">
//                 Services ▾
//               </button>

//               {servicesOpen && (
//                 <div className="absolute top-6 left-0 bg-white text-black rounded shadow-lg w-64 z-50">

//                   {services.map((service) => (
//                     <Link
//                       key={service._id}
//                       to={`/services/${getServiceSlug(service)}`}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       {service.title}
//                     </Link>
//                   ))}

//                 </div>
//               )}
//             </div>
//           )}

//         </div>

//         {/* ========================= SEARCH ========================= */}
//         <div className="hidden md:flex items-center gap-3">

//           <div className="flex items-center bg-white rounded-full overflow-hidden">
//             <input
//               type="text"
//               placeholder={settings?.searchPlaceholder || "Search..."}
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               className="px-3 py-1.5 text-black text-sm focus:outline-none"
//             />

//             <button
//               onClick={handleSearch}
//               className="bg-yellow-500 px-4 py-1.5 text-black font-semibold"
//             >
//               Search
//             </button>
//           </div>

//           <Link
//             to={settings?.ctaLink || "/products"}
//             className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold"
//           >
//             {settings?.ctaText || "Shop"}
//           </Link>

//         </div>

//         {/* ========================= MOBILE MENU BUTTON ========================= */}
//         <button
//           onClick={() => setMenuOpen((prev) => !prev)}
//           className="md:hidden text-2xl"
//         >
//           ☰
//         </button>

//       </div>

//       {/* ========================= MOBILE MENU ========================= */}
//       {menuOpen && (
//         <div className="md:hidden bg-black px-6 pb-4 space-y-4">

//           {navLinks.map((item, index) => (
//             <Link
//               key={item._id || index}
//               to={item.link}
//               onClick={() => setMenuOpen(false)}
//               className="block hover:text-yellow-400"
//             >
//               {item.label}
//             </Link>
//           ))}

//           {services.length > 0 && (
//             <>
//               <div className="text-yellow-400 mt-2">
//                 Services
//               </div>

//               {services.map((service) => (
//                 <Link
//                   key={service._id}
//                   to={`/services/${getServiceSlug(service)}`}
//                   onClick={() => setMenuOpen(false)}
//                   className="block text-gray-300 ml-3"
//                 >
//                   • {service.title}
//                 </Link>
//               ))}
//             </>
//           )}

//         </div>
//       )}

//     </nav>
//   )
// }

// export default Navbar



// import { Link, useNavigate } from "react-router-dom"
// import { useEffect, useState } from "react"
// import {
//   fetchNavigation,
//   fetchSiteSettings,
//   fetchServices, // ✅ NEW
// } from "../lib/api"

// import { urlFor } from "../lib/sanityClient"
// import fallbackLogo from "../assets/alex.png"

// const Navbar = () => {
//   const [navItems, setNavItems] = useState([])
//   const [services, setServices] = useState([]) // ✅ NEW
//   const [settings, setSettings] = useState(null)
//   const [search, setSearch] = useState("")
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [servicesOpen, setServicesOpen] = useState(false)

//   const navigate = useNavigate()

//   // =========================
//   // LOAD CMS DATA
//   // =========================
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const [navData, siteData, serviceData] = await Promise.all([
//           fetchNavigation(),
//           fetchSiteSettings(),
//           fetchServices(), // ✅ NEW
//         ])

//         // NAVIGATION CLEANUP
//         let cleanNav = Array.isArray(navData) ? navData : []

//         cleanNav = cleanNav.filter(
//           (item) => item?.label && item?.link
//         )

//         setNavItems(cleanNav)
//         setSettings(siteData || null)
//         setServices(Array.isArray(serviceData) ? serviceData : [])
//       } catch (error) {
//         console.error("Navbar CMS error:", error)
//         setNavItems([])
//         setServices([])
//       }
//     }

//     loadData()
//   }, [])

//   // =========================
//   // FALLBACK NAVIGATION
//   // =========================
//   const fallbackLinks = [
//     { label: "Home", link: "/" },
//     { label: "About", link: "/about" },
//     { label: "Products", link: "/products" },
//     { label: "Training", link: "/training" },
//     { label: "Blog", link: "/blog" },
//     { label: "Contact", link: "/contact" },
//   ]

//   const navLinks =
//     navItems.length > 0
//       ? [...navItems].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
//       : fallbackLinks

//   // =========================
//   // LOGO
//   // =========================
//   const logoSrc = settings?.logo
//     ? urlFor(settings.logo)?.width(100).url()
//     : fallbackLogo

//   // =========================
//   // SEARCH
//   // =========================
//   const handleSearch = () => {
//     if (!search.trim()) return
//     navigate(`/products?search=${encodeURIComponent(search)}`)
//     setSearch("")
//     setMenuOpen(false)
//   }

//   return (
//     <nav className="sticky top-0 z-50 bg-black text-white shadow-md">

//       <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

//         {/* ========================= LOGO ========================= */}
//         <Link to="/" className="flex items-center gap-3">
//           <img
//             src={logoSrc}
//             alt="Logo"
//             className="h-10 w-10 object-contain rounded-full bg-white p-1"
//           />
//           <span className="font-bold text-lg">
//             {settings?.siteName || "Agro Farm"}
//           </span>
//         </Link>

//         {/* ========================= DESKTOP NAV ========================= */}
//         <div className="hidden md:flex items-center gap-6 text-sm font-medium relative">

//           {navLinks.map((item, index) => (
//             <Link
//               key={item._id || index}
//               to={item.link}
//               className="hover:text-yellow-400 transition"
//             >
//               {item.label}
//             </Link>
//           ))}

//           {/* ========================= SERVICES DROPDOWN ========================= */}
//           {services.length > 0 && (
//             <div
//               className="relative"
//               onMouseEnter={() => setServicesOpen(true)}
//               onMouseLeave={() => setServicesOpen(false)}
//             >
//               <button className="hover:text-yellow-400 transition">
//                 Services ▾
//               </button>

//               {servicesOpen && (
//                 <div className="absolute top-6 left-0 bg-white text-black rounded shadow-lg w-64 z-50">
//                   {services.map((service) => (
//                     <Link
//                       key={service._id}
//                       to={`/services/${service.slug}`}
//                       className="block px-4 py-2 hover:bg-gray-100"
//                     >
//                       {service.title}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//         </div>

//         {/* ========================= SEARCH + CTA ========================= */}
//         <div className="hidden md:flex items-center gap-3">

//           <div className="flex items-center bg-white rounded-full overflow-hidden">
//             <input
//               type="text"
//               placeholder={settings?.searchPlaceholder || "Search..."}
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               className="px-3 py-1.5 text-black text-sm focus:outline-none"
//             />
//             <button
//               onClick={handleSearch}
//               className="bg-yellow-500 px-4 py-1.5 text-black font-semibold"
//             >
//               Search
//             </button>
//           </div>

//           <Link
//             to={settings?.ctaLink || "/products"}
//             className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold"
//           >
//             {settings?.ctaText || "Shop"}
//           </Link>

//         </div>

//         {/* ========================= MOBILE MENU ========================= */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden text-2xl"
//         >
//           ☰
//         </button>

//       </div>

//       {/* ========================= MOBILE MENU ========================= */}
//       {menuOpen && (
//         <div className="md:hidden bg-black px-6 pb-4 space-y-4">

//           {navLinks.map((item, index) => (
//             <Link
//               key={item._id || index}
//               to={item.link}
//               onClick={() => setMenuOpen(false)}
//               className="block hover:text-yellow-400"
//             >
//               {item.label}
//             </Link>
//           ))}

//           {/* SERVICES MOBILE */}
//           {services.map((service) => (
//             <Link
//               key={service._id}
//               to={`/services/${service.slug}`}
//               onClick={() => setMenuOpen(false)}
//               className="block text-gray-300 ml-3"
//             >
//               • {service.title}
//             </Link>
//           ))}

//         </div>
//       )}

//     </nav>
//   )
// }

// export default Navbar
