// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  productionSourceMap: false,
  configureWebpack: {
    //plugins: [new BundleAnalyzerPlugin()],
    //mode: 'production',
    resolve:{
      alias: {
        'moment': 'moment/src/moment',

      }
    }
  },
  // publicPath: '/static/yt_dashboard/',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/static/yt_dashboard/'
    : '/',
  outputDir: 'static/yt_dashboard/',
  //assetDir: '', //relative to outputdir
  indexPath: '../../templates/yt_dashboard/index.html', //relative to outputdir
  devServer: {
      proxy: {
          "**": {
            target: "http://localhost:8000",
            ws: true,
            changeOrigin: true
          }
        }
  },
  // css: {
  //   loaderOptions: {
  //       scss: {
  //           prependData: '@import "~@/scss/override.scss";'
  //       }
  //   }
  // }
}