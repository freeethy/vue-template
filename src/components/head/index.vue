<template>
  <div class="headView">
    <div class="menuBar">
      <div class="topBarMenu">
        <div v-if="showSubMenu" class="barMenuGroup">
          <div
            class="barMenuItem"
            :class="{ active: item.name == currentName }"
            v-for="item in subRouters"
            @click="goRouter(item)"
            :key="item.name"
          >
            <svg-icon
              :icon-class="
                item.icon + (item.name == currentName ? 'Active' : '')
              "
              class="barMenuIcon"
            ></svg-icon>
            <div>{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div class="userPanel">
        <div class="userPic"></div>
        <div v-popover:popover1>
          {{ userInfo.username }} {{ userInfo.userEmpNo }}
        </div>
        <el-popover
          class="login_pannel"
          ref="popover1"
          placement="top-start"
          width="30"
          trigger="click"
        >
          <p class="login_out" @click="loginOut">退出登陆</p>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import routes from "@/router/index";
var G;
export default {
  data() {
    return {
      subRouters: [],
      parentRouter: {}
    };
  },
  mounted() {
    this.getRouter();
  },
  created() {
    G = this;
  },
  watch: {
    $route: () => {
      G.getRouter();
    }
  },
  computed: Object.assign(
    {
      currentName: {
        // 当前路由名称
        get() {
          return (
            G.$route.matched[1].meta.parentName || G.$route.matched[1].name
          );
        }
      },
      showSubMenu() {
        return this.subRouters.length > 1 && !this.$route.meta.hideSubMenu;
      }
    },
    mapState({
      userInfo: state => state.user.userInfo
    })
  ),
  methods: {
    getRouter() {
      this.parentRouter = this.$router.currentRoute.matched[0];
      for (let item of routes) {
        if (item.name === this.$router.currentRoute.matched[0].name) {
          this.subRouters = item.children.filter(item => {
            return item.meta && this.userInfo.check(item.meta.code);
          }); // 过滤掉没有权限的路由
        }
      }
      sessionStorage["lastName"] =
        this.$route.matched[1].meta.parentName || this.$route.matched[1].name; // 存放当前选中的路由名称
    },
    goRouter(item) {
      sessionStorage["pick_date"] = "";
      this.$router.push(
        item.defaultPath
          ? this.parentRouter.path + "/" + item.defaultPath
          : item
      );
    },
    loginOut() {
      let config = { urlPrefix: "" };
      this.$get("/logout", {}, config).then(data => {
        if (data.data) {
          window.location.href = data.data; // 重定向
        } else {
          this.$message.error(data.meta.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.headView {
  box-sizing: border-box;
  background: #ffffff;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  .menuBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: px2vw(66);
  }
  .topBarMenu {
    flex: 1;
    display: flex;
    justify-content: center;
    .barMenuGroup {
      display: flex;
    }
    .barMenuItem {
      height: px2vw(37);
      padding: 0 px2vw(43);
      font-size: px2vw(16);
      color: rgba(153, 153, 153, 1);
      border-radius: 19px;
      cursor: pointer;
      display: flex;
      align-items: center;
      &.active {
        background: #fec868;
        color: rgba(152, 93, 14, 1);
      }
    }
    .barMenuIcon {
      margin-right: px2vw(8);
    }
  }
  .userPanel {
    position: absolute;
    right: 0;
    margin-right: px2vw(65);
    height: 100%;
    display: flex;
    align-items: center;
    font-size: px2vw(14);
    color: #a9aeb4;
  }
  .userPic {
    width: px2vw(30);
    height: px2vw(30);
    background: #000000;
    margin-right: px2vw(16);
  }
  .login_pannel {
    cursor: pointer;
  }
}
</style>
