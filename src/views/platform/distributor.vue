<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="渠道名称" prop="distributorName">
        <el-input
          v-model="queryParams.distributorName"
          placeholder="请输入标签名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select
          v-model="queryParams.state"
          @change="handleQuery"
          placeholder="请选择"
          clearable
        >
          <el-option
            v-for="item in stateoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
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
      <el-button type="primary" size="small" @click="handleedit('add')"
        >新增</el-button
      >
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
      <el-table-column label="渠道名称" align="center" prop="distributorName" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.distributorName }}
        </template>
      </el-table-column>
      <el-table-column label="渠道负责人" align="center" prop="userName" :show-overflow-tooltip="true" />
      <el-table-column
        label="支付手续费（%）"
        align="center"
        prop="distributorRate"
      />
      <el-table-column label="Key" align="center" prop="distributorkey" />
      <el-table-column label="URL" align="center" prop="url" />
      <el-table-column label="渠道状态" align="center" prop="state">
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
        prop="opration"
        width="200"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleedit('edit', scope.row)"
            >修改</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-more"
            @click="handleedit('more', scope.row)"
            >更多</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            style="color: red"
            @click="handleedit('del', scope.row)"
            >删除</el-button
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
      :title="title"
      :visible="open"
      width="780px"
      append-to-body
      :before-close="handeclose"
      class="gonggao"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="110px">
        <el-row>
          <el-col :span="15" :offset="3" style="margin-top: 10px">
            <el-form-item label="渠道状态：" prop="state">
              <el-radio v-model="form.state" :disabled="isdisabled" :label="1"
                >启用</el-radio
              >
              <el-radio v-model="form.state" :disabled="isdisabled" :label="0"
                >禁用</el-radio
              >
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="3" style="margin-top: 10px">
            <el-form-item label="渠道名称：" prop="distributorName">
              <el-input
                v-model="form.distributorName"
                placeholder="请输入"
                :disabled="isdisabled"
              />
            </el-form-item>
            <el-form-item label="渠道负责人：" prop="userName">
              <el-input
                v-model="form.userName"
                placeholder="请输入"
                :disabled="isdisabled"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="3" style="margin-top: 10px">
            <el-form-item label="支付手续费：" prop="distributorRate">
              <el-input
                v-model="form.distributorRate"
                placeholder="请输入"
                style="width: 300px"
                :disabled="isdisabled"
              />
              %
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="15" :offset="3" style="margin-top: 10px">
            <el-form-item label="渠道Key：" prop="distributorkey">
              <el-input
                v-model="form.distributorkey"
                :disabled="isdisabled"
                placeholder="请输入"
              />
            </el-form-item>
            <el-form-item label="渠道URL：" prop="url">
              <el-input
                v-model="form.url"
                :disabled="isdisabled"
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
  distributorbaselist,
  adddistributor,
  editdistributor,
  deldistributor,
} from "@/api/platform";
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
      commodityList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      isdisabled: false,
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
      form: {
        state: 1,
        menu: [""],
      },
      // 表单校验
      rules: {
        distributorName: [
          { required: true, message: "渠道名称不能为空", trigger: "change" },
        ],
        userName: [
          { required: true, message: "渠道负责人不能为空", trigger: "change" },
        ],
        distributorRate: [
          { required: true, message: "支付手续费不能为空", trigger: "change" },
        ],
        distributorkey: [
          { required: true, message: "渠道Key不能为空", trigger: "change" },
        ],
        url: [
          { required: true, message: "渠道URL不能为空", trigger: "change" },
        ],
        state: [
          { required: true, message: "渠道状态不能为空", trigger: "change" },
        ],
      },
      type: "0",
      multipleSelection: [],
      limit: 5,
      fileSize: 20,
      isShowTip: false,
      value: [],
      stateoptions: [
        {
          value: "0",
          label: "禁用",
        },
        {
          value: "1",
          label: "启用",
        },
      ],
      menulist: ["压货菜单", "非压货菜单"],
    };
  },
  created() {
    this.getList();
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
      distributorbaselist(this.queryParams).then((response) => {
        var commodityList = response.rows;
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
    handeclose() {
      this.open = false;
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            editdistributor(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            adddistributor(this.form).then((response) => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    changestate(row) {
      var that = this;
      const statestr = row.state == 1 ? "禁用" : "启用";
      this.$confirm("是否确认" + statestr + "该渠道?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        var obj = {
          id: row.id,
          state: row.state == 1 ? 0 : 1,
        };
        editdistributor(obj).then((response) => {
          that.$message.success(statestr + "成功");
          that.getList();
        });
      });
    },
    handleedit(type, row) {
      this.reset();
      if (type == "edit") {
        this.open = true;
        this.isdisabled = false;
        this.$set(this.form, "id", row.id);
        this.title = "修改标签";
        this.form = {
          ...row,
        };
      } else if (type == "add") {
        this.open = true;
        this.isdisabled = false;
        this.title = "新增标签";
        this.form = {
          state: 1,
          menu: [""],
        };
      } else if (type == "del") {
        this.$confirm(
          '是否确认删除名称为"' + row.distributorName + '"的数据项?',
          "警告",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(function () {
            return deldistributor(row.id);
          })
          .then(() => {
            this.getList();
            this.msgSuccess("删除成功");
          })
          .catch(() => {});
      } else {
        this.open = true;
        this.title = "更多";
        this.isdisabled = true;
        this.form = {
          ...row,
        };
      }
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
}
.baseinfo {
  width: 80%;
  height: 40px;
  margin: 0 auto;
  line-height: 40px;
  color: #999;
  background-color: #f2f2f2;
  padding-left: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
<style scoped>
.gonggao /deep/ .el-dialog__body {
  padding: 10px 10px !important;
}
.gonggao /deep/ .el-dialog__header {
  padding-bottom: 0px !important;
}
</style>