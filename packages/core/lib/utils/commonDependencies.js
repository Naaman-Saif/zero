// given a source file, send back dependencies that will
// be installed in user's package.json
const path = require("path");

module.exports = file => {
  var deps = {
    "@babel/core": "^7.2.2",
    "@babel/runtime": "^7.3.1",
    "regenerator-runtime": "^0.12.0",
    "@babel/plugin-proposal-class-properties": "^7.3.4",
    "babel-plugin-transform-zero-dirname-filename": "^1.1.1-alpha.0",
    "@babel/plugin-transform-runtime": "^7.2.0",
    cssnano: "^4.1.10"
  };

  const ext = path.extname(file);
  if (ext === ".sass" || ext === ".scss") {
    var sassDeps = { sass: "^1.17.2" };
    deps = { ...deps, ...sassDeps };
  }

  if (ext === ".ts" || ext === ".tsx") {
    var depsTs = {
      typescript: "^3.7.2"
    };
    deps = { ...deps, ...depsTs };
  }

  // install dynamodb connector for sessions middleware only when needed
  if (process.env.SESSION_DYNAMODB_TABLE) {
    var dynamoDb = {
      "connect-dynamodb": "^2.0.3"
    };
    deps = { ...deps, ...dynamoDb };
  }

  return deps;
};
