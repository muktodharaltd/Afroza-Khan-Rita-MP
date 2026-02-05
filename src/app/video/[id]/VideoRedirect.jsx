'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function VideoRedirect({ destination }) {
  const router = useRouter()

  useEffect(() => {
    // Optional: Redirect to specific section or just home with query param
    router.replace(destination)
  }, [router, destination])

  return null
}
