import type { MetadataRoute } from 'next'
import { CV_URL, SITE_URL } from '@/data/profil'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const maj = new Date()
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: maj,
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${SITE_URL}/images/og-cover.jpg`, `${SITE_URL}/images/1.png`],
    },
    {
      url: `${SITE_URL}${CV_URL}`,
      lastModified: maj,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
