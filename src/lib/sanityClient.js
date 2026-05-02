import { createClient } from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

//
// =========================
// 🔐 ENVIRONMENT VARIABLES (VITE)
// =========================
// Injected at build time via Vite (.env + Vercel)
// Must start with VITE_ to be accessible in frontend
//
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET

//
// =========================
// 🌐 API VERSION (LOCKED)
// =========================
// Ensures consistent Sanity API behavior across deployments
//
const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION || "2024-01-01"

//
// =========================
// ⚠️ REQUIRED CONFIG VALIDATION
// =========================
// Prevents silent production failures (fail-fast approach)
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
// Main client used for fetching published CMS content
//
export const client = createClient({
  projectId,
  dataset,
  apiVersion,

  //
  // ⚡ CDN CONTROL (VERCEL-READY)
  // -----------------------------
  // Controlled via environment variable:
  // VITE_SANITY_USE_CDN=true/false
  //
  // true  → faster production reads
  // false → fresh data (slower, but real-time)
  //
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === "true",

  //
  // 🔒 SECURITY / CONTENT MODE
  // --------------------------
  // Only returns published content (prevents draft leaks)
  //
  perspective: "published",

  //
  // 🔮 FUTURE STABILITY FLAG
  // --------------------------
  //
  stega: false,

  //
  // 🌐 FUTURE CUSTOM SANITY API DOMAIN (OPTIONAL)
  // --------------------------------------------
  // Uncomment when using enterprise/custom API routing
  //
  // baseUrl: import.meta.env.VITE_SANITY_BASE_URL,
})

//
// =========================
// 🖼️ IMAGE URL BUILDER
// =========================
// Converts Sanity image references into CDN URLs
//
const builder = imageUrlBuilder(client)

//
// =========================
// 🖼️ SAFE IMAGE HELPER
// =========================
// Prevents crashes when image is missing or invalid
//
export const urlFor = (source) =>
  source ? builder.image(source) : null

//
// =========================
// 🧪 PREVIEW CLIENT (DEV ONLY)
// =========================
// Enables draft content preview in development ONLY
// NEVER expose tokens in production
//
export const previewClient =
  import.meta.env.DEV
    ? createClient({
        projectId,
        dataset,
        apiVersion,

        //
        // ❗ Must disable CDN for drafts
        //
        useCdn: false,

        //
        // 👀 Enables draft + published content
        //
        perspective: "previewDrafts",

        //
        // 🔐 Optional local-only token
        //
        token: import.meta.env.VITE_SANITY_TOKEN,
      })
    : null