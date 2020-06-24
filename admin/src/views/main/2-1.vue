<template>
  <div class="index">
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <a href="home">首页</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>身份审核</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="tableData" stripe style="width: 100%;margin-top: 20px">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100px"></el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="attestation[0]" label="认证姓名"></el-table-column>
        <el-table-column prop="schoolnumber" label="认证学号"></el-table-column>
        <el-table-column prop="role" label="身份"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.isattestation == 0" style="width: 100px;">
              <el-tag type="info">未审核，请提交审核材料</el-tag>
            </div>
            <div v-if="scope.row.isattestation == 1" style="width: 100px;">
              <el-tag>审核中</el-tag>
            </div>
            <div v-if="scope.row.isattestation == 2" style="width: 100px;">
              <el-tag type="success">审核成功</el-tag>
            </div>
            <div v-if="scope.row.isattestation == 3" style="width: 100px;">
              <el-tag type="danger">审核失败，请重新提交审核材料</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="认证图片">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.attestation[2]"
              style="width: 100px; height: 100px;cursor: pointer;"
              @click="preview(scope.row.attestation[2])"
            >
              <div slot="placeholder" style="text-align:center;padding-top:45px;color: rgb(64, 158, 255)">
                <i class="el-icon-loading"></i>
                加载中
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.isattestation == 1">
              <el-button type="success" @click="sucess(scope.row._id,scope.$index)">通过</el-button>
              <el-button type="danger" @click="fail(scope.row._id,scope.$index)">不通过</el-button>
            </div>
            <div v-if="scope.row.isattestation == 2">
              <el-button type="success" @click="sucess(scope.row._id,scope.$index)">信息修改</el-button>
            </div>
            <div v-if="scope.row.isattestation == 0">
              <el-tag>无需操作</el-tag>
            </div>
            <div v-if="scope.row.isattestation == 3">
              <el-tag>无需操作</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="信息矫正" :visible.sync="dialogFormVisible" :center="true" width="30%">
      <el-form :model="form">
        <el-form-item label="性别" label-width="150px">
          <el-select v-model="form.sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" label-width="150px">
          <el-input v-model="form.name" autocomplete="off" style="width: 217px"></el-input>
        </el-form-item>
        <el-form-item label="学院" label-width="150px">
          <el-select v-model="form.college" placeholder="请选择学院">
            <el-option label="文学院 /新闻与传播学院" value="文学院 /新闻与传播学院"></el-option>
            <el-option label="法学院" value="法学院"></el-option>
            <el-option label="教育学部" value="教育学部"></el-option>
            <el-option label="音乐学院" value="音乐学院"></el-option>
            <el-option label="化学与药学学院" value="化学与药学学院"></el-option>
            <el-option label="计算机科学与信息工程学院/软件学院" value="计算机科学与信息工程学院/软件学院"></el-option>
            <el-option label="职业技术师范学院" value="职业技术师范学院"></el-option>
            <el-option label="国际文化教育学院" value="国际文化教育学院"></el-option>
            <el-option label="历史文化与旅游学院" value="历史文化与旅游学院"></el-option>
            <el-option label="政治与公共管理学院" value="政治与公共管理学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="数学与统计学院" value="数学与统计学院"></el-option>
            <el-option label="生命科学学院" value="生命科学学院"></el-option>
            <el-option label="体育与健康学院" value="体育与健康学院"></el-option>
            <el-option label="健康管理学院" value="健康管理学院"></el-option>
            <el-option label="漓江学院(独立学院)" value="漓江学院(独立学院)"></el-option>
            <el-option label="马克思主义学院" value="马克思主义学院"></el-option>
            <el-option label="经济管理学院" value="经济管理学院"></el-option>
            <el-option label="美术学院" value="美术学院"></el-option>
            <el-option label="物理科学与技术学院" value="物理科学与技术学院"></el-option>
            <el-option label="环境与资源学院" value="环境与资源学院"></el-option>
            <el-option label="电子工程学院" value="电子工程学院"></el-option>
            <el-option label="设计学院" value="设计学院"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sumbitInfo">确 定</el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="请填写原因" :visible.sync="failDialog" :center="true" width="30%">
      <el-form :model="failForm">
        <el-input v-model="failForm.attestationFailInfo" type="textarea" placeholder="请输入内容" maxlength="50" show-word-limit></el-input>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sumbitfailInfo">确 定</el-button>
        <el-button @click="failDialog = false">取 消</el-button>
      </div>
    </el-dialog>
    <div class="preview" v-show="ispreview">
      <img :src="previewSrc" />
      <div class="close" @click="previewClose">
        <img src="../../assets/close.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      previewSrc: "",
      ispreview: false,
      dialogFormVisible: false,
      dataIndex: 0,
      form: {},
      failForm:{},
      failDialog:false
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
    },
    previewClose() {
      this.previewSrc = "";
      this.ispreview = false;
    },
    sucess(id, index) {
      this.dataIndex = index;
      this.form = this.tableData[index];
      this.dialogFormVisible = true;
    },
    fail(id, index) {
      this.dataIndex = index;
      this.failForm = this.tableData[index];
      this.failDialog = true;
    },
    sumbitInfo() {
      this.dialogFormVisible = false;
      this.form["isattestation"] = 2;
      this.$axios
        .post("https://gxnudsl.xyz/api/user/userEdit", this.form)
        .then(res => {
          if (res.data.status_code == 200) {
            this.$notify({
              title: '成功',
              message: '信息更新成功',
              type: 'success'
            });
            this.getData()
          }
        });
    },
    sumbitfailInfo(){
      this.failDialog = false;
      this.failForm["isattestation"] = 3;
      this.$axios
        .post("https://gxnudsl.xyz/api/user/attestationFailInfo", this.failForm)
        .then(res => {
          if (res.data.status_code == 200) {
            this.$notify({
              title: '成功',
              message: '信息更新成功',
              type: 'success'
            });
            this.getData()
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.el-input__inner {
  width: 217px !important;
}
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
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 90%;
      width: 60%;
    }
    .close {
      position: fixed;
      top: 50px;
      right: 300px;
      cursor: pointer;
      img {
        width: 50px;
        height: 50px;
        color: black;
      }
    }
  }
}
</style>