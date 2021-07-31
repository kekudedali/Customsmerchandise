<template>
  <div class="app-container">
    <div class="radio-box">
      <el-radio-group
        v-model="queryParams.status"
        @change="changeStatus"
        size="small"
      >
        <el-radio-button :label="''">海关商品备案 </el-radio-button>
        <el-radio-button :label="'0'">审核中</el-radio-button>
        <el-radio-button :label="'1'">审核驳回</el-radio-button>
        <el-radio-button :label="'2'">已归档</el-radio-button>
      </el-radio-group>
    </div>
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
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['commodity:plaftorm:add']"
          >新增</el-button
        >
      </el-col>
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
        :show-overflow-tooltip="true"
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
                <span style="margin-left: 10px">{{ item.inventoryTotal }}</span>
              </div>
            </div>
            <div class="stock">{{ scope.row.inventoryTotal }}</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        label="提交时间"
        align="center"
        prop="createTime"
        width="180"
        v-if="queryParams.status == '0'"
      >
        <template slot-scope="scope">
          <div>{{ scope.row.createTime }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="驳回原因"
        align="center"
        prop="updateBy"
        width="150"
        v-if="queryParams.status == '1'"
      />
      <el-table-column
        label="驳回时间"
        align="center"
        prop="updateTime"
        width="180"
        v-if="queryParams.status == '1'"
      />
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="200"
        v-if="queryParams.status != '0'"
      >
        <template slot-scope="scope">
          <span v-if="queryParams.status === ''">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-s-check"
              @click="handleApproval(scope.row)"
              v-hasPermi="['commodity:plaftorm:approval']"
              >提交审核</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['commodity:plaftorm:edit']"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['commodity:plaftorm:del']"
              >删除</el-button
            >
          </span>
          <span v-if="queryParams.status == '1'">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdatereject(scope.row)"
              v-hasPermi="['commodity:plaftorm:edit']"
              >修改</el-button
            >
          </span>
          <span v-if="queryParams.status == '2'">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-more"
              @click="handlemore(scope.row)"
              v-hasPermi="['commodity:plaftorm:edit']"
              >更多</el-button
            >
            <el-button
              size="mini"
              type="text"
              icon="el-icon-copy-document"
              @click="handlecopy(scope.row)"
              v-hasPermi="['commodity:plaftorm:edit']"
              >复制</el-button
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
        status: "",
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
      this.$router.push({
        path: "/commodity/edit",
        query: {
          type: "add",
          title: "新增海关商品备案",
        },
      });
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
      this.$router.push({
        path: "/commodity/edit",
        query: {
          type: "edit",
          title: "修改海关商品备案",
          data: row,
        },
      });
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
    handlemore(row) {
      this.reset();
      this.$router.push({
        path: "/commodity/edit",
        query: {
          type: "detail",
          title: "海关商品备案详情",
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
</style>