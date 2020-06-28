// const Mock = require("mockjs");

module.exports = [
  // login
  {
    url: "/login/infos",
    type: "get",
    urlPrefix: "",
    response: () => {
      return {
        code: 0,
        msg: "SUCCESS",
        data: {
          userEmpNo: "000001",
          username: "xxx",
          authDeptCodes: ["905", "906"],
          moduleCodes: ["board"]
        }
      };
    }
  }
];
