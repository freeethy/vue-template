const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    // https: true,
    // 接口代理地址
    proxy: {
      "/api": {
        target: "http://xx.xx",
        secure: false,
        changeOrign: true,
        pathRewrite: {
          // "^/api": ""
        }
      },
      "/login": {
        target: "http://xx.xx",
        secure: false,
        changeOrign: true,
        pathRewrite: {
          // "^/api": "/"
        }
      },
      "/logout": {
        target: "http://xx.xx",
        secure: false,
        changeOrign: true,
        pathRewrite: {
          // "^/api": "/"
        }
      }
    },
    open: true,
    overlay: {
      warnings: false,
      errors: false
    },
    // 如果需要mock在proxy前，用before
    before: require("./mock/mock-server.js")
  },
  publicPath: process.env.PUBLIC_PATH,
  lintOnSave: process.env.NODE_ENV !== "production",
  outputDir: process.env.OUTPUT_DIR,
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    devtool: "source-map"
  },
  // 全局scss配置
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/pure.scss";`
      }
    }
  },
  // 插件配置
  chainWebpack: config => {
    // url-loader Loader
    // 图片base64
    config.module.rule("url-loader").test(/\.(png|jpg|gif)$/i).use[
      {
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]"
        }
      }
    ];

    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });

    if (process.env.NODE_ENV !== "development") {
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial" // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
      config.optimization.runtimeChunk("single");

      if (process.env.npm_config_report) {
        config
          .plugin("webpack-bundle-analyzer")
          .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
          .end();
        config.plugins.delete("prefetch");
      }
    }
  }
};
