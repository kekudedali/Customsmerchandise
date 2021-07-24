<template>
  <div class="app-container">
    <el-card class="box-card">
      <div style="margin-bottom: 20px">
        <el-button size="small" type="primary" @click="back">返回</el-button>
      </div>
      <div class="baseinfo">基本信息</div>
      <div style="margin-top: 20px">
        <el-form
          :model="queryParams"
          ref="queryForm"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item label="商品名称" prop="noticeTitle">
            <el-input
              v-model="queryParams.noticeTitle"
              placeholder="请输入商品名称"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="商品条码" prop="noticeTitle">
            <el-input
              v-model="queryParams.commodityBaseCode"
              placeholder="请输入商品条码"
              clearable
              size="small"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="入库日期" prop="noticeTitle">
            <el-date-picker
              v-model="queryParams.createTime"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
            <el-button
              icon="el-icon-box"
              type="primary"
              size="mini"
              @click="chooseproduct"
              >一键选品</el-button
            >
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <right-toolbar
            :showSearch.sync="showSearch"
            @queryTable="getList"
          ></right-toolbar>
        </el-row>

        <el-table
          v-loading="loading"
          :data="commodityList"
          @selection-change="handleSelectionChange"
        >
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
          <el-table-column label="商品名称" align="center" prop="name">
            <template slot-scope="scope">
              {{ scope.row.name }}
              <span
                class="copy"
                @click="handelcopy"
                v-if="scope.row.status == '已归档'"
                >【复制】</span
              >
            </template>
          </el-table-column>
          <el-table-column
            label="平台编码"
            align="center"
            prop="commodityBaseCode"
            width="200"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="商品品牌"
            align="center"
            prop="commodityBrand"
            width="150"
          />
          <el-table-column
            label="商品条码"
            align="center"
            prop="skuCode"
            width="150"
          />
          <el-table-column label="库存" align="center" prop="kc" width="150">
            <template slot-scope="scope">
              <el-tooltip placement="bottom" effect="light">
                <div slot="content">
                  <div
                    v-for="(item, index) in scope.row.specificationList"
                    :key="index"
                  >
                    {{ item.specificationName }}
                    <span style="margin-left: 10px">
                      {{ item.inventoryUsable + " g" }}</span
                    >
                    <span style="margin-left: 10px">{{
                      item.inventoryTotal
                    }}</span>
                  </div>
                </div>
                <div class="stock">{{ scope.row.inventoryTotal }}</div>
              </el-tooltip>
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
      </div>
    </el-card>
    <!-- 添加或修改公告对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="780px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入商品名称"
                style="width: 200px"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公告类型" prop="noticeType">
              <el-select
                v-model="form.noticeType"
                style="width: 200px"
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in typeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                  >{{ dict.dictLabel }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <editor v-model="form.noticeContent" :min-height="192" />
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

export default {
  name: "commodity",
  components: {
    Editor,
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
      commodityList: [],
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
        noticeTitle: "",
        state: "",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        noticeType: [
          { required: true, message: "公告类型不能为空", trigger: "change" },
        ],
      },
      type: "0",
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
    this.getDicts("sys_notice_status").then((response) => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_notice_type").then((response) => {
      this.typeOptions = response.data;
    });
  },
  methods: {
    back() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
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
      this.multipleSelection = val;
      debugger
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
        noticeType: undefined,
        noticeContent: undefined,
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
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