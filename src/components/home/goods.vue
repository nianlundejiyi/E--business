<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            clearable
            v-model="queryIofo.query"
            @clear="getorderlist"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getorderlist"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="toaddpage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="95px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_number"
          width="80px"
        ></el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="180px">
          <template slot-scope="scope">
            <div>
              {{ scope.row.add_time | dateFromat }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="mini">
                <i class="el-icon-edit"></i>
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="removeByid(scope.row.goods_id)"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryIofo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryIofo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Http from "../../request/index.js";
export default {
  props: {},
  data() {
    return {
      queryIofo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      goodslist: [],
      total: 0,
    };
  },
  created() {
    this.getorderlist();
  },
  methods: {
    getorderlist() {
      Http({
        url: "/goods",
        params: this.queryIofo,
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.goodslist = res.data.goods;
          this.total = res.data.total;
        }
        if (res.meta.status != 200) {
          // alert(res.meta.msg)
          this.$message.error(res.meta.msg);
        }
      });
    },
    handleSizeChange(newPsize) {
      this.queryIofo.pagesize = newPsize;
      this.getorderlist();
    },
    handleCurrentChange(newPage) {
      this.queryIofo.pagenum = newPage;
      this.getorderlist();
    },
    removeByid(id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Http({
            url: `goods/${id}`,
            method: "delete",
          }).then((res) => {
            if (res.meta.status != 200)
              return this.$message.error(res.meta.msg);
            this.$message({
              type: "success",
              duration: 1000,
              message: res.meta.msg,
            });
            this.getorderlist();
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    toaddpage(){
      this.$router.push('/goods/add')
    }
  },
  components: {},
};
</script>

<style scoped lang="scss"></style>
