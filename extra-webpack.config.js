const webpack = require('webpack');

const config = {
  resolve: {
    fallback: {
      "assert": require.resolve("assert/"),
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
  ]
};

module.exports = config;