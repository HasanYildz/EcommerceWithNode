import React from 'react';

const Sitemap = () => {
  const pages = [
    { path: '/', priority: 1.0, name: "Home" },
    { path: '/mens', priority: 0.8, name: "Men's Page" },
    { path: '/womens', priority: 0.8, name: "Women's Page" },
    { path: '/kids', name: "Kid's Page" },
    { path: '/cart-page', priority: 0.6, name: "Shopping Cart" },
    { path: '/login', priority: 0.5, name: "Login Page" },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Site Map</h1>
      <ul style={{ listStyleType: 'none', padding: 0, fontSize: '1.5rem' }}>
        {pages.map((page, index) => (
          <li key={index} style={{ marginBottom: '15px' }}>
            <a href={page.path} style={{ textDecoration: 'none', color: '#007BFF' }}>
              {page.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SitemapPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa' }}>
      <Sitemap />
    </div>
  );
};

export default SitemapPage;
