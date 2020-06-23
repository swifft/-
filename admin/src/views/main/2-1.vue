<template>
  <div class="index">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a href="home">首页</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>请假审核</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData" stripe style="width: 100%;margin-top: 20px">
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="attestation[0]" label="姓名" width="100"></el-table-column>
        <el-table-column prop="attestation[1]" label="学号" width="100"></el-table-column>
        <el-table-column label="认证图片">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.attestation[2]"
              style="width: 100px; height: 100px;cursor: pointer;"
              @click="preview(scope.row.attestation[2])"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="preview" v-show="ispreview">
      <img :src="previewSrc" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      previewSrc: "",
      ispreview: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.get("https://gxnudsl.xyz/api/user/getUserInfo").then(res => {
        if (res.data.status_code == 200) {
          res.data.res_info.forEach(element => {
            element.attestation = element.attestation.split("&");
          });
          this.tableData = res.data.res_info;
        }
      });
    },
    indexMethod(index) {
      return index++;
    },
    preview(src) {
      this.previewSrc = src;
      this.ispreview = true;
    }
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

  .preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 90%;
      width: 60%;
    }
  }
}
</style>