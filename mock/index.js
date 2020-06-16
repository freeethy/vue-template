const path = require("path");
const glob = require("glob");

const mocks = [];

var globInstance = new glob.Glob("*", {
  cwd: path.resolve(__dirname, "requests/"), // 在requests目录里找
  sync: true // 这里不能异步，只能同步
});
globInstance.found.forEach(function(name) {
  const module = require(`./requests/${name}`);
  mocks.push(...module);
});

module.exports = mocks;
