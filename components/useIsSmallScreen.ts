'use client'

import { useEffect, useState } from 'react'

const getMatch = (query: string) =>
  typeof window !== 'undefined' ? window.matchMedia(query).matches : false

export const useIsSmallScreen = (maxWidth = 768) => {
  const [isSmallScreen, setIsSmallScreen] = useState(getMatch(`(max-width: ${maxWidth}px)`))

  useEffect(() => {
    const query = `(max-width: ${maxWidth}px)`
    const mediaQuery = window.matchMedia(query)
    const handleChange = () => setIsSmallScreen(mediaQuery.matches)

    handleChange()

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [maxWidth])

  return isSmallScreen
}
