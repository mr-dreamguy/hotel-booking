const tt = require("@tomtom-international/web-sdk-maps");

const map = tt.map({
  key: process.env.MAP_API_KEY,
  container: "map",
});

module.exports = map;
