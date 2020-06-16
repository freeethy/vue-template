<template>
  <div class="menuWrap">
    <div class="logo">
      <svg-icon icon-class="icon_logo" class="logo_icon"></svg-icon>
    </div>
    <div class="menu_list">
      <div v-for="(item, index) in routes" :key="index">
        <div
          :to="item.to"
          class="menu_item"
          :class="{ active: item.name == routerName }"
          @click="goRouter(item)"
          v-if="item.show"
        >
          <!-- <div  :class="'icon_' + item.icon"></div> -->
          <svg-icon
            class="menu_icon"
            :icon-class="item.icon + (item.name == routerName ? 'Active' : '')"
          ></svg-icon>
          <div class="menu_name">{{ item.name }}</div>
        </div>
      </div>
      <div class="menu_item"></div>
    </div>
  </div>
</template>
<script>
let G;
export default {
  name: "xMenu",
  data() {
    return {
      routerName: ""
    };
  },
  created() {
    G = this;
    this.routerName = this.$router.currentRoute.matched[0].name;
  },
  watch: {
    $route: () => {
      G.routerName = G.$router.currentRoute.matched[0].name;
    }
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    }
  },
  methods: {
    goRouter(item) {
      this.$router.push(item.path);
    }
  }
};
</script>
<style lang="scss" scoped>
.menuWrap {
  position: fixed;
  left: 0%;
  top: 0;
  background: #abc270;
  padding-top: px2vw(33);
  width: px2vw(120);
  box-sizing: border-box;
  height: 100%;
  z-index: 10;
  .logo {
    padding-bottom: px2vw(50);
    border-radius: 0 0 10px 0;
    background: #abc270;
    display: flex;
    justify-content: center;
    .logo_icon {
      width: px2vw(74);
      height: px2vw(74);
    }
  }
  .menu_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: px2vw(20);
    padding-bottom: px2vw(24);
    // 这里的圆角大小改变的时候，要注意active：after元素的宽，定位也要改
    border-radius: 0 10px 10px 0;
    text-decoration: none;
    background: #abc270;
    color: #ffffff;
    cursor: pointer;
    .menu_icon {
      width: px2vw(42);
      height: px2vw(42);
      margin-bottom: 6px;
    }
    .menu_name {
      color: #ffffff;
      font-family: PingFangSC-Medium;
      font-size: px2vw(14);
      color: #ffffff;
      letter-spacing: 0.3px;
    }
    &.active {
      background: #f9fcff;
      position: relative;
      .menu_name {
        color: #434d2c;
      }
      // 圆角处理
      &::after {
        content: " ";
        position: absolute;
        width: 10px;
        height: 100%;
        background: #f9fcff;
        right: 0;
        top: -10px;
        z-index: -1;
        padding: 10px 0;
      }
    }
  }
}
</style>
