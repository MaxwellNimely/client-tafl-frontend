//
// 🌐 NAVIGATION
// =========================
// Dynamic navbar (supports dropdowns & future expansion)
//
export const navigationQuery = `
*[_type == "navigation" && isActive == true] 
| order(order asc){
  _id,
  label,
  link,
  order,
  isActive
}
`

//
// ⚙️ SITE SETTINGS
// =========================
// Global configuration (Navbar, Footer, SEO, CTA)
//
export const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  siteName,
  logo,
  description,
  contactEmail,
  searchPlaceholder,
  ctaText,
  ctaLink
}
`

//
// 🌱 SERVICES
// =========================
// Core CMS module (Homepage, Services page, Detail pages)
//
export const servicesQuery = `
*[_type == "service"] 
| order(coalesce(order, 9999) asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  icon,
  description,
  image{
    asset
  },
  order
}
`

//
// 🔎 SERVICE BY SLUG
//
export const serviceBySlugQuery = `
*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  icon,
  description,
  content,
  image{
    asset
  },
  order
}
`

//
// 👥 TEAM (FIXED - IMPORTANT FOR ABOUT PAGE)
// =========================
// Leadership & staff management (CEO + team members)
//
export const teamQuery = `
*[_type == "team"] 
| order(coalesce(order, 9999) asc, _createdAt asc){
  _id,
  name,
  role,
  description,
  isCEO,
  image{
    asset
  },
  order
}
`

//
// 🛍️ PRODUCTS
// =========================
// E-commerce / catalog module
//
export const productsQuery = `
*[_type == "product"] 
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  price,
  description,
  "category": category->title,
  inStock,
  featured,
  "image": images[0]{asset},
  images[]{asset}
}
`

//
// 🔎 PRODUCT BY SLUG
//
export const productBySlugQuery = `
*[_type == "product" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  price,
  description,
  "category": category->title,
  inStock,
  featured,
  "image": images[0]{asset},
  images[]{asset}
}
`

//
// ⭐ FEATURED PRODUCTS
//
export const featuredProductsQuery = `
*[_type == "product" && featured == true] 
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  price,
  "category": category->title,
  "image": images[0]{asset},
  images[]{asset}
}
`

//
// 🏷️ CATEGORIES
//
export const categoriesQuery = `
*[_type == "category"] 
| order(title asc){
  _id,
  title,
  "slug": slug.current
}
`

//
// 🛍️ PRODUCTS BY CATEGORY
//
export const productsByCategoryQuery = `
*[_type == "product" && category->slug.current == $slug] 
| order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  price,
  description,
  "category": category->title,
  inStock,
  featured,
  "image": images[0]{asset},
  images[]{asset}
}
`

//
// 📰 BLOG
// =========================
// Articles, insights, updates
//
export const blogQuery = `
*[_type == "blog"] 
| order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  "slug": slug.current,
  mainImage{
    asset
  },
  author,
  publishedAt,
  featured
}
`

//
// 🔎 BLOG BY SLUG
//
export const blogBySlugQuery = `
*[_type == "blog" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  mainImage{
    asset
  },
  content,
  author,
  publishedAt,
  featured
}
`

//
// 🎓 TRAINING
// =========================
// Capacity building & agricultural programs
//
export const trainingQuery = `
*[_type == "training"] 
| order(coalesce(date, _createdAt) desc){
  _id,
  title,
  "slug": slug.current,
  image{
    asset
  },
  description,
  location,
  date,
  duration,
  isAvailable
}
`

//
// 🔎 TRAINING BY SLUG
//
export const trainingBySlugQuery = `
*[_type == "training" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  image{
    asset
  },
  description,
  content,
  location,
  date,
  duration,
  isAvailable
}
`