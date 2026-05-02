import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { fetchBlogBySlug } from "../lib/api"
import { urlFor } from "../lib/sanityClient"
import { PortableText } from "@portabletext/react"

const BlogDetail = () => {
  const { slug } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH BLOG POST
  // =========================
  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchBlogBySlug(slug)
        setPost(data)
      } catch (error) {
        console.error("Failed to load blog:", error)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading article...
      </div>
    )
  }

  // =========================
  // NOT FOUND STATE
  // =========================
  if (!post) {
    return (
      <div className="text-center py-20 text-red-500">
        Article not found
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">

      {/* 🔙 BACK LINK */}
      <Link
        to="/blog"
        className="text-sm text-gray-500 hover:text-yellow-500 transition"
      >
        ← Back to Blog
      </Link>

      {/* 🖼️ FEATURE IMAGE */}
      {post.mainImage && (
        <div className="mt-6 mb-8">
          <img
            src={urlFor(post.mainImage)?.width(1200).url()}
            alt={post.title}
            className="w-full rounded-xl shadow-md object-cover"
          />
        </div>
      )}

      {/* 🧠 CONTENT WRAPPER */}
      <div className="space-y-6">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {post.title}
        </h1>

        {/* META */}
        <div className="text-sm text-gray-500 flex flex-wrap gap-4">
          <span>By {post.author || "Admin"}</span>

          {post.publishedAt && (
            <span>
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* FEATURED BADGE */}
        {post.featured && (
          <span className="inline-block bg-yellow-500 text-black px-3 py-1 rounded text-xs font-semibold">
            Featured
          </span>
        )}

        {/* 📄 RICH CONTENT (PORTABLE TEXT) */}
        <div className="prose max-w-none mt-6 text-gray-700 leading-relaxed">

          {post.content ? (
            <PortableText value={post.content} />
          ) : (
            <p className="text-gray-500">
              No content available.
            </p>
          )}

        </div>

      </div>
    </div>
  )
}

export default BlogDetail