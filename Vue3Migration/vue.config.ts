const StyleLintPlugin = require('stylelint-webpack-plugin')

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.entry('app').clear().add('./src/main.ts')
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        // ... rest of your injected vars here
        // get rid of vue-i18 warning
        __VUE_I18N_FULL_INSTALL__: JSON.stringify(true),
        __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_I18N_LEGACY_API__: JSON.stringify(false)
      })

      return definitions
    })
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
        customSyntax: 'postcss-html'
      })
    ],
    resolve: {
      symlinks: false
    }
  },
  pages: {
    index: {
      entry: './src/main.ts'
    }
  }
})

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/resources/variables.scss";'
      }
    }
  }
}
