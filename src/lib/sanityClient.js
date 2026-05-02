import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

//
// =========================
// 🔐 ENVIRONMENT VARIABLES (VITE)
// =========================
// These values are injected at build time by Vite (.env file)
// They must be prefixed with VITE_ to be exposed in frontend
//
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

//
// =========================
// 🧠 API VERSION (LOCKED)
// =========================
// Locking API version ensures stability and prevents breaking changes
//
const apiVersion = "2024-01-01"

//
// =========================
// ⚠️ STRICT VALIDATION (PRODUCTION SAFE)
// =========================
// Fail fast if configuration is missing (important for Vercel builds)
// This prevents silent runtime errors in production
//
if (!projectId) {
  throw new Error("❌ Missing VITE_SANITY_PROJECT_ID in environment variables")
}

if (!dataset) {
  throw new Error("❌ Missing VITE_SANITY_DATASET in environment variables")
}

//
// =========================
// 🚀 SANITY CLIENT (PRODUCTION)
// =========================
// Main client used for fetching published content from Sanity CMS
//
export const client = createClient({
  projectId,
  dataset,
  apiVersion,

  // ⚡ Use CDN for faster reads in production
  useCdn: true,

  // 🔒 Only fetch published content (prevents drafts leaking to users)
  perspective: "published",

  // 🔮 Future feature flag (kept false for stability)
  stega: false,
})

//
// =========================
// 🖼️ IMAGE URL BUILDER
// =========================
// Converts Sanity image references into usable CDN image URLs
//
const builder = imageUrlBuilder(client)

//
// =========================
// 🖼️ SAFE IMAGE HELPER
// =========================
// Prevents runtime errors when image is missing or undefined
//
export const urlFor = (source) =>
  source ? builder.image(source) : null

//
// =========================
// 🧪 PREVIEW CLIENT (DEV ONLY)
// =========================
// Used for draft previewing inside Sanity Studio or frontend preview mode
// NEVER expose tokens in production builds
//
export const previewClient =
  import.meta.env.DEV
    ? createClient({
        projectId,
        dataset,
        apiVersion,

        // ❗ Must be false for drafts/preview content
        useCdn: false,

        // 👀 Enables draft content visibility
        perspective: "previewDrafts",

        // 🔐 Token should ONLY exist in .env (never commit)
        token: import.meta.env.VITE_SANITY_TOKEN,
      })
    : null