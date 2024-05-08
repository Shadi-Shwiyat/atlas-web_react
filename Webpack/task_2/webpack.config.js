const path = require('path');

module.exports = {
  mode: 'production', // Set Webpack mode to production
  entry: './js/dashboard_main.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'public'), // Output directory
    filename: 'bundle.js' // Output filename
  },
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
