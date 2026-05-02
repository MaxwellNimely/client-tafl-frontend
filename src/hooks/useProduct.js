import { useEffect, useState } from "react"
import { fetchProductBySlug } from "../lib/api"

export const useProduct = (slug) => {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return

    fetchProductBySlug(slug)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [slug])

  return { product, loading }
}