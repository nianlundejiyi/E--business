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
<<<<<<< HEAD
        <el-aside :width="isCollapse?'64px':'200px'">
          <div class="toggle-button" @click="toggcollapse">|||</div>
          <!-- 侧边栏菜单 -->
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition='false'
            router
          >
          <!-- 一级菜单 -->
            <el-submenu :index="item.id+''" v-for="item of menuslist" :key="item.id">
              <!--一级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconobj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="it.id+''" v-for="it of item.children" :key="it.id" :route="{path:'/home/' + it.path}">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <template slot="title">{{it.authName}}</template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main><router-view></router-view></el-main>
=======
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
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1
      </el-container>
    </el-container>
  </div>
</template>

<script>
<<<<<<< HEAD
import Http from "../request/index.js";
export default {
  props: {},
  data() {
    return {
      isCollapse:false,
      menuslist: [],
      iconobj:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao',
      }
    };
  },
  created() {
    this.getmenulist();
=======
export default {
  props: {},
  data() {
    return {};
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
<<<<<<< HEAD
    toggcollapse(){
      this.isCollapse=!this.isCollapse
    },
    getmenulist() {
      Http({
        url: "/menus",
        method: "get",
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.menuslist = res.data;
        }
        if (res.meta.status != 200) {
          // alert(res.meta.msg)
          this.$message.error(res.meta.msg);
        }
      });
    },
=======
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1
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
<<<<<<< HEAD
      .el-menu{
        border-right: none;
      }
=======
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1
    }
    .el-main {
      background-color: #eaedf1;
    }
<<<<<<< HEAD
    .iconfont{
      margin-right: 10px;
    }
  }
  .toggle-button{
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    letter-spacing: 0.2em;
    cursor: pointer;
=======
>>>>>>> 7c28455f66202b4ead0d5b8f4847278cfafe89c1
  }
}
</style>
