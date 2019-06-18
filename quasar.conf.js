const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
const spaDistFolder = 'docs'
const platformsRootDistFolder = 'dist'

function preRenderRounds (output) {
  const inputFolder = './data/buildRoutes/'
  const routeBuildFilesNumber = 10
  let renderRounds = []
  let routes
  let i
  for (i = 0; i < routeBuildFilesNumber;) {
    i++
    routes = require(`${inputFolder}routes${i}.js`)
    renderRounds.push(
      new PrerenderSpaPlugin({
        staticDir: output,
        outputDir: output,
        routes: routes,
        renderer: new Renderer({
          maxConcurrentRoutes: 2,
          captureAfterElementExists: "input[name='spaPreRenderElement']"
        })
      })
    )
  }
  return renderRounds
}

function getDistFolder (mode) {
  let outputFolder = `${spaDistFolder}/`
  if (mode !== 'spa') {
    outputFolder = `${platformsRootDistFolder}/${mode}/`
  }
  return path.join(__dirname, outputFolder)
}
module.exports = function (ctx) {
  const output = getDistFolder(ctx.modeName)
  const routerMode = ctx.modeName === 'spa' ? 'history' : 'hash'
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: true,
    build: {
      distDir: output,
      scopeHoisting: true,
      vueRouterMode: routerMode,
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        if (ctx.modeName === 'spa' && ctx.prod) {
          cfg.plugins.push.apply(cfg.plugins, preRenderRounds(output))
        }
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QRating',
        'QTooltip',
        'QBtn',
        'QIcon',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QCard',
        'QCardTitle',
        'QCardMain',
        'QCardMedia',
        'QTable',
        'QTd',
        'QTr',
        'QSearch',
        'QPageSticky'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify'
      ]
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      // i18n: 'de' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        short_name: 'Reicast DB',
        name: 'Reicast Game Compatibility Databases',
        description: 'Reicast Game Compatibility Database',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#38478c',
        lang: 'en',
        start_url: '/?utm_source==pwahome',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'com.reicast.gamedb'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'reicast-db-app'
      }
    }
  }
}
