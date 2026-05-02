import { useEffect, useState } from "react"
import { fetchNavigation } from "../lib/api"

export const useNavigation = () => {
  const [nav, setNav] = useState([])

  useEffect(() => {
    fetchNavigation().then(setNav)
  }, [])

  return nav
}