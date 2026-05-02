import { Routes, Route } from "react-router-dom"
import Layout from "./layout/Layout"

// Pages
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Training from "./pages/Training"
import TrainingDetail from "./pages/TrainingDetail"
import Blog from "./pages/Blog"
import BlogDetail from "./pages/BlogDetail"
import Impact from "./pages/Impact"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import ServiceDetail from "./pages/ServiceDetail"
import Cart from "./pages/Cart"

function App() {
  return (
    <Routes>

      {/* Layout wrapper */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        <Route path="/products" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetail />} />

        <Route path="/training" element={<Training />} />
        <Route path="/training/:slug" element={<TrainingDetail />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />

        <Route path="/impact" element={<Impact />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* 404 outside layout */}
      <Route
        path="*"
        element={
          <div className="h-[60vh] flex items-center justify-center text-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">404</h1>
              <p className="text-gray-500">Page not found</p>
            </div>
          </div>
        }
      />

    </Routes>
  )
}

export default App


// import { Routes, Route } from "react-router-dom"

// // =========================
// // PAGES
// // =========================
// import Home from "./pages/Home"
// import About from "./pages/About"

// import Products from "./pages/Products"
// import ProductDetail from "./pages/ProductDetail"

// import Training from "./pages/Training"
// import TrainingDetail from "./pages/TrainingDetail"

// import Blog from "./pages/Blog"
// import BlogDetail from "./pages/BlogDetail"

// import Impact from "./pages/Impact"
// import Contact from "./pages/Contact"

// // 🌱 SERVICES (NEW CORE MODULE)
// import Services from "./pages/Services"
// import ServiceDetail from "./pages/ServiceDetail"

// // 🧺 CART
// import Cart from "./pages/Cart"

// // =========================
// // LAYOUT COMPONENTS
// // =========================
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen bg-white">

//       {/* ========================= NAVBAR ========================= */}
//       <Navbar />

//       {/* ========================= MAIN CONTENT ========================= */}
//       <main className="flex-grow">

//         <Routes>

//           {/* 🏠 HOME */}
//           <Route path="/" element={<Home />} />

//           {/* ℹ️ ABOUT */}
//           <Route path="/about" element={<About />} />

//           {/* 🌱 SERVICES (NEW) */}
//           <Route path="/services" element={<Services />} />
//           <Route path="/services/:slug" element={<ServiceDetail />} />

//           {/* 🛍️ PRODUCTS */}
//           <Route path="/products" element={<Products />} />
//           <Route path="/product/:slug" element={<ProductDetail />} />

//           {/* 🎓 TRAINING */}
//           <Route path="/training" element={<Training />} />
//           <Route path="/training/:slug" element={<TrainingDetail />} />

//           {/* 📰 BLOG */}
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog/:slug" element={<BlogDetail />} />

//           {/* 🧺 CART */}
//           <Route path="/cart" element={<Cart />} />

//           {/* 🌍 OTHER */}
//           <Route path="/impact" element={<Impact />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* ❌ 404 PAGE (IMPORTANT FOR PRODUCTION) */}
//           <Route
//             path="*"
//             element={
//               <div className="h-[60vh] flex items-center justify-center text-center">
//                 <div>
//                   <h1 className="text-4xl font-bold mb-2">404</h1>
//                   <p className="text-gray-500">Page not found</p>
//                 </div>
//               </div>
//             }
//           />

//         </Routes>

//       </main>

//       {/* ========================= FOOTER ========================= */}
//       <Footer />

//     </div>
//   )
// }

// export default App