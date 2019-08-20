const isDev = process.env.NODE_ENV === "development";
const path = require("path");

module.exports = {
  // mode: isDev ? "development" : "production",
  mode: "development",
  entry: {
    app: "./client/app/index.js",
    content: "./client/content/index.js"
  },
  output: {
    path: __dirname,
    filename: "./public/js/[name].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"]
  },
  devtool: "source-map",
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
        loader: "file-loader"
      },
      // the following 3 rules handle font extraction
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },

      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.otf(\?.*)?$/,
        use:
          "file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf"
      }
    ]
  }
};
