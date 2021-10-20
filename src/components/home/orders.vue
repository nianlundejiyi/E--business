<template>
<<<<<<< HEAD
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单数据</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单数据 -->
      <el-table :data="orderlist" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <div>
              <el-tag type="success" v-if="scope.pay_status === '1'"
                >已付款</el-tag
              >
              <el-tag type="danger" v-else>未付款</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time"> 
          <template slot-scope="scope">
            <div>
              {{ scope.row.create_time |dateFromat}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="showBox"
              >
              </el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-location"
                @click="showProgress"
              >
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
      >
      </el-pagination>
    </el-card>
    <!-- 修改地址的对话框 -->

    <el-dialog
      title="修改地址"
      :visible.sync="addressVisible"
      width="50%"
      @close="addressDialogClosed"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            :options="cityData"
            v-model="addressForm.address1"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取消</el-button>
        <el-button @click="addressVisible = false">确定</el-button>
      </span>
    </el-dialog>
    <!-- 物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) of proressdata"
          :key="index"
          :timestamp="activity.time"
        >
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import Http from "../../request/index.js";
import cityData from "../../assets/js/citydata";
export default {
  props: {},
  data() {
    return {
      queryIofo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderlist: [],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请选择省市区县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      cityData,
      progressVisible: false,
      proressdata:[],
    };
  },
  created() {
    this.getorderlist();
  },
  methods: {
    getorderlist() {
      Http({
        url: "/orders",
        method: "get",
        params: this.queryIofo,
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.orderlist = res.data.goods;
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
    // 展示修改地址
    showBox() {
      this.addressVisible = true;
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields();
    },
    showProgress() {
      this.progressVisible = true;
      Http({
        url: "/kuaidi/1106975712662"
      }).then((res) => {
        // console.log(res.data);
        if (res.meta.status == 200) {
          this.proressdata = res.data.data;
        }
        if (res.meta.status != 200) {
          // alert(res.meta.msg)
          this.$message.error(res.meta.msg);
        }
      });
    },
  },

  components: {},
=======
    <div>

    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {

    },
    components: {

    },
>>>>>>> fbd7a4b09f0ba97ec4eca68c5e96b2b76ce15ec2
};
</script>

<style scoped lang="scss">
<<<<<<< HEAD
.el-cascader {
  width: 100%;
}
=======

>>>>>>> fbd7a4b09f0ba97ec4eca68c5e96b2b76ce15ec2
</style>
