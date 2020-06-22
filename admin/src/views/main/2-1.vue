<template>
  <div class="index">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a href="home">首页</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>主站点意见反馈</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData" stripe style="width: 100%;margin-top: 20px">
        <el-table-column prop="email" label="邮箱" width="230"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          email: "1123512653@qq.com",
          content: "上海市普陀区金沙江路 1518 弄"
        },
        {
          email: "1123512653@qq.com",
          content: "上海市普陀区金沙江路 1517 弄"
        },
        {
          email: "1123512653@qq.com",
          content: "上海市普陀区金沙江路 1519 弄"
        },
        {
          email: "1123512653@qq.com",
          content: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  width: 100%;
  overflow: auto;
  .index::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .index::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #eeeeee;
  }
  .index::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ffffff;
  }
}
</style>