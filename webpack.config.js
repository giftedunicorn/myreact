const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash].js', // cache and use content as hash
    clean: true,
  },
  optimization: {
    usedExports: true,
    runtimeChunk: 'single', // creates a single runtime bundle for all chunks. allows code-splitted modules to be shared between entries. 
    splitChunks: {
      chunks: 'all', // extract common dependencies into an existing entry chunk or an entirely new chunk
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader', // use thread loader instead of happypack, run build in worker pool
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
          test: /\.css$/,
          use: [
            // 'style-loader',
            MiniCssExtractPlugin.loader, // extract css file from js
            'css-loader',
            'postcss-loader',
          ]
      },
      {
          test: /\.(png|jpe?g|gif)$/,
          use: {
            loader: 'url-loader?limit=10000&name=img/[name].[ext]'
          }
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css", // cache and use content as hash
      chunkFilename: "[id].css"
    }),
  ],
}
