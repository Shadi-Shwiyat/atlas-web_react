const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // Set Webpack mode to development
  entry: {
    header: './modules/header/header.js',
    body: './modules/body/body.js',
    footer: './modules/footer/footer.js'
  }, // Entry point of your for each file
  output: {
    path: path.resolve(__dirname, './public'), // Output directory
    filename: '[name].bundle.js', // Output filename for each file
    chunkFilename: '[name].[contenthash].bundle.js' // Output filename for chunks
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 8564, // Specify Port
    static: {
      directory: path.join(__dirname, './public'),
    },
    // open: true
  },
  devtool: 'inline-source-map', // Enable inline source maps
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html'
    }),
    new CleanWebpackPlugin() // Clean build folder on each build
  ],
  module: {
    rules: [
      {
        test: /\.css$/, // Rule for .css files
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/, // Rule for image files
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name].[ext]',
          //   },
          // },
          {
            loader: 'image-webpack-loader',
            options: {
              name: '[name].[ext]',
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      }
    ]
  }
};
