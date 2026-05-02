import { client } from "./sanityClient"

import {
  navigationQuery,
  siteSettingsQuery,

  // 🌱 SERVICES
  servicesQuery,
  serviceBySlugQuery,

  // 🛍️ PRODUCTS
  productsQuery,
  productBySlugQuery,
  featuredProductsQuery,
  productsByCategoryQuery,
  categoriesQuery,

  // 📰 BLOG
  blogQuery,
  blogBySlugQuery,

  // 🎓 TRAINING
  trainingQuery,
  trainingBySlugQuery,

  // 👥 TEAM (NEW - REQUIRED FOR ABOUT PAGE)
  teamQuery,
} from "./queries"

//
// =========================
// 🧠 SAFE FETCH CORE
// =========================
// Centralized error handling for ALL Sanity requests
//
const safeFetch = async (query, params = {}) => {
  try {
    const data = await client.fetch(query, params)
    return data ?? null
  } catch (error) {
    console.error("❌ Sanity fetch error:", {
      query,
      params,
      message: error?.message || error,
    })
    return null
  }
}

//
// =========================
// 🌐 NAVIGATION
// =========================
export const fetchNavigation = async () => {
  const data = await safeFetch(navigationQuery)
  return Array.isArray(data) ? data : []
}

//
// =========================
// ⚙️ SITE SETTINGS
// =========================
export const fetchSiteSettings = async () => {
  const data = await safeFetch(siteSettingsQuery)
  return data || null
}

//
// =========================
// 🌱 SERVICES
// =========================
// Core CMS module (homepage, services, service detail pages)
//
export const fetchServices = async () => {
  const data = await safeFetch(servicesQuery)
  return Array.isArray(data) ? data : []
}

export const fetchServiceBySlug = async (slug) => {
  if (!slug) return null

  const data = await safeFetch(serviceBySlugQuery, { slug })
  return data || null
}

//
// =========================
// 👥 TEAM (NEW - FIX FOR ABOUT PAGE)
// =========================
// Leadership + staff management from CMS
//
export const fetchTeam = async () => {
  const data = await safeFetch(teamQuery)
  return Array.isArray(data) ? data : []
}

//
// =========================
// 🛍️ PRODUCTS
// =========================
// E-commerce / catalog system
//
export const fetchProducts = async () => {
  const data = await safeFetch(productsQuery)
  return Array.isArray(data) ? data : []
}

export const fetchProductBySlug = async (slug) => {
  if (!slug) return null

  const data = await safeFetch(productBySlugQuery, { slug })
  return data || null
}

export const fetchFeaturedProducts = async () => {
  const data = await safeFetch(featuredProductsQuery)
  return Array.isArray(data) ? data : []
}

export const fetchCategories = async () => {
  const data = await safeFetch(categoriesQuery)
  return Array.isArray(data) ? data : []
}

export const fetchProductsByCategory = async (slug) => {
  if (!slug) return []

  const data = await safeFetch(productsByCategoryQuery, { slug })
  return Array.isArray(data) ? data : []
}

//
// =========================
// 📰 BLOG
// =========================
// Articles, insights, updates
//
export const fetchBlogs = async () => {
  const data = await safeFetch(blogQuery)
  return Array.isArray(data) ? data : []
}

export const fetchBlogBySlug = async (slug) => {
  if (!slug) return null

  const data = await safeFetch(blogBySlugQuery, { slug })
  return data || null
}

//
// =========================
// 🎓 TRAINING
// =========================
// Agricultural training & capacity building programs
//
export const fetchTraining = async () => {
  const data = await safeFetch(trainingQuery)
  return Array.isArray(data) ? data : []
}

export const fetchTrainingBySlug = async (slug) => {
  if (!slug) return null

  const data = await safeFetch(trainingBySlugQuery, { slug })
  return data || null
}