const SitemapPlugin = require('sitemap-webpack-plugin').default;

// Generate new route objects based on country names
const cases = require('./src/data/countries.json' )
const countryRoutes = cases.countries.map((routeSlug) => {
    return {
        path: '/country/' + routeSlug,
        lastmod: new Date().toISOString().slice(0,10),
        priority: '0.8',
        changefreq: 'hourly'
    }
});

const paths = [
    {
        path: '/',
        lastmod: new Date().toISOString().slice(0,10),
        priority: '0.8',
        changefreq: 'hourly'
    },
 ...countryRoutes
];

module.exports = {
    configureWebpack: {
        plugins: [
            new SitemapPlugin('https://covid19.ramgolam.com', paths, {
                filename: 'sitemap.xml',
                lastmod: true,
                changefreq: 'hourly',
                priority: '0.8'
            })
        ]
    }
}