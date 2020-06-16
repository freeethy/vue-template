// const Mock = require("mockjs");

module.exports = [
  {
    url: "/matters/dimension",
    type: "get",
    response: () => {
      return {
        code: 0,
        msg: "SUCCESS",
        data: [
          { option: "1", name: "营收1", date: null },
          { option: "2", name: "降本1", date: null },
          { option: "3", name: "内控1", date: null },
          { option: "4", name: "品牌1", date: null }
        ]
      };
    }
  }
];
