const modules = {};
var req = require.context("./", true, /^(.*\.(js$))[^.]*$/);
req.keys().forEach(function(key) {
  var _key = key.replace("./", "").replace(".js", "");

  // 除了 index.js 之外的全部加载
  if (_key !== "index") {
    modules[_key] = req(key).default;
  }
});
export default modules;
