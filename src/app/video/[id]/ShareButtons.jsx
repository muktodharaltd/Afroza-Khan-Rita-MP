'use client'

import React from 'react'
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from 'react-share'

export default function ShareButtons({ url, title, description }) {
  const quote = description || title || ''

  return (
    <div className="flex gap-3 mb-6">
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon size={38} round />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={38} round />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title}>
        <WhatsappIcon size={38} round />
      </WhatsappShareButton>
    </div>
  )
}
