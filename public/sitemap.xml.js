import payload from 'payload';

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://chrestensoelberg.dk';

  const staticPages = ['', 'projekter', 'blog'];

  const blogs = await payload.find({
    collection: 'posts',
    limit: 1000,
    depth: 0,
  });


  const staticUrls = staticPages.map(page => {
    return `
    <url>
      <loc>${baseUrl}/${page}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).join('');

  const blogUrls = blogs.docs.map(blog => {
    return `
    <url>
      <loc>${baseUrl}/blog/${blog.slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.9</priority>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${blogUrls}
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
