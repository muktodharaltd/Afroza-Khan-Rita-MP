'use client'

import React, { useEffect, useState } from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share'

export default function ShareButtons({ title }) {
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  if (!shareUrl) return null

  return (
    <div className="flex gap-3 mb-6">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={38} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={38} round />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={38} round />
      </WhatsappShareButton>
    </div>
  )
}
