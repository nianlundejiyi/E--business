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
      </el-container>
    </el-container>
  </div>
</template>

<script>
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
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
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
      .el-menu{
        border-right: none;
      }
    }
    .el-main {
      background-color: #eaedf1;
    }
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
  }
}
</style>
