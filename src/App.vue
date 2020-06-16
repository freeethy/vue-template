<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>
<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}
::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:vertical {
  height: 7px;
  background: rgba(177, 191, 174, 0.8);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:horizontal {
  width: 7px;
  background: rgba(177, 191, 174, 0.8);
  border-radius: 5px;
}
// 瘦瘦的滚动条
.thin-scrollbar::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
.thin-scrollbar::-webkit-scrollbar-track-piece {
  background-color: #ccc;
  border-radius: 3px;
}
.thin-scrollbar::-webkit-scrollbar-thumb:vertical {
  height: 3px;
  background-color: #999;
  border-radius: 3px;
}
.thin-scrollbar::-webkit-scrollbar-thumb:horizontal {
  width: 3px;
  background-color: #999;
  border-radius: 3px;
}
</style>
