const path = require('path');

module.exports = {
  mode: 'production', // Set Webpack mode to production
  entry: './js/dashboard_main.js', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'public'), // Output directory
    filename: 'bundle.js' // Output filename
  },
};