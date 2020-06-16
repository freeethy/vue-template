let types = {
  PERMISSION: ["SET_PERMISSION"]
};

let t = {};
for (var type in types) {
  t[type] = {};
  for (let ac of types[type]) {
    t[type][ac] = type + "_" + ac;
  }
  // t = {USER: { GET: 'USER_GET' }}
}
export default t;
