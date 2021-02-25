const px2rem = require('postcss-px2rem');

module.exports = {
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          px2rem({
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
    outputDir:'dosc',
    }
