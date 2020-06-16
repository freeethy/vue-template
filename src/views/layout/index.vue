<template>
  <div class="contentView">
    <x-menu></x-menu>
    <x-head></x-head>
    <div class="containerView">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import xMenu from "@/components/menu/index.vue";
import xHead from "@/components/head/index.vue";
export default {
  name: "layout",
  data() {
    return {};
  },
  components: { xMenu, xHead }
};
</script>
<style lang="scss" scoped>
.contentView {
  position: relative;
  height: 100%;
  width: 100%;
  background: #f9fcff;
  box-sizing: border-box;
  padding-left: px2vw(120);
  padding-top: px2vw(66);
}
.containerView {
  height: 100%;
}
.container {
  height: 100%;
  overflow-y: overlay;
}
</style>
