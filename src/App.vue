<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
.box-card {
  margin-top: 15px;
}
.el-steps {
  margin: 15px 0;
  .el-step__title {
    font-size: 14px;
  }
}
.el-cascader{
  width: 260px;
}
.ql-editor{
  min-height: 300px;
}
</style>
