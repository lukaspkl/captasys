import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/intel/'],
    },
    sitemap: 'https://siteprox.com.br/sitemap.xml',
  }
}
