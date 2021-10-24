const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  images: {
    domains: ["candleaf.herokuapp.com"],
  },
};
