<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="80px"
    >
      <el-form-item label="订单号" prop="orderno">
        <el-input
          v-model="queryParams.orderno"
          placeholder="请输入订单号"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item label="订单状态" prop="orderstatus">
        <el-input
          v-model="queryParams.orderstatus"
          placeholder="请输入订单号"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item label="渠道名称" prop="qudaoname">
        <el-select v-model="queryParams.qudaoname" placeholder="请选择">
          <el-option
            v-for="item in qudaooptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="售后状态" prop="afterstatus">
        <el-select v-model="queryParams.afterstatus" placeholder="请选择">
          <el-option
            v-for="item in afterstatusoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回调状态" prop="ddhdzt" label-width="150">
        <el-select v-model="queryParams.ddhdzt" placeholder="请选择">
          <el-option
            v-for="item in ddhdztoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单时间" prop="ordertime">
        <el-date-picker
          v-model="queryParams.ordertime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-DD"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table ref="multipleTable" v-loading="loading" :data="commodityList">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="序号" align="center" prop="id" width="100">
        <template slot-scope="scope">
          <div>
            {{
              scope.$index +
              (queryParams.pageNum - 1) * queryParams.pageSize +
              1
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="订单号"
        align="center"
        prop="orderno"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="订单状态"
        align="center"
        prop="orderstatus"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="仓订单回调状态"
        align="center"
        prop="ddhdzt"
        width="150"
      >
      </el-table-column>
      <el-table-column
        label="售后状态"
        width="100"
        align="center"
        prop="gsskzh"
      >
      </el-table-column>
      <el-table-column label="金额" width="100" align="center" prop="gsskzh">
      </el-table-column>
      <el-table-column
        label="买家信息"
        width="200"
        :show-overflow-tooltip="true"
        align="center"
        prop="gsskzh"
      >
      </el-table-column>
      <el-table-column
        label="买家地址"
        width="300"
        :show-overflow-tooltip="true"
        align="center"
        prop="gsskzh"
      >
      </el-table-column>
      <el-table-column
        label="推单状态"
        width="100"
        align="center"
        prop="gsskzh"
      >
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="150"
        align="center"
        prop="gsskzh"
      >
      </el-table-column>
      <el-table-column
        label="渠道"
        width="100"
        :show-overflow-tooltip="true"
        align="center"
        prop="gsskzh"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        prop="opration"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-document"
            @click="handleedit('edit', scope.row)"
            >明细</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改公告对话框 -->
    <el-dialog
      title="订单列表"
      :visible="open"
      width="90%"
      append-to-body
      :before-close="handeclose"
    >
      <el-button type="primary" @click="handleDown">PDF下载</el-button>
      <div id="demo">
        <table border="1" class="table_style">
          <thead>
            <th colspan="5" style="font-size: 10px; color: red" align="left">
              订单信息
            </th>
          </thead>
          <tbody>
            <tr>
              <td>订单号</td>
              <td>状态</td>
              <td>订单金额</td>
              <td>税费</td>
              <td>总重</td>
            </tr>
            <tr v-for="(item, index) in ordermsg" :key="index">
              <td>{{ item.orderno }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.ordermoney }}</td>
              <td>{{ item.tax }}%</td>
              <td>{{ item.weight + item.unit }}</td>
            </tr>
          </tbody>
        </table>
        <table border="1" class="table_style" style="margin-top: 10px">
          <thead>
            <th colspan="8" style="font-size: 10px; color: red" align="left">
              收货人物流信息
            </th>
          </thead>
          <tbody>
            <tr>
              <td>买家姓名</td>
              <td>买家电话</td>
              <td>身份证号</td>
              <td>收货地址</td>
              <td>物流公司编号</td>
              <td>物流公司</td>
              <td>物流单号</td>
              <td>发货时间</td>
            </tr>
            <tr v-for="(item, index) in logisticsmsg" :key="index">
              <td>{{ item.bugername }}</td>
              <td>{{ item.bugerphone }}</td>
              <td>{{ item.idcard }}</td>
              <td style="max-width: 300px">{{ item.address }}</td>
              <td>{{ item.logisticscomno }}</td>
              <td style="max-width: 120px">{{ item.logisticscom }}</td>
              <td>{{ item.logisticsno }}</td>
              <td>{{ item.delivertime }}</td>
            </tr>
          </tbody>
        </table>
        <table border="1" class="table_style" style="margin-top: 10px">
          <thead>
            <th colspan="6" style="font-size: 10px; color: red" align="left">
              支付信息
            </th>
          </thead>
          <tbody>
            <tr>
              <td>支付方式</td>
              <td>支付流水号</td>
              <td>支付时间</td>
              <td>真实姓名</td>
              <td>身份证号</td>
              <td>手机号</td>
            </tr>
            <tr v-for="(item, index) in payformsg" :key="index">
              <td>{{ item.payforway }}</td>
              <td>{{ item.payfordetail }}</td>
              <td>{{ item.payfortime }}</td>
              <td>{{ item.realname }}</td>
              <td>{{ item.idcard }}</td>
              <td>{{ item.phone }}</td>
            </tr>
          </tbody>
        </table>
        <table border="1" class="table_style" style="margin-top: 10px">
          <thead>
            <th colspan="8" style="font-size: 10px; color: red" align="left">
              订单商品详情
            </th>
          </thead>
          <tbody>
            <tr>
              <td>商品名称</td>
              <td>商品编码</td>
              <td>规格编码</td>
              <td>海关编码</td>
              <td>原产国</td>
              <td>购买数量</td>
              <td>重量</td>
              <td>价格</td>
            </tr>
            <tr v-for="(item, index) in orderproduct" :key="index">
              <td style="max-width: 300px">{{ item.productname }}</td>
              <td>{{ item.productno }}</td>
              <td>{{ item.specifica }}</td>
              <td>{{ item.customs }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.buynum }}</td>
              <td>{{ item.weight + item.unit }}</td>
              <td>{{ item.price + item.currency }}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 10px">
          <span style="font-size: 10px; color: red; font-weight: 700"
            >备注</span
          >
          <div class="remark">{{ remark }}</div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listcommodity,
  addcommodity,
  updatecommodity,
  copycommodity,
  chooseproduct,
} from "@/api/commodity/commodity";
import Editor from "@/components/Editor";
import selfDirective from "@/utils/selfDirective";
import FileUpload from "@/components/FileUpload/index";
import htmlToPdf from "@/utils/htmlToPdf.js";

