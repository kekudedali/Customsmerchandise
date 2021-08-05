<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <!-- <el-form-item label="商品名称" prop="noticeTitle">
        <el-input
          v-model="queryParams.noticeTitle"
          placeholder="请输入商品名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <!-- <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        > -->
        <el-button type="primary" size="mini" @click="handleAdd"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="commodityList">
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
        label="仓库名"
        align="center"
        prop="cangkuming"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="仓库地址"
        align="center"
        prop="ckdz"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="是否对接"
        align="center"
        prop="isdj"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="200"
      >
        <template slot-scope="scope">
          <span>
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              
              >删除</el-button
            >
          </span>
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
      :title="title"
      class="warehouse-dialog"
      :visible="open"
      width="780px"
      append-to-body
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="仓库名称:" prop="ckname">
              <el-input
                v-model="form.ckname"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item label="仓库地址:" prop="ckaddress">
              <el-input
                v-model="form.ckaddress"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item label="是否对接:" prop="isdj">
              <el-select v-model="form.isdj" size="small" placeholder="请选择">
                <el-option
                  v-for="item in djoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对接参数:" prop="djcs">
              <el-input
                type="textarea"
                :rows="7"
                placeholder="请输入内容"
                v-model="form.djcs"
                size="small"
              />
            </el-form-item>
            <el-form-item label="支付公司参数:" prop="zfgscs">
              <el-input
                placeholder="请输入内容"
                size="small"
                v-model="form.zfgscs"
              />
            </el-form-item>
            <el-form-item label="海关备案公司参数:" prop="hgbacs">
              <el-input
                placeholder="请输入内容"
                size="small"
                v-model="form.hgbacs"
              />
            </el-form-item>
            <el-form-item label="仓库推送地址:" prop="cktsdz">
              <el-input
                placeholder="请输入内容"
                size="small"
                v-model="form.cktsdz"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listcommodity,
  getcommodity,
  delcommodity,
  addcommodity,
  updatecommodity,
  exportcommodity,
  approvalcommodity,
  copycommodity,
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
        status: "0",
      },
      // 表单参数
      form: {
        ckname: "",
        ckaddress: "",
        isdj: "",
        djcs: "",
        zfgscs: "",
        hgbacs: "",
        cktsdz: "",
      },
      // 表单校验
      rules: {
        ckname: [
          { required: true, message: "仓库名称不能为空", trigger: "change" },
        ],
        ckaddress: [
          { required: true, message: "仓库地址不能为空", trigger: "change" },
        ],
        isdj: [
          { required: true, message: "是否对接不能为空", trigger: "change" },
        ],
        djcs: [
          { required: true, message: "对接参数不能为空", trigger: "change" },
        ],
      },
      type: "0",
      djoptions: [
        {
          label: "是",
          value: "1",
        },
        {
          label: "否",
          value: "0",
        },
      ],
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
    handleClose() {
      this.open = false;
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.title = "新增仓库管理";
      this.open = true;
    },
    /** 审核按钮操作 */
    handleApproval(row) {
      const ids = row.id || this.ids;
      var obj = {
        id: ids,
        status: 2,
      };
      this.$confirm("是否确认审核该商品?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return approvalcommodity(obj);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("审核成功");
        })
        .catch(() => {});
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.open = true;
    },
    handleUpdatereject(row) {
      this.reset();
      this.$router.push({
        path: "/commodity/edit",
        query: {
          type: "reject",
          title: "驳回海关商品备案",
          data: row,
        },
      });
    },
    handlecopy(row) {
      this.$confirm("是否确认复制该商品?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return approvalcommodity(obj);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("复制成功");
        })
        .catch(() => {});
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
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$confirm("是否确认删除该商品?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delcommodity(ids);
        })
        .then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        })
        .catch(() => {});
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

.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style scoped>
.warehouse-dialog /deep/ .el-dialog__header {
  background-color: #ccc;
}
</style>