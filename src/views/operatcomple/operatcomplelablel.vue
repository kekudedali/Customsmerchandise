<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="标签名称" prop="value">
        <el-input
          v-model="queryParams.value"
          placeholder="请输入标签名称"
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
      <el-button type="primary" size="small" @click="handleedit('add')"
        >新增</el-button
      >
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
      <el-table-column label="标签名称" align="center" prop="value">
        <template slot-scope="scope">
          {{ scope.row.value }}
        </template>
      </el-table-column>
      <el-table-column label="标签icon" align="center" prop="code">
      </el-table-column>
      <el-table-column label="排序" align="center" prop="sort">
      </el-table-column>
      <el-table-column label="操作" align="center" prop="opration" width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click="handleedit('edit', scope.row)"
            >修改</el-button
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
    <el-dialog :title="title" :visible="open" width="780px" append-to-body :before-close="handeclose">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="21" :offset="1">
            <el-form-item label="标签名称" prop="value">
              <el-input
                v-model="form.value"
                placeholder="请输入标签名称"
                style="width: 200px"
              />
            </el-form-item>
            <el-form-item label="标签icon" prop="code">
              <FileUpload
                :limit="1"
                :fileSize="fileSize"
                :isShowTip="isShowTip"
                uploadtype="image"
                :fileList.sync="form.code"
              />
            </el-form-item>
            <el-form-item label="标签排序" prop="sort">
              <el-input-number
                v-model="form.sort"
                placeholder="请输入 标签排序"
                style="width: 200px"
                controls-position="right"
                :min="0"
                v-Int
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
  listlabel,
  addlabel,
  editlabel,
  dellabel
} from "@/api/commodity/label";
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
      },
      // 表单参数
      form: {
        code: [],
        sort: null,
        name: "",
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "标签名称不能为空", trigger: "change" },
        ],
        sort: [{ required: true, message: "排序不能为空", trigger: "change" }],
      },
      type: "0",
      multipleSelection: [],
      limit: 5,
      fileSize: 20,
      isShowTip: false,
      value: [],
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
      listlabel(this.queryParams).then((response) => {
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
    handeclose(){
      this.open = false;
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$set(this.form,'code',JSON.stringify(this.form.code))
          if (this.form.id != undefined) {
            editlabel(this.form).then((response) => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addlabel(this.form).then((response) => {
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
      this.open = true;
      if (type == "edit") {
        this.$set(this.form, "code", []);
        this.$set(this.form, "id", row.id);
        this.title = "修改标签";
      } else {
         this.$set(this.form, "code", []);
        this.title = "新增标签";
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