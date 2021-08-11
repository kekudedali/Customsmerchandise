<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="订单号" prop="orderno">
        <el-input
          v-model="queryParams.orderno"
          placeholder="请输入订单号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
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
        width="150px"
      >
      </el-table-column>
      <el-table-column
        label="内容"
        align="center"
        prop="wxorder"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="微信返回"
        align="center"
        prop="wxback"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="creattime"
        width="150px"
      >
      </el-table-column>
      <el-table-column
        label="修改时间"
        align="center"
        prop="updatetime"
        width="150px"
      >
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
      :title="title"
      :visible="open"
      width="780px"
      append-to-body
      :before-close="handeclose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-row>
          <el-col :span="15" :offset="3">
            <el-form-item label="公司名称：" prop="gsskzhname">
              <el-input
                v-model="form.gsskzhname"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="公司收款商户号：" prop="gsskshh">
              <el-input
                v-model="form.gsskshh"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="公司收款银行名称：" prop="gsskyhmc">
              <el-input
                type="textarea"
                v-model="form.gsskyhmc"
                placeholder="请输入"
                :rows="3"
                maxlength="100"
                show-word-limit
                :disabled="isdisable"
              />
            </el-form-item>
            <el-form-item label="公司收款账户：" prop="gsskzh">
              <el-input
                v-model="form.gsskzh"
                :disabled="isdisable"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      // 类型数据字典
      statusOptions: [],
      // 状态数据字典
      typeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderno: "",
        state: "",
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
    };
  },
  created() {
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
        orderno: undefined,
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
</style>