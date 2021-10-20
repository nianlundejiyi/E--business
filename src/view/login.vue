<template>
  <div class="login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="head_portrait "><img src="../assets/logo.png" alt="" /></div>
      <!-- 表单区域 -->
      <el-form class="login_from" :model="from" :rules="rules" ref="loginfromref">
        <el-form-item>
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-user" v-model="from.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="iconfont icon-3702mima" v-model="from.password"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="button">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetloginfrom">重置</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Http from '../request/index'
export default {
  props: {},
  data() {
    return {
      // 登录表单数据绑定对象
      from: {
        username: 'admin',
        password: '123456'
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    // 重置按钮
    resetloginfrom() {
      this.$refs.loginfromref.resetFields()
    },
    // 登录按钮
    login() {
      this.$refs.loginfromref.validate(v => {
        //   console.log(v);
        if (!v) return
        Http({
          url: '/login',
          method: 'post',
          data: {
            username: this.from.username,
            password: this.from.password
          }
        }).then(res => {
          console.log(res)
          if (res.meta.status == 200) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/home')
          }
          if (res.meta.status != 200) {
            // alert(res.meta.msg)
            this.$message.error(res.meta.msg)
          }
        })
      })
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
.login {
  background-color: #2b4b6b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 500px;
    height: 300px;
    border-radius: 10px;
    background-color: #fff;
    position: relative;
    .head_portrait {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .button {
    display: flex;
    justify-content: flex-end;
  }
  .login_from {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .el-form-item {
    padding: 10px 0;
  }
}
</style>

