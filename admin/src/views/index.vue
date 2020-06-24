<template>
  <div class="index">
    <div class="header">
      <div class="left">后台管理系统</div>
      <div class="right">
        <el-avatar :size="40" :src="avatarUrl"></el-avatar>
        <el-dropdown @command="getItem">
          <span class="el-dropdown-link">
            <i
              class="heder-dropdown-icon"
              :class="{'el-icon-caret-left':isshow,'el-icon-caret-bottom':!isshow}"
              @mouseenter="changeicon"
              @mouseout="changeicon"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="mainbox">
      <div class="leftSider">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="rgba(244,244,244,1)"
          active-text-color="rgba(87,153,255,1)"
          @select="leftSiderSelect"
          router
        >
          <el-menu-item index="home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>审核管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-s-data"></i>
              <span>身份审核</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="2-1-2">
            <i class="el-icon-s-home"></i>
            <span slot="title">数据视图</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isshow: true
    };
  },
  methods: {
    getItem(e) {
      console.log(e);
      if (e == 1){
        this.$message.error('该功能暂未开放,请联系开发者');
      }
      if (e == 2){
        this.$message.error('该功能暂未开放，请联系开发者');
      }
    },
    changeicon() {
      setTimeout(() => {
        this.isshow = !this.isshow;
      }, 300);
    },
    leftSiderSelect(index) {
      console.log(index);
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes animate {
  0% {
    background-position: 0%; /*修改背景定位，实现渐变色炫光*/
  }
  50% {
    background-position: 100%;
  }
  100% {
    background-position: 0%;
  }
}
@keyframes animate_1 {
  0% {
    background-position: 0%; /*修改背景定位，实现渐变色炫光*/
  }
  80% {
    background-position: 70%;
  }
  100% {
    background-position: 100%;
  }
}
.index {
  height: 100%;
  width: 100%;
}
.el-menu {
  height: 100%;
}
.header {
  height: 10%;
  background: linear-gradient(
    90deg,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4,
    #f441a5,
    #ffeb3b,
    #03a9f4
  );
  background-size: 400%;
  animation: animate 7s ease-in-out infinite alternate;
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    font-size: 24px;
    font-weight: bold;
    font-family: "楷体";
  }
  .right {
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .heder-dropdown-icon {
      cursor: pointer;
      font-size: 22px;
      animation: all 0.3s ease-in-out;
    }
  }
}

.mainbox {
  height: 90%;
  display: flex;
  .leftSider {
    height: 100%;
    width: 250px;
  }
  .main {
    flex: 1;
    padding: 20px 50px;
    background: linear-gradient(
      90deg,
      #a29bfe,
      #6c5ce7,
      #fd79a8,
      #e84393,
      #e84393,
      #fd79a8,
      #6c5ce7,
      #a29bfe
    );
    background-size: 400%;
    animation: animate_1 7s ease-in-out infinite alternate;
  }
}
</style>