import Vue from "vue";
import VueRouter from "vue-router";
import layout from "../views/layout";
Vue.use(VueRouter);
const routes = [
  {
    path: "/home/",
    name: "首页",
    show: true,
    icon: "menuEvent",
    component: layout,
    meta: {
      moduleCode: "board"
    },
    children: [
      {
        path: "index/",
        name: "视图",
        defaultPath: "index/",
        show: true,
        icon: "menuEventFunction",
        meta: {
          code: "board"
        },
        component: () => import(/* webpackChunkName: "home"" */ "../views/Home")
      }
    ]
  },
  {
    path: "/example",
    name: "example",
    component: () => import("../views/example.vue")
  },
  {
    path: "/noAuth",
    name: "noAuth",
    show: false,
    redirect: "/noAuth/index",
    component: layout,
    meta: {
      moduleCode: "noAuth"
    },
    children: [
      {
        path: "/",
        name: "无权限",
        component: () =>
          import(/* webpackChunkName: "jjsx"" */ "../views/noAuth/index.vue")
      }
    ]
  }
];
export function getRouters({ moduleCodes }) {
  // 处理菜单权限路由
  // moduleCodes所有的权限的code
  let menusBtn = moduleCodes || [];
  // let noAuth = true;
  routes.forEach(item => {
    if (
      !menusBtn.some(el => {
        return el === (item.meta && item.meta.moduleCode);
      })
    ) {
      item.show = false;
    }
    // 判断子权限
    if (item.show) {
      // noAuth = false;
      item.children.forEach(subItem => {
        if (
          subItem.meta &&
          subItem.meta.code &&
          moduleCodes.some(el => {
            return el === subItem.meta.code;
          })
        ) {
          if (subItem.defaultPath) {
            item.children.push({
              path: "/",
              redirect: item.path + subItem.defaultPath
            }); // 添加一级菜单默认跳转路径
          } else {
            if (subItem.children) {
              for (let subsubItem of subItem.children) {
                if (
                  subsubItem.defaultPath &&
                  moduleCodes.some(el => {
                    return el === subsubItem.meta.code;
                  })
                ) {
                  subItem.defaultPath = subItem.path + subsubItem.defaultPath;
                  item.children.push({
                    path: "/",
                    redirect: item.path + subItem.defaultPath
                  }); // 添加二级菜单默认跳转路径
                  break;
                }
              }
            } else {
              item.children.push({
                path: "/",
                redirect: item.path + subItem.path
              }); // 添加默认跳转路径
            }
          }
        }
      });
    }
  });
  // if (noAuth) {
  //   let index = routes.findIndex(it => {
  //     return it.name == "noAuth";
  //   });
  //   routes[index].show = true;
  // }
  // 用户直接输入域名默认跳转页面
  for (let routerItem of routes) {
    if (routerItem.show) {
      let tempArray = routerItem.children.find(item => {
        return item.path === "/";
      });
      routes.unshift(tempArray);
      break;
    }
  }
  return routes;
}

export default routes;
