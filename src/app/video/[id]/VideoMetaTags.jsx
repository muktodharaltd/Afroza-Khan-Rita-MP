'use client'

import { useEffect } from 'react'

export default function VideoMetaTags({ videoUrl, secureVideoUrl, imageUrl, title, description, pageUrl }) {
    useEffect(() => {
        // Inject meta tags dynamically for Facebook crawler fallback
        const metaTags = [
            { property: 'og:video', content: secureVideoUrl },
            { property: 'og:video:secure_url', content: secureVideoUrl },
            { property: 'og:video:type', content: 'video/mp4' },
            { property: 'og:video:width', content: '1280' },
            { property: 'og:video:height', content: '720' },
        ]

        const existingTags = []

        metaTags.forEach(({ property, content }) => {
            if (!content) return

            // Check if tag already exists
            let tag = document.querySelector(`meta[property="${property}"]`)

            if (!tag) {
                // Create new tag
                tag = document.createElement('meta')
                tag.setAttribute('property', property)
                tag.setAttribute('content', content)
                document.head.appendChild(tag)
                existingTags.push(tag)
            } else {
                // Update existing tag
                tag.setAttribute('content', content)
            }
        })

        // Cleanup on unmount
        return () => {
            existingTags.forEach(tag => tag.remove())
        }
    }, [videoUrl, secureVideoUrl, imageUrl, title, description, pageUrl])

    return null
}
