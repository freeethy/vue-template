<template>
  <div>
    <div class="menuBar">
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
    <div>无权限。。</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: Object.assign(
    mapState({
      userInfo: state => state.user.userInfo
    })
  ),
  methods: {
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
.menuBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: px2vw(66);
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
