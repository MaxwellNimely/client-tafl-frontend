import { useEffect, useState } from "react"
import { fetchSiteSettings } from "../lib/api"

export const useSiteSettings = () => {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetchSiteSettings().then(setSettings)
  }, [])

  return settings
}