import { useEffect, useState } from "react"
import { fetchProducts } from "../lib/api"

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}