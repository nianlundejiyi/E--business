<template>
  <div class="home">
    <el-container class="home_content">
      <!-- 头部 -->
      <el-header>
        <div>
          <!-- <img src="../assets/logo.png" alt=""> -->
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button></el-header
      >
      <!-- 页面主体内容 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
            <!-- 侧边栏菜单 -->
          <el-menu 
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">权限管理</span>
            </el-menu-item>
            <el-menu-item index="3" >
              <i class="el-icon-document"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <i class="el-icon-setting"></i>
              <span slot="title">数据统计</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  .home_content {
    height: 100%;
    .el-header {
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      padding-left: 10px;
      font-size: 20px;
    }
    .el-aside {
      background-color: #333744;
    }
    .el-main {
      background-color: #eaedf1;
    }
  }
}
</style>
