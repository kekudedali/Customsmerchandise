<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item>
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
        prop="warehouseName"
        width="200"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="仓库地址"
        align="center"
        prop="warehouseLocation"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="是否对接"
        align="center"
        prop="status"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.status == "1" ? "已对接" : "未对接" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" align="center" prop="state" width="100">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state == '1'"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changestate(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
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
              style="color: red"
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
          <el-col :span="15" :offset="3">
            <el-form-item label="仓库名称:" prop="warehouseName">
              <el-input
                v-model="form.warehouseName"
                placeholder="请输入"
                size="small"
              />
            </el-form-item>
            <el-form-item label="仓库地址:" prop="warehouseLocation">
              <el-input
                type="textarea"
                :rows="3"
                v-model="form.warehouseLocation"
                placeholder="请输入"
                size="small"
                maxlength="100"
                show-word-limit
              />
            </el-form-item>
            <!--是否对接（0。未对接 1.已对接） -->
            <el-form-item label="是否启用:" prop="state">
              <el-radio v-model="form.state" :label="0">禁用</el-radio>
              <el-radio v-model="form.state" :label="1">启用</el-radio>
            </el-form-item>
            <el-form-item label="是否对接:" prop="status">
              <el-select
                v-model="form.status"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in statusoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对接参数:" prop="key">
              <el-input
                type="textarea"
                :rows="7"
                placeholder="请输入内容"
                v-model="form.key"
                size="small"
                maxlength="1000"
                show-word-limit
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
  listwarehouse,
  delwarehouse,
  addwarehouse,
  editwarehouse,
} from "@/api/warehouse";
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
      },
      // 表单参数
      form: {
        warehouseName: "",
        warehouseLocation: "",
        status: "1",
        state: "0",
        key: "",
      },
      // 表单校验
      rules: {
        warehouseName: [
          { required: true, message: "仓库名称不能为空", trigger: "change" },
        ],
        warehouseLocation: [
          { required: true, message: "仓库地址不能为空", trigger: "change" },
        ],
        status: [
          { required: true, message: "是否对接不能为空", trigger: "change" },
        ],
        key: [
          { required: true, message: "对接参数不能为空", trigger: "change" },
        ],
        state: [
          { required: true, message: "是否启用不能为空", trigger: "change" },
        ],
      },
      type: "0",
      stateoptions: [
        {
          label: "禁用",
          value: 0,
        },
        {
          label: "启用",
          value: 1,
        },
      ],
      statusoptions: [
        {
          label: "未对接",
          value: 0,
        },
        {
          label: "已对接",
          value: 1,
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
        this.$message.success("复制成功");
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
      listwarehouse(this.queryParams).then((response) => {
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
        warehouseName: "",
        warehouseLocation: "",
        status: 1,
        state: 1,
        key: "",
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
          this.$message.success("审核成功");
        })
        .catch(() => {});
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.form = {
        ...row,
      }
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
          this.$message.success("复制成功");
        })
        .catch(() => {});
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            editwarehouse(this.form).then((response) => {
              this.$message.success("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addwarehouse(this.form).then((response) => {
              this.$message.success("新增成功");
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
      this.$confirm("是否确认删除该仓库?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delwarehouse(ids);
        })
        .then(() => {
          this.getList();
          this.$message.success("删除成功");
        })
        .catch(() => {});
    },
    changestate(row) {
      var that = this
      const statestr = row.state == 1 ? "禁用" : "启用";
      this.$confirm("是否确认" + statestr + "该仓库?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        var obj = {
          id: row.id,
          state: row.state == 1 ? 0 : 1,
        };
        editwarehouse(obj).then((response) => {
          that.$message.success(statestr + "成功");
          that.getList();
        });
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