<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        class="TreeTable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        :show-row-hover="false"
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <div>
            <i
              class="el-icon-circle-check"
              v-if="scope.row.cat_deleted === false"
              style="color:lightgreen"
            ></i>

            <i class="el-icon-circle-close" v-else style="color:red"></i>
          </div>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <div>
            <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag
              type="success"
              size="mini"
              v-else-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" size="mini" v-else>三级</el-tag>
          </div>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <div>
            <el-button type="primary" icon="el-icon-edit" size="mini"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="mini"
              >删除</el-button
            >
          </div>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加分类的对话框 -->
      <el-dialog
        title="商品分类"
        :visible.sync="addCateDialogVisible"
        width="50%"
        @close="addCateDialogClose"
      >
        <!-- 添加分类的表单 -->
        <el-form
          :model="addCateForm"
          :rules="addCateruleFormRules"
          ref="addCateFormRef"
          label-width="100px"
        >
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="addCateForm.cat_name"></el-input>
          </el-form-item>
          <el-form-item label="父级分类">
            <!--options 用来指定数据源  -->
            <!--props 用来指定配置对象  -->
            <el-cascader
              expand-trigger="hover"
              v-model="selectedKeys"
              :options="parentCateList"
              :props="cascaderProps"
              @change="parentCateChange"
              clearable
              change-on-select
            ></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addCateDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCate"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import Http from "../../request/index.js";
export default {
  props: {},
  data() {
    return {
      // 查询条件
      querInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类数据
      catelist: [],
      // 总数据条数
      total: 0,
      //   为tab指定列
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      // 控制添加分类对话框的显示与隐藏
      addCateDialogVisible: false,
      // 添加分类的表单对象
      addCateForm: {
        // 分类名称
        cat_name: "",
        // 分类父ID
        cat_pid: 0,
        // 分类当前层级 默认一级分类
        cat_level: 0,
      },
      // 添加分类的表单验证规则
      addCateruleFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级分类数据列表
      parentCateList: [],
      // 级联选择器配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 选中的父级分类的id数组
      selectedKeys: [],
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    getCateList() {
      Http({
        url: "categories",
        params: this.querInfo,
      }).then((res) => {
        console.log(res);
        if (res.meta.status != 200) return this.$message.error(res.meta.msg);
        // 数据列表
        this.catelist = res.data.result;
        // 总数据条数
        this.total = res.data.total;
      });
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.querInfo.pagesizenewSize;
      this.getCateList();
    },
    // 监听pagenum改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage;
      this.getCateList();
    },
    showAddCateDialog() {
      this.getparentCateList();
      this.addCateDialogVisible = true;
    },
    // 获取父级分类列表
    getparentCateList() {
      Http({
        url: "/categories",
        params: { type: 2 },
      }).then((res) => {
        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        console.log(res.data);
        this.parentCateList = res.data;
      });
    },
    // 选择项发生变化触发
    parentCateChange() {
      console.log(this.selectedKeys);
      if (this.selectedKeys.length > 0) {
        // 父级的id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ];
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length;
        return;
      } else {
        // 父级的id
        this.addCateForm.cat_pid = 0;
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = 0;
      }
    },
    // 取消对话框重置表单
    addCateDialogClose() {
      this.$refs.addCateFormRef.resetFields();
      this.selectedKeys = [];
      this.addCateForm.cat_level = 0;
      this.addCateForm.cat_pid = 0;
    },
    // 点击按钮 添加商品分类
    addCate(){
      this.$refs.addCateFormRef.validate(valid=>{
        if(!valid) return
        Http({
          url:'/categories',
          method:'post',
          data:this.addCateForm
        }).then(res=>{
          if (res.meta.status !== 201) return this.$message.error('添加分类失败!');
          this.$message.success('添加分类成功!')
          this.getCateList()
          this.addCateDialogVisible=false
        })
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="scss">
.TreeTable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
