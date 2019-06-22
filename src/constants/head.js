export const DESCRIPTION = 'description'

// TODO: add missing icons and other data if necessary and uncomment
export const metaTags = [
  { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
  { name: 'apple-mobile-web-app-title', content: `Reicast db` },
  { name: 'theme-color', content: `#38478c` },
  { name: 'msapplication-navbutton-color', content: `#38478c` },
  { name: 'mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  { name: 'coverage', content: 'WorldWide' },
  { name: 'rating', content: 'general' },
  { name: 'robots', content: 'index,follow' },
  { name: 'googlebot', content: 'index,follow' },

  // Microsoft
  { name: 'application-name', content: `Reicast db` },
  { name: 'msapplication-TileColor', content: `#38478c` },
  { name: 'msapplication-config', content: '/browserconfig.xml' },
  // { name: 'msapplication-square70x70logo', content: '/favicon/ms-icon-70x70.png' },
  { name: 'msapplication-TileImage', content: '/favicon/ms-icon-144x144.png' },
  // { name: 'msapplication-square150x150logo', content: '/favicon/mstile-150x150.png' },
  // { name: 'msapplication-wide310x150logo', content: '/favicon/ms-icon-310x310.png' },

  // Twitter
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:site', content: '@reicastdc' },

  // Facebook
  { property: 'fb:app_id', content: `336612363081189` },
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: `Let's Make Sega Dreamcast GD ROM Drive Emulation Happen` },
  { property: 'og:image:height', content: '1200' },
  { property: 'og:image:width', content: '360' },
  { property: 'og:image:type', content: 'image/png' }

  // { name: 'google-site-verification', content: `MY VERIFICATION KEY` }, // google
  // { name: 'msvalidate.01', content: `MY VERIFICATION KEY` }, // bing
  // { name: 'yandex-verification', content: `MY VERIFICATION KEY` } // Yandex
]

export const linkTags = [
  // Link
  // { rel: 'author', href: '/humans.txt' },
  // { rel: 'manifest', href: '/manifest.json' },

  // { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
  // { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
  // { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
  // { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
  // { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
  // { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
  // { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
  // { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
  // { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },

  // { rel: 'icon', type: 'image/png', href: '/favicon/android-icon-192x192.png', sizes: '192x192' },
  // { rel: 'icon', type: 'image/png', href: '/favicon/favicon-96x96.png', sizes: '96x96' },
  { rel: 'icon', type: 'image/png', href: '/favicon/favicon-32x32.png', sizes: '32x32' },
  { rel: 'icon', type: 'image/png', href: '/favicon/favicon-16x16.png', sizes: '16x16' },
  //
  // { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#ff5733' },
  { rel: 'shortcut icon', href: '/favicon/favicon.ico' },

  { rel: 'alternate', href: `https://reicastdb.com/`, hreflang: 'en' },

  // Prebrowsing
  // { rel: 'preconnect', href: 'https://connect.facebook.net/' },
  // { rel: 'preconnect', href: 'https://platform.twitter.com/' },
  // { rel: 'preconnect', href: 'https://widget.sndcdn.com/' },
  // { rel: 'preconnect', href: 'https://api-widget.soundcloud.com/' },
  { rel: 'preconnect', href: 'https://www.youtube.com/' },
  // { rel: 'preconnect', href: 'https://scrimba.com/' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com/' },
  { rel: 'preconnect', href: 'https://c.disquscdn.com/' },
  { rel: 'preconnect', href: 'https://disqus.com/' }
  // { rel: 'preconnect', href: 'https://www.google-analytics.com/' },
  // { rel: 'preconnect', href: 'https://stats.g.doubleclick.net' },

  // { rel: 'preload', href: 'https://www.google-analytics.com/analytics.js', as: 'script' }
]
