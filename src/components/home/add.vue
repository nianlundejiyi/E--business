<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 提示区域 -->
      <el-alert
        title="消息提示的文案"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏 -->
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          :before-leave="beforeTab"
          @tab-click="TabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :options="cateList"
                :props="cateProps"
                v-model="addForm.goods_cat"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              :label="item.attr_name"
              v-for="item of manyTabDate"
              :key="item.attr_id"
            >
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="it"
                  v-for="(it, idx) in item.attr_vals"
                  :key="idx"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTabDate"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3"
            ><el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="hraderObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="btn" @click="add"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" class="previewimg" />
    </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import Http from "../../request/index.js";
export default {
  props: {},
  data() {
    return {
      activeIndex: "0",
      // 表单对象
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品分类所属分类数组
        goods_cat: [],
        // 图片数组
        pics: [],
        // 商品详情介绍
        goods_introduce: "",
        attrs: [],
      },
      // 表单验证
      addRules: {
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入商品重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
        ],
        goods_cat: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
      // 商品分类列表
      cateList: [],
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      // 动态参数列表数据
      manyTabDate: [],
      // 静态属性列表
      onlyTabDate: [],
      // 上传图片地址
      uploadURL: "http://192.168.1.5:8888/api/private/v1/upload/",
      // 图片上传请求头
      hraderObj: {
        Authorization: localStorage.getItem("token"),
      },
      previewPath: "",
      previewVisible: false,
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    // 获取商品分类数据
    getCateList() {
      Http({
        url: "/categories",
      }).then((res) => {
        if (res.meta.status != 200) return this.$message.error(res.meta.msg);
        this.cateList = res.data;
        // console.log(this.cateList);
      });
    },
    // 级联选择器选中项会触发的函数
    handleChange() {
      // console.log(this.addForm.goods_cat);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    },
    beforeTab(activeName, oldActiveName) {
      // console.log("离开："+oldActiveName);
      // console.log("进入："+activeName);
      // return false   false 阻止切换标签
      if (oldActiveName === "0" && this.addForm.goods_cat.length !== 3) {
        this.$message.error("请选择商品分类！");
        return false;
      }
    },
    TabClick() {
      // console.log(typeof this.activeIndex);
      if (this.activeIndex == "1") {
        // console.log(typeof this.addForm.goods_cat[2]);
        Http({
          url: `categories/${this.addForm.goods_cat[2]}/attributes`,
          params: { sel: "many" },
        }).then((res) => {
          if (res.meta.status != 200) return this.$message.error(res.meta.msg);
          res.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
            // console.log(item.attr_name);
          });
          this.manyTabDate = res.data;
          // console.log(this.manyTabDate);
        });
      } else if (this.activeIndex == "2") {
        Http({
          url: `categories/${this.addForm.goods_cat[2]}/attributes`,
          params: { sel: "only" },
        }).then((res) => {
          if (res.meta.status != 200) return this.$message.error(res.meta.msg);
          console.log(res.data);
          this.onlyTabDate = res.data;
          // console.log(this.manyTabDate);
        });
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file);
      this.previewPath =
        "http://192.168.1.5:8888/" + file.response.data.tmp_path;
      console.log(this.previewPath);
      this.previewVisible = true;
    },
    // 处理移除图片操做
    handleRemove(file) {
      console.log(file);
      // 1.获取将要删除图片的临时路径
      const filePath = file.response.data.tmp_path;
      // 2.从pics数组中，找到图片对应的索引值
      const i = this.addForm.pics.findIndex((x) => x.pic === filePath);
      // 3.调用数组的splice方法把图片信息对象从pics数组中移除
      this.addForm.pics.slice(i, 1);
      console.log(this.addForm);
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      console.log(response);
      // 1.拼接得到一个图片信息对象
      const picIofo = { pic: response.data.tmp_path };
      // 2.将信息对象push到pics图片数组中
      const img = this.uploadURL + picIofo.pic;
      this.addForm.pics.push(img);
    },
    // 添加商品
    add() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项");
        }
        // 执行添加业务逻辑
        // lodash  cloneDeep() 深拷贝
        const form = _.cloneDeep(this.addForm);
        form.goods_cat = form.goods_cat.join(",");
        // 处理动态参数
        this.manyTabDate.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(" "),
          };
          this.addForm.attrs.push(newInfo);
        });
        // 处理静态属性
        this.onlyTabDate.forEach((item) => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals,
          };
          this.addForm.attrs.push(newInfo);
        });
        form.attrs = this.addForm.attrs;
        console.log(form);
        // 发起请求添加商品 添加商品名称是唯一的
        Http({
          url: "goods",
          method: "post",
          data:form
        }).then((res) => {
          console.log(res);
          if (res.meta.status !== 201) {
            return this.$message.error("添加商品失败!");
          }
          this.$message.success("添加商品成功");
          this.$router.push("/home/goods");
        });
      });
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.previewimg {
  width: 100%;
}
.btn {
  margin-top: 15px;
}
</style>
