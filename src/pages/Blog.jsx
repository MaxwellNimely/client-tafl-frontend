import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchBlogs } from "../lib/api"
import { urlFor } from "../lib/sanityClient"

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  // =========================
  // FETCH BLOG POSTS
  // =========================
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchBlogs()
        setPosts(data || [])
      } catch (error) {
        console.error("Failed to load blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  // =========================
  // LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading blog posts...
      </div>
    )
  }

  // =========================
  // EMPTY STATE
  // =========================
  if (!posts.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        No blog posts available
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-10 text-center">
        Blog & Insights
      </h1>

      {/* 📰 BLOG GRID */}
      <div className="grid md:grid-cols-3 gap-8">

        {posts.map((post) => (
          <Link
            key={post._id}
            to={`/blog/${post.slug}`}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group"
          >

            {/* IMAGE */}
            <div className="h-52 bg-gray-100 overflow-hidden">
              {post.mainImage ? (
                <img
                  src={urlFor(post.mainImage)?.width(600).url()}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-3">

              {/* FEATURED TAG */}
              {post.featured && (
                <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded">
                  Featured
                </span>
              )}

              <h2 className="text-lg font-semibold line-clamp-2">
                {post.title}
              </h2>

              <p className="text-sm text-gray-500">
                By {post.author || "Admin"}
              </p>

              <p className="text-xs text-gray-400">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString()
                  : ""}
              </p>

            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default Blog