export default {
  name: "commodity",
  components: {
    Editor,
    FileUpload,
  },
  data() {
    return {
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 公告表格数据
      commodityList: [
        {
          id: 1,
          name: "测试小程序",
          apptb:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          xcxtb:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          px: 1,
        },
        {
          id: 2,
          name: "测试小程序",
          apptb:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          xcxtb:
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
          px: 1,
        },
      ],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 渠道名称
      qudaooptions: [],
      // 仓订单回调状态
      ddhdztoptions: [],
      //订单状态
      orderstatusoptions: [],
      afterstatusoptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderno: "",
        orderstatus: "",
        ordertime: [],
        qudaoname: "",
        ddhdzt: "",
      },
      // 表单参数
      form: {
        icon: [],
        sort: null,
        name: "",
      },
      // 表单校验
      rules: {
        gsskzhname: [
          { required: true, message: "公司名称不能为空", trigger: "change" },
        ],
        gsskshh: [
          {
            required: true,
            message: "公司收款商户号不能为空",
            trigger: "change",
          },
        ],
        gsskyhmc: [
          {
            required: true,
            message: "公司收款银行名称不能为空",
            trigger: "change",
          },
        ],
        gsskzh: [
          {
            required: true,
            message: "公司收款账户不能为空",
            trigger: "change",
          },
        ],
      },
      type: "0",
      multipleSelection: [],
      limit: 5,
      fileSize: 20,
      isShowTip: false,
      value: [],
      gsskshhoptions: [],
      producttypeoptions: [],
      gsskzhoptions: [],
      ordertableData: [],
      leaveData: {
        dimId: "",
      },
      approvalLogs: [],
      ordermsg: [
        {
          orderno: "3131231232132",
          status: "运输中",
          ordermoney: "100",
          tax: "10",
          weight: "100",
          unit: "千克",
        },
      ],
      logisticsmsg: [
        {
          bugername: "黄晓明",
          bugerphone: "13687353638",
          idcard: "43011199456432348",
          address:
            "湖南省长沙市岳麓区麓谷街道麓谷企业广场e5栋1单元湖南省长沙市岳麓区麓谷街道麓谷企业广场e5栋1单元湖南省长沙市岳麓区麓谷街道麓谷企业广场e5栋1单元",
          logisticscomno: "74837289473874928748",
          logisticscom: "顺风国际物流有限公司",
          logisticsno: "4793284732894782479",
          delivertime: "2021-08-09",
        },
        {
          bugername: "黄晓明",
          bugerphone: "13687353638",
          idcard: "43011199456432348",
          address:
            "湖南省长沙市岳麓区麓谷街道麓谷企业广场e5栋1单元湖南省长沙市岳麓区麓谷街道麓谷企业广场e5栋1单元湖南省长沙市岳麓区麓谷街道麓谷企业广场e5栋1单元",
          logisticscomno: "74837289473874928748",
          logisticscom: "顺风国际物流有限公司",
          logisticsno: "4793284732894782479",
          delivertime: "2021-08-09",
        },
      ],
      payformsg: [
        {
          payforway: "支付宝",
          payfordetail: "432849824982098409",
          payfortime: "2021-08-09",
          realname: "黄晓明",
          idcard: "43011199456432348",
          phone: "13687353638",
        },
      ],
      orderproduct: [
        {
          productname: "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
          productno: "4839208492048930284",
          specifica: "4832904893284982044",
          customs: "111387298390819038",
          country: "美国",
          buynum: "1000",
          weight: "100",
          unit: "千克",
          price: "10",
          currency: "美元",
        },
        {
          productname: "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
          productno: "4839208492048930284",
          specifica: "4832904893284982044",
          customs: "111387298390819038",
          country: "美国",
          buynum: "1000",
          weight: "100",
          unit: "千克",
          price: "10",
          currency: "美元",
        },
        {
          productname: "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
          productno: "4839208492048930284",
          specifica: "4832904893284982044",
          customs: "111387298390819038",
          country: "美国",
          buynum: "1000",
          weight: "100",
          unit: "千克",
          price: "10",
          currency: "美元",
        },
        {
          productname: "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
          productno: "4839208492048930284",
          specifica: "4832904893284982044",
          customs: "111387298390819038",
          country: "美国",
          buynum: "1000",
          weight: "100",
          unit: "千克",
          price: "10",
          currency: "美元",
        },
        {
          productname: "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
          productno: "4839208492048930284",
          specifica: "4832904893284982044",
          customs: "111387298390819038",
          country: "美国",
          buynum: "1000",
          weight: "100",
          unit: "千克",
          price: "10",
          currency: "美元",
        },
        {
          productname: "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
          productno: "4839208492048930284",
          specifica: "4832904893284982044",
          customs: "111387298390819038",
          country: "美国",
          buynum: "1000",
          weight: "100",
          unit: "千克",
          price: "10",
          currency: "美元",
        },
      ],
      remark:
        "美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml美体小葫芦补湿爽肤水 this body shop aloe toner 250 ml",
    };
  },
  created() {
    this.$route
    // this.getList();
  },
  methods: {
    chooseproduct() {
      if (this.multipleSelection.length == 0) {
        this.$message.error("请选择一条商品数据");
        return;
      }
      chooseproduct(this.multipleSelection).then((res) => {
        this.msgSuccess("选品成功");
        this.multipleSelection = [];
        this.back();
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    /** 查询公告列表 */
    handelcopy() {
      copycommodity().then((res) => {
        this.msgSuccess("复制成功");
      });
    },
    /** 查询公告列表 */
    changeStatus(value) {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 查询公告列表 */
    getList() {
      this.loading = true;
      listcommodity(this.queryParams).then((response) => {
        var commodityList = response.rows;

        commodityList.map((item) => {
          var inventoryTotal = 0;
          if (item.specificationList) {
            item.specificationList.map((item) => {
              item.inventoryTotal = item.inventoryTotal
                ? item.inventoryTotal
                : 0;
              item.inventoryUsable = item.inventoryUsable
                ? item.inventoryUsable
                : 0;

              inventoryTotal += item.inventoryTotal;
            });
          }
          item.inventoryTotal = inventoryTotal;
        });
        this.commodityList = commodityList;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 公告状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 公告状态字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.noticeType);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        noticeTitle: undefined,
        status: "0",
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            updatecommodity(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addcommodity(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    handleedit(type, row) {
      this.reset();
      if (type == "edit") {
        this.form = row;
        this.open = true;
        this.title = "修改标签";
      } else if (type == "add") {
        this.open = true;
        this.title = "新增标签";
      } else if (type == "more") {
        this.open = true;
        this.form = row;
        this.isdisable = true;
      } else if (type == "del") {
        this.$confirm("确定删除该条数据吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    handeclose() {
      this.open = false;
    },
    handleDown() {
      htmlToPdf.downloadPDF(document.querySelector("#demo"), "订单详情");
    },
  },
};
</script>
<style scoped lang="scss">
.radio-box {
  margin-bottom: 10px;
}
.stock {
  text-decoration: underline;
}
.copy {
  color: #999;
  cursor: pointer;
}
.box-card {
  margin-top: 20px;
  .card-title {
    font-weight: 700;
    font-style: normal;
    color: #555555;
  }
  .baseinfo {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #999;
    background-color: #f2f2f2;
    padding-left: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
}
#demo {
  background-color: #fff;
  width: 100%;
  /* height: 400px; */
  margin: auto;
  padding: 40px;
  box-sizing: border-box;
}

.table_style td,
th {
  padding: 10px;
  font-size: 10px;
  font-weight: 700;
}

.table_style {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}
.remark {
  border: 1px solid #606266;
  min-height: 50px;
  margin-top: 10px;
  padding: 5px;
  box-sizing: border-box;
}
</style>