<template>
  <div>
    <el-card>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="main">
        <p>
          欢迎管理员：
          <strong style="color:#fe6c6f">{{userInfo.name}}</strong>
          ! 当前时间：{{Date.now() | changeTime(Date.now())}}
        </p>
      </div>
      <div class="serveInfo">
        服务器信息
        <ul>
          <li>服务器ip: 121.36.94.53</li>
          <li>服务器域名: http://gxnudsl.xyz</li>
          <li>服务器带宽: 1 Mbit/s</li>
          <li>服务器操作系统: Windows Server 2012</li>
        </ul>
      </div>
      <div class="websiteInfo">
        网站信息
        <ul>
          <li>网站首页: http://gxnudsl.xyz</li>
          <li>网站访问量: 0</li>
        </ul>
      </div>
      <div class="beian">
        © 2020 Mr.D | All rights reserved
        <el-link type="info" :underline="false" href="http://www.beian.miit.gov.cn">陕ICP备20006581号</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "Mr.D"
      }
    };
  }
};
</script>

<style lang="less" scoped>
.main {
  padding: 8px 16px;
  background-color: #f2f2f2;
  border-radius: 4px;
  border-left: 5px solid #1989fa;
  margin: 20px 0;
  font-size: 18px;
  p {
    font-size: 14px;
    color: #5e6d82;
  }
}
.serveInfo {
  padding: 16px;
  background-color: #f2f2f2;
  border-radius: 4px;
  border-left: 5px solid #e6a23c;
  margin: 20px 0;
  ul,
  li {
    margin: 20px 10px;
    font-size: 14px;
    color: #5e6d82;
  }
}

.websiteInfo {
  padding: 16px;
  background-color: #f2f2f2;
  border-radius: 4px;
  border-left: 5px solid #67c23a;
  margin: 20px 0;
  ul,
  li {
    margin: 20px 10px;
    font-size: 14px;
    color: #5e6d82;
  }
}

.beian {
  padding: 16px 0;
  text-align: center;
  background-color: #f2f2f2;
  border-radius: 4px;
  margin: 20px 0;
  font-weight: 500;
  font-size: 14px;
  color: #909399;
}
</style>