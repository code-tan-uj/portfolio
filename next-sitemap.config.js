/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://tanujsansare.cv',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://tanujsansare.cv/sitemap.xml',
    ],
  },
};